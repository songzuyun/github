

//es6之前用函数创建一个组件
// export default function ProjectModel(item,isFavorite){
//     this.item = item;
//     this.isFavorite = isFavorite;
// }


//es6 用class创建一个组件
/**
 * 两种写法都可以，但下面的方法更容易理解，就是一个类，如果定义了静态方法，直接类调用或者创建对象调用都可以
 */
export default class ProjectModel{

    constructor(item,isFavorite){
        this.item = item;
        this.isFavorite = isFavorite;
    }

}