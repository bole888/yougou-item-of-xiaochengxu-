// pages/search/index.js
Page({

  data: {
    inputValue: '',
    searchList: [],
    loading: false,
    lastValue: '',
    historyList: []
  },

  handleinput(e) {
    // console.log(e);
    const {
      value
    } = e.detail
    this.setData({
      inputValue: value
    })
     this.getlist();
  },

  getlist(){
      if (this.data.loading == false) {
        this.setData({
          loading: true,
          lastValue: this.data.inputValue
        })

        wx.request({
          url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/qsearch',
          data: {
            query: this.data.inputValue
          },
          success: (res) => {
            console.log(res);
            this.setData({
              searchList: res.data.message,
              loading: false,
            })
            if (this.data.lastValue !== this.data.inputValue) {
              this.getlist();
            }
          }
        })
      }  
       
     
  },

  handleconfirm(e) {
    console.log(e);
    this.setData({
      inputValue: e.detail.value
    })

    this.data.historyList.unshift(this.data.inputValue)
    let arr = [...new Set(this.data.historyList)]
    wx.setStorageSync('history', arr)

    wx.redirectTo({
      url: "/pages/goods_list/index?keyword=" + this.data.inputValue
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var arr = wx.getStorageSync('history')
    if (arr.length === 0) {
      this.setData({
        arr: []
      })
    }
    this.setData({
      historyList: arr
    })

  },


  // handleblur() {
  //   this.setData({
  //     searchList: []
  //   })
  // },

  delete() {
    this.setData({
      historyList: []
    })
    wx.setStorageSync('history', [])

  },

  handlecancel() {
    this.setData({
      searchList: [],
      inputValue: ''
    })
  },

  handleclick(e){
    console.log(e);
    if (!e.target.dataset.id){
      this.setData({
            searchList:[]
      })
    }
  }


})