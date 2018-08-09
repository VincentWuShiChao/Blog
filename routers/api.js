/**
 * Created by Administrator on 2018/7/13.
 */
var express=require('express');
var router=express.Router();
var User=require('../models/User');
var ApiServer=require('../servers/ApiServer');

router.use(ApiServer.index);
/**
 * 用户注册
 *      注册逻辑：
 *          1.用户名不能为空
 *          2.密码不能为空
 *          3.两次输入的密码必须一致
 *
 *          4.用户是否已经被注册
 *              数据库查询
 */
router.post("/user/register",ApiServer.register);
/**
 * 登录
 */
router.post("/user/login", ApiServer.login);
/**
 * 退出
 */
router.get("/user/logout", ApiServer.logout);
module.exports=router;