// 小程序开发api接口工具包，https://github.com/gooking/wxapi
const CONFIG = require('./config.js')
const API_BASE_URL = 'https://shop.bitool.cn'
const REQUEST_API_KEY = '15cce31376e607128b0ebe22bea1babc'

const request = (action, needSubDomain, method, data) => {
  let _url = API_BASE_URL + (needSubDomain ? '/' + CONFIG.subDomain : '') + action + '?apikey=' + REQUEST_API_KEY
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: method,
      data: data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(request) {
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      },
      complete(aaa) {
        // 加载完成
      }
    })
  })
}

const request2 = (action, needSubDomain, method, page, qty, data) => {
  let _url = API_BASE_URL + (needSubDomain ? '/' + CONFIG.subDomain : '') + action + '?apikey=' + REQUEST_API_KEY + '&page='+ page + '&qty='+qty
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: method,
      data: data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(request) {
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      },
      complete(aaa) {
        // 加载完成
      }
    })
  })
}

/**
 * 小程序的promise没有finally方法，自己扩展下
 */
Promise.prototype.finally = function(callback) {
  var Promise = this.constructor;
  return this.then(
    function(value) {
      Promise.resolve(callback()).then(
        function() {
          return value;
        }
      );
    },
    function(reason) {
      Promise.resolve(callback()).then(
        function() {
          throw reason;
        }
      );
    }
  );
}

module.exports = {
  request,
  request2,
  banners: (data) => {
    return request('/specialAd', true, 'get', data)
  },
  getHomeList: (data) => {
    return request('/home', true, 'POST', data)
  },
  getKeyWordList: (data) => {
    return request('/searchhotkeyword', true, 'post', data)
  },
  getRecommGoodsList: (data) => {
    return request('/recommGoodsList', true, 'get', data)
  },  
  getSearchGoods: (page, qty, data) => {
    return request2('/searchGoods', true, 'post', page, qty, data)
  },
  getProductList: (data) => {
    return request('/goodsList', true, 'get', data)
  },

  getGroupProductList: (page, qty, data) => {
    return request2('/goodsGroup', true, 'post', page, qty, data)
  },
  goodsDetail: (data) => {
    return request('/goodsInfo', true, 'post', data)
  },

  getGoodsCategory: (data) => {
    return request('/goodsClass', true, 'post', data)
  },

  getDropTillBuyList: (data) => {
    return request('/dropTillBuyList', true, 'get', data)
},
  shopCardList: (user_unionid, user_token) => {
    return request('/cartData', true, 'post', {
      user_unionid,
      user_token
    })
  },

  shopCardAdd: (data) => {
    return request('/addCart', true, 'post', data)
  },

  shopCardUpdate: (data) => {
    return request('/updateCart', true, 'post', data)
  },

  shopCardDelete: (goods_key, user_unionid, user_token) => {
    return request('/delCartGoods', true, 'post', {
      goods_key,
      user_unionid,
      user_token
    })
  },

  shopCardClear: (user_unionid, user_token) => {
    return request('/clearCart', true, 'post', {
      user_unionid,
      user_token
    })
  },

  getMemberDesc: (data) => {
    return request('/invitedCodeInfo', true, 'get', data)
  },

  queryAddress: (user_token) => {
    return request('/addressList', true, 'post', {
      user_token
    })
  },
  saveAddress: (data) => {
    return request('/saveAddress', true, 'post', data)
  },
  deleteAddress: (data) => {
    return request('/delAddress', true, 'post', data)
  },

  regionList: (data) => {
    return request('/region', true, 'post', data)
  },

  nextRegion: (region_top_id) => {
    return request('/region', true, 'post', {
      region_top_id
    })
  },

  shareGoods: (data) => {
    return request('/shareGoods', true, 'post', data)
  },

  shopcarConfirm: (data) => {
    return request('/step', true, 'post', data)
  },

  orderList: (page, qty, data) => {
    return request2('/orderList', true, 'post', page, qty, data)
  },


  orderCreate: (data) => {
    return request('/cartSubmit', true, 'post', data)
  },

  orderDetail: (data) => {
    return request('/showOrder', true, 'post', data)
  },

  payBackOrder: (data) => {
    return request('/orderPayBack', true, 'post', data)
  },
  refundOrder: (data) => {
    return request('/submitRefundOrderGoods', true, 'post', data)
  },

  refundOrderList: (data) => {
    return request('/listRefundOrderGoods', true, 'get',data)
  },

  orderCancel: (data) => {
    return request('/cancelOrder', true, 'post', data)
  },

  paytoOrder: (data) => {
    return request('/orderPayFinish', true, 'post', data)
  },

  getPaymentInfo: (data) => {
    return request('/paymentInfo', true, 'post', data)
  },  

  orderAction: (action, data) => {
    return request(action, true, 'post', data)
  },

  crontabList: (data) => {
    return request('/crontabList', true, 'get', data)
  },  


  cashLogs: (data) => {
    return request('/userMoney', true, 'get', data)
  },

  scoreLogs: (page, qty, data) => {
    return request2('/integralLogList', true, 'post', page, qty, data)
  },  

  goVerifyInvitedCode: (data) => {
    return request('/verifyInvitedCode', true, 'post', data)
  }, 

  getMyFriends: (page, qty, data) => {
    return request2('/myFollowers', true, 'post', page, qty, data)
  },
  couponDetail: (id) => {
    return request('/discounts/detail', true, 'get', {
      id
    })
  },
  
  fetchCoupons: (page, qty, data) => {
    return request2('/userCouponList', true, 'post', page, qty, data)
  },   

  addTempleMsgFormid: (data) => {
    return request('/template-msg/wxa/formId', true, 'post', data)
  },

  kanjiaHelp: (kjid, joiner, token, remark) => {
    return request('/shop/goods/kanjia/help', true, 'post', {
      kjid,
      joinerUser: joiner,
      token,
      remark
    })
  },

  sendTempleMsg: (data) => {
    return request('/template-msg/put', true, 'post', data)
  },
  wxpay: (data) => {
    return request('/orderWxPay', true, 'post', data)
  },
  alipay: (data) => {
    return request('/pay/alipay/semiAutomatic/payurl', true, 'post', data)
  },

  withDrawApply: (money, token) => {
    return request('/user/withDraw/apply', true, 'post', {
      money,
      token
    })
  },

  rechargeSendRules: () => {
    return request('/user/recharge/send/rule', true, 'get')
  },
  payBillDiscounts: () => {
    return request('/payBill/discounts', true, 'get')
  },
  payBill: (data) => {
    return request('/payBill/pay', true, 'post', data)
  },

  fxApply: (token, name, mobile) => {
    return request('/saleDistribution/apply', true, 'post', {
      token,
      name,
      mobile
    })
  },
  fxApplyProgress: (token) => {
    return request('/saleDistribution/apply/progress', true, 'get', {
      token
    })
  },
  fxMembers: (data) => {
    return request('/saleDistribution/members', true, 'post', data)
  },
  fxCommisionLog: (data) => {
    return request('/saleDistribution/commision/log', true, 'post', data)
  },
  wxaQrcode: (data) => {
    return request('/qrcode/wxa/unlimit', true, 'post', data)
  }
}