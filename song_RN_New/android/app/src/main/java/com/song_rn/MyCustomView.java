package com.song_rn;

import android.app.Activity;
import android.app.Application;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.net.Uri;
import android.os.Environment;
import android.support.annotation.Nullable;
import android.util.AttributeSet;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.facebook.drawee.backends.pipeline.PipelineDraweeControllerBuilder;
import com.facebook.drawee.view.SimpleDraweeView;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.youth.banner.Banner;
import com.youth.banner.BannerConfig;
import com.youth.banner.Transformer;
import com.youth.banner.listener.OnBannerListener;
import com.youth.banner.loader.ImageLoader;
import com.youth.banner.loader.ImageLoaderInterface;

import org.w3c.dom.Text;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;


/**
 * Created by songzuyun on 2019/3/14.
 */

public class MyCustomView extends LinearLayout {

    static public  String url;
    static public ReadableMap position;
    static public ReadableMap item;


    private  Button btn;
    private View myView;

    private Banner banner;
    private ArrayList<String> list_path;
    private ArrayList<String> list_title;

    public MyCustomView(Context context) {
        this(context,null);
    }

    public MyCustomView(Context context, @Nullable AttributeSet attrs) {
        this(context, attrs,0);
    }

    public MyCustomView(final Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        LayoutInflater.from(context).inflate(R.layout.mycustomview,this);
        myView = findViewById(R.id.my_view);
        btn  = findViewById(R.id.my_btn);

        btn.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View view) {

                onSingleClick();
            }
        });

        myView.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View view) {

                onDoubleClick();
            }
        });


    }



//    根据js position 参数调整子视图
    public void updatePosition(ReadableMap position){
        myView.setBackgroundColor(Color.parseColor("#6495ED"));
        LinearLayout.LayoutParams params = (LinearLayout.LayoutParams) myView.getLayoutParams();
        params.height = 40;
        params.width = 40;
        myView.setLayoutParams(params);


    }
//    根据item信息进行图片加载等操作
    @Override
    protected void onLayout(boolean changed, int l, int t, int r, int b) {
        super.onLayout(changed, l, t, r, b);

        Log.i("url", url);
        Log.i("item", String.valueOf(item));


        //代码添加控件
//        TextView textView=new TextView(context);
//        textView.setText("你大爷");
//        textView.setBackgroundColor(Color.BLACK);
//        li.addView(textView);

//        myView.layout(20,100,20,20);

//        this.setBackgroundColor(Color.parseColor("#6495ED"));


//        View myView = findViewById(R.id.my_view);
//        myView.setBackgroundColor(Color.parseColor("#6495ED"));
//
//        LinearLayout.LayoutParams params = (LayoutParams) myView.getLayoutParams();
//        params.height = 100;
//        params.width = 100;
//        myView.setLayoutParams(params);

//        DisplayMetrics dm = getResources().getDisplayMetrics();
//        int  width = dm.widthPixels;
//        int height = dm.heightPixels;

//        int  width = 200;
//        ImageView imageView=(ImageView)findViewById(R.id.img);//获取当前控件的对象
//        LinearLayout.LayoutParams params= (LinearLayout.LayoutParams) imageView.getLayoutParams();
////获取当前控件的布局对象
//        params.height=width/5;//设置当前控件布局的高度
//        imageView.setLayoutParams(params);//将设置好的布局参数应用到控件中
//
////        加载网络图片
//        Glide.with(this.getContext()).load(url).into(imageView);

//        从文件加载图片
//        File file = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES),"Test.jpg");
//        Glide.with(context).load(file).into(imageViewFile);

//        调整图片大小.resize(int ,int )
//        Glide.with(context).load(image).override(600, 200) .into(imageViewResize);

//        设置默认占位图.placeholder()
//        设置加载失败的图片.error()
//        Glide.with( context ).load( gifUrl ).placeholder( R.drawable.cupcake ).error( R.drawable.full_cake ).into( imageViewGif );

    }

    public void initBannerView(ReadableArray list) {

        Log.i("list", String.valueOf(list));

        banner = (Banner) findViewById(R.id.banner);
        //放图片地址的集合
        list_path = new ArrayList<>();
        //放标题的集合
        list_title = new ArrayList<>();

        list_path.add("http://f.hiphotos.baidu.com/image/h%3D300/sign=7e685ef2f903918fc8d13bca613d264b/b3119313b07eca80787730f59f2397dda14483b5.jpg");
        list_path.add("http://ww4.sinaimg.cn/large/006uZZy8jw1faic259ohaj30ci08c74r.jpg");
        list_path.add("http://ww4.sinaimg.cn/large/006uZZy8jw1faic2b16zuj30ci08cwf4.jpg");
        list_path.add("http://ww4.sinaimg.cn/large/006uZZy8jw1faic2e7vsaj30ci08cglz.jpg");


        //设置图片加载器
        banner.setImageLoader(new GlideImageLoader());
        //设置图片集合
        banner.setImages(list_path);
        banner.setOnBannerListener(new OnBannerListener() {
            @Override
            public void OnBannerClick(int position) {
                Log.i("position","position:"+position);
            }
        });
        //banner设置方法全部调用完毕时最后调用
        banner.start();


    }



    public class GlideImageLoader extends ImageLoader {
        @Override
        public void displayImage(Context context, Object path, ImageView imageView) {
            Glide.with(context).load(path).into(imageView);

        }

    }


    protected void onSingleClick() {

        WritableMap event = Arguments.createMap();

        event.putString("msg","点击了button");// key用于在RN中获取传递的数据

        ReactContext reactContext = (ReactContext)getContext();

        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(

                getId(), "onSingleClick", event);

    }

    protected void onDoubleClick() {

        WritableMap event = Arguments.createMap();

        event.putString("msg","点击了view");// key用于在RN中获取传递的数据

        ReactContext reactContext = (ReactContext)getContext();

        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(

                getId(), "onDoubleClick", event);

    }


}


