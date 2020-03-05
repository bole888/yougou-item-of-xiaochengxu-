//index.js
//获取应用实例
// const app = getApp()

Page({
   data:{
     autoplay:true,
     interval:3000,
     duration:2000,
     swiperlist:[],
     navlist:[],
     floordata:[]
   },

  handletoTop(e){
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },

onLoad(){
   wx.request({
     url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
     method: 'GET',
     success: (res)=> {
      //  console.log(res);
       this.setData({
         swiperlist: res.data.message
       })
     },
     
     fail: function(res) {},    
   }),

   wx.request({
     url:'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems',
     success:(res)=>{
      //  console.log(res);
       const newdata = res.data.message.map((v,i)=>{
             if(i===0){
               v.url = "/pages/category/index"
             }
             return v;
       })
       this.setData({
         navlist: newdata
       })
     }
   }),


   wx.request({
     url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata',
     success:(res)=>{
       console.log(res);
       this.setData({
         floordata: res.data.message
       })
     }
   })





}





})
