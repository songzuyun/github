//
//  UShare.m
//  song_RN
//
//  Created by 凯恩斯 on 2018/8/17.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "UShare.h"
#import <UMCommon/UMCommon.h>
#import <UShareUI/UShareUI.h>




@implementation UShare

RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue{
  return dispatch_get_main_queue();
}

//Promise回调

RCT_EXPORT_METHOD(share:(NSString *)title content:(NSString *)content imageUrl:(NSString*)imageUrl targetUrl:(NSString*)targetUrl resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)


{
  

  [UMSocialUIManager showShareMenuViewInWindowWithPlatformSelectionBlock:^(UMSocialPlatformType platformType, NSDictionary *userInfo) {
    
    //创建分享消息对象
    UMSocialMessageObject *messageObject = [UMSocialMessageObject messageObject];
    //创建网页内容对象
    NSString* thumbURL =  imageUrl;
    UMShareWebpageObject *shareObject = [UMShareWebpageObject shareObjectWithTitle:title descr:content thumImage:thumbURL];
    //设置网页地址
    shareObject.webpageUrl = targetUrl;
    
    //分享消息对象设置分享内容对象
    messageObject.shareObject = shareObject;
    
    //调用分享接口
    [[UMSocialManager defaultManager] shareToPlatform:platformType messageObject:messageObject currentViewController:nil completion:^(id data, NSError *error) {
      if (error) {
        UMSocialLogInfo(@"************Share fail with error %@*********",error);
        
        reject(@"fail",@"message is fail",nil);
        
      }else{
        if ([data isKindOfClass:[UMSocialShareResponse class]]) {
          UMSocialShareResponse *resp = data;
          //分享结果消息
          UMSocialLogInfo(@"response message is %@",resp.message);
          //第三方原始返回的数据
          UMSocialLogInfo(@"response originalResponse data is %@",resp.originalResponse);
          
          NSLog(@"message=%@",resp.message);
          NSLog(@"originalResponse data=%@",resp.originalResponse);
          
          
          resolve(@"分享成功");
          
          
        }else{
          UMSocialLogInfo(@"response data is %@",data);
        }
      }
      
    }];

  }];
  
  
  
  
}
//callback回调

//RCT_EXPORT_METHOD(share:(NSString *)title content:(NSString *)content imageUrl:(NSString*)imageUrl targetUrl:(NSString*)targetUrl successCallback:(RCTResponseSenderBlock)successCallback errorCallback:(RCTResponseSenderBlock)errorCallback )
//
//{
//
//
//  [UMSocialUIManager showShareMenuViewInWindowWithPlatformSelectionBlock:^(UMSocialPlatformType platformType, NSDictionary *userInfo) {
//
//    //创建分享消息对象
//    UMSocialMessageObject *messageObject = [UMSocialMessageObject messageObject];
//    //创建网页内容对象
//    NSString* thumbURL =  imageUrl;
//    UMShareWebpageObject *shareObject = [UMShareWebpageObject shareObjectWithTitle:title descr:content thumImage:thumbURL];
//    //设置网页地址
//    shareObject.webpageUrl = targetUrl;
//
//    //分享消息对象设置分享内容对象
//    messageObject.shareObject = shareObject;
//
//    //调用分享接口
//    [[UMSocialManager defaultManager] shareToPlatform:platformType messageObject:messageObject currentViewController:nil completion:^(id data, NSError *error) {
//      if (error) {
//        UMSocialLogInfo(@"************Share fail with error %@*********",error);
//
//        //        reject(@"fail",@"message is fail",nil);
//
//        errorCallback(@[error]);
//      }else{
//        if ([data isKindOfClass:[UMSocialShareResponse class]]) {
//          UMSocialShareResponse *resp = data;
//          //分享结果消息
//          UMSocialLogInfo(@"response message is %@",resp.message);
//          //第三方原始返回的数据
//          UMSocialLogInfo(@"response originalResponse data is %@",resp.originalResponse);
//
//          NSLog(@"message=%@",resp.message);
//          NSLog(@"originalResponse data=%@",resp.originalResponse);
//
//
//          //          resolve(@"分享成功");
//
//          successCallback(@[@"分享成功"]);
//
//        }else{
//          UMSocialLogInfo(@"response data is %@",data);
//        }
//      }
//
//    }];
//
//  }];
//
//
//
//
//}

RCT_EXPORT_METHOD(loginByWechat){
  [UMSocialUIManager showShareMenuViewInWindowWithPlatformSelectionBlock:^(UMSocialPlatformType platformType, NSDictionary *userInfo) {
    
    [self wechatLoginClick];
    
  }];
}


- (void)wechatLoginClick {
  
  [[UMSocialManager defaultManager] cancelAuthWithPlatform:UMSocialPlatformType_WechatSession completion:^(id result, NSError *error) {
    [self authForPlatform];
  }];
}


- (void)authForPlatform
{

    [[UMSocialManager defaultManager] authWithPlatform:UMSocialPlatformType_WechatSession currentViewController:nil completion:^(id result, NSError *error) {

      NSString *message = nil;
      
      if (error) {
        message = @"获取用户信息失败";
        UMSocialLogInfo(@"获取用户信息失败 %@",error);
      } else {
        
        if ([result isKindOfClass:[UMSocialAuthResponse class]]) {
          UMSocialAuthResponse * resp = result;
          
          UMSocialUserInfoResponse *userInfoResp = [[UMSocialUserInfoResponse alloc] init];
          userInfoResp.uid = resp.uid;
          userInfoResp.unionId = resp.unionId;
          userInfoResp.usid = resp.usid;
          userInfoResp.openid = resp.openid;
          userInfoResp.accessToken = resp.accessToken;
          userInfoResp.refreshToken = resp.refreshToken;
          userInfoResp.expiration = resp.expiration;
          
        }else{
          message = @"获取用户信息失败";
          UMSocialLogInfo(@"获取用户信息失败");
        }
      }

    }];
  }

@end
