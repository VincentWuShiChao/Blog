/**
 * Created by 毅 on 2016/8/28.
 */

var mongoose = require('mongoose');

//内容的表结构
module.exports = new mongoose.Schema({

    //关联字段-内容分类的id
    category:{
        //类型
        type:mongoose.Schema.Types.ObjectId,
        //引用
        ref:'Content'
    },
    //分类标题
    title: String,
    //简介
    description:{
        type:String,
        defalut:""
    },
    //内容
    content:{
        type:String,
        defalut:""
    }

});