/**
 * Created by 毅 on 2016/8/28.
 */

var mongoose = require('mongoose');
let categoriesSchema= new mongoose.Schema({

    //分类名称
    name: String

});
//分类的表结构
module.exports =categoriesSchema;