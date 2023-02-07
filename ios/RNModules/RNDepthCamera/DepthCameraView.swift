import Foundation
import ARKit
import UIKit
import React

class DepthCameraView: UIView {
    private var _detectionWidthScale: Float = 0.5
    private var _detectionHeightScale: Float = 0.5
    private var _minDistanceDetection: Bool = false
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
  
    @objc var onCameraSize: RCTDirectEventBlock? {
      didSet {
        self.depthDataProvider.onCameraSize = onCameraSize
      }
    }
  
    override init(frame: CGRect) {
      super.init(frame:frame)
    }
  
    required init?(coder: NSCoder) {
      fatalError("init(coder:) has not been implemented")
    }
  
    @objc
    func setMinDistanceDetection(_ minDistanceDetection: Float) {
        _minDistanceDetection = minDistanceDetection
        self.depthDataProvider.minDistanceDetection = _minDistanceDetection
    }

    @objc
    func setDetectionWidthScale(_ detectionWidthScale: Float) {
        _detectionWidthScale = detectionWidthScale
        self.depthDataProvider.detectionWidthScale = _detectionWidthScale
    }

    @objc
    func setDetectionHeightScale(_ detectionHeightScale: Float) {
        _detectionHeightScale = detectionHeightScale
        self.depthDataProvider.detectionHeightScale = _detectionHeightScale
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
