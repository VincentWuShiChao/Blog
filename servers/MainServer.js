/**
 * Created by Administrator on 2018/8/9.
 */
var Category=require('../models/Category');
exports.findAllCategories= function (req,res,next){
    //读取所有的分类信息
    Category.find().then(function (categories) {
        //console.log(categories);
        res.render("main/index",{
            userInfo:req.userInfo,
            categories:categories
        });
    });
};
exports.view= function (req,res,next) {
    res.send("内容页");
}