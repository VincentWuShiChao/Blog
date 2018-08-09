/**
 * Created by Administrator on 2018/7/13.
 */
var express=require('express');
var router=express.Router();
var MainServer=require('../servers/MainServer');




router.get("/",MainServer.findAllCategories);
router.get("/view", MainServer.view);





module.exports=router;