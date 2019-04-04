


import React, { Component } from 'react';
import {
  AsyncStorage
} from 'react-native';
import keys from '../../../res/data/keys.json'
import langs from '../../../res/data/langs.json'
export var FLAG_LANGUAGE = {flag_language: 'language_dao_language', flag_key: 'language_dao_key'}
export default class LanguageDao{
    constructor(flag){
        this.flag=flag;
    }
    fetch(){
        return new Promise((resolve,reject)=>{
            AsyncStorage.getItem(this.flag,(error,result)=>{
                if(error){
                    reject(error)
                }
                else{
                    if(result){
                        try {
                            resolve(JSON.parse(result))
                        } catch (error) {
                            reject(error)
                        }
                        
                    }else{
                        var data = this.flag===FLAG_LANGUAGE.flag_language?langs:keys
                        this.save(data)
                        resolve(data)
                    }
                }
            })
        })
    }

    save(data){
        AsyncStorage.setItem(this.flag,JSON.stringify(data),(error)=>{
            
        })
    }


}