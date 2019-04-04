

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import  NavigationBar from '../common/NavigationBar'

export default class Girl extends Component{

    constructor(props){
        super(props);

    }

    renderButton(image){
        return(
            <TouchableOpacity onPress={()=>{
                this.props.navigator.pop()
            }}>
                <Image style={{height:22,width:22,margin:5}} source={image}></Image>
            </TouchableOpacity>
        )        


    }


    render(){
        return(

            <View style={styles.container}>

                <NavigationBar

                    title={'girl'}
                    style={{
                        backgroundColor:'red'
                    }}
                    statusBar={{
                        backgroundColor:'red',
                        barStyle:'light-content',
                        hide:false,
                    }}
                    leftButton={
                        this.renderButton(require('../../res/images/ic_arrow_back_white_36pt.png'))

                    }
                    rightButton={
                        this.renderButton(require('../../res/images/ic_star.png'))

                    }
                             
                
                />
                <Text style={styles.text}>I am girl</Text>
                <Text style={styles.text}>收到男孩送的：{this.props.word}</Text>
                <Text style={styles.text} onPress={
                    ()=>{
                        this.props.onCallBack('巧克力');
                        this.props.navigator.pop();
                    }
                }>送男孩巧克力</Text>
            
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    //   justifyContent:'center'
    },
    text:{
        fontSize:20,
    }
  
  });