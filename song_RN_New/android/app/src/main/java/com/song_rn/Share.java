package com.song_rn;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import cn.sharesdk.onekeyshare.OnekeyShare;

import static android.provider.Settings.Global.getString;


/**
 * Created by songzuyun on 2018/9/6.
 */

public class Share extends ReactContextBaseJavaModule {

    public Share(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    @Override
    public String getName() {
        return "UShare";
    }


    @ReactMethod
    private void share(String title, String content, String imageUrl, String targetUrl , Promise promise) {

//        if(title == null || title.equals("")){
//            promise.reject("fail");
//        }else {
//            promise.resolve(title);
//        }

        OnekeyShare oks = new OnekeyShare();
        //关闭sso授权
        oks.disableSSOWhenAuthorize();

        // title标题，微信、QQ和QQ空间等平台使用
        oks.setTitle(title);
        // titleUrl QQ和QQ空间跳转链接
        oks.setTitleUrl("http://sharesdk.cn");
        // text是分享文本，所有平台都需要这个字段
        oks.setText("我是分享文本");
        // imagePath是图片的本地路径，Linked-In以外的平台都支持此参数
        oks.setImagePath("/sdcard/test.jpg");//确保SDcard下面存在此张图片
        // url在微信、微博，Facebook等平台中使用
        oks.setUrl("http://sharesdk.cn");
        // comment是我对这条分享的评论，仅在人人网使用
//        oks.setComment("我是测试评论文本");
        // 启动分享GUI
        oks.show(getReactApplicationContext());
    }


}
