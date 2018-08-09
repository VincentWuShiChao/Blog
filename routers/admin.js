/**
 * Created by Administrator on 2018/7/13.
 */
var express=require('express');
var router=express.Router();
var AdminServer=require('../servers/AdminServer');

router.use(function (req,res,next) {
    console.log("admin:",req.userInfo.isAdmin);
    if(!req.userInfo.isAdmin){
        //如果当前是非管理员
        res.send("对不起只有管理员才能进入该页面");
        return;
    }
    next();
});
router.get("/", AdminServer.index);
/**
 * 用户管理
 */
router.get("/user", AdminServer.user);
/**
 * 分类首页
 */
router.get("/category", AdminServer.category);
/**
 * 分类的添加
 */
router.get("/category/add", AdminServer.categoryAddGet);
/**
 * 分类的保存
 */
router.post("/category/add", AdminServer.categoryAddPost);
/**
 * 分类的修改
 */
router.get("/category/edit", AdminServer.categoryEditGet);
/**
 * 分类的修改保存
 */
router.post('/category/edit', AdminServer.categoryEditPost);
/**
 * 分类删除
 */
router.get('/category/delete', AdminServer.categoryDelete);
/**
 * 内容首页
 *
 */
router.get("/content", AdminServer.content);
/**
 * 内容添加页面
 *
 */
router.get("/content/add", AdminServer.contentAddGet);
/**
 * 内容保存
 * 
 */
router.post('/content/add', AdminServer.contentAddPost);


module.exports=router;