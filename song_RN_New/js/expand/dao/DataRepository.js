
import React, { Component } from 'react';
import {
  AsyncStorage
} from 'react-native';
import GitHubTrending from 'GitHubTrending'
export var FLAG_STORAGE = {flag_popular:'popular',flag_trending:'trending'}

export default class DataRepository{

    constructor(flag){
        this.flag = flag;
        if(flag===FLAG_STORAGE.flag_trending) this.trending=new GitHubTrending();
    }
    //获取数据
    fetchRepository(url){
        return new Promise((resolve,reject)=>{
            this.fetchLocalRepository(url)
            .then(result=>{
                if(result){
                    resolve(result)
                }
                else{
                    this.fetchNetRepository(url)
                    .then(result=>{
                        resolve(result)
                    })
                    .catch(error=>{
                        reject(error)
                    })
                }
            })
            .catch(error=>{
                this.fetchNetRepository(url)
                    .then(result=>{
                        resolve(result)
                    })
                    .catch(error=>{
                        reject(error)
                    })
            })
        })
    }
    //取本地数据
    fetchLocalRepository(url){
        return new Promise((resolve,reject)=>{
            AsyncStorage.getItem(url,(error,result)=>{
                if(!error){
                    try {
                        resolve(JSON.parse(result))
                        
                    } catch (error) {
                        reject(error)
                    }
                }
                else{
                    reject(error)
                }
            })
        })
    }
    //请求网络
    fetchNetRepository(url){
        return new Promise((resolve,reject)=>{
            if(this.flag===FLAG_STORAGE.flag_trending){
                this.trending.fetchTrending(url)
                .then(result=>{
                    if(!result){
                        reject(new Error('responseData is null'))
                        return;
                    }
                    resolve(result);
                    this.saveRepository(url,result);
                })
                .catch(error=>{
                    reject(error);
                })

            }else{
                fetch(url)
                .then(response=>response.json())
                .then(result=>{
                    if(!result){
                        reject(new Error('responseData is null'));
                        return;
                    }
                    resolve(result);
                    this.saveRepository(url,result.items);
                })
                .catch(error=>{
                    reject(error);
                })
            }

        })
    }
    //保存数据
    saveRepository(url,items){
        if(!url || !items) return;
        let wrapData={items:items,urdate_data:new Date().getTime()};
        AsyncStorage.setItem(url,JSON.stringify(wrapData),(error)=>{
            console.log(error)
        });
    }
    //判断数据是否过时
    checkData(longTime){
        let cDate = new Date();
        let tDate = new Date();
        tDate.setTime(longTime);
        if(cDate.getMonth()!==tDate.getMonth())return false;
        if(cDate.getDay()!==tDate.getDay())return false;
        if(cDate.getHours()-tDate.getHours()>4)return false;
        return true;

    }


}