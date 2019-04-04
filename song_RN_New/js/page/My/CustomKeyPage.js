

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
} from 'react-native';

import NavigationBar from '../../common/NavigationBar'
import ViewUtils from '../../utils/ViewUtils'
import LanguageDao,{FLAG_LANGUAGE} from '../../expand/dao/LanguageDao'
import  CheckBox from 'react-native-check-box'
import ArrayUtils from '../../utils/ArrayUtils'
import NavigatorUtil from '../../utils/NavigatorUtil';

export default class CustomKeyPage extends Component{

    constructor(props){
        super(props);
        this.params = this.props.navigation.state.params;
        this.isRemoveKey=this.params.params.isRemoveKey?true:false;//isRemoveKey删除标签还是自定义标签
        this.state={
            dataArray:[],
            
        }
        this.changeValues=[],
        this.languageDao = new LanguageDao(this.params.params.flag)//根据标签定义popular还是trending

    }
    componentDidMount(){
        this.loadData();
    }
    loadData(){
        this.languageDao.fetch()
        .then(result=>{
            this.setState({
                dataArray:result
            })
        })
        .catch(error=>{
            console.log(error)
        })
    }

    onClick(data){
        if(!this.isRemoveKey)data.checked=!data.checked;//此处修改也能改变整个数组
        ArrayUtils.updateArray(this.changeValues,data)
    }


    onSave(){
        
        if(this.changeValues.length===0){
            // this.props.navigator.pop();
            NavigatorUtil.goBack(this.props.navigation)
        }
        else{
            if(this.isRemoveKey){
                for(let i=0,l=this.changeValues.length;i<l;i++){
                    ArrayUtils.remove(this.state.dataArray,this.changeValues[i]);
                }
            }
            this.languageDao.save(this.state.dataArray);
            // this.props.navigator.pop();
            NavigatorUtil.goBack(this.props.navigation)
        }
    }
    onBack() {
        if (this.changeValues.length > 0) {
            Alert.alert(
                '提示',
                '要保存修改吗?',
                [
                    {
                        text: '否', onPress: () => {
                        // this.props.navigator.pop();
                        NavigatorUtil.goBack(this.props.navigation)
                    }
                    }, {
                    text: '是', onPress: () => {
                        this.onSave();
                    }
                }
                ]
            )
        } else {
            // this.props.navigator.pop();
            NavigatorUtil.goBack(this.props.navigation)
        }
    }
    renderView() {


        if (!this.state.dataArray || this.state.dataArray.length === 0)return;
        var len = this.state.dataArray.length;
        var views = [];
        for (var i = 0, l = len - 2; i < l; i += 2) {
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this.renderCheckBox(this.state.dataArray[i])}
                        {this.renderCheckBox(this.state.dataArray[i+1])}
                    </View>
                    <View style={styles.line}/>
                </View>
            )
        }
        views.push(
            <View key={len - 1}>
                <View style={styles.item}>
                    {len % 2 === 0 ? this.renderCheckBox(this.state.dataArray[len-2]) : null}
                    {this.renderCheckBox(this.state.dataArray[len-1])}
                </View>
                <View style={styles.line}/>
            </View>
        )
        return views;

    }



    renderCheckBox(data){
        var leftText = data.name;
        let isChecked = this.isRemoveKey ? false : data.checked;
        return (
            <CheckBox
                style={{flex: 1, padding: 10}}
                onClick={()=>this.onClick(data)}
                isChecked={isChecked}
                leftText={leftText}
                checkedImage={<Image style={this.params.theme.styles.tabBarSelectedIcon} source={require('./img/ic_check_box.png')}/>}
                unCheckedImage={<Image style={this.params.theme.styles.tabBarSelectedIcon} source={require('./img/ic_check_box_outline_blank.png')} />}
            />);
    }

    render(){

        let title=this.isRemoveKey?'标签移除':'自定义标签'
        if(this.params.params.flag===FLAG_LANGUAGE.flag_language){
            title = this.isRemoveKey?'语言移除':'自定义语言'
        }
        let rightButtonTitle=this.isRemoveKey?'移除':'保存'

        return(

            <View style={styles.container}>

                <NavigationBar
                    title={title}
                    style={this.params.theme.styles.navBar}
                    leftButton={ViewUtils.getLeftButton(()=>{this.onBack()})}
                    rightButton={ViewUtils.getRightButton(rightButtonTitle,()=>{this.onSave()})}
                    

                />
                <ScrollView>
                    {this.renderView()}
                </ScrollView>


            
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
    },
    item: {
        flexDirection: 'row',
    },
    line: {
        flex: 1,
        height: 0.3,
        backgroundColor: 'darkgray',
    },
  
  });