/**
 * Created by Administrator on 2018/8/9.
 */
var User=require('../models/User');
var Category=require('../models/Category');
var Content=require('../models/Content');
exports.index=function (req,res,next){

    res.render("admin/index",{
        userInfo:req.userInfo
    });
};
exports.user=function (req,res,next){

    /**
     * 从数据库中读取所有用户数据
     * limit(Number):限制获取的数据条数
     * skip(2):忽略数据的条数
     *
     * 每页显示2条；
     * 1:1-2 skip:0
     * 2:3-4 skip:2
     */

    var page=Number(req.query.page||1);
    var limit=2;
    var skip=0;
    var pages=0;
    var counts=0;
    User.count().then(function (count) {
        counts=count;
        //计算总页数
        pages=Math.ceil(count/limit);
        //取值不能超过pages
        page=Math.min(page,pages);//取小值pages
        //取值不能小于1；
        page=Math.max(page,1);//取大值1
        skip=(page-1)*limit;
        User.find().limit(limit).skip(skip).then(function (users) {
            console.log(users);
            res.render("admin/user_index",{
                userInfo:req.userInfo,
                users:users,
                page:page,
                pages:pages,
                limit:limit,
                count:counts
            });
        })
    })
};
exports.category=function (req,res) {
    var page=Number(req.query.page||1);
    console.log("category page:",page);
    var limit=2;
    var skip=0;
    var pages=0;
    var counts=0;
    Category.count().then(function (count) {
        counts=count;
        //计算总页数
        pages=Math.ceil(count/limit);
        //取值不能超过pages
        page=Math.min(page,pages);//取小值pages
        console.log("category page2:",page);
        //取值不能小于1；
        page=Math.max(page,1);//取大值1
        skip=(page-1)*limit;
        Category.find().sort({_id:1}).limit(limit).skip(skip).then(function (categories) {
            console.log(categories);
            res.render("admin/category_index",{
                userInfo:req.userInfo,
                categories:categories,
                page:page,
                pages:pages,
                limit:limit,
                count:counts
            });
        })
    })
};
exports.categoryAddGet=function (req,res) {
    res.render("admin/category_add",{
        userInfo:req.userInfo,
    })
};
exports.categoryAddPost=function (req,res) {
    console.log(req.body);
    var name=req.body.name;
    if(name==""){
        res.render("admin/error",{
            userInfo:req.userInfo,
            message:"名称不能为空"
        });
        return;
    }
    //数据库中是否已经存在同名分类名称
    Category.findOne({
        name:name
    }).then(function (rs) {
        if(rs){
            //数据库中已经存在该分类
            res.render("admin/error",{
                userInfo:req.userInfo,
                message:"分类已经存在了"
            });
            return Promise.reject();
        }else {
            //数据库中不存在
            return new Category({name:name}).save()
        }
    }).then(function (newCategory) {
        res.render("admin/success",{
            userInfo:req.userInfo,
            message:"分类保存成功",
            url:"/admin/category"
        })
    });
};
exports.categoryEditGet=function (req,res) {
    //获取要修改的信息，并且用表单的形式展示出来
    var id=req.query.id||"";
    //获取要修改的分类信息
    Category.findOne({
        _id:id
    }).then(function (category) {
        if(!category){
            res.render("admin/error",{
                userInfo:req.userInfo,
                message:"分类信息不存在"
            });
            return Promise.reject();
        }else {
            res.render("admin/category_edit",{
                userInfo:req.userInfo,
                category:category
            });
        }
    });
};
exports.categoryEditPost=function (req,res) {
    //获取要修改的分类的信息，并且用表单的形式展示出来
    var id=req.query.id||"";
    //获取post提交过来的名称
    var name=req.body.name||"";
    Category.findOne({
        _id:id
    }).then(function (category) {
        if(!category){
            res.render("admin/error",{
                userInfo:req.userInfo,
                message:"分类信息不存在"
            });
            return Promise.reject();
        }else {
            //当用户没有做任何的修改提交的时候
            if(name==category.name){
                res.render("admin/success",{
                    userInfo:req.userInfo,
                    message:"修改成功",
                    url:"/admin/category"
                });
                return Promise.reject();
            }else {
                //要修改的分类名称是否已经在数据库中存在
                return Category.findOne({
                    _id:{$ne:id},
                    name:name
                })
            }



        }
    }).then(function (sameCategory) {
        if(sameCategory){
            res.render('admin/error',{
                userInfo:req.userInfo,
                message:"数据库中已经存在同名分类"
            });
            return Promise.reject();
        }else{
            return Category.update({
                _id:id
            },{
                name:name
            });
        }
    }).then(function () {
        res.render('admin/success',{
            userInfo:req.userInfo,
            message:"修改成功",
            url:'/admin/category'
        });
    });
};
exports.categoryDelete=function (req,res) {
    var id=req.query.id||"";
    Category.remove({
        _id:id
    }).then(function () {
        res.render('admin/success',{
            userInfo:req.userInfo,
            message:"删除成功",
            url:'/admin/category'
        });
    })
};
exports.content=function (req,res) {
    var page=Number(req.query.page||1);
    console.log("Content page:",page);
    var limit=2;
    var skip=0;
    var pages=0;
    var counts=0;
    Content.count().then(function (count) {
        counts=count;
        //计算总页数
        pages=Math.ceil(count/limit);
        //取值不能超过pages
        page=Math.min(page,pages);//取小值pages
        console.log("Content page2:",page);
        //取值不能小于1；
        page=Math.max(page,1);//取大值1
        skip=(page-1)*limit;
        Content.find().sort({_id:1}).limit(limit).skip(skip).then(function (contents) {
            console.log(contents);
            res.render("admin/content_index",{
                userInfo:req.userInfo,
                contents:contents,
                page:page,
                pages:pages,
                limit:limit,
                count:counts
            });
        })
    })

};
exports.contentAddGet=function (req,res) {
    Category.find().sort({_id:-1}).then(function (categories) {
        res.render("admin/content_add",{
            userInfo:req.userInfo,
            categories:categories
        });
    });
};
exports.contentAddPost=function (req,res) {
    console.log(req.body);
    if(req.body.category==''){
        res.render("admin/error",{
            userInfo:req.userInfo,
            message:"内容分类不能为空"
        });
        return;
    }
    if(req.body.title==''){
        res.render("admin/error",{
            userInfo:req.userInfo,
            message:"内容标题不能为空"
        });
        return;
    }
    //保存数据到数据库
    new Content({
        category:req.body.category,
        title:req.body.title,
        description:req.body.description,
        content:req.body.content
    }).save().then(function (rs) {
        res.render("admin/success",{
            userInfo:req.userInfo,
            message:"保存成功",
            url:"/admin/content"
        });
    });
};

