import Foundation
import ARKit
import UIKit

class DepthDataProvider: ARSessionDelegate {
    var session: ARSession!
    var distanceRect: CGSize
    var onMinDistance: RCTDirectEventBlock?

    public init() {
      self.setup()
    }

    public setup() {
        self.session = ARSession()
        self.session.delegate = self

        let config = ARWorldTrackingConfiguration()
        config.frameSemantics.insert(.sceneDepth)
        if ARWorldTrackingConfiguration.supportsFrameSemantics(.smoothedSceneDepth) {
          config.frameSemantics.insert(.smoothedSceneDepth)
        }
        config.isLightEstimationEnabled = flase
        self.session.run(config)
    }

    func session(_ session: ARSession, didUpdate frame: ARFrame) {
        let depthData = currentFrame.sceneDepth?.depthMap
        let depthWidth = CVPixelBufferGetWidth(depth)
        let depthHeight = CVPixelBufferGetHeight(depth)
        let depthSize = CGSize(width: depthWidth, height: depthHeight)
        let ciImage = CIImage(cvPixelBuffer: depth)
        let context = CIContext.init(options: nil)
        guard let cgImageRef = context.createCGImage(ciImage, from: CGRect(x: 0, y: 0, width: depthSize.width, height: depthSize.height)) else { return }
        let uiImage = UIImage(cgImage: cgImageRef)
        // imageView.image = session.currentFrame?.depthMapTransformedImage(orientation: orientation, viewPort: self.imageView.bounds)

        // 距离
        if let depth = arARSession.currentFrame?.sceneDepth?.depthMap {
            var depthFloatData = DepthData()
            let depthWidth = CVPixelBufferGetWidth(depth)
            let depthHeight = CVPixelBufferGetHeight(depth)
            CVPixelBufferLockBaseAddress(depth, CVPixelBufferLockFlags(rawValue: 0))
            let floatBuffer = unsafeBitCast(CVPixelBufferGetBaseAddress(depth), to: UnsafeMutablePointer<Float32>.self)
            for y in 0...depthHeight-1 {
                for x in 0...depthWidth-1 {
                    let distanceAtXYPoint = floatBuffer[y*depthWidth+x]
                    depthFloatData.set(x: x, y: y, floatData: distanceAtXYPoint)
                }
            }

            self.detectMinDistance(depthFloatData)
        }
    }

    private func detectMinDistance(_ depthData: DepthData) {
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
    }
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