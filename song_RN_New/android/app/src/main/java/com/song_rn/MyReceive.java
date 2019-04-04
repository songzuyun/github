package com.song_rn;

/**
 * Created by songzuyun on 2018/9/21.
 */

import android.app.Activity;
import android.app.ActivityManager;
import android.app.Notification;
import android.content.BroadcastReceiver;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.support.annotation.Nullable;
import android.text.TextUtils;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Iterator;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Iterator;
import java.util.List;

import cn.jpush.android.api.JPushInterface;

/**
 * 自定义接收器
 *
 * 如果不定义这个 Receiver，则：
 * 1) 默认用户会打开主界面
 * 2) 接收不到自定义消息
 */
public class MyReceive extends BroadcastReceiver {

    private static final String TAG = "JIGUANG-Example";


    //定义上下文对象
    public static ReactContext myContext;

    public static String title = "";
    public static String message = "";
    public static String extraJson = "";

    private Handler handler = new Handler();


    @Override
    public  void onReceive(Context context, Intent intent) {
        try {
            Bundle bundle = intent.getExtras();

            //获取推送数据,根据实际定义来获取
            title = bundle.getString(JPushInterface.EXTRA_ALERT);
            message = bundle.getString(JPushInterface.EXTRA_MESSAGE);
            extraJson = bundle.getString(JPushInterface.EXTRA_EXTRA);


            if (JPushInterface.ACTION_REGISTRATION_ID.equals(intent.getAction())) {
                String regId = bundle.getString(JPushInterface.EXTRA_REGISTRATION_ID);
                Log.d(TAG, "[MyReceiver] 接收Registration Id : " + regId);
                //send the Registration Id to your server...

            } else if (JPushInterface.ACTION_MESSAGE_RECEIVED.equals(intent.getAction())) {
                Log.d(TAG, "[MyReceiver] 接收到推送下来的自定义消息: " + bundle.getString(JPushInterface.EXTRA_MESSAGE));

            } else if (JPushInterface.ACTION_NOTIFICATION_RECEIVED.equals(intent.getAction())) {
                Log.d(TAG, "[MyReceiver] 接收到推送下来的通知");
                int notifactionId = bundle.getInt(JPushInterface.EXTRA_NOTIFICATION_ID);
                Log.d(TAG, "[MyReceiver] 接收到推送下来的通知的ID: " + notifactionId);


            } else if (JPushInterface.ACTION_NOTIFICATION_OPENED.equals(intent.getAction())) {
                Log.d(TAG, "[MyReceiver] 用户点击打开了通知");
                if(isAppRunning(context)){
                    // Toast.makeText(context,"没有添加值", Toast.LENGTH_SHORT).show();
                    //Log.d(TAG, "onReceive: 没有添加值");
                    Intent newIntent = new Intent(context, MainActivity.class);
                    newIntent.addCategory(Intent.CATEGORY_LAUNCHER);
                    newIntent.setAction(Intent.ACTION_MAIN);
                    newIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK );//必须要new一个task，因为是在BroadcastReciever的上下文中
                    context.startActivity(newIntent);
                    sendEventToReact(title);

                }else {

                    //两种方式：
                    //1.直接在此进行延时操作
                    //2.通过newIntent put一个参数给mainActivety再进行延时操作

                    //Toast.makeText(context,"添加值", Toast.LENGTH_SHORT).show();
                    //Log.d(TAG, "onReceive: 添加值");
                    Intent newIntent = new Intent(context, MainActivity.class);
                    newIntent.addCategory(Intent.CATEGORY_LAUNCHER);
                    newIntent.setAction(Intent.ACTION_MAIN);
                    newIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK );//必须要new一个task，因为是在BroadcastReciever的上下文中
                    newIntent.putExtra("JPush",true);//添加一个参数，在MainActivity截图获取
                    context.startActivity(newIntent);

                    //延时3秒再进行发送事件给js，因为myContext在此时还没有完成初始化赋值
                    new Thread(new Runnable() {
                        @Override
                        public void run() {
                            try {
                                Thread.sleep(3000);
                                handler.post(new Runnable() {
                                    @Override
                                    public void run() {
                                        if (MyReceive.myContext == null)
                                            return;
                                        MyReceive.myContext
                                                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                                                .emit("EventReminderAndroid",null);
                                    }
                                });
                            } catch (InterruptedException e) {
                                e.printStackTrace();
                            }
                        }
                    }).start();


                }

            } else if (JPushInterface.ACTION_RICHPUSH_CALLBACK.equals(intent.getAction())) {
                Log.d(TAG, "[MyReceiver] 用户收到到RICH PUSH CALLBACK: " + bundle.getString(JPushInterface.EXTRA_EXTRA));
                //在这里根据 JPushInterface.EXTRA_EXTRA 的内容处理代码，比如打开新的Activity， 打开一个网页等..

            } else if(JPushInterface.ACTION_CONNECTION_CHANGE.equals(intent.getAction())) {
                boolean connected = intent.getBooleanExtra(JPushInterface.EXTRA_CONNECTION_CHANGE, false);
                Log.w(TAG, "[MyReceiver]" + intent.getAction() +" connected state change to "+connected);
            } else {
                Log.d(TAG, "[MyReceiver] Unhandled intent - " + intent.getAction());
            }
        } catch (Exception e){

        }

    }



    public  void sendEventToReact(String content) {
        WritableMap params = Arguments.createMap();
        params.putString("content", content);
        sendEvent(myContext, "EventReminderAndroid", params);
    }


    //定义发送事件的函数
    public  void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params)
    {
        System.out.println("reactContext="+reactContext);

        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName,params);
    }


    private boolean isAppRunning(Context context) {
        String packageName = context.getPackageName();
        String topActivityClassName = getTopActivityName(context);
        return packageName != null && topActivityClassName != null && topActivityClassName.startsWith(packageName);
    }

    public String getTopActivityName(Context context) {
        String topActivityClassName = null;
        ActivityManager activityManager =
                (ActivityManager) (context.getSystemService(Context.ACTIVITY_SERVICE));
        List<ActivityManager.RunningTaskInfo> runningTaskInfos = activityManager.getRunningTasks(1);
        if (runningTaskInfos != null) {
            ComponentName f = runningTaskInfos.get(0).topActivity;
            topActivityClassName = f.getClassName();
        }
        return topActivityClassName;
    }


    /**
     * 判断进程是否存活
     *
     * @param context
     * @param proessName
     * @return
     */
    public static boolean isProessRunning(Context context, String proessName) {

        ActivityManager am = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        List<ActivityManager.RunningAppProcessInfo> lists = am.getRunningAppProcesses();

        for (ActivityManager.RunningAppProcessInfo info : lists) {
            if (info.processName.equals(proessName)) {
                return true;
            }
        }
        return false;
    }


}
