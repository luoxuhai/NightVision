#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RNConfetti, NSObject)

RCT_EXTERN_METHOD(start:(NSDictionary *)options)

RCT_EXTERN_METHOD(stop)

@end
