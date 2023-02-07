import Foundation
import ARKit
import UIKit
import React

class DepthCameraView: UIView {
    private var _distanceRectWidth: Int = 100
    private var _distanceRectHeight: Int = 100
    private var _minDistance: Float = 1
    private var _colorMode: Int = 1
    private var _smoothed: Bool = true
    private var _enabled: Bool = true

    private let depthDataProvider = DepthDataProvider()

    @objc var onReady: RCTDirectEventBlock? {
      didSet {
        self.depthDataProvider.onReady = onReady
      }
    }
  
    @objc var onPause: RCTDirectEventBlock? {
      didSet {
        self.depthDataProvider.onPause = onPause
      }
    }
    
    @objc var onError: RCTDirectEventBlock? {
      didSet {
        self.depthDataProvider.onError = onError
      }
    }
  
    @objc var onMinDistance: RCTDirectEventBlock? {
      didSet {
        self.depthDataProvider.onMinDistance = onMinDistance
      }
    }
  
    override init(frame: CGRect) {
      super.init(frame:frame)
    }
  
    required init?(coder: NSCoder) {
      fatalError("init(coder:) has not been implemented")
    }
  
    @objc
    func setMinDistance(_ minDistance: Float) {
        _minDistance = minDistance
        self.depthDataProvider.minDistance = _minDistance
    }

    @objc
    func setDistanceRectWidth(_ distanceRectWidth: Int) {
        _distanceRectWidth = distanceRectWidth
        self.depthDataProvider.distanceRectWidth = _distanceRectWidth
    }

    @objc
    func setDistanceRectHeight(_ distanceRectHeight: Int) {
        _distanceRectHeight = distanceRectHeight
        self.depthDataProvider.distanceRectHeight = _distanceRectHeight
    }
  
    @objc
    func setSmoothed(_ smoothed: Bool) {
        _smoothed = smoothed
      
      let exists = self.depthDataProvider.config.frameSemantics.contains(.smoothedSceneDepth)
      if _smoothed {
        if !exists {
          self.depthDataProvider.config.frameSemantics.insert(.smoothedSceneDepth)
          self.depthDataProvider.run()
        }
      } else {
        if exists {
          self.depthDataProvider.config.frameSemantics.remove(.smoothedSceneDepth)
          self.depthDataProvider.run()
        }
      }
    }
  
    @objc
    func setEnabled(_ enabled: Bool) {
        _enabled = enabled
        if _enabled {
          self.depthDataProvider.run()
        } else {
          self.depthDataProvider.pause()
        }
    }
}
