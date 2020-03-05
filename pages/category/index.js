// pages/category/index.js
Page({
  data:{
    current:0,
    list:[]
  },

  handleclick(e){
    this.setData({
      current:e.target.dataset.index
    })
  },
  

  onLoad(){
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories',
      success:(res)=>{
        console.log(res);
        this.setData({
          list: res.data.message
        })
      }
    })
  }
       
})