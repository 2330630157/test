// 小程序开发api接口工具包，https://github.com/gooking/wxapi
const CONFIG = require('./config.js')
const API_BASE_URL = 'https://dapp.bitool.cn'
const REQUEST_MOBILE_SIGN_ACOUNT = 'efeaf5de519976c71ec1204e331a1fd5'
const REQUEST_MOBILE_SIGN_PEOPLE = 'bdeddada45d83fe3917e7ac951b0f7f4'

const request = (type, action, needSubDomain, method, data) => {
  wx.showLoading()
  const tempAction = action;
  var tempSign = '';
  if (type == 1){
    tempSign = REQUEST_MOBILE_SIGN_ACOUNT;
  }else{
    tempSign = REQUEST_MOBILE_SIGN_PEOPLE;
  }
  let _url = API_BASE_URL + (needSubDomain ? '/' + CONFIG.subDomain : '') + action + '?mobile_sign=' + tempSign
  return new Promise((resolve, reject) => {
    let cookie = wx.getStorageSync('cookieKey');
    let header = { 'Content-Type': 'application/x-www-form-urlencoded' }
    if (cookie) {
      header.Cookie = cookie
    }
    // console.log('dapp_main header', header)
    wx.request({
      url: _url,
      method: method,
      data: data,
      header: header,
      success(request) {
        if (request.header){
          // console.log('set cookie tempAction', tempAction)
          // console.log('set cookie request', request)
          if (tempAction == "/api/account/wechat_check_reg/" || tempAction == "/api/account/wechat_login/"){
            if (request.cookies){
              var tempCookie = request.cookies
              var cookie = ''
              for (var i = 0; i < tempCookie.length; i++) {
                cookie = cookie + tempCookie[i] + ';'
              }
              // console.log('cookieKey', cookie)
              wx.setStorageSync('cookieKey', cookie)
            }else{
              if (request.header) {
                var tempCookie = request.header['Set-Cookie']
                // console.log('tempCookie', tempCookie)
                wx.setStorageSync('cookieKey', tempCookie)
              }
            }
          } 
        }
    
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      },
      complete(aaa) {
        wx.hideLoading()
        // 加载完成
      }
    })
  })
}


/**
 * 小程序的promise没有finally方法，自己扩展下
 */
Promise.prototype.finally = function (callback) {
  var Promise = this.constructor;
  return this.then(
    function (value) {
      Promise.resolve(callback()).then(
        function () {
          return value;
        }
      );
    },
    function (reason) {
      Promise.resolve(callback()).then(
        function () {
          throw reason;
        }
      );
    }
  );
}

module.exports = {
  request,
  checkToken: (token) => {
    return request(1, '/api/account/check-token/', false, 'post', {
      token
    })
  },
  //微信小程序用户检测注册绑定
  checkUserReg: (code) => {
    return request(1, '/api/account/wechat_check_reg/', false, 'post', {
      code
    })
  },
  //开发调试用，登录138000000,123456
  login: (data) => {
    return request(1, '/api/account/app_mobile_login_process/', false, 'post', data)
  },

  getVerificationCode: (data) => {
    return request(1, '/api/account/login_send_code/', false, 'post', data)
  },  
  //微信小程序注册/登陆
  register: (data) => {
    return request(1, '/api/account/wechat_login/', false, 'post', data)
  },

  taskList: (data) => {
    return request(2, '/api/people/task_list/', false, 'get', data)
  },  

  taskCheckin: (data) => {
    return request(2, '/api/people/check_in/', false, 'post', data)
  },  
  //获取用户邀请二维码海报图片接口API
  wxaQrcode: (data) => {
    return request(2, '/api/people/share_img/', false, 'get', data)
  },

  userUpdate: (data) => {
    return request(2, '/api/people/user_info_edit/', false, 'POST', data)
  },

  userAmount: (data) => {
    return request(2, '/api/people/user_info_latest/', false, 'post', data)
  },

  getEncryptedData: (data) => {
    return request(1, '/api/account/wechat_encrypted_data/', false, 'post', data)
  },  

}