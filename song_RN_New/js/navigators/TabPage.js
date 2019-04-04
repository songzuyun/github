import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  touchablew

} from 'react-native'
import { createBottomTabNavigator } from 'react-navigation';
import BaseComponent from '../page/BaseComponent'
import Toast, { DURATION } from 'react-native-easy-toast'
import PopularPage from '../page/PopularPage'
import TrendingPage from '../page/TrendingPage'
import MyPage from '../page/My/MyPage'
import FavoritePage from '../page/FavoritePage'
import testComponent from '../test/testComponent'
import ScrollViewTest from '../test/ScrollViewTest'
import NativeEvent from '../native/NativeEvent'
import MyView from '../native/MyView'


export const ACTION_HOME = { A_SHOW_TOAST: 'showToast', A_RESTART: 'restart', A_THEME: 'theme' };
export const FLAG_TAB = {
  flag_popularTab: 'tb_popular',
  flag_trendingTab: 'tb_trending',
  flag_favoriteTab: 'tb_favorite',
  flag_my: 'tb_my'
}

export default TabNavi = createBottomTabNavigator(
  {
    PopularPage: { screen: testComponent },
    TrendingPage: { screen: TrendingPage },
    FavoritePage: { screen: FavoritePage },
    MyPage: { screen: MyPage }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarOnPress: (obj) => {
        //  console.log(obj);        
        // alert(obj.navigation.state.routeName);
      },
      tabBarLabel: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let lableName;
        if (routeName === 'PopularPage') {
          lableName = '最热';
        } else if (routeName === 'TrendingPage') {
          lableName = '趋势';
        }
        else if (routeName === 'FavoritePage') {
          lableName = '收藏';
        }
        else if (routeName === 'MyPage') {
          lableName = '我的';
        }
        return <Text style={{ color: tintColor }}>{lableName}</Text>;

      },
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === 'PopularPage') {
          return <Image style={[{ width: 22, height: 22 }, { tintColor: tintColor }]} source={require('../../res/images/ic_polular.png')} />
        }
        else if (routeName === 'TrendingPage') {
          return <Image style={[{ width: 22, height: 22 }, { tintColor: tintColor }]} source={require('../../res/images/ic_trending.png')} />
        }
        else if (routeName === 'FavoritePage') {
          return <Image style={[{ width: 22, height: 22 }, { tintColor: tintColor }]} source={require('../../res/images/ic_favorite.png')} />
        }
        else if (routeName === 'MyPage') {
          return <Image style={[{ width: 22, height: 22 }, { tintColor: tintColor }]} source={require('../../res/images/ic_my.png')} />
        }
      },
    }),
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'gray',
    },
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    tabBarComponent: (props) => {//自定义tabbar，props入参
      return <CustumTabBar {...props} />
    },


  },



);


class CustumTabBar extends React.Component {
  constructor(props) {
    super(props);
    // console.log('--------------');
    // console.log(props);
    this.activeTintColor = this.props.navigation.state.params.theme.themeColor ? this.props.navigation.state.params.theme.themeColor : this.props.activeTintColor;
    this.inactiveTintColor = this.props.inactiveTintColor;
    this.state = {
      index: 0
    }
  }


  render() {
    return (
      <ImageBackground
        source={require('../../res/images/tabBarBack.png')}
        style={{ height: 60, flexDirection: 'row', justifyContent: 'space-between' }}

      >

        <TouchableWithoutFeedback
          style={{ flex: 1}}
          onPress={() => {
            this.props.navigation.navigate('PopularPage')//跳转到PopularPage
            this.setState({
              index: 0

            })
          }}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={{ width: 25, height: 25, marginBottom: 10, tintColor: this.state.index == 0 ? this.activeTintColor : this.inactiveTintColor }}
              source={require('../../res/images/ic_polular.png')}
            />
            <Text style={{ color: this.state.index == 0 ? this.activeTintColor : this.inactiveTintColor }}>最热</Text>
          </View>

        </TouchableWithoutFeedback>

        {/* ------------------ */}

        <TouchableWithoutFeedback
          style={{ flex: 1}}
          onPress={() => {
            this.props.navigation.navigate('TrendingPage')//跳转到TrendingPage
            this.setState({
              index: 1
            })
          }}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={{ width: 25, height: 25, marginBottom: 10, tintColor: this.state.index == 1 ? this.activeTintColor : this.inactiveTintColor }}
              source={require('../../res/images/ic_trending.png')}
            />
            <Text style={{ color: this.state.index == 1 ? this.activeTintColor : this.inactiveTintColor }}>趋势</Text>
          </View>

        </TouchableWithoutFeedback>


        {/* ------------------- */}

        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={() => {
            this.props.navigation.navigate('FavoritePage')//跳转到FavoritePage
            this.setState({
              index: 2
            })
          }}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={{ width: 25, height: 25, marginBottom: 10, tintColor: this.state.index == 2 ? this.activeTintColor : this.inactiveTintColor }}
              source={require('../../res/images/ic_favorite.png')}
            />
            <Text style={{ color: this.state.index == 2 ? this.activeTintColor : this.inactiveTintColor }}>收藏</Text>
          </View>

        </TouchableWithoutFeedback>


        {/* ------------------- */}
        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={() => {
            this.props.navigation.navigate('MyPage')//跳转到MyPage
            this.setState({
              index: 3
            })
          }}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={{ width: 25, height: 25, marginBottom: 10, tintColor: this.state.index == 3 ? this.activeTintColor : this.inactiveTintColor }}
              source={require('../../res/images/ic_my.png')}
            />
            <Text style={{ color: this.state.index == 3 ? this.activeTintColor : this.inactiveTintColor }}>我的</Text>
          </View>

        </TouchableWithoutFeedback>


      </ImageBackground>
    )
  }
}

