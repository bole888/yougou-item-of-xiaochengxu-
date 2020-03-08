// pages/auth/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.getUserInfo({
    //   success: function (res) {
    //     console.log(res.userInfo)
    //   }
    // })
  },

 

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  onGotUserInfo: function (e) {
    console.log(e);
    // console.log(e.detail.errMsg)
    // console.log(e.detail.userInfo)
    // console.log(e.detail.rawData)
    const { encryptedData, rawData, iv, signature, } = e.detail;
    wx.login({
      success: (res) => {
        console.log(res);
        if (res.code) {
          console.log(res.code);
          //发起网络请求
          wx.request({
            url: 'https://api-hmugo-web.itheima.net/api/public/v1/users/wxlogin',
            method: 'POST',
            data: {
              encryptedData, rawData, iv, signature,
              code: res.code
            },
            success: (res) => {
              console.log(res);
              // this.setData({
              //   token: res.data.message.token
              // })
              wx.setStorageSync('token', res.data.message.token);
              // console.log(getCurrentPages());
              wx.navigateBack();
                
             
            }
          }) 
          } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    
   
  },

  

  
})