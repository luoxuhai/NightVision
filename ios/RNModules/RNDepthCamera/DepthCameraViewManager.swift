import React
import Foundation

@objc(DepthCameraManager)
class DepthCameraManager: RCTViewManager {
    override static func requiresMainQueueSetup() -> Bool {
      return true
    }

    override func view() -> UIView {
        return RNDepthCameraView()
    }

    override var methodQueue: DispatchQueue! {
      return DispatchQueue.main
    }

    override func constantsToExport() -> [AnyHashable : Any]? {
        return ["MinDistanceEvent": MinDistanceEvent]
    }

    @objc
    func supports(_ resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        if ARWorldTrackingConfiguration.supportsFrameSemantics(.sceneDepth) {
          resolve("")
        } else {
          reject()
        }
    }
}