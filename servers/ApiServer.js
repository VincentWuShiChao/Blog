/**
 * Created by Administrator on 2018/8/9.
 */

//统一返回格式
var responseData;
exports.index=function (req,res,next) {
    responseData={
        code:0,
        message:""
    };
    next();
};
exports.register=function (req,res,next){
    console.log(req.body);
    var username=req.body.username;
    var password=req.body.password;
    var repassword=req.body.repassword;

    //用户是否为空
    if(username==''){
        responseData.code=1;
        responseData.message="用户不能为空";
        res.json(responseData);
        return;
    }
    //密码不能为空
    if(password==''){
        responseData.code=2;
        responseData.message="密码不能为空";
        res.json(responseData);
        return;
    }
    //两次密码不一致
    if(password!=repassword){
        responseData.code=3;
        responseData.message="两次密码必须一致";
        res.json(responseData);
        return;
    }
    //用户名是否已经被注册
    User.findOne({
        username:username
    }).then(function (userInfo) {
        console.log(userInfo);
        if(userInfo){
            //数据库存在该用户
            responseData.code=4;
            responseData.message="用户名被注册";
            res.json(responseData);
            return;
        }
        //保存注册的信息到数据库中
        var user=new User({
            username:username,
            password:password
        });
        return user.save();

    }).then(function (newUserInfo) {
        //console.log(newUserInfo);
        responseData.message="注册成功";
        res.json(responseData);
    });
};
exports.login=function (req,res) {
    var username=req.body.username;
    var password=req.body.password;
    if(username==""||password==""){
        responseData.code=1;
        responseData.message="用户名和密码不能为空";
        res.json(responseData);
        return;
    }

    //查询数据库中相同用户名和密码的记录是否存在，如果存在则登录成功
    User.findOne({
        username:username,
        password:password
    }).then(function (userInfo) {
        if(!userInfo){
            responseData.code=2;
            responseData.message="用户名或密码错误";
            res.json(responseData);
            return;
        }
        //用户名和密码是正确的
        responseData.message="登录成功";
        req.cookies.set("userInfo",JSON.stringify({
            _id:userInfo._id,
            username:userInfo.username
        }));
        responseData.userInfo={
            _id:userInfo._id,
            username:userInfo.username
        };
        res.json(responseData);

    })
};
exports.logout=function (req,res) {
    req.cookies.set("userInfo",null);//将浏览器的cookie设置为空
    res.json(responseData);
};