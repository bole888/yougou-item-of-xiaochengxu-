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
  } ,

  addInCart(){

    let cartlist = wx.getStorageSync('goods') || [];
    const exist = cartlist.some( v => {
      const isexist = v.goods_id === this.data.goodsobj.goods_id;
      if (isexist) {
        v.number+=1;
        wx.showToast({
          title: '数量+1',
          icon: 'success',
        })
      }
         return isexist;

    })
   

  if (!exist){
    let goodsToCartdata ={
      goods_id: this.data.goodsobj.goods_id,
      goods_small_logo: this.data.goodsobj.goods_small_logo,
      goods_name: this.data.goodsobj.goods_name,
      goods_price: this.data.goodsobj.goods_price,
      number: 1,
      select: true
    }
    cartlist.unshift(goodsToCartdata);
   
    wx.showToast({
      title: '商品添加成功',
      icon: 'success',  
    })
    
   wx.setStorageSync('goods', cartlist);
  }
}




















})