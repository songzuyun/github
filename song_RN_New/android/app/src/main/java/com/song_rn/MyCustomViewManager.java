package com.song_rn;

import android.support.annotation.Nullable;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;

import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewProps;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.facebook.react.views.image.GlobalImageLoadListener;
import com.facebook.react.views.image.ImageResizeMode;
import com.facebook.react.views.image.ReactImageView;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by songzuyun on 2019/3/14.
 */

public class MyCustomViewManager  extends SimpleViewManager<MyCustomView> {

    public static final String REACT_CLASS = "MyCustomView";
    private MyCustomView view;
    private ThemedReactContext mContext;


    public MyCustomViewManager() {

    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }


    @Override
    protected MyCustomView createViewInstance(ThemedReactContext reactContext) {
        view=new MyCustomView(reactContext);
        return  view;
    }


    /**
     * 自定义事件 --让react能识别此事件方法,事件发送在view里发送，否则子控件发送事件失败（原因不明）,可注册多个事件
     * @return
     */
    @Nullable
    @Override
    public Map getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.builder()
                .put("onSingleClick", MapBuilder.of("registrationName", "onSingleClick"))
                .put("onDoubleClick",MapBuilder.of("registrationName","onDoubleClick"))
                .build();

    }




    @ReactProp(name = "url")
    public void setUrl(MyCustomView view, String url) {

        Log.i("url",url);

        MyCustomView.url=url;
    }

    @ReactProp(name = "item")
    public void setItem(MyCustomView view, ReadableMap item) {

        Log.i("item", String.valueOf(item));

        MyCustomView.item = item;
    }

    @ReactProp(name = "myList")
    public void setMyList(MyCustomView view,ReadableArray myList){

        Log.i("myList", String.valueOf(myList));

        view.initBannerView(myList);
    }
    //导出子视图布局信息，在js可进行自定义设置，在此方法里调用updatePosition,在onLayout方法里进行加载图片等操作
    @ReactProp(name="positionInfo")
    public void setPositionInfo(MyCustomView view,ReadableMap positionInfo){

//        view.updatePosition(positionInfo);


    }
}
