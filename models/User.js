/**
 * Created by Administrator on 2018/7/13.
 */
var mongoose=require('mongoose');

var usersSchema=require('../schemas/user');

var userModel=mongoose.model("User",usersSchema);

module.exports=userModel;