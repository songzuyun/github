//
//  MyView.m
//  ReactNative_MyViewController
//
//  Created by 张晓珊 on 16/9/20.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "MyView.h"
#import <React/RCTBridgeModule.h>

@interface MyView ()

@property (nonatomic, strong) UIView *subView;

@property (nonatomic, strong) UIImageView *imgView;


@end


@implementation MyView

- (instancetype)init
{
  self = [super init];
  if (self) {
    
    _tapCount = 0;
    _subViewWidth = 100;
    _subViewHeight = 100;
    _size = @{@"subwidth":@(100),@"subheight":@(100)};
    
//    self.backgroundColor = [UIColor yellowColor];
  
  }
  return self;
}

//view的frame有js的style来控制，子视图在layoutSubviews方法里进行布局

- (void)layoutSubviews{
  
  
  //    _subView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, [_size[@"subwidth"] floatValue], [_size[@"subheight"] floatValue])];
  //    _subView.backgroundColor = [UIColor redColor];
  //    [self addSubview:_subView];
  
  
    _imgView = [[UIImageView alloc] initWithFrame:CGRectMake(0, 0, self.frame.size.width, self.frame.size.height)];
    [self addSubview:_imgView];

  NSString * url =[NSString stringWithFormat:@"%@",_item[@"url"]];

  UIImage * image = [UIImage imageWithData:[NSData dataWithContentsOfURL:[NSURL URLWithString:url]]];

  _imgView.image = image;
}




- (void)setSubViewWidth:(NSInteger)subViewWidth {
  
  _subViewWidth = subViewWidth;
  
  
}
- (void)setSubViewHeight:(NSInteger)subViewHeight
{
  _subViewHeight = subViewHeight;
  
}

-(void)setSize:(NSDictionary *)size
{
  _size = size;
  
}

- (void)setItem:(NSDictionary *)item{
  _item = item;
  
}

- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
  
    _tapCount++;
  
  //代理执行事件处理
  [self.delegate tapWithNum:_tapCount];
  

  
}

@end
