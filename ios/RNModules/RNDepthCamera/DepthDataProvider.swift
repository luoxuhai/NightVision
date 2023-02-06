import Foundation
import ARKit
import React

class DepthDataProvider: NSObject, ARSessionDelegate {
    var session: ARSession!
    var distanceRectWidth: Int!
    var distanceRectHeight: Int!
    var minDistance: Float!

    var onMinDistance: RCTDirectEventBlock?
    var onReady: RCTDirectEventBlock?
    var onError: RCTDirectEventBlock?

    public override init() {
      super.init()
      self.setup()
    }

    public func setup() {
        self.session = ARSession()
        self.session.delegate = self

        let config = ARWorldTrackingConfiguration()
        config.frameSemantics.insert(.sceneDepth)
        if ARWorldTrackingConfiguration.supportsFrameSemantics(.smoothedSceneDepth) {
          config.frameSemantics.insert(.smoothedSceneDepth)
        }
        config.isLightEstimationEnabled = false
      
        self.session.run(config)
        self.onReady?([:])
    }

    func session(_ session: ARSession, didUpdate frame: ARFrame) {
     if let depth = session.currentFrame?.sceneDepth?.depthMap {
        let depthWidth = CVPixelBufferGetWidth(depth)
        let depthHeight = CVPixelBufferGetHeight(depth)
        let depthSize = CGSize(width: depthWidth, height: depthHeight)
        let ciImage = CIImage(cvPixelBuffer: depth)
        let context = CIContext.init(options: nil)
        guard let cgImageRef = context.createCGImage(ciImage, from: CGRect(x: 0, y: 0, width: depthSize.width, height: depthSize.height)) else { return }
        let uiImage = UIImage(cgImage: cgImageRef)
        // imageView.image = session.currentFrame?.depthMapTransformedImage(orientation: orientation, viewPort: self.imageView.bounds)
       
       
       // 距离
       let depthFloatData = DepthData()
       CVPixelBufferLockBaseAddress(depth, CVPixelBufferLockFlags(rawValue: 0))
       let floatBuffer = unsafeBitCast(CVPixelBufferGetBaseAddress(depth), to: UnsafeMutablePointer<Float32>.self)
       for y in 0...depthHeight-1 {
           for x in 0...depthWidth-1 {
               let distanceAtXYPoint = floatBuffer[y*depthWidth+x]
               depthFloatData.set(x: x, y: y, floatData: distanceAtXYPoint)
           }
       }
       
       let smoothedSceneDepth = session.currentFrame!.smoothedSceneDepth!.depthMap
       let smoothedSceneDepthWidth = CVPixelBufferGetWidth(smoothedSceneDepth)
       let smoothedSceneDepthHeight = CVPixelBufferGetHeight(smoothedSceneDepth)
       
       print("-------minDistance---", depthFloatData.get(x: 100, y: 100))

       self.onMinDistance?(["minDistance": depthFloatData.get(x: 100, y: 100)])

       // self.detectMinDistance(depthFloatData)
      }
    }

   /* private func detectMinDistance(_ depthData: DepthData) {
      let minDistance = self.distanceRect["minDistance"] as Float
      let width = self.distanceRect["width"] as Int
      let height = self.distanceRect["height"] as Int
      let data = depthData.data;

      for (let x = 0; x < depthData.data.count; x++) {
        for (let y = 0; y < depthData.data[x]; y++) {
          let distance = depthData.get(x, y)
          if distance <= minDistance {
            self.onMinDistance(["distance": distance])
            return
          }
        }
      }
    } */
}

class DepthData {
    var data = Array(repeating: Array(repeating: Float(-1), count: 192), count: 256)

    func set(x:Int,y:Int,floatData:Float) {
         data[x][y]=floatData
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
