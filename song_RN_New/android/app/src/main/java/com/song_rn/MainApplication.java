package com.song_rn;

import android.app.Application;
import android.support.annotation.Nullable;
import android.util.Log;
import android.view.ViewManager;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.microsoft.codepush.react.CodePush;
import com.mob.MobSDK;


import org.devio.rn.splashscreen.SplashScreenReactPackage;

import java.util.Arrays;
import java.util.List;
import java.util.Set;

import cn.jpush.android.api.JPushInterface;
import cn.jpush.android.api.TagAliasCallback;

public class MainApplication extends Application implements ReactApplication {

public static ReactApplicationContext reactApplicationContext;
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
        return CodePush.getJSBundleFile();
        }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new SplashScreenReactPackage(),
          new CodePush(BuildConfig.CODEPUSH_KEY, MainApplication.this, BuildConfig.DEBUG),
          new NativeContentPackage(),
          new SharePackage(),
          new MyCustomViewManagerPackage()
      );
    }


    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);

    MobSDK.init(this);

    JPushInterface.setDebugMode(true);
    JPushInterface.init(this);


    /**
     * 设置别名
     */
    JPushInterface.setAlias(this, //上下文对象
            "123456789", //别名
            new TagAliasCallback() {//回调接口,i=0表示成功,其它设置失败
              @Override
              public void gotResult(int i, String s, Set<String> set) {
                Log.d("alias", "set alias result is" + i);
              }
            });

  }
}
