

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ScrollView,
    Dimensions,
    Button,
    RefreshControl



} from 'react-native';
import NavigationBar from '../common/NavigationBar'

export default class scrollviewTest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: '',
        }
    }


    onScroll(e){
        console.log(e);
        console.log(e.nativeEvent.contentOffset.x);//水平滚动距离
       console.log(e.nativeEvent.contentOffset.y);//垂直滚动距离 
    }


    render() {

        var navi =                
            <NavigationBar
                title={'scrollviewTest'}
                titleColor={{
                    color: 'white'
                }}
                style={{
                    backgroundColor: 'red'
                }}
                statusBar={{
                    backgroundColor: 'red',
                    barStyle: 'light-content',
                    hide: false,
                }}
             />


        return (
            <View style={styles.container}>
                {navi}

                <TextInput
                    style={{width:100,height:50}}
                    placeholder='请输入。。。'
                />
                <TextInput
                    style={{width:100,height:50}}
                    placeholder='请输入。。。'
                />


                <ScrollView 
                    ref='scrollview'
                    style={{width:Dimensions.get('window').width,height:300,backgroundColor:'green'}}
                    contentContainerStyle={{ width: Dimensions.get('window').width*2, height: 300,paddingVertical: 20}}
                    bounces={false}
                    pagingEnabled={true}
                    scrollEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    horizontal={true}
                    onScroll={(e) => this.onScroll(e)}
                    onScrollBeginDrag={()=>{}}
                    onScrollEndDrag={()=>{}}
                    onMomentumScrollBegin={()=>{}}//开始动画
                    nMomentumScrollEnd={()=>{}}//动画结束
                    keyboardDismissMode={'on-drag'}//用户拖拽滚动视图的时候，是否要隐藏软键盘。'none' （默认值），拖拽时不隐藏软键盘。'on-drag'，当拖拽开始的时候隐藏软键盘。               
                    keyboardShouldPersistTaps={'handled'}//如果当前界面有软键盘，那么点击scrollview后是否收起键盘,'never' （默认值），点击TextInput以外的子组件会使当前的软键盘收起,'handled'，当点击事件被子组件捕获时，键盘不会自动收起。这样切换TextInput时键盘可以保持状态
                    refreshControl={
                        <RefreshControl
                            title={'Loading'}
                            titleColor={'red'}
                            colors={['red']}
                            tintColor={'red'}
                            refreshing={this.state.isLoading}
                            onRefresh={()=>{
                            }}
                        />}
                 

                
                >

                <Image style={styles.backgroundImage} source={require('../../res/images/tabBarBack.png')} />
                <Image style={styles.backgroundImage} source={require('../../res/images/ic_code.png')}/>


                </ScrollView>

                <Button
                    title='滚动'
                    onPress={()=>{
                        // this.refs.scrollview.scrollToEnd()
                        this.refs.scrollview.scrollTo({x: 50, y: 0, animated: true})
                    }}
                />
                
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
      }

});