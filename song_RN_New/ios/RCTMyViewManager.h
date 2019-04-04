//
//  RCTMyViewManager.h
//  ReactNative_MyViewController
//
//  Created by 张晓珊 on 16/9/20.
//  Copyright © 2016年 Facebook. All rights reserved.
//


#import <Foundation/Foundation.h>
#import <React/RCTViewManager.h>
#import "MyView.h"


@interface RCTMyViewManager : RCTViewManager<TapDelegate>

@property(nonatomic,strong)MyView * myview;

@end
