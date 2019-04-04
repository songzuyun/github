

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
  SectionList,
  TouchableOpacity
  
} from 'react-native';

import NavigationBar from '../common/NavigationBar'

import Toast,{DURATION} from 'react-native-easy-toast'

const CITY_NAMES=['北京','上海','中山','长沙','上海','中山','长沙','上海','中山','长沙','上海','中山','长沙']
const CITY_NAMES2=['北京','上海','中山','长沙','上海','中山','长沙','上海','中山','长沙','上海','中山','长沙']

export default class FlatListDemoPage extends Component{

    constructor(props){
        super(props);
        this.state={
            isLoading:false,
            dataArr:CITY_NAMES,
            dataArr2:CITY_NAMES2
        }
    }
    loadData(refreshing){
        this.setState({
            isLoading:true,
        });

        setTimeout(() => {
            this.setState({
                isLoading:false,
            })
        }, 2000);
     
    }
    clickItem(data){
        // console.log(data.item)
        // alert(data.item)
        this.toast.show('你单击了：'+data.item,DURATION.LENGTH_SHORT) 

    }

    _renderItem(data,index){
        return (
            <TouchableOpacity   onPress={this.clickItem.bind(this,data)}>
                <View style={styles.item}>
                    <Text style={styles.text}>{data.item}</Text>
                </View>
            </TouchableOpacity>
        )

    }

    _renderItem2(data){
        return (
            <TouchableOpacity   onPress={this.clickItem.bind(this,data)}>
                <View style={styles.item2}>
                    <Text style={styles.text2}>{data.item}</Text>
                </View>
            </TouchableOpacity>
        )


    }
    _sectionHeader(section){
        return <View style={styles.sectionHeader}>
            <Text> this is sectionHeader :{section.title}</Text>
        </View>
    }

    _extraUniqueKey(item ,index){
        return "index"+index+item;
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
                    title={'SectionListDemoPage'}
                    style={{
                        backgroundColor:'red'
                    }}
                    statusBar={{
                        backgroundColor:'red',
                        barStyle:'light-content',
                        hide:false,
                    }}
                />


                {/* <SectionList
                    renderItem={(data) => this._renderItem(data)}
                    renderSectionHeader={({section}) => <View style={{height:50,backgroundColor:'yellow'}}><Text>{section.title}</Text></View>}
                    ItemSeparatorComponent={()=><View style={{height:3,backgroundColor:'red'}}></View>}
                    sections={[ // 不同section渲染相同类型的子组件
                        {data: CITY_NAMES, title: 'first section'},
                        {data: CITY_NAMES2, title: 'second section'},
                    ]} 
                    refreshControl={
                        <RefreshControl
                            title={'Loading'}
                            titleColor={'red'}
                            colors={['red']}
                            tintColor={'red'}
                            refreshing={this.state.isLoading}
                            onRefresh={()=>{
                                this.loadData();
                            }}
                        />
                    }

                /> */}


                <SectionList
                    sections={[ // 不同section渲染不同类型的子组件
                        {data: CITY_NAMES,title:'first section', renderItem:(data) => this._renderItem(data)},
                        {data: CITY_NAMES2,title:'second section', renderItem:(data) => this._renderItem2(data)},
                        
                    ]}
                    renderSectionHeader={({section}) => this._sectionHeader(section)}
                    stickySectionHeadersEnabled={false}//sectionheader 悬停设置
                    ListFooterComponent={()=><View style={{height:10,backgroundColor:'red'}}></View>}
                    ItemSeparatorComponent={()=><View style={{height:3,backgroundColor:'red'}}></View>}
                    SectionSeparatorComponent={()=><View style={{height:5,backgroundColor:'yellow'}}></View>}
                    keyExtractor = {this._extraUniqueKey}// 每个item的key
               
                    
                    refreshControl={
                        <RefreshControl
                            title={'Loading'}
                            titleColor={'red'}
                            colors={['red']}
                            tintColor={'red'}
                            refreshing={this.state.isLoading}
                            onRefresh={()=>{
                                this.loadData();
                            }}
                        />
                    }

                />


                <Toast ref={toast=>{this.toast=toast}} />


                
            
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
        backgroundColor:'#150',
        marginBottom:10,
        marginLeft:5,
        marginRight:5,
        alignItems:'center',
        justifyContent:'center'

    },
    item2:{
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
    text2:{
        fontSize:20,
        color:'red'
    },
    indicatorContainer:{
        alignItems:'center',
        marginBottom:10

    },
    indicator:{
        color:'red',
        margin:10

    },
    sectionHeader:{
        backgroundColor:'yellow',
        height:40,
    },

  
  });