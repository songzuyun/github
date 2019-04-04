//
//  TextFContent.h
//  song_RN
//
//  Created by 凯恩斯 on 2018/8/15.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
@interface NativeContent : RCTEventEmitter<RCTBridgeModule>

-(void)sendEventToReact;

- (void)startObserving;

- (void)stopObserving;

+ (void)emitEventWithName:(NSString *)name andPayload:(NSDictionary *)payload;

@end
