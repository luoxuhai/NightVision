#import <React/RCTBridge.h>
#import "React/RCTViewManager.h"

@interface RCT_EXTERN_REMAP_MODULE(DepthCameraView, DepthCameraViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(detectionWidthScale, float);
RCT_EXPORT_VIEW_PROPERTY(colorMode, int);
RCT_EXPORT_VIEW_PROPERTY(minDistanceDetection, BOOL);
RCT_EXPORT_VIEW_PROPERTY(smoothed, BOOL);
RCT_EXPORT_VIEW_PROPERTY(enabled, BOOL);

RCT_EXPORT_VIEW_PROPERTY(onReady, RCTDirectEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onPause, RCTDirectEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onError, RCTDirectEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onMinDistance, RCTDirectEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onCameraSize, RCTDirectEventBlock);

RCT_EXTERN_METHOD(supports:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(takePicture:(nonnull NSNumber *)node
                  options:(NSDictionary *)options
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end

