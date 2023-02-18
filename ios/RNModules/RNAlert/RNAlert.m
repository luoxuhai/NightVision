#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RNAlert, NSObject)

RCT_EXTERN_METHOD(show:(NSDictionary *)options)

RCT_EXTERN_METHOD(dismissAll)

@end
