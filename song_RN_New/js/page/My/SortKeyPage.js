

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  TouchableHighlight
} from 'react-native';
import SortableListView from 'react-native-sortable-listview'

import NavigationBar from '../../common/NavigationBar'
import ViewUtils from '../../utils/ViewUtils'
import LanguageDao,{FLAG_LANGUAGE} from '../../expand/dao/LanguageDao'
import ArrayUtils from '../../utils/ArrayUtils'
import NavigatorUtil from '../../utils/NavigatorUtil';
export default class CustomKeyPage extends Component{

    constructor(props){
        super(props);
        this.params = this.props.navigation.state.params;
        this.dataArray=[];//原始数组ABCDEF
        this.sortResultArray=[];//排序结果应用到原始数组CBEDAF
        this.originalCheckedArray=[];//筛选后的数组ACE
        this.state={
            checkedArray:[],//对筛选后的数组进行排序CEA
            
        }

    }
    componentDidMount(){
        this.languageDao = new LanguageDao(this.params.params.flag);
        this.loadData();
    }
    
    loadData(){
        this.languageDao.fetch()
        .then(result=>{
            this.getCheckedItems(result)
        })
        .catch(error=>{

        })
    }

    getCheckedItems(result){
        this.dataArray = result;
        let checkedArray=[];
        for(let i=0,len=result.length;i<len;i++){
            let data = result[i];
            if(data.checked)checkedArray.push(data);
        }
        this.setState({
            checkedArray:checkedArray
        })
        this.originalCheckedArray= ArrayUtils.clone(checkedArray)
    }

    onBack(){
        if(ArrayUtils.isEqual(this.originalCheckedArray,this.state.checkedArray)){
            // this.props.navigator.pop();
            NavigatorUtil.goBack(this.props.navigation)
            return;
        }

        Alert.alert(
            '提示',
            '要保存修改吗?',
            [
                {
                    text: '否', onPress: () => {
                    // this.props.navigator.pop();
                }
                }, {
                text: '是', onPress: () => {
                    this.onSave();
                }
            }
            ]
        )
    }
    onSave(){
        if(ArrayUtils.isEqual(this.originalCheckedArray,this.state.checkedArray)){
            // this.props.navigator.pop();
            return;
        }
        this.getSortResult();
        this.languageDao.save(this.sortResultArray);
        // this.props.navigator.pop();
    }
    getSortResult(){
        this.sortResultArray= ArrayUtils.clone(this.dataArray)
        for(let i=0,len=this.originalCheckedArray.length;i<len;i++){
            let item = this.originalCheckedArray[i];
            let index = this.dataArray.indexOf(item);
            this.sortResultArray.splice(index,1,this.state.checkedArray[i])
        }
    }

    render(){

        let order = Object.keys(this.state.checkedArray) //Array of keys
        let title = this.params.params.flag===FLAG_LANGUAGE.flag_key?'标签排序':'语言排序'
        return(

            <View style={styles.container}>

                <NavigationBar
                    title={title}
                    style={this.params.theme.styles.navBar}
                    leftButton={ViewUtils.getLeftButton(()=>{this.onBack()})}
                    rightButton={ViewUtils.getRightButton('保存',()=>{this.onSave()})}
                    

                />

                    
                <SortableListView
                    style={{ flex: 1 }}
                    data={this.state.checkedArray}
                    order={order}
                    onRowMoved={e => {
                        this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0])
                    this.forceUpdate()
                    }}
                    renderRow={row => <SortCell data={row} {...this.params}/>}
                />


            
            </View>
        )

    }
}



class SortCell extends Component{
    
    render(){
        return (
            <TouchableHighlight
                underlayColor={'#eee'}
                style={styles.item}
                {...this.props.sortHandlers}>
                <View style={{marginLeft: 10, flexDirection: 'row'}}>
                    <Image source={require('./img/ic_sort.png')} resizeMode='stretch' style={[{
                    opacity: 1,
                    width: 16,
                    height: 16,
                    marginRight: 10,
                },this.props.theme.styles.tabBarSelectedIcon]}/>
                    <Text>{this.props.data.name}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    },
    item: {
        backgroundColor: "#F8F8F8",
        borderBottomWidth: 1,
        borderColor: '#eee',
        height: 50,
        justifyContent: 'center'
    },


  });