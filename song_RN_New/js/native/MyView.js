import React, { Component } from 'react';
import { View,requireNativeComponent ,ViewPropTypes} from 'react-native';
import {PropTypes} from 'prop-types';

export default class MyView extends React.Component {
    // 与OC中 RCTViewManager子类中导出的属性对应

    static propTypes = {
        ...ViewPropTypes,//或者属性接收把所有ViewPropTypes，相当于定义了所有ViewPropTypes
        subViewWidth:PropTypes.number,          
        subViewHeight:PropTypes.number,                     
        showSubView:PropTypes.bool,                       
        onSingleTap:PropTypes.func,                       
        size:PropTypes.object,
        item:PropTypes.object,
    };

    componentDidMount() {

        console.log("MyView被加载了");
    }

    render() {
        return(
        <RCTMyView
            {...this.props}
            >
            </RCTMyView>
        );
    }
}
/**
    //这个文件中,凡是用到RCTMyView的地方,应该与OC中
    //RCTViewManager子类中RCT_EXPORT_MODULE()括号中的参数一致,
    //如果没有参数,应为RCTViewManager子类的类名去掉manager
*/
var RCTMyView = requireNativeComponent('RCTMyView', MyView);
