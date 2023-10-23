//
//  ImageManager.m
//  AvatarCropExample
//
//  Created by Дмитрий on 23.10.2023.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(ImageManager, NSObject)
RCT_EXTERN_METHOD(saveImage:(NSString *)url
                  x:(nonnull NSNumber *)x
                  y:(nonnull NSNumber *)y
                  width:(nonnull NSNumber *)width
                  height:(nonnull NSNumber *)height
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
@end
