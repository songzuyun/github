package com.song_rn;

import android.annotation.SuppressLint;
import android.app.AlertDialog;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.provider.SyncStateContract;
import android.support.annotation.Nullable;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.microsoft.codepush.react.CodePush;

import org.devio.rn.splashscreen.SplashScreen;
import org.devio.rn.splashscreen.SplashScreenReactPackage;

import java.util.HashMap;
import java.util.Set;

import cn.jpush.android.api.JPushInterface;
import cn.jpush.android.api.TagAliasCallback;


public class MainActivity extends ReactActivity {

    private Button clickbutton;

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "song_RN";
    }

//    //判断是否是由推送而来
//    private boolean flag;
//    private String TAG = "JIGUANG-Example";
//    private Handler handler = new Handler();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(MainActivity.this, true);//传入true才是全屏
        super.onCreate(savedInstanceState);

//        Intent intent = getIntent();
//        if (intent.getBooleanExtra("JPush", false)) {
//            flag = intent.getBooleanExtra("JPush", false);
//            Log.d(TAG, "onCreate:  +" + flag);
//            Toast.makeText(this, "" + flag, Toast.LENGTH_SHORT).show();
//        } else {
//            Toast.makeText(this, "" + flag, Toast.LENGTH_SHORT).show();
//        }
//        if (flag) {
//
//            new Thread(new Runnable() {
//                @Override
//                public void run() {
//                    try {
//                        Thread.sleep(3000);
//                        handler.post(new Runnable() {
//                            @Override
//                            public void run() {
//                                if (MyReceive.myContext == null)
//                                return;
//                                MyReceive.myContext
//                                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
//                                    .emit("EventReminderAndroid",null);
//                            }
//                        });
//                    } catch (InterruptedException e) {
//                        e.printStackTrace();
//                    }
//                }
//            }).start();
//
//        }




//        //设置为ContentView
//        setContentView(R.layout.main_activity);
//        clickbutton = findViewById(R.id.button);
//
//        clickbutton.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//
//                Toast.makeText(MainActivity.this,"ddddd", 3).show();
//
//            }
//        });





    }


//    /**
//     * 定义一个BroadcastReceiver内部类
//     */
//    public static class MyBroadcastReceive extends BroadcastReceiver {
//
//        @Override
//        public void onReceive(Context context, Intent intent) {
//
//            Bundle bundle = intent.getExtras();
//
//            String content = bundle.getString("content");
//
//            if (content !=null&&content.equals("我是广播") ){
//
//                if (MyReceive.myContext == null)
//                    return;
//                MyReceive.myContext
//                        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
//                        .emit("EventReminderAndroid",null);
//            }
//        }
//    }


}
