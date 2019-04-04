

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Button
} from 'react-native';


import NavigationBar from '../common/NavigationBar'
import HttpUtils from '../utils/HttpUtils'

export default class FetchTestPage extends Component{

    constructor(props){
        super(props);
        this.state={
            result:'',
        }
    }
    onLoad(url,data){
        HttpUtils.post(url,data)
        .then(result=>{
            this.setState({
                result:JSON.stringify(result)
            })
        })
        .catch(error=>{
            this.setState({
                result:JSON.stringify(error)
            })
        })
    }
    render(){
        return(

            <View style={styles.container}>

                <NavigationBar
                    title={'FetchTestPage'}
                    titleColor={{
                        color:'white'
                    }}
                    style={{
                        backgroundColor:'red'
                    }}
                    statusBar={{
                        backgroundColor:'red',
                        barStyle:'light-content',
                        hide:false,
                    }}
                />

                <Button
                    title={'请求数据'}
                    onPress={()=>{
                        this.onLoad('https://app1.efoundation.com.cn/mobile/nativeIndex',null);
                    }}
                />

                <Text style={styles.text}>result:{this.state.result}</Text>

            
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    },
    text:{
        fontSize:20,
    }
  
  });