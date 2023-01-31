import Foundation
import ARKit
import UIKit
import React
import MetalKit
import Metal
import UIKit

class DepthCameraView: UIView {
    private var _detectionWidthScale: Float = 0.5
    private var _minDistanceDetection: Bool = false
    private var _colorMode: Int = 1
    private var _smoothed: Bool = true
    private var _enabled: Bool = true

    private let depthDataProvider = DepthDataProvider()
  
    private let mtkView = MTKView()
    private var textureCache: CVMetalTextureCache!
    private var mtkCoordinator: MTKCoordinator!
    private var depthContent = MetalTextureContent()

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
      
      self.setupMTKView()

      self.addSubview(mtkView)      
    }
  
    required init?(coder: NSCoder) {
      fatalError("init(coder:) has not been implemented")
    }
  
    //
    private func setupMTKView() {
      mtkCoordinator = MTKCoordinator(content: depthContent)
      mtkView.delegate = mtkCoordinator
      mtkCoordinator.setupView(mtkView: mtkView)
      
      CVMetalTextureCacheCreate(nil, nil, mtkView.device!, nil, &textureCache)
      self.depthDataProvider.textureCache = textureCache
      self.depthDataProvider.depthContent = depthContent
    }
  
    func takePicture(options: NSDictionary, resolve: @escaping RCTPromiseResolveBlock,reject: @escaping RCTPromiseRejectBlock) {
        // let quality = options["quality"] as? CGFloat ?? 1
        let image = mtkView.currentDrawable!.texture.toUIImage()
        PhotoLibrary.shared.saveToPhotoLibrary(image: image, resolve: resolve, reject: reject)
    }
    
    @objc
    func setMinDistanceDetection(_ minDistanceDetection: Bool) {
        _minDistanceDetection = minDistanceDetection
        self.depthDataProvider.minDistanceDetection = _minDistanceDetection
    }

    @objc
    func setDetectionWidthScale(_ detectionWidthScale: Float) {
        _detectionWidthScale = detectionWidthScale
        self.depthDataProvider.detectionWidthScale = _detectionWidthScale
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
  
    @objc
    func setColorMode(_ colorMode: Int) {
        _colorMode = colorMode
        if _colorMode == 1 {
          mtkCoordinator.prepareFunctions(fragmentFunction: "planeFragmentShaderDepth")
        } else {
          mtkCoordinator.prepareFunctions(fragmentFunction: "planeFragmentShaderDarkDepth")
        }
    }
}
