// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
        receverinfo:{},
        allprice: 0,
        cartlist: wx.getStorageSync('goods') || [],
        Allselect: ''
       
        
  },

  handleblur(e){
    const { index } = e.target.dataset;
    let { value } = e.detail;
    value = Math.floor(Number(value));
    if (value<1){
      value = 1;
    }
    
    this.data.cartlist[index].number = value;
    this.setData({
      cartlist: this.data.cartlist
    })
    this.handleprice();
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

  handlereceiveinfo(e){
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

  calcnumber(e){
    console.log(e)
    const { index} =e.target.dataset;
    const { number} =e.target.dataset;
    this.data.cartlist[index].number += number;
    if (this.data.cartlist[index].number===0){
      wx.showModal({
        title: '提示',
        content: '确定删除?',
        success:(res)=> {
          if (res.confirm) {
            // console.log('用户点击确定')
            this.data.cartlist.splice(index,1)
          } else if (res.cancel) {
            // console.log('用户点击取消')
            this.data.cartlist[index].number +=1;
          }
          this.setData({
            cartlist: this.data.cartlist
          })
          this.handleprice();
        }
      })
    }
 
    this.setData({
      cartlist: this.data.cartlist
    })
   
    this.handleprice();
  },
 

  handleprice(){
    // const { index } = e.target.dataset;
    let price=0;    
    this.data.cartlist.forEach(v=>{
         if (v.select ){
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

  handleselect(e){
      console.log(e);
    const { index } = e.target.dataset;
    const { select } = e.target.dataset;
    this.data.cartlist[index].select= ! select;


    let currentAllselect = true;
    this.data.cartlist.forEach(v => {
      if (currentAllselect === false){
             return;
      }
      if (v.select === false) {
        currentAllselect = false
      }
      this.setData({
        Allselect: currentAllselect
      })

    })

    this.setData({     
         cartlist: this.data.cartlist
    })
    this.handleprice();
  },


  handleChooseAll(e){
        this.setData({
          Allselect: !e.target.dataset.select
        })
    // this.data.cartlist[index].select = !this.data.cartlist[index].select;
    this.data.cartlist.forEach(v => {
      return v.select = this.data.Allselect;
               
    })
    this.setData({
      cartlist: this.data.cartlist
    })
    this.handleprice();
  }
  
  

})




// 在商品详情页存储一个默认的选中状态，以便跳去购物车页时，，显示选中，
// 给每个勾选利用三元表达式定义一个状态与颜色的绑定，当点击单选框，传递data-select传递状态参数，用非判断在商品数组遍历，每次点击进行颜色切换，
// 输入商品数字，利用点击事件获取value值绑定，当失焦判断数字的合法性，进行价钱计算，
// 利用三元表达式定义一个状态与颜色的绑定，点击全选框切换颜色，把每一个单选框与全选框状态绑定实现全选全不选，
// 点击单选，先假设全部选中状态，foreach方法遍历商品数组，找到其中有一个没选。全选框为不选状态，否则全选