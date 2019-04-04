//
//  TextFContent.m
//  song_RN
//
//  Created by 凯恩斯 on 2018/8/15.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "NativeContent.h"

@implementation NativeContent

RCT_EXPORT_MODULE();

//Promise回调
RCT_EXPORT_METHOD(nativeStringToReact:(NSString *) content andOtherContent:(NSString *)otherContent resolver:(RCTPromiseResolveBlock)resolve
                                    rejecter:(RCTPromiseRejectBlock)reject){

  if (content && otherContent) {
    resolve([NSString stringWithFormat:@"%@%@",content,otherContent]);

  }else{
    reject(@"fail",@"message is fail",nil);

  }
  
}

RCT_EXPORT_METHOD(getVersionInfoFromNative:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject){

  NSDictionary *infoDictionary = [[NSBundle mainBundle] infoDictionary];
  NSString *app_Version = [infoDictionary objectForKey:@"CFBundleShortVersionString"];
  resolve(app_Version);
  
  
}

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"EventReminderIos"];//有几个就写几个
}


RCT_EXPORT_METHOD(sendEventToReact:(NSString *) content) {

  [self sendEventWithName:@"EventReminderIos" body:@{@"content": content}];
}

-(void)sendEventToReact{
  [self sendEventWithName:@"EventReminderIos" body:@{@"content": @"dddddddddddddddd"}];
}


- (void)startObserving
{
  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(emitEventInternal:)
                                               name:@"event-emitted"
                                             object:nil];
}
- (void)stopObserving
{
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (void)emitEventInternal:(NSNotification *)notification
{
  if (self.bridge) {//此判断非常重要，如果bridge没有建立，会闪退
    [self sendEventWithName:@"EventReminderIos" body:@{@"content": @"dddddddddddddddd"}];
  }
  
}

+ (void)emitEventWithName:(NSString *)name andPayload:(NSDictionary *)payload
{
  [[NSNotificationCenter defaultCenter] postNotificationName:@"event-emitted"
                                                      object:self
                                                    userInfo:payload];
}



  //callback回调
  
//  RCT_EXPORT_METHOD(nativeStringToReact:(NSString *) content andOtherContent:(NSString *)otherContent successCallback:(RCTResponseSenderBlock)successCallback errorCallback:(RCTResponseSenderBlock)errorCallback){
//
//    if (content && otherContent) {
//      //    resolve([NSString stringWithFormat:@"%@%@",content,otherContent]);
//
//      successCallback(@[[NSString stringWithFormat:@"%@%@",content,otherContent]]);
//    }else{
//      //    reject(@"fail",@"message is fail",nil);
//      errorCallback(@[@"message is fail"]);
//    }
//
//
//  }

@end
