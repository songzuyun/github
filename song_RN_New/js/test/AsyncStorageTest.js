

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  AsyncStorage
} from 'react-native';
import Girl from './Girl';

import NavigationBar from '../common/NavigationBar'
import Toast,{DURATION} from 'react-native-easy-toast'

export default class Boy extends Component{

    constructor(props){
        super(props);
        this.state={
            word:'',
        }
    }

    setItem(key){
        AsyncStorage.setItem('KEY',this.text,(error)=>{
            if(!error){
                this.toast.show('保存成功')
            }
            else{
                this.toast.show('保存失败')
            }
        })
    }

    getItem(key){
        AsyncStorage.getItem('KEY',(error,result)=>{
            if(!error){
                if(result!=null){
                    this.toast.show('取出成功:'+result)
                }
                else{
                    this.toast.show('取出内容不存在')
                }
                
            }
            else{
                this.toast.show('取出失败')
            }
        })
    }
    removeItem(){
        AsyncStorage.removeItem('KEY',(error)=>{
            if(!error){
                this.toast.show('移除成功')
            }
            else{
                this.toast.show('移除失败')
            }
        })
    }

    render(){
        return(

            <View style={styles.container}>

                <NavigationBar
        
                    title={'boy'}
                    style={{
                        backgroundColor:'red'
                    }}
                    statusBar={{
                        backgroundColor:'red',
                        barStyle:'light-content',
                        hide:false,
                    }}
                
                />
                
                <TextInput
                    style={{height:40,width:200}}

                    onChangeText={text=>this.text=text}
                />

                <Text onPress={()=>{
                    this.setItem(this.text)
                }}>保存</Text>
                <Text onPress={()=>{
                    this.getItem()
                }}>取出</Text>
                <Text onPress={()=>{
                    this.removeItem()
                }}>移除</Text>


                <Toast ref={toast=>this.toast=toast}/>
                
            
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