

/**
 * 直接导出一个方法，导入的时候写明的是方法，而不是js类名称
 * @param {} promise 
 */
// export default function makeCancelable(promise) {
//     let hasCanceled_=false;
//     const wrappedPromise=new Promise((resolve,reject)=>{
//         promise.then((val)=>{
//             hasCanceled_?reject({isCanceled:true}):resolve(val)
//         });
//         promise.catch((error)=>{
//             hasCanceled_?reject({isCanceled:true}):resolve(error)
//         })
//     });
//     return {
//         promise:wrappedPromise,
//         cancel(){
//             hasCanceled_=true;
//         }
//     }

// }

/**
 * 两个方式都可以，下面的更容易理解
 */

export default class Cancelable {

    constructor(){
        this.hasCanceled_ = false;
    }

    static makeCancelable(promise) {

        const wrappedPromise=new Promise((resolve,reject)=>{
            promise.then((val)=>{
                this.hasCanceled_?reject({isCanceled:true}):resolve(val)
            });
            promise.catch((error)=>{
                this.hasCanceled_?reject({isCanceled:true}):resolve(error)
            })
        });
        return {
            promise:wrappedPromise
        }
    }

    static cancel(){
        this.hasCanceled_=true;
    }




}