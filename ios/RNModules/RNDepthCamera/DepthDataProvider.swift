import Foundation
import ARKit
import React

class DepthDataProvider: NSObject, ARSessionDelegate {
    var config = ARWorldTrackingConfiguration()
    var session: ARSession!

    var detectionWidthScale: Float!
    var detectionHeightScale: Float!
    var minDistanceDetection: Bool!

    var onMinDistance: RCTDirectEventBlock?
    var onCameraSize: RCTDirectEventBlock?
    var onReady: RCTDirectEventBlock?
    var onError: RCTDirectEventBlock?
    var onPause: RCTDirectEventBlock?

    var invokedCameraSize = false

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
        if !self.invokedCameraSize {
          self.onCameraSize?(["width": depthWidth, "height": depthHeight ])
        }
        let ciImage = CIImage(cvPixelBuffer: depthMap)
        let context = CIContext.init(options: nil)
        guard let cgImageRef = context.createCGImage(ciImage, from: CGRect(x: 0, y: 0, width: depthSize.width, height: depthSize.height)) else { return }
        let uiImage = UIImage(cgImage: cgImageRef)
        // imageView.image = session.currentFrame?.depthMapTransformedImage(orientation: orientation, viewPort: self.imageView.bounds)
       
       if !self.minDistanceDetection || self.detectionWidth == nil || self.detectionHeight == nil {
        return
       }

       let confidenceMap = depth!.confidenceMap!
       let realDepthData = DepthData(width: depthWidth, height: depthHeight)
       let confidenceData = DepthData(width: depthWidth, height: depthHeight)
       CVPixelBufferLockBaseAddress(depthMap, CVPixelBufferLockFlags(rawValue: 0))
       CVPixelBufferLockBaseAddress(confidenceMap, CVPixelBufferLockFlags(rawValue: 0))
       let distanceBuffer = unsafeBitCast(CVPixelBufferGetBaseAddress(depthMap), to: UnsafeMutablePointer<Float32>.self)
       let confidenceBuffer = unsafeBitCast(CVPixelBufferGetBaseAddress(confidenceMap), to: UnsafeMutablePointer<UInt8>.self)

       for y in 0...depthHeight-1 {
           for x in 0...depthWidth-1 {
               let distance = distanceBuffer[y * depthWidth + x]
               let confidence = confidenceBuffer[y * depthWidth + x]
               realDepthData.set(x: x, y: y, floatData: distance)
               confidenceData.set(x: x, y: y, floatData: confidence)
           }
       }
       
       self.detectMinDistance(depthData: realDepthData, confidenceData: confidenceData)
      }
    }


}

extension DepthDataProvider {
  private func detectMinDistance(depthData: DepthData, confidenceData: DepthData) {
    let width = self.detectionWidthScale * depthData.width
    let height = self.detectionHeightScale * depthData.height
    let xRange = [(depthData.width / 2) - (width / 2), (depthData.width / 2) + width / 2 ]
    let yRange = [(depthData.height / 2) - (height / 2), (depthData.height / 2) + height / 2]
    let data = depthData.data
    
    var minDistance: Float
    for y in 0...depthData.height - 1 {
      if y < yRange[0] || y > yRange[1] {
        continue
      }
      for x in 0...depthData.width - 1 {
        if x < xRange[0] || x > xRange[1] || confidenceData.get(x: x, y: y) == 0 {
          continue
        }

        let distance = depthData.get(x: x, y: y)
        if minDistance == nil || distance < minDistance {
          minDistance = distance
        }
      }
    }

     print("-------minDistance-----", minDistance)
     self.onMinDistance?(["distance": minDistance])
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

    func set(x: Int,y: Int, floatData: Float) {
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
