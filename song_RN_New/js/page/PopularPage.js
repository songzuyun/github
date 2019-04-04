

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
  TouchableOpacity,

} from 'react-native';

import BaseComponent from './BaseComponent'
import NavigationBar from '../common/NavigationBar';
import {ACTION_HOME} from './HomePage'
import DataRepository,{FLAG_STORAGE} from '../expand/dao/DataRepository'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import RepositoryCell from '../common/RepositoryCell'
import LanguageDao ,{FLAG_LANGUAGE}from '../expand/dao/LanguageDao'
import RepositoryDetail from './RepositoryDetail'
import ProjectModel from '../model/ProjectModel'
import FavoriteDao from '../expand/dao/FavoriteDao'
import Utils from '../utils/Utils'
import ViewUtils from '../utils/ViewUtils'
import SearchPage from './SearchPage'
import MoreMenu,{MORE_MENU} from '../common/MoreMenu'
import NavigatorUtil from '../utils/NavigatorUtil'


const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

var favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);


export default class PopularPage extends BaseComponent{
    constructor(props){
        super(props);
        super.componentDidMount();
        // console.log('----constructor-this.props----');
        // console.log(this.props)
        this.params = this.props.navigation.state.params;
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key)
        this.state={
            languages:[],
        }
    }
    // shouldComponentUpdate(){

    //     console.log('----PopularPage-shouldComponentUpdate----');

    //     return true;
    // }
 
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

    renderRightButton() {
        return <View style={{flexDirection:'row',position:'absolute',right:5,alignItems:'center'}}>
            <TouchableOpacity
                onPress={()=> {
                    // this.props.navigator.push({
                    //     component:SearchPage,
                    //     params:{
                    //         ...this.props
                    //     }
                    // })

                    NavigatorUtil.goToSearchPage({...this.props})
                }}
            >
                <Image
                        style={{width:24,height:24}}
                        source={require('../../res/images/ic_search_white_48pt.png')}
                    />

            </TouchableOpacity>

            {ViewUtils.getMoreButton(()=>this.refs.moremenu.openPopover())}
        </View>
    }


    render(){


        let content = this.state.languages.length>0?                
                <ScrollableTabView
                tabBarBackgroundColor={this.params.theme.themeColor}
                tabBarInactiveTextColor='mintcream'
                tabBarActiveTextColor='white'
                tabBarUnderlineStyle={{backgroundColor:'#e7e7e7',height:2}}
                renderTabBar={()=><ScrollableTabBar/>}
            >
            {this.state.languages.map((result,i,arr)=>{
                let lan = arr[i];
                return lan.checked?<PopularTab {...this.props} theme={this.params.theme} key={i} tabLabel={lan.name}>{lan.name}</PopularTab>:null
            })}


         </ScrollableTabView>:null

        return(
            <View style={styles.container}>

                <NavigationBar
                    title={'最热'}
                    style={this.params.theme.styles.navBar}
                    rightButton={this.renderRightButton()}

                />

                {content}

                <MoreMenu
                    ref='moremenu'
                    rootview={this.refs.moreMenuButton}
                    {...this.props}
                    menus={[MORE_MENU.Custom_Key,MORE_MENU.Sort_Key,MORE_MENU.Remove_Key,MORE_MENU.Share,MORE_MENU.Custom_Theme,
                    MORE_MENU.About_Author,MORE_MENU.About]}

                />

     
            </View>
        )

    }
}

class PopularTab extends Component{
    constructor(props){
        super(props);
        this.state={
            dataSource:[],
            isLoading:false,
            favoriteKeys: [],
            theme:this.props.theme
        };
        this.dataRepository=new DataRepository(FLAG_STORAGE.flag_popular);
        this.isFavoriteChanged = false;
    }

    componentDidMount() {
        this.listener = DeviceEventEmitter.addListener('favoriteChanged_popular', () => {
            this.isFavoriteChanged = true;
        });
        this.loadData();
    }

    componentWillUnmount() {
        if (this.listener) {
            this.listener.remove();
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.isFavoriteChanged) {
            this.isFavoriteChanged = false;
            this.getFavoriteKeys();
        }
    }

    getFavoriteKeys(){
        favoriteDao.getFavoriteKeys().then(keys=>{
            if(keys){
                this.updateState({
                    favoriteKeys:keys
                })
            }
            this.flushFavoriteState();
        })
        .catch(error=>{
            this.flushFavoriteState();
            console.log(error)
        })
    }


    /**
     * 更新project item 和 favorite状态
     */

    flushFavoriteState(){
        let projectModels = [];
        let items = this.items;
        for (var i = 0, len = items.length; i < len; i++) {
            projectModels.push(new ProjectModel(items[i],Utils.checkFavorite(items[i],this.state.favoriteKeys)));//传入收藏状态
        }
        this.updateState({
            isLoading:false,
            dataSource:projectModels,
            
        })
    }


    updateState(dic){
        if(!this)return;
        this.setState(dic);
    }

    loadData(){
        this.updateState({
            isLoading: true
        })
        let url = URL+this.props.tabLabel+QUERY_STR;

        this.dataRepository.fetchRepository(url)
        .then(result=>{
            // let arr = result.items ? result.items : [];//判断result.items 是否存在
            // this.setState({
            //     dataSource:arr,
            //     isLoading:false,
            // });
            this.items = result.items ? result.items : [];//判断result.items 是否存在
            // this.flushFavoriteState();
            this.getFavoriteKeys();

            // DeviceEventEmitter.emit('ACTION_HOME',ACTION_HOME.A_SHOW_TOAST,'显示缓存数据')

            if(result.update_date&&!this.dataRepository.checkData(result.update_date)){//update_date存在且过时请求网络数据
                this.dataRepository.fetchNetRepository(url)
                .then(result=>{
                    // if(!result || result.length===0)return;
                    // DeviceEventEmitter.emit('showToast','显示网络数据')
                    // this.setState({
                    //     dataSource:result.items,
                    //     isLoading:false,
                    // });
                    if(!result || result.length===0)return;
                    this.items = result;
                    // this.flushFavoriteState();
                    this.getFavoriteKeys();
                })
                .catch(error=>{
                    console.log(error);
                    this.updateState({
                        isLoading:false,
                    })
                    
                })
                
            }
        })
        .catch(error=>{
            console.log(error);
            this.updateState({
                isLoading:false,
            })
        })

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
        if(isFavorite){
            favoriteDao.saveFavoriteItem(item.id.toString(),JSON.stringify(item))
        }else{
            favoriteDao.removeFavoriteItem(item.id.toString())
        }
        
    }
    renderItem(projectModel){
        return (
            <RepositoryCell
            key={projectModel.item.item.id}
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