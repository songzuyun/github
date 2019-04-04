//
//  MyView.h
//  ReactNative_MyViewController
//
//  Created by 张晓珊 on 16/9/20.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <React/RCTComponent.h>

//mamager作为代理来处理view的相关事件业务代码，保持view的纯净
@protocol TapDelegate <NSObject>

- (void)tapWithNum:(NSInteger)tapCount;

@end

@interface MyView : UIView

/// 提供给JS使用的属性
@property (nonatomic, assign) NSInteger subViewWidth;
@property (nonatomic, assign) NSInteger subViewHeight;
@property (nonatomic, strong) NSDictionary * size;

@property (nonatomic, strong) NSDictionary * item;

@property (nonatomic, weak) id <TapDelegate> delegate;

//导出给js的事件，让js能获取相关信息来进行其他操作,比如日期选择后结果给到js进行展示
@property (nonatomic, copy) RCTBubblingEventBlock onSingleTap;


@property(nonatomic,assign) NSInteger tapCount;


@end
