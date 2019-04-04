
import React, { Component } from 'react';
import { View,Text,requireNativeComponent ,ViewPropTypes} from 'react-native';
import {PropTypes} from 'prop-types';

export default class MyCustomView extends React.Component {

  static propTypes = {
    ...ViewPropTypes,//或者属性接收把所有ViewPropTypes，相当于定义了所有ViewPropTypes
    url:PropTypes.string,          
    item:PropTypes.object,                     
    myList:PropTypes.array,                       
    positionInfo:PropTypes.object,                       
    onSingleClick:PropTypes.func,
    onDoubleClick:PropTypes.func,
};

    constructor(props) {
      super(props);

    }
   /**
   * 单击事件
   */
  onSingleClick(event) {
    if(this.props.onSingleClick) {
      if(!this.props.onSingleClick){
        return;
      }
      // 使用event.nativeEvent.msg获取原生层传递的数据
      this.props.onSingleClick(event);
    }
  }

     /**
   * 单击事件
   */
  onDoubleClick(event) {
    if(this.props.onDoubleClick) {
      if(!this.props.onDoubleClick){
        return;
      }
      // 使用event.nativeEvent.msg获取原生层传递的数据
      this.props.onDoubleClick(event);
    }
  }

    render() {
      return <RCTMyCustomView
      {...this.props} 
      onSingleClick={ (event)=> this.onSingleClick(event) } 
      onDoubleClick={(event)=>this.onDoubleClick(event)}
      />;
    }
  }
  
  var RCTMyCustomView = requireNativeComponent(`MyCustomView`,MyCustomView);