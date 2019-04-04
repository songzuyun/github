

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import Girl from './Girl';

import NavigationBar from '../common/NavigationBar'

export default class Boy extends Component{

    constructor(props){
        super(props);
        this.state={
            word:'',
        }
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
                <Text style={styles.text}>I am boy</Text>
                    <Text style={styles.text} onPress={
                        ()=>{
                            this.props.navigator.push({
                                component:Girl,
                                params:{
                                    word:'一枝玫瑰',
                                    onCallBack:(word)=>{
                                        this.setState({
                                            word:word,
                                        })
                                    }
                                }
                            })



                        }
                    }>送女孩一枝玫瑰</Text>
                <Text style={styles.text}>收到女孩送的：{this.state.word}</Text>

                
            
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