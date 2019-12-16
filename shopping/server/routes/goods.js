var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');


// 连接mongodb数据库
mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true } ,function(err){
  if(err){
    console.log('连接数据库失败：'+err);
  }else{
    console.log('连接数据库成功！');
  }

});

mongoose.connection.on("connected",function(){
  console.log("MongoDB connected success")
})

mongoose.connection.on("error",function(){
  console.log("MongoDB connected failed")
})

mongoose.connection.on("disconnected",function(){
  console.log("MongoDB connected disconnected")
})

// 查询商品列表
router.get("/list",function(req,res,next){
  let page = parseInt(req.param("page"));
  let pageSize = parseInt(req.param("pageSize"));
  let priceLevel = req.param("priceLevel");

  let sort = req.param("sort");
  let skip = (page-1)*pageSize;

  let priceGt = '',priceLte = '';
  let params = {};
  if(priceLevel != 'all'){
    switch (priceLevel) {
      case '0' : priceGt = 0;priceLte = 100;break;
      case '1' : priceGt = 100;priceLte = 500;break;
      case '2' : priceGt = 500;priceLte = 1000;break;
      case '3' : priceGt = 1000;priceLte = 5000;break;
    }
    params = {
      salePrice : {
        $gt : priceGt,
        $lte : priceLte
      }
    }
  }
  let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
  goodsModel.sort({'salePrice':sort});
  goodsModel.exec(function(err,doc){
    if(err){
      res.json({
        status:'1',
        msg:err.message
      })
    }else{
      res.json({
        status:'0',
        msg:'',
        result:{
          count:doc.length,
          list:doc
        }
      })
    }
  })
})

// 加入到购物车
router.post("/addCart",function (req,res,next) {
  let userId = '100000077',productId = req.body.productId;
  let User = require('../models/user');

  User.findOne({userId:userId},function (err,userDoc) {
    if(err){
      res.json({
        status:"1",
        msg:err.message
      })
    }else{
      // console.log("userDoc" + userDoc );
      // console.log("userDoc" + userDoc.cartList );
      if(userDoc){
        let goodsItem ='';
        userDoc.cartList.forEach(function (item,index) {
          if(item.productId == productId){
            goodsItem = item;
            item.productNum = parseInt(item.productNum);
            item.productNum++;
          }
        })
        if(goodsItem){
          console.log(goodsItem);
          userDoc.save(function(err2,doc2){
            if(err2){
              res.json({
                status:"1",
                msg:err2.message
              })
            }else{
              res.json({
                status:"0",
                msg:'',
                result:"suc"
              })
            }
          })
        }else{
          Goods.findOne({productId:productId},function (err1,doc) {
            if(err1){
              console.log(err1);
              res.json({
                status:"1",
                msg:err1.message
              })
            }else{
              if(doc){
                console.log(doc);
                doc.productNum = 1;
                doc.checked = 1;
                userDoc.cartList.push(doc);
                userDoc.save(function(err2,doc2){
                  if(err2){
                    res.json({
                      status:"1",
                      msg:err2.message
                    })
                  }else{
                    res.json({
                      status:"0",
                      msg:'',
                      result:"suc"
                    })
                  }
                })
              }
            }
          })
        }

      }
    }
  })
})
module.exports = router;
