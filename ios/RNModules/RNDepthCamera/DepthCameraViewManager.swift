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

    @objc
    func supports(_ resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        if ARWorldTrackingConfiguration.supportsFrameSemantics(.sceneDepth) {
          resolve(true)
        } else {
          resolve(false)
        }
    }
}
