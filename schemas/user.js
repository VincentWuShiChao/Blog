/**
 * Created by Administrator on 2018/7/13.
 */
var mongoose=require('mongoose');

//用户的表结构
var userSchema=new mongoose.Schema({
    //用户名
    username:String,
    //密码
    password:String,
    //是否是管理员
    isAdmin:{
        type:Boolean,
        default:false
    }
});

module.exports=userSchema;

