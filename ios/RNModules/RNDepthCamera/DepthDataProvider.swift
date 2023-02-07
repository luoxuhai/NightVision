import Foundation
import ARKit
import React

class DepthDataProvider: NSObject, ARSessionDelegate {
    var config = ARWorldTrackingConfiguration()
    var session: ARSession!

    var distanceRectWidth: Int!
    var distanceRectHeight: Int!
    var minDistance: Float!

    var onMinDistance: RCTDirectEventBlock?
    var onReady: RCTDirectEventBlock?
    var onError: RCTDirectEventBlock?
    var onPause: RCTDirectEventBlock?

    public override init() {
      super.init()
      self.setup()
      self.run()
    }

    func setup() {
        self.session = ARSession()
        self.session.delegate = self
      
        config.frameSemantics.insert(.sceneDepth)
        if ARWorldTrackingConfiguration.supportsFrameSemantics(.smoothedSceneDepth) {
          config.frameSemantics.insert(.smoothedSceneDepth)
        }
        config.isLightEstimationEnabled = false
      
        self.session.run(config)
    }
  
    // 运行
    public func run() {
      self.session.run(config)
      self.onReady?([:])
    }

    // 暂停
    public func pause() {
      self.session.pause()
      self.onPause?([:])
    }

    func session(_ session: ARSession, didUpdate frame: ARFrame) {
      let sceneDepth = session.currentFrame?.sceneDepth
      let smoothedSceneDepth = session.currentFrame?.smoothedSceneDepth
      let depth = config.frameSemantics.contains(.smoothedSceneDepth) ? smoothedSceneDepth : sceneDepth
      
      if let depthMap = depth?.depthMap {
        let depthWidth = CVPixelBufferGetWidth(depthMap)
        let depthHeight = CVPixelBufferGetHeight(depthMap)
        let depthSize = CGSize(width: depthWidth, height: depthHeight)
        let ciImage = CIImage(cvPixelBuffer: depthMap)
        let context = CIContext.init(options: nil)
        guard let cgImageRef = context.createCGImage(ciImage, from: CGRect(x: 0, y: 0, width: depthSize.width, height: depthSize.height)) else { return }
        let uiImage = UIImage(cgImage: cgImageRef)
        // imageView.image = session.currentFrame?.depthMapTransformedImage(orientation: orientation, viewPort: self.imageView.bounds)
       
       // 距离
       let realDepthData = DepthData(width: depthWidth, height: depthHeight)
       CVPixelBufferLockBaseAddress(depthMap, CVPixelBufferLockFlags(rawValue: 0))
       let floatBuffer = unsafeBitCast(CVPixelBufferGetBaseAddress(depthMap), to: UnsafeMutablePointer<Float32>.self)
       for y in 0...depthHeight-1 {
           for x in 0...depthWidth-1 {
               let distanceAtXYPoint = floatBuffer[y*depthWidth+x]
               realDepthData.set(x: x, y: y, floatData: distanceAtXYPoint)
           }
       }
       
       self.detectMinDistance(realDepthData)
      }
    }


}

extension DepthDataProvider {
  private func detectMinDistance(_ depthData: DepthData) {
    let xRange = [(depthData.width / 2) - (self.distanceRectWidth / 2), (depthData.width / 2) + self.distanceRectWidth / 2 ]
    let yRange = [(depthData.height / 2) - (self.distanceRectHeight ?? 100 / 2), (depthData.height / 2) + (self.distanceRectHeight ?? 100) / 2]
    let data = depthData.data
    
    for y in 0...depthData.height - 1 {
      if y < yRange[0] || y > yRange[1] {
        continue
      }
      for x in 0...depthData.width - 1 {
        if x < xRange[0] || x > xRange[1] {
          continue
        }
        
        let distance = depthData.get(x: x, y: y)
        if distance <= self.minDistance {
          print("-------minDistance---", distance)
          self.onMinDistance?(["distance": distance])
          return
        }
        //
      }
    }
   }
}

class DepthData {
    //var data: Array<Array<Float>>
    var data = Array(repeating: Array(repeating: Float(-1), count: 192), count: 256)

    var width: Int
    var height: Int
  
    init (width: Int = 192, height: Int = 256) {
      self.width = width
      self.height = height
      
     // data = Array(repeating: Array(repeating: Float(-1), count: self.width), count: self.height)
    }

    func set(x: Int,y:Int, floatData:Float) {
         data[x][y] = floatData
    }

    func get(x:Int,y:Int) -> Float {
        if x>255||y>191 {
            print("---------------DepthData Error----------------")
            print("x與y的範圍分別在255與191內")
            print("-------------DepthData Error END--------------")
            return -1
        }
        
        return data[x][y]
    }

    func count() -> Int {
        return data.count
    }
}
