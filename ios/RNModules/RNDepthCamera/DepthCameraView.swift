import Foundation
import ARKit
import UIKit

class DepthCameraView: UIView {
    @objc var distanceRect: CGSize?
    @objc var minDistance: NSNumber?
    @objc var colorMode: NSNumber?

    @objc var onReady: RCTDirectEventBlock?
    @objc var onError: RCTDirectEventBlock?
    @objc var onMinDistance: RCTDirectEventBlock?

    internal let depthDataProvider = DepthDataProvider()

    override public init(frame: CGRect) {
      super.init(frame: frame)
    }

    override public final func didSetProps(_ changedProps: [String]!) {
      if changedProps.contains("minDistance") {
        self.depthDataProvider.minDistance = self.minDistance;
      }

      if changedProps.contains("distanceRect") {
        self.depthDataProvider.distanceRect = self.distanceRect;
      }

      // if changedProps.contains("colorMode") {
      //   self.depthDataProvider.distanceRect = self.distanceRect;
      // }
    }
}