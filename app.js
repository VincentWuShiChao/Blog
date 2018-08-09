var express=require('express');
var swig=require('swig');//模板处理模块
var mongoose=require('mongoose');
var bodyParser=require('body-parser');//加载body-parser,用于处理post提交过来的数据
var Cookies=require('cookies');
var User=require('./models/User');

var app=express();

//第一个参数：模板引擎的名称，同时也是模板文件的后缀，第二个参数表示用于解析处理模块内容方法
app.engine("html",swig.renderFile);
//设置模板文件存放的目录，第一个参数必须是views，第二个参数是目录
app.set("views","./views");
//注册所使用的模板引擎，第一个参数不可变，第二个参数和app.engine这个方法的模板引擎名称是一致的
app.set("view engine","html");

//在开发过程中，需要取消模板缓存
swig.setDefaults({cache:false});

//设置静态文件托管
app.use("/public",express.static(__dirname+"/public"));
//加载body-parser,用于处理post提交过来的数据
app.use(bodyParser.urlencoded({extended:true}));//给app的req添加了body属性
//设置cookie
app.use(function (req,res,next) {
    req.cookies=new Cookies(req,res);
    //解析登录用户的cookie信息
    req.userInfo={};
    if(req.cookies.get("userInfo")){
        try{
            req.userInfo=JSON.parse(req.cookies.get("userInfo"));
            //获取当前登录用户的类型，是否是管理员
            User.findById(req.userInfo._id).then(function (userInfo) {
                req.userInfo.isAdmin=Boolean(userInfo.isAdmin);
                console.log("app:",req.userInfo.isAdmin);
                next();
            })
        }catch (e){
        }
    }else {
        next();
    }

})
/**
 * 根据不同的功能划分模块
 */
app.use("/admin",require('./routers/admin'));
app.use("/api",require('./routers/api'));
app.use("/",require('./routers/main'));

/*
app.get("/", function (req,res,next) {
    //第一个参数：表示模板的文件，相对于views目录
    //第二个参数：传递给模板使用的参数
    res.render('index');
});
*/

mongoose.connect('mongodb://localhost/blog', function (err) {
    if(err){
        console.log("数据库连接失败！");
        return;
    }
    console.log("数据库连接成功！");
    app.listen(3000, function () {
        console.log("服务器开启成功");
    });

});
