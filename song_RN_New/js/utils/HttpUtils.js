export default class HttpUtils{
    static get(url){
        return new Promise((resolve,reject)=>{
            fetch(url)
            .then(response=>response.json())
            .then(result=>{
                resolve(result)
            })
            .catch(error=>{
                reject(error)
            })
        })
    }

    static post(url,data){
        return new Promise((resolve,reject)=>{
            fetch(url,{
                method: 'POST',//请求方式
                headers: {//数据类型
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body:JSON.stringify(data)//入参
            })
            .then(response=>response.json())
            .then(result=>{
                resolve(result)
            })
            .catch(error=>{
                reject(error)
            })
        })
    }
}