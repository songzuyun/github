//
//  RCTMyViewManager.m
//  ReactNative_MyViewController
//
//  Created by 张晓珊 on 16/9/20.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "RCTMyViewManager.h"
#import "MyView.h"
#import <React/RCTUIManager.h>
#import <React/RCTComponent.h>


@implementation RCTMyViewManager

RCT_EXPORT_MODULE()
RCT_EXPORT_VIEW_PROPERTY(subViewWidth, NSInteger)//导出给js的属性
RCT_EXPORT_VIEW_PROPERTY(subViewHeight, NSInteger)//导出给js的属性
RCT_EXPORT_VIEW_PROPERTY(size, NSDictionary)//导出给js的属性
RCT_EXPORT_VIEW_PROPERTY(item, NSDictionary)//导出给js的属性

RCT_EXPORT_VIEW_PROPERTY(onSingleTap, RCTBubblingEventBlock)//导出给js的事件，让js能获取相关信息y来进行其他操作



/// 重写这个方法，返回将要提供给RN使用的视图
// 请不要在-view中给UIView实例设置frame或是backgroundColor属性。为了和 JavaScript 端的布局属性一致，React Native 会覆盖你所设置的值。 如果您需要这种粒度的操作的话，比较好的方法是用另一个UIView来封装你想操作的UIView实例，并返回外层的UIView。
- (UIView *)view {
  MyView * myview = [[MyView alloc] init];
  myview.delegate = self;
  self.myview = myview;
  return myview;
  
}
#pragma mark - tapdelegate
- (void)tapWithNum:(NSInteger)tapCount{
  self.myview.onSingleTap(@{@"num":@(tapCount)});//发送这个事件给js，附带参数
}



@end
