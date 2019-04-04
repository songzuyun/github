

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  RefreshControl,
  ActivityIndicator
} from 'react-native';

import NavigationBar from '../common/NavigationBar'

const CITY_NAMES=['北京','上海','中山','长沙','上海','中山','长沙','上海','中山','长沙','上海','中山','长沙']

export default class FlatListDemoPage extends Component{

    constructor(props){
        super(props);
        this.state={
            isLoading:false,
            dataArr:CITY_NAMES
        }
    }
    loadData(refreshing){
        if(refreshing){
            this.setState({
                isLoading:true,
            });
        }

        setTimeout(() => {
            let dataArray=[];
            if(refreshing){
                for(let i=this.state.dataArr.length-1;i>=0;i--){
                    dataArray.push(this.state.dataArr[i]);
                };
            }else{
                dataArray=this.state.dataArr.concat(CITY_NAMES)
            }
  
            this.setState({
                dataArr:dataArray,
                isLoading:false,
            })
        }, 2000);
     
    }

    _renderItem(data){
        return <View style={styles.item}>
            <Text style={styles.text}>{data.item}</Text>
        </View>
    }

    moreIndicator(){
        return <View style={styles.indicatorContainer}>
            <ActivityIndicator
                style={styles.indicator}
                size={'large'}
                color={'red'}
                animating={true}
            />
            <Text>正在加载更多</Text>

        </View>
    }

    render(){

       

        return(

            <View style={styles.container}>

                <NavigationBar
                    title={'FlatListDemoPage'}
                    style={{
                        backgroundColor:'red'
                    }}
                    statusBar={{
                        backgroundColor:'red',
                        barStyle:'light-content',
                        hide:false,
                    }}
                />

                <FlatList
                    data={this.state.dataArr}
                    renderItem={(data)=>this._renderItem(data)}
                    refreshControl={
                        <RefreshControl
                            title={'Loading'}
                            titleColor={'red'}
                            colors={['red']}
                            tintColor={'red'}
                            refreshing={this.state.isLoading}
                            onRefresh={()=>{
                                this.loadData(true);
                            }}
                        />
                    }
                    ListFooterComponent={()=>this.moreIndicator()}
                    onEndReached={()=>this.loadData()}

                />
                
            
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    item:{
        height:200,
        backgroundColor:'#169',
        marginBottom:10,
        marginLeft:5,
        marginRight:5,
        alignItems:'center',
        justifyContent:'center'

    },
    text:{
        fontSize:20,
        color:'white'
    },
    indicatorContainer:{
        alignItems:'center',
        marginBottom:10

    },
    indicator:{
        color:'red',
        margin:10

    }
  
  });