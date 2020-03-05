// pages/goods_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // value:'',
    // goodslist:[],
    keyword:'',
    pagenum:1,
    goodslist:[],
    loading:true,
    hasmore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    const { keyword } = options
    this.setData({
      keyword: keyword
    })
       this.getdata();
   
  },

  getdata(){
    if (this.data.hasmore == false){
      return;
    }
      wx.request({
          url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/search',
          data: {
            query: this.data.keyword,
            pagenum: this.data.pagenum ,
            pagesize: 10
          },
          success: (res) => {
            console.log(res);
            // const goods = res.data.message.goods.map(v=>{
            //   v.price = Number(v.goods_price).toFixed(2);
            //   return v;
            // })
            const {goods} = res.data.message
            this.setData({
              // goodslist: res.data.message.goods,
              goodslist: [...this.data.goodslist , ...goods],
              loading: false,
           
            })
            if (this.data.goodslist.length >= res.data.message.total) {
              this.setData({
               
                hasmore: false   
              })
             
            } 
           }

         })
    },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.loading == false ){
      this.setData({
        loading: true,
        pagenum: this.data.pagenum + 1
        
      })
      
      this.getdata();
    }
    }
  
})