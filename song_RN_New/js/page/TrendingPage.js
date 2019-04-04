

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
import DataRepository,{FLAG_STORAGE} from '../expand/dao/DataRepository'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import TrendingCell from '../common/TrendingCell'
import LanguageDao ,{FLAG_LANGUAGE}from '../expand/dao/LanguageDao'
import RepositoryDetail from './RepositoryDetail'
import ViewUtils from '../utils/ViewUtils';
import TimeSpan from '../model/TimeSpan'
import ProjectModel from '../model/ProjectModel'
import FavoriteDao from '../expand/dao/FavoriteDao'
import Utils from '../utils/Utils'
import NavigatorUtil from '../utils/NavigatorUtil'

import MoreMenu,{MORE_MENU} from '../common/MoreMenu'

import { Popover, PopoverController } from 'react-native-modal-popover';

var favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_trending);


const API_URL = 'https://github.com/trending/';
var timeSpanTextArray = [new TimeSpan('今 天','since=daily'),new TimeSpan('本 周','since=weekly'),new TimeSpan('本 月','since=monthly')]

export default class TrendingPage extends BaseComponent{
    constructor(props){
        super(props);
        super.componentDidMount();
        this.params = this.props.navigation.state.params;
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_language)
        this.state={
            languages:[],
            showPopover: false,
            popoverAnchor: { x: 0, y: 0, width: 0, height: 0 },
            timeSpan: timeSpanTextArray[0],
        }
    }

    // shouldComponentUpdate(){

    //     console.log('----TrendingPage-shouldComponentUpdate----');

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

    renderTitleView(){
        return(
            <View>
                <TouchableOpacity
                    ref='button'
                    onPress={()=>{this.openPopover()}}
                    
                >
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={{fontSize:18,color:'white',fontWeight:'400'}}>趋势 {this.state.timeSpan.showText}</Text>
                        <Image style={{width:12,height:12,marginLeft:5}} source={require('../../res/images/ic_spinner_triangle.png')}/>
                    </View>
                </TouchableOpacity>
            </View>

        )
    }

    openPopover() {
        this.refs.button.measure((x0, y0, width, height, x, y) => {
          this.setState({
            showPopover: true,
            popoverAnchor: { x, y, width, height }
          });
        });
      };
    
    closePopover(){
        this.setState({ 
            showPopover: false 
        })
    }

    onSelectTimeSpan(timeSpan) {
        this.closePopover();
        this.setState({
            timeSpan: timeSpan
        })
    }
    renderRightButton() {
        return <View style={{flexDirection:'row',position:'absolute',right:5,alignItems:'center'}}>

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
                return lan.checked?<TrendingTab {...this.props} theme={this.params.theme} key={i} tabLabel={lan.name} timeSpan={this.state.timeSpan}>{lan.name}</TrendingTab>:null
            })}


            </ScrollableTabView>:null;

            let timeSpanView = 
            <Popover
                visible={this.state.showPopover}
                fromRect={this.state.popoverAnchor}
                onClose={()=>{this.closePopover()}}
                placement="bottom"
                contentStyle={{opacity: 0.82, backgroundColor: '#343434'}}//若要使用箭头，到popover.js里修改为contentStyle的颜色,否则删除箭头代码
                backgroundStyle = {{backgroundColor:'transparent'}}

                
            >
                  <View style={{alignItems: 'center'}}>
                    {timeSpanTextArray.map((result, i, arr) => {
                        return <TouchableOpacity key={i} onPress={()=>this.onSelectTimeSpan(arr[i])}
                                                 underlayColor='transparent'>
                            <Text
                                style={{fontSize: 18, color: 'white', padding: 8, fontWeight: '400'}}>
                                {arr[i].showText}
                            </Text>
                        </TouchableOpacity>
                    })
                    }
                </View>
            </Popover>

        const click = this.refs.button;

        return(
            <View style={styles.container}>

                <NavigationBar
                    titleView = {this.renderTitleView()}
                    style={this.params.theme.styles.navBar}
                    rightButton={this.renderRightButton()}

                />

                {content}

                {timeSpanView}

                <MoreMenu
                    ref='moremenu'
                    rootview={this.refs.moreMenuButton}
                    {...this.props}
                    menus={[MORE_MENU.Custom_Language, MORE_MENU.Sort_Language,MORE_MENU.Share, MORE_MENU.Custom_Theme,
                        MORE_MENU.About_Author, MORE_MENU.About]}

                />

        
     
            </View>
        )

    }
}

class TrendingTab extends Component{
    constructor(props){
        super(props);
        this.state={
            dataSource:[],
            isLoading:false,
            favoriteKeys:[]
        };

        this.dataRepository=new DataRepository(FLAG_STORAGE.flag_trending);
        this.isFavoriteChanged = false;
        
    }
    componentDidMount() {
        this.listener = DeviceEventEmitter.addListener('favoriteChanged_trending', () => {
            this.isFavoriteChanged = true;
        });
        this.loadData(this.props.timeSpan);
    }

    componentWillUnmount() {
        if (this.listener) {
            this.listener.remove();
        }
    }

    //属性变化，重新加载数据
    componentWillReceiveProps(nextProps) {
        if (nextProps.timeSpan !== this.props.timeSpan) {
            this.loadData(nextProps.timeSpan);
        } else if (this.isFavoriteChanged) {
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

    genFecthUrl(timeSpan,category){
        return API_URL + category + '?'+timeSpan.searchText;
 
    }

    onRefresh(){
        this.loadData();
    }

    loadData(){
        this.updateState({
            isLoading: true
        })

        let url = this.genFecthUrl(this.props.timeSpan,this.props.tabLabel);

        this.dataRepository.fetchRepository(url)
        .then(result=>{
            // let arr = result.items ? result.items : result;//判断result.items 是否存在
            // // DeviceEventEmitter.emit('showToast','显示缓存数据')
            // this.updateState({
            //     dataSource:arr,
            //     isLoading:false,
            // });

            this.items = result.items ? result.items : result;//判断result.items 是否存在
            this.getFavoriteKeys();

            if(result.update_date&&!this.dataRepository.checkData(result.update_date)){//update_date存在且过时请求网络数据
                this.dataRepository.fetchNetRepository(url)
                .then(result=>{
                    // DeviceEventEmitter.emit('showToast','显示网络数据')
                    // if(!result || result.length===0)return;
                    // let arr = result.items ? result.items : result;//判断result.items 是否存在
                    // this.updateState({
                    //     dataSource:arr,
                    //     isLoading:false,
                    // });

                    if(!result || result.length===0)return;
                    this.items = result;
                    this.getFavoriteKeys();
                })
                .catch(error=>{
                    console.log(error);
                    this.updateState({
                        isLoading:false,
                    });
                    
                })
                
            }
        })
        .catch(error=>{
            console.log(error);
            this.updateState({
                isLoading:false,
            });
        })

    }

    onSelect(projectModel){
        // this.props.navigator.push({
        //     component:RepositoryDetail,
        //     params:{
        //         projectModel:projectModel,
        //         flag:FLAG_STORAGE.flag_trending,
        //         ...this.props,
        //         theme:this.props.theme
        //     }
        // })

        NavigatorUtil.goToRepositoryDetail({
            ...this.props,
            projectModel:projectModel,
            flag:FLAG_STORAGE.flag_trending,
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
            favoriteDao.saveFavoriteItem(item.fullName.toString(),JSON.stringify(item))
        }else{
            favoriteDao.removeFavoriteItem(item.fullName.toString())
        }
        
    }

    renderItem(projectModel){
        return (
            <TrendingCell
            key={projectModel.item.item.fullName}
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
                            onRefresh={()=>{this.onRefresh()}}


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