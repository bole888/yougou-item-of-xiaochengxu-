// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    goods_id: '',
    goodsobj: {}
  },

  handleclick(e) {
    // console.log(e)
    this.setData({
      current: e.target.dataset.index
    })
  },

  handleprew(e) {
    console.log(e);
    const imagelist = this.data.goodsobj.pics.map(v=>{
              return   v.pics_big ;
    })
    wx.previewImage({
      current: imagelist[e.target.dataset.index], // 当前显示图片的http链接
      urls: imagelist // 需要预览的图片http链接列表
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    const {
      id
    } = options
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/detail',
      data: {
        goods_id: id
      },
      success: (res) => {
        console.log(res);
        this.setData({
          goodsobj: res.data.message
        })
      }
    })
  },

  handleTocart(){
    wx.switchTab({
      url: "/pages/cart/index"
    })
  }


})