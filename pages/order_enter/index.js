// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    receverinfo: {},
    allprice: 0,
    cartlist: wx.getStorageSync('goods') || [],
    Allselect: '',
    orderdata:{},
    paydata:{}


  },

 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var receverObj = wx.getStorageSync('recever') || {};
    this.setData({
      receverinfo: receverObj
    })
  },

  handlereceiveinfo(e) {
    wx.chooseAddress({
      success: (res) => {
        this.setData({
          receverinfo: res
        })
        // console.log(res.userName)
        // console.log(res.postalCode)
        // console.log(res.provinceName)
        // console.log(res.cityName)
        // console.log(res.countyName)
        // console.log(res.detailInfo)
        // console.log(res.nationalCode)
        // console.log(res.telNumber)
        wx.setStorageSync('recever', this.data.receverinfo)
      }
    })
  },

 


  handleprice() {
    // const { index } = e.target.dataset;
    let price = 0;
    this.data.cartlist.forEach(v => {
      if (v.select) {
        price += v.goods_price * v.number
      }
    })

    this.setData({
      allprice: price
      // cartlist: this.data.cartlist
    })
    wx.setStorageSync('goods', this.data.cartlist);
    wx.setStorageSync('isAllselect', this.data.Allselect);
  },




  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    this.setData({
      cartlist: wx.getStorageSync('goods') || [],
      Allselect: wx.getStorageSync('isAllselect')

    })
    // this.handlereceiveinfo()
    this.handleprice();
  },

  handlepay(){
    let token = wx.getStorageSync('token') || ''
    if(!token){
    wx.navigateTo({
      url: '/pages/auth/index',
     
    })
  }else{
    let arr=[];
      this.data.cartlist.forEach(v=>{
        if (v.select) {
          arr.push({
            goods_id: v.goods_id,
            goods_number: v.number,
            goods_price: v.goods_price
          } );
        } 
      })

    //  arr.map(v=>{
     
    //    return  {
    //              goods_id: v.goods_id,
    //              goods_number: v.number,
    //              goods_price: v.goods_price
    //          } 
      
    //   })

      const { receverinfo } = this.data
      wx.request({
        url:"https://api-hmugo-web.itheima.net/api/public/v1/my/orders/create",
        method:'POST',
        header: { Authorization: token},
           data:{
             goods: arr,
             order_price: this.data.allprice,
             consignee_addr: receverinfo.userName + receverinfo.telNumber + receverinfo.provinceName + receverinfo.cityName + receverinfo.countyName + receverinfo.detailInfo
           },
           success:(res)=>{
             console.log(res);
             wx.showToast({
               title: '订单创建成功',
               icon: 'success',
               duration: 2000
             })
             this.setData({
               orderdata: res.data.message
             })
            wx.request({
              url: 'https://api-hmugo-web.itheima.net/api/public/v1/my/orders/req_unifiedorder',
              data: { order_number: this.data.orderdata.order_number},
              header: { Authorization: token },
              method: 'POST',
              success: (res) => {
                console.log(res);
                // this.setData({
                //   paydata: 
                // })
                const { pay } = res.data.message

                wx.requestPayment(pay);                  
                
              }
            })
           }
      })
  }
}

 


})




