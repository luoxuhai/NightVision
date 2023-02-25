import Foundation
import ARKit
import React
import MetalKit
import Metal

class DepthDataProvider: NSObject, ARSessionDelegate {
    var config = ARWorldTrackingConfiguration()
    var session: ARSession!
    var depthSize: DepthSize!
    var textureCache: CVMetalTextureCache!
    var depthContent: MetalTextureContent!

    var detectionWidthScale: Float!
    var minDistanceDetection: Bool!

    var onMinDistance: RCTDirectEventBlock?
    var onCameraSize: RCTDirectEventBlock?
    var onReady: RCTDirectEventBlock?
    var onError: RCTDirectEventBlock?
    var onPause: RCTDirectEventBlock?

    // 是否调用过 onCameraSize
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
        if depthSize == nil {
          let depthWidth = CVPixelBufferGetWidth(depthMap)
          let depthHeight = CVPixelBufferGetHeight(depthMap)
          depthSize = DepthSize(width: depthWidth, height: depthHeight)
        }

        if !self.invokedCameraSize {
          self.onCameraSize?(["width": depthSize.width, "height": depthSize.height ])
          self.invokedCameraSize = true
        }
        
        if textureCache != nil {
          depthContent.texture = depthMap.texture(withFormat: .r32Float, planeIndex: 0, addToCache: textureCache)
        } else {
          print("Not textureCache")
        }
        
        if !self.minDistanceDetection || self.detectionWidthScale == nil {
        return
       }

        DispatchQueue.global().async {
          let confidenceMap = depth!.confidenceMap!
          let realDepthData = DepthData(size: self.depthSize)
          let confidenceData = DepthConfidenceData(size: self.depthSize)
          CVPixelBufferLockBaseAddress(depthMap, CVPixelBufferLockFlags(rawValue: 0))
          CVPixelBufferLockBaseAddress(confidenceMap, CVPixelBufferLockFlags(rawValue: 0))
          let distanceBuffer = unsafeBitCast(CVPixelBufferGetBaseAddress(depthMap), to: UnsafeMutablePointer<Float32>.self)
          let confidenceBuffer = unsafeBitCast(CVPixelBufferGetBaseAddress(confidenceMap), to: UnsafeMutablePointer<UInt8>.self)
          
          for y in 0...self.depthSize.height-1 {
            for x in 0...self.depthSize.width-1 {
              let distance = distanceBuffer[y * self.depthSize.width + x]
              let confidence = confidenceBuffer[y * self.depthSize.width + x]
                  realDepthData.set(x: x, y: y, value: distance)
                  confidenceData.set(x: x, y: y, value: confidence)
              }
          }
          self.detectMinDistance(depthData: realDepthData, confidenceData: confidenceData)
        }
      }
    }
}

extension DepthDataProvider {
  private func detectMinDistance(depthData: DepthData, confidenceData: DepthConfidenceData) {
    let width = Int(self.detectionWidthScale * Float(self.depthSize.height))
    let height = width
    let xRange = [(self.depthSize.height / 2) - (width / 2), (self.depthSize.height / 2) + width / 2 ]
    let yRange = [(self.depthSize.width / 2) - (height / 2), (self.depthSize.width / 2) + height / 2]
    var minDistance: Float?

    for y in 0...self.depthSize.height - 1 {
      if y < yRange[0] || y > yRange[1] {
        continue
      }
      for x in 0...self.depthSize.width - 1 {
        if x < xRange[0] || x > xRange[1] || confidenceData.get(x: x, y: y) == 0 {
          continue
        }

        let distance = depthData.get(x: x, y: y)
        if minDistance == nil {
          minDistance = distance
        } else if distance < minDistance! {
          minDistance = distance
        }
      }
    }

    self.onMinDistance?(["distance": minDistance ?? -1])
   }
}

class DepthData {
    var data: Array<Array<Float>>

    init (size: DepthSize) {
      data = Array(repeating: Array(repeating: Float(-1), count: size.height), count: size.width)
    }

    func set(x: Int,y: Int, value: Float) {
         data[x][y] = value
    }

    func get(x: Int,y: Int) -> Float {
        return data[x][y]
    }

    func count() -> Int {
        return data.count
    }
}

class DepthConfidenceData {
    var data: Array<Array<UInt8>>
  
    init (size: DepthSize) {
      data = Array(repeating: Array(repeating: UInt8(0), count: size.height), count: size.width)
    }

    func set(x: Int,y: Int, value: UInt8) {
         data[x][y] = value
    }

    func get(x: Int,y: Int) -> UInt8 {
        return data[x][y]
    }

    func count() -> Int {
        return data.count
    }
}


struct DepthSize {
  var width: Int
  var height: Int
}
