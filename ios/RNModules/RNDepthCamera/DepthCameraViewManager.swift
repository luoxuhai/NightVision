import React
import Foundation
import ARKit

@objc(DepthCameraViewManager)
class DepthCameraViewManager: RCTViewManager {
    override static func requiresMainQueueSetup() -> Bool {
      return true
    }

    override func view() -> UIView {
        return DepthCameraView()
    }

    override var methodQueue: DispatchQueue! {
      return DispatchQueue.main
    }
  
    @objc(takePicture:reactTag:resolver:rejecter:)
    func takePicture(options: NSDictionary, reactTag: NSNumber, resolve: @escaping RCTPromiseResolveBlock,reject: @escaping RCTPromiseRejectBlock) {
      bridge.uiManager.prependUIBlock({_ , viewRegistry in
          let view = viewRegistry?[reactTag]
          if !(view is DepthCameraView) {
            reject("ERROR_TAKE", "Invalid view returned from registry", nil)
          } else if let view = view as? DepthCameraView {
            view.takePicture(options: options, resolve: resolve, reject: reject)
          }
      })
    }

    @objc
    func supports(_ resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        if ARWorldTrackingConfiguration.supportsFrameSemantics(.sceneDepth) {
          resolve(true)
        } else {
          resolve(false)
        }
    }
}
