
import React, { Component } from 'react';
import {
  TouchableOpacity,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';


export default class AttributedText{


    static getAttributedText(content,key){

            var viewArr = [];

             var arr = content.split(key);

             const attributedText = <View style={{flexDirection:'row'}}>

                 {arr.map((item,index)=>{

                     if(index<arr.length-1){
                        return (
                            <View style={styles.container}>
                            
                                <Text style={styles.normalText}>
                                    {item}
                                </Text>
                                <Text style={styles.keyText}>
                                    {key}
                                </Text>
                            </View>
                        )
                     }
                     else{
                        return (
                            <View style={styles.container}>
                            
                                <Text style={styles.normalText}>
                                    {item}
                                </Text>
                            </View>
                        )
                     }


                 })}
             </View>

            viewArr.push(attributedText);

        return  viewArr;

    }

}


const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    normalText:{
        color:'gray',
        alignSelf:'flex-end'
    },
    keyText:{
        color:'red',
        fontSize:20
    }
})