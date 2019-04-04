

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
    Button,



} from 'react-native';
import NavigationBar from '../common/NavigationBar'

import AttributedText from '../utils/AttributedText'
import MyView from '../native/MyView'
import MyCustomView from '../native/MyCustomView'


export default class testComponentPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: '',
            width:0,
            height:0,
        }
    }

    componentWillMount(){
        // Image.getSize('http://192.168.1.76:8080/newlife/crm/download/IGgF2CC3eam2tXmb5ezfGw==.action?contentType=img&fmtmc=timg.jpg',(width,height) => {
        //                 //width 图片的宽度
        //                 //height 图片的高度
        //                 // alert(width+"   "+height);
        //                 this.setState({
        //                     width:width,
        //                     height:height
        //                 })
        //                 })
    }
    // ios
    onSingleTap(e){
        alert(e.nativeEvent.num)
    }

    // android
    onSingleClick(e){

        console.log(e)
        alert('原生层传递的数据为:'+e.nativeEvent.msg)


    }

    onDoubleClick(e){
        console.log(e)
        alert('原生层传递的数据为:'+e.nativeEvent.msg)
    }

    render() {

        var navi =                
            <NavigationBar
                title={'testComponent'}
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

            <View style={{backgroundColor:'gray'}}>

                {/* <MyView 
                    style={{height:200,backgroundColor:'red'}} 
                    subViewWidth={200} 
                    subViewHeight={200} 
                    size={{'subwidth':250,'subheight':250}}
                    item={{'url':'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552555048776&di=bc8c457cc15e5df65afc637f99c1edc0&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fvideo%2Fcf%2Fcff97285a56736d2f30dc64b6c02f88a.jpg'}}
                    onSingleTap={(e)=>{this.onSingleTap(e)}}
                /> */}
            
            <MyCustomView
                style={{height:200}}
                url={'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552968155015&di=03e88b49b1309c7556aa8411046564d4&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fb3119313b07eca80787730f59f2397dda14483b5.jpg'}
                item={{'name':'xiaoming','url':'https://www.baidu.com'}}
                myList={[1,2,3]}
                positionInfo={{'width':200,'height':350}}
                onSingleClick={ (e)=> this.onSingleClick(e) }
                onDoubleClick={ (e)=> this.onDoubleClick(e) }
            />




            </View>



   

            




            
            // <TouchableWithoutFeedback
            
            //     onPress={()=>{
            //         this.refs.input.blur();
            //         this.refs.input2.blur();
            //     }}
            
            // >
                
            //     <View style={styles.container}>
            //         {navi}

            //         <TextInput
            //             ref="input"
            //             style={{height:50,width:100}}
            //             onChangeText={(text)=>{this.setState({data:text})}}
            //             placeholder={'请输入'}
            //         >

            //         </TextInput>


            //         <TextInput
            //             ref="input2"
            //             style={{height:50,width:100}}
            //             onChangeText={(text)=>{this.setState({data:text})}}
            //             placeholder={'请输入'}
            //         >

            //         </TextInput>



            //     <Text>{this.state.data}</Text>

            //     <Image
            //         style={{width:200,height:200*this.state.width/this.state.height}}
            //         source={{uri:'http://192.168.1.76:8080/newlife/crm/download/IGgF2CC3eam2tXmb5ezfGw==.action?contentType=img&fmtmc=timg.jpg'}}
            //     />
            //     <Image
            //         style={{width:100,height:100}}
            //         source={require('../../res/images/tabBarBack.png')}
            //     />


            //     <Button
            //         title='获取图片宽高'
            //         onPress={()=>{
            //             //获取网络图片高宽
            //             // Image.getSize('http://192.168.1.76:8080/newlife/crm/download/IGgF2CC3eam2tXmb5ezfGw==.action?contentType=img&fmtmc=timg.jpg',(width,height) => {
            //             // //width 图片的宽度
            //             // //height 图片的高度
            //             // alert(width+"   "+height);
            //             // })
            //             //获取本地图片高宽
            //             const orderImage = Image.resolveAssetSource(require('../../res/images/tabBarBack.png'));

            //             console.info(orderImage);

            //             alert(orderImage.width+"   "+orderImage.height);

                        
            //         }}

            //     >

            //     </Button>

            //     <Button
            //         title='获取设备信息'
            //         onPress={()=>{
            //          var applicationName =  DeviceInfo.getApplicationName();
                     
            //          var buildNumber =  DeviceInfo.getBuildNumber();

            //          alert(applicationName+'  '+buildNumber)
            //         }}
            //     />

        
            // {AttributedText.getAttributedText('我的好兄弟我的好兄弟啊','兄弟')}

   

            //     </View>

            // </TouchableWithoutFeedback>

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
    }

});