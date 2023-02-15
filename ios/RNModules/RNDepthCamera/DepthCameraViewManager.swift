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
  
    @objc(takePicture:options:resolver:rejecter:)
    func takePicture(_ node: NSNumber, options: NSDictionary, resolve: @escaping RCTPromiseResolveBlock,reject: @escaping RCTPromiseRejectBlock) {
        let component = bridge.uiManager.view(forReactTag: node) as! DepthCameraView
        component.takePicture(options: options, resolve: resolve, reject: reject)
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
