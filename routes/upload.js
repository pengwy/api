var express = require('express');
var router = express.Router();


var fs=require('fs');
let multer  = require('multer')
const bcrypt = require('bcryptjs');
var uploadDir='../cdn/static/images/upload/';
//规定只上传一张图片 使用single
var upload=multer({dest:uploadDir}).single('file');

router.post('/', upload, function (req, res, next) {
    // res.send(req.file);
     //文件上传
     upload(req, res, function(err){
        if(err){
            console.error(err.message);
        }else{
            //获取文件的名称，然后拼接成将来要存储的文件路径
            var des_file=uploadDir+req.file.originalname;
            //读取临时文件
            fs.readFile(req.file.path,function(err,data){
                //将data写入文件中，写一个新的文件
                fs.writeFile(des_file,data,function(err){
                    if(err){
                        console.error(err.message);
                    }else{
                        var reponse={
                            message:'File uploaded successfully',
                            filename:req.file.originalname
                        };
                        //删除临时文件
                        fs.unlink(req.file.path,function(err){
                            if(err){
                                console.error(err.message);
                            }else{
                                console.log('delete '+req.file.path+' successfully!');
                            }
                        });
                    }
                    res.send(JSON.stringify(reponse));
                });
            });
        }
    })
    return
});


module.exports = router;