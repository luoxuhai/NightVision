#import <React/RCTBridge.h>
#import "React/RCTViewManager.h"

@interface RCT_EXTERN_REMAP_MODULE(DepthCameraView, DepthCameraViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(minDistance, float);
RCT_EXPORT_VIEW_PROPERTY(distanceRect, int);
RCT_EXPORT_VIEW_PROPERTY(colorMode, int);

RCT_EXPORT_VIEW_PROPERTY(onReady, RCTDirectEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onError, RCTDirectEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onMinDistance, RCTDirectEventBlock);

RCT_EXTERN_METHOD(supports:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)