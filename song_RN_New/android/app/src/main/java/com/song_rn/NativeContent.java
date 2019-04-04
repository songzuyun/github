package com.song_rn;

import android.content.Intent;
import android.support.annotation.Nullable;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import org.greenrobot.eventbus.EventBus;
import org.greenrobot.eventbus.Subscribe;

/**
 * Created by songzuyun on 2018/9/6.
 */






public  class  NativeContent extends ReactContextBaseJavaModule {


    public NativeContent(ReactApplicationContext reactContext) {
        super(reactContext);

        //初始化赋值
        MyReceive.myContext = reactContext;

//        Log.d("NativeContent", "NativeContent: ");
//
//        Intent intent=new Intent("com.song_rn.MYBROADCAST");
//        intent.putExtra("content","我是广播");
//        reactContext.sendBroadcast(intent);

    }
    @Override
    public String getName() {
        return "NativeContent";
    }
//callback

//    @ReactMethod
//    public void nativeStringToReact(String content, String otherContent,  Callback successCallback,Callback errorCallback) {
//
//        successCallback.invoke("i am android native");
//
//    }

//    promise

    @ReactMethod
    public void nativeStringToReact(String content, String otherContent,  Promise promise) {

        if(content == null || content.equals("")){
            promise.reject("fail");
        }else {
            promise.resolve(content);
        }


    }


    @ReactMethod
    public void sendEventToReact(String content) {
        WritableMap params = Arguments.createMap();
        params.putString("content", content);
        sendEvent(getReactApplicationContext(), "EventReminderAndroid", params);
    }
    //发送事件给js
    private  void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    @Override
    public void onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy();
        //EventBus.getDefault().unregister(this);
    }
}
