

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,


} from 'react-native';
import NavigatorUtil from '../utils/NavigatorUtil'
let {width, height} = Dimensions.get('window');

var imgSourceArr = [require('../../res/images/tabBarBack.png'),require('../../res/images/ic_code.png')];

export default class scrollviewTest extends Component {

    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            currentPage: 0
        }
    }

    // 返回页面指示器的圆点
    renderPageIndex(){
        // 数组
        let indicatorArr = [];
        //样式
        var style;
        //遍历
        for (var i = 0; i < imgSourceArr.length; i++){
            // 判断
            style = (i==this.state.currentPage) ? {color: 'orange'} : {color: 'lightgray'}
            //放入圆点
            indicatorArr.push(
                // 多个样式使用[]数组来放
                <Text key={i} style={[{fontSize:25}, style]}>•</Text>
            );
        }
        //返回
        return indicatorArr;
    }

    //返回所有的图片
    creatImages(){
 
        //数组
        let allImage = [];

        //遍历
        for (var i = 0; i < imgSourceArr.length; i++){
 
            //取出每一个单独的对象
            var imageItem = imgSourceArr[i];
 
            //创建组件放入数组
            allImage.push(
                <Image key={i} source={imageItem} style={styles.backgroundImage} />
            );
        }
 
        // 返回数组
        return allImage;
    }


    onMomentumScrollEnd(e){
        // 1.求出水平方向的偏移量
        var offsetX = e.nativeEvent.contentOffset.x;
        // 2.求出当前的页数         floor函数 取整
        var currentPage = Math.floor(offsetX / width);
        // console.log(currentPage)
        // 3.更新状态机
        this.setState({
            // 当前页
            currentPage: currentPage
        })

    }

    //以结束滚动的偏移量来判断是否往左继续滑动，如果继续滑动contentOffset不会发生变化，此处为一个屏幕宽度
    onScrollEndDrag(e){
        var offsetX = e.nativeEvent.contentOffset.x;
        console.log(offsetX)
        if(offsetX==width*(imgSourceArr.length-1)){
            NavigatorUtil.resetToHomePage({...this.props,theme:this.props.navigation.state.params.theme})
        }
    }


    render() {

        return (
            <View style={styles.container}>
                <ScrollView 
                    ref='scrollview'
                    style={{flex:1,backgroundColor:'white'}}
                    contentContainerStyle={{ width: width*2, height:height}}
                    bounces={false}
                    pagingEnabled={true}
                    scrollEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    horizontal={true}
                    onMomentumScrollEnd={(e)=>{this.onMomentumScrollEnd(e)}}
                    onScrollEndDrag={(e)=>{this.onScrollEndDrag(e)}}

                    
                
                >

                {this.creatImages()}

        
                </ScrollView>


                <TouchableOpacity 
                style={styles.overView}
                onPress={()=>{
                    NavigatorUtil.resetToHomePage({...this.props,theme:this.props.navigation.state.params.theme})
                }}>
                    <Text style={styles.text}>跳过</Text>
                </TouchableOpacity>
    

                <View style={styles.indicatorView}>
                    {this.renderPageIndex()}
                </View>
                
            </View>
            
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    text: {
        fontSize: 20,
    },
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    overView:{
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        right:30,
        top:30,
        height:40,
        width:60,
        backgroundColor:'green'
    },
    indicatorView:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        bottom:30,
        height:50,
        width:width,
        backgroundColor:'transparent'
    }

});