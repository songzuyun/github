import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
    TouchableWithoutFeedback

} from 'react-native';

export default class RepositoryCellPage extends Component {

    constructor(props){
        super(props);
        this.state={
            isFavorite:this.props.projectModel.item.isFavorite,
            favoriteIcon:this.props.projectModel.item.isFavorite?require('../../res/images/ic_star.png'):require('../../res/images/ic_unstar_transparent.png')
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setFavoriteState(nextProps.projectModel.item.isFavorite)
    }


    setFavoriteState(isFavorite){
        this.setState({
            isFavorite:isFavorite,
            favoriteIcon:isFavorite?require('../../res/images/ic_star.png'):require('../../res/images/ic_unstar_transparent.png')
        })

    }

    onPressFavorite(){
        this.setFavoriteState(!this.state.isFavorite);
        this.props.onFvorite(this.props.projectModel.item.item,!this.state.isFavorite);
    }

    render(){

        let item = this.props.projectModel.item.item?this.props.projectModel.item.item:this.props.projectModel.item;

        let favoriteButton = <TouchableOpacity
            onPress={()=>{this.onPressFavorite()}}
        
        >
            <Image  style={[{width: 22, height: 22,},this.props.theme.styles.tabBarSelectedIcon]} source={this.state.favoriteIcon}/>

        </TouchableOpacity>

        return(
            <TouchableOpacity
                onPress={this.props.onSelect}
                style={{backgroundColor:'white'}}
            >
                <View style={styles.container}>
                    <Text style={{marginBottom:3,color:'#212121',fontSize:16}}>{item.full_name}</Text>
                    <Text style={{marginBottom:3,color:'#757575',fontSize:14}}>{item.description}</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text>Autor:</Text>
                            <Image style={{height:22,width:22}} source={{uri:item.owner.avatar_url}}/>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text>Stars:</Text>
                            <Text>{item.stargazers_count}</Text>
                        </View>
                        {favoriteButton}
                        
                    </View>

                </View>
            </TouchableOpacity>

        )
    }
}

const styles = StyleSheet.create({
    container:{
        padding:5,
        margin:5,
        borderWidth:0.5,
        borderColor:'#dddddd',
        borderRadius:3,
        shadowColor:'black',
        shadowOffset:{width:0.5,height:0.5},
        shadowOpacity:0.4,
        shadowRadius:1,
        elevation:2//android
    }
})