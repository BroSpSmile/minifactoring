// 云函数入口文件
const cloud = require('wx-server-sdk')
const request = require('request')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => new Promise((resolve, reject) =>{
  const wxContext = cloud.getWXContext()
  request.get('http://47.92.246.72:8000/combo/indexsteps?openId=' + wxContext.OPENID, (error, response, body) => {
      if(error){
        console.error(error);
      }else{
        console.log(body);
        resolve(JSON.parse(body));
      }
    });

})