import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,

} from 'react-native';
import HTMLView from 'react-native-htmlview';

export default class TrendingCellPage extends Component {


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

        let description = item.description;

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
                    <Text style={{marginBottom:3,color:'#212121',fontSize:16}}>{item.fullName}</Text>
                    <HTMLView
                        value={description}
                        onLinkPress={(url) => {}}
                    />
        
                    <Text>{item.meta}</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}> 
                            <Text>Build By:</Text>
                            {item.contributors.map((result,i,arr)=>{
                                return <Image key={i} style={{height:22,width:22}} source={{uri:arr[i]}}/>
                                
                            })}
                            
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