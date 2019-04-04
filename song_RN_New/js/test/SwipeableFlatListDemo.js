

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  SwipeableFlatList,
  TouchableOpacity
} from 'react-native';

import NavigationBar from '../common/NavigationBar'

const CITY_NAMES=['北京','上海','中山','长沙','上海','中山','长沙','上海','中山','长沙','上海','中山','长沙']

export default class SwipeableFlatListDemoPage extends Component{

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

    quickActions(){
        return <View style={styles.quickActionsContainer}>
            <TouchableOpacity onPress={()=>{
                alert('是否删除？')
            }}>
                <View style={styles.quickActions}>
                    <Text style={styles.text}>删除</Text>
                </View>
            </TouchableOpacity>
        </View>
    }

    render(){

       

        return(

            <View style={styles.container}>

                <NavigationBar
                    title={'SwipeableFlatListDemoPage'}
                    style={{
                        backgroundColor:'red'
                    }}
                    statusBar={{
                        backgroundColor:'red',
                        barStyle:'light-content',
                        hide:false,
                    }}
                />

                <SwipeableFlatList
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
                    renderQuickActions={()=>this.quickActions()}//侧滑视图
                    maxSwipeDistance={100}//侧滑最大距离
                    bounceFirstRowOnMount={false}//是否每次使用第一行自动侧滑恢复，提示用户此功能

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
        height:100,
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

    },
    quickActionsContainer:{
        flex:1,flexDirection:'row',
        justifyContent:'flex-end',
        marginRight:5,
        marginBottom:10


    },
    quickActions:{
        backgroundColor:'red',
        flex:1,
        alignItems:'flex-end',
        justifyContent:'center',
        padding:10,width:200
    },
    text:{
        fontSize:20
    }
  
  });