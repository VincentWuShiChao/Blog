/**
 * Created by 毅 on 2016/8/28.
 */

var mongoose = require('mongoose');
var categoriesSchema = require('../schemas/categories');
let categoryModel=mongoose.model('Category', categoriesSchema);
module.exports =categoryModel;