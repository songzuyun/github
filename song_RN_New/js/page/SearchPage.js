

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
    StatusBar,
    TouchableWithoutFeedback

} from 'react-native';
import Toast, { DURATION } from "react-native-easy-toast";
import NavigationBar from '../common/NavigationBar';
import DataRepository, { FLAG_STORAGE } from '../expand/dao/DataRepository'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import RepositoryCell from '../common/RepositoryCell'
import LanguageDao, { FLAG_LANGUAGE } from '../expand/dao/LanguageDao'
import RepositoryDetail from './RepositoryDetail'
import ProjectModel from '../model/ProjectModel'
import FavoriteDao from '../expand/dao/FavoriteDao'
import Utils from '../utils/Utils'
import ViewUtils from '../utils/ViewUtils'
// import makeCancelable from '../utils/Cancleable'
import Cancleable from '../utils/Cancleable'




const API_URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

export default class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);
        this.keys = [];
        this.state = {
            searchText: '搜索',
            isLoading: false,
            dataSource: [],
            favoriteKeys: [],

        }
    }


    /**
     * 获取所有收藏的key
     */
    getFavoriteKeys() {
        this.favoriteDao.getFavoriteKeys().then(keys => {
            if (keys) {
                this.updateState({
                    favoriteKeys: keys
                })
            }
            this.flushFavoriteState();
        })
            .catch(error => {
                this.flushFavoriteState();
                console.log(error)
            })
    }


    /**
     * 更新project item 和 favorite状态
     */

    flushFavoriteState() {
        let projectModels = [];
        let items = this.items;
        for (var i = 0, len = items.length; i < len; i++) {
            projectModels.push(new ProjectModel(items[i], Utils.checkFavorite(items[i], this.state.favoriteKeys)));//传入收藏状态
        }
        this.updateState({
            isLoading: false,
            dataSource: projectModels,

        })
    }

    loadData() {
        this.updateState({
            isLoading: true
        });
        // fetch(this.genFetchUrl(this.inputKey))
        // this.cancelable=makeCancelable(fetch(this.genFetchUrl(this.inputKey)));
        this.cancelable=Cancleable.makeCancelable(fetch(this.genFetchUrl(this.inputKey)));
        this.cancelable.promise
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData);
                if (!this || !responseData || !responseData.items || responseData.items.lenght === 0) {
                    this.updateState({
                        isLoading: false,
                        searchText: '搜索'
                    })
                    this.toast.show(this.inputKeky + '什么都没找到', DURATION.LENGTH_LONG);
                    return;
                }
                this.items = responseData.items;
                this.getFavoriteKeys();
                this.updateState({
                    isLoading: false,
                    searchText: '搜索'
                })
            })
            .catch(err => {
                this.updateState({
                    isLoading: false,
                    searchText: '搜索'
                })
            })

    }
    genFetchUrl(key) {
        return API_URL + key + QUERY_STR;
    }

    updateState(dic) {
        this.setState(dic)
    }
    goBack() {
        this.refs.input.blur();
        this.props.navigator.pop();
    }
    clickSearch() {
        if (this.state.searchText === '搜索') {
            this.updateState({ searchText: '取消' })
            this.loadData();
        }
        else {
            this.updateState({
                isLoading: false,
                searchText: '搜索'
            })

            // this.cancelable&&this.cancelable.cancel();
            Cancleable.cancel();
            

        }
        
    }
    componentWillUnmount(){

        // this.cancelable&&this.cancelable.cancel();

        Cancleable.cancel();
    }
    renderNavBar() {
        return (
            <View style={styles.navBar}>
                {ViewUtils.getLeftButton(() => { this.goBack() })}
                <TextInput
                    ref='input'
                    style={styles.textInput}
                    placeholder={'请输入标签'}
                    onChangeText={text => this.inputKey = text}

                />

                <TouchableOpacity
                    style={{ marginRight: 10 }}
                    onPress={() => {
                        this.clickSearch();
                        this.refs.input.blur();

                    }}
                >
                    <Text style={{ color: 'white', fontSize: 18 }}>{this.state.searchText}</Text>
                </TouchableOpacity>

            </View>
        )
    }

    onSelect(projectModel) {
        this.props.navigator.push({
            component: RepositoryDetail,
            params: {
                projectModel: projectModel,
                flag: FLAG_STORAGE.flag_popular,
                ...this.props
            }
        })
    }
    /**
     * favoriteIcon点击回调函数
     * @param {*} item 
     * @param {*} isFavorite 
     */
    onFvorite(item, isFavorite) {
        if (isFavorite) {
            this.favoriteDao.saveFavoriteItem(item.id.toString(), JSON.stringify(item))
        } else {
            this.favoriteDao.removeFavoriteItem(item.id.toString())
        }

    }

    renderItem(projectModel) {
        return (
            <RepositoryCell
                key={projectModel.item.item.id}
                projectModel={projectModel}
                onSelect={() => { this.onSelect(projectModel) }}//传递一个方法，cell通过属性调用这个方法
                onFvorite={(item, isFavorite) => { this.onFvorite(item, isFavorite) }}

            />
        )
    }
    render() {

        // let status = <View style={styles.statusBar}>
        //     <StatusBar
        //     // barStyle='default'
        //     ></StatusBar>
        // </View>

        let statusBar = null;
        if (Platform.OS === 'ios') {
            statusBar = <View style={[styles.statusBar]} />
        }
        let navBar = this.renderNavBar();

        return (

            <TouchableWithoutFeedback
                onPress={() => this.refs.input.blur()}
            >

                <View style={styles.container}>
                    {statusBar}
                    {navBar}
                    <FlatList
                        data={this.state.dataSource}
                        renderItem={(data) => this.renderItem(data)}
                        keyExtractor={(item, index) => "index" + index + item}
                        refreshControl={
                            <RefreshControl
                                title={'Loading。。。'}
                                titleColor={'#2196F3'}
                                colors={['#2196F3']}
                                tintColor={'#2196F3'}
                                refreshing={this.state.isLoading}
                                onRefresh={() => { this.loadData() }}
                            />
                        }

                    />

                    <Toast ref={toast => this.toast = toast} />



                </View>

            </TouchableWithoutFeedback>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    navBar: {
        backgroundColor: '#2196F3',
        height: 64,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    statusBar: {
        height: Platform.OS === 'ios' ? 20 : 0,
        backgroundColor: '#2196F3'
    },
    textInput: {
        flex: 1,
        color: 'white',
        height: 30,
        borderWidth: 1,
        borderColor: 'white',
        paddingLeft: 3,
        borderRadius: 5,
        marginRight: 10,
    }


});