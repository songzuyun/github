

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TextInput,
  FlatList,
  RefreshControl,
  DeviceEventEmitter,
  TouchableOpacity

} from 'react-native';

import BaseComponent from './BaseComponent'
import NavigationBar from '../common/NavigationBar';
import DataRepository,{FLAG_STORAGE} from '../expand/dao/DataRepository'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import RepositoryCell from '../common/RepositoryCell'
import TrendingCell from '../common/TrendingCell'
import LanguageDao ,{FLAG_LANGUAGE}from '../expand/dao/LanguageDao'
import RepositoryDetail from './RepositoryDetail'
import ProjectModel from '../model/ProjectModel'
import FavoriteDao from '../expand/dao/FavoriteDao'
import Utils from '../utils/Utils'
import ArrayUtils from '../utils/ArrayUtils'
import NavigatorUtil from '../utils/NavigatorUtil'

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';


export default class PopularPage extends BaseComponent{
    constructor(props){
        super(props);
        this.params = this.props.navigation.state.params;
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key)
        this.state={
            languages:[],
        }
    }
    componentDidMount(){
        this.loadData();
    }
    loadData(){
        this.languageDao.fetch()
        .then(result=>{
            this.setState({
                languages:result,
                
            })
        })
        .catch(error=>{
            console.log(error);
        })
    }

    render(){

        let content =            
                <ScrollableTabView
                    tabBarBackgroundColor={this.params.theme.themeColor}
                    tabBarInactiveTextColor='mintcream'
                    tabBarActiveTextColor='white'
                    tabBarUnderlineStyle={{backgroundColor:'#e7e7e7',height:2}}
                    renderTabBar={()=><ScrollableTabBar/>}
                >
                <FavoriteTab {...this.props} tabLabel={'最热'} theme={this.params.theme} flag={FLAG_STORAGE.flag_popular}></FavoriteTab>
                <FavoriteTab {...this.props} tabLabel={'趋势'} theme={this.params.theme} flag={FLAG_STORAGE.flag_trending}></FavoriteTab>


                </ScrollableTabView>

        return(
            <View style={styles.container}>

                <NavigationBar
                    title={'收藏'}
                    style={this.params.theme.styles.navBar}

                />

                {content}

     
            </View>
        )

    }
}

class FavoriteTab extends Component{
    constructor(props){
        super(props);
        this.state={
            dataSource:[],
            isLoading:false,
            favoriteKeys: [],
        };
        this.favoriteDao = new FavoriteDao(this.props.flag);
        this.unFavoriteItems = [];//列表里取消收藏保存在这个数组里
    }
    componentDidMount(){
        this.loadData(true);
    }

    componentWillReceiveProps() {
        this.loadData(false);

    }

    updateState(dic){
        if(!this)return;
        this.setState(dic);
    }

    loadData(isShowLoading) {
        if (isShowLoading)
            this.updateState({
                isLoading: true,
            });
        this.favoriteDao.getAllItems().then((items)=> {
            var resultData = [];
            for (var i = 0, len = items.length; i < len; i++) {
                resultData.push(new ProjectModel(items[i], true));
            }
            this.updateState({
                isLoading: false,
                dataSource: resultData,
            });
        }).catch((error)=> {
            this.updateState({
                isLoading: false,
            });
        });
    }

    onSelect(projectModel){
        // this.props.navigator.push({
        //     component:RepositoryDetail,
        //     params:{
        //         projectModel:projectModel,
        //         flag:FLAG_STORAGE.flag_popular,
        //         ...this.props,
        //         theme:this.props.theme
        //     }
        // })
        NavigatorUtil.goToRepositoryDetail({
            ...this.props,
            projectModel:projectModel,
            flag:FLAG_STORAGE.flag_popular,
            theme:this.props.theme
        })
    }
    /**
     * favoriteIcon点击回调函数
     * @param {*} item 
     * @param {*} isFavorite 
     */
    onFvorite(item,isFavorite){

        let key = this.props.flag===FLAG_STORAGE.flag_popular?item.id.toString():item.fullName.toString();

        this.favoriteDao.removeFavoriteItem(key)

        this.loadData(false);

        ArrayUtils.updateArray(this.unFavoriteItems, item);

        if (this.unFavoriteItems.length > 0) {
            if (this.props.flag === FLAG_STORAGE.flag_popular) {
                DeviceEventEmitter.emit('favoriteChanged_popular');
            } else {
                DeviceEventEmitter.emit('favoriteChanged_trending');
            }
        }

        
    }
    renderItem(projectModel){
        let CellComponent = this.props.flag === FLAG_STORAGE.flag_popular ? RepositoryCell : TrendingCell;

        return (
            <CellComponent
            key={this.props.flag === FLAG_STORAGE.flag_popular ? projectModel.item.item.id : projectModel.item.item.fullName}
            projectModel={projectModel}
            onSelect={()=>{this.onSelect(projectModel)}}//传递一个方法，cell通过属性调用这个方法
            onFvorite={(item,isFavorite)=>{this.onFvorite(item,isFavorite)}}
            theme = {this.props.theme}

             />
        )
    }
  
    render(){
        return (
            <View>
                 <FlatList
                    data={this.state.dataSource}
                    renderItem={(data)=>this.renderItem(data)}
                    keyExtractor={(item,index) => "index"+index+item}
                    refreshControl={
                        <RefreshControl
                            title={'Loading。。。'}
                            titleColor={this.props.theme.themeColor}
                            colors={[this.props.theme.themeColor]}
                            tintColor={this.props.theme.themeColor}
                            refreshing={this.state.isLoading}
                            onRefresh={()=>{this.loadData()}}
                        />
                    }


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
    text:{
        fontSize:20,
    }
  
  });