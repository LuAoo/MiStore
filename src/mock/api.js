/* 
MockJS的数据定义
*/
import Mock from 'mockjs';
Mock.mock('/api/user/login', {
  "status": 0,
  "data": {
    "id": 12,
    "username": "admin",
    "email": "admin@51purse.com",
    "phone": null,
    "role": 0,
    "createTime": 1479048325000,
    "updateTime": 1479048325000
  }
});
Mock.mock('/api/user/data', {
  "status": 0,
  "data": {
    "data": 9888888888888888888888,
  }
})