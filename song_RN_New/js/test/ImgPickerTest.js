

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback


} from 'react-native';
import NavigationBar from '../common/NavigationBar'

export default class testComponentPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: '',
        }
    }

    render() {

        var navi =                
            <NavigationBar
                title={'testComponent'}
                titleColor={{
                    color: 'white'
                }}
                style={{
                    backgroundColor: 'red'
                }}
                statusBar={{
                    backgroundColor: 'red',
                    barStyle: 'light-content',
                    hide: false,
                }}
             />


        return (
            <View>
                
            </View>
            
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    text: {
        fontSize: 20,
    }

});