var app = getApp
var video_id = "111";
var videoContext = "111";
var videoPage = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showCoverView: false,
    preVideoId: "11",
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    video_category: [
      { id: "0", imgUrl: '../resource/images/menu/menu_video.png', text: '视频' },
      { id: "1", imgUrl: '../resource/images/menu/menu_news.png', text: '资讯' },
      { id: "2", imgUrl: '../resource/images/menu/menu_push.png', text: '推荐' },
      { id: "3", imgUrl: '../resource/images/menu/menu_hot.png', text: '热点' },
      { id: "4", imgUrl: '../resource/images/static/follow.png', text: '发布' },],
    videoList: [],

  },
  /**
   * 跳转到视频录制页面
   */
  menu_release: function (event) {
    var menu_id = event.currentTarget.dataset.tid;
    if (menu_id == "4") {
      wx.navigateTo({
        url: 'record_video/record',
      })
    }

  },
  /**
   * Video处于播放状态隐藏CoverView
   */
  bindplay: function (event) {
    var that = this;
    video_id = event.currentTarget.id;//获取当前点击的id
    if (that.data.preVideoId != video_id) {
      videoContext = wx.createVideoContext(that.data.preVideoId, this)
      videoContext.pause();
    }
    that.setData({
      showCoverView: true,
      preVideoId: video_id,
    })
    console.log("开始播放")
    console.log(video_id)
    console.log("播放过的id" + that.data.preVideoId)
  },
  /**
   * Video处于暂停状态显示CoverView
   */
  bindpause: function (event) {
    this.setData({ showCoverView: false })
    var id = event.currentTarget.id;
    console.log("暂停播放")
    console.log(id);
  },

  /**
   * 监听页面滑动暂停播放
   */
  onPageScroll: function (res) {
    var that = this;
    var videoHeight = 225;
    if (res.scrollTop >= videoHeight) {
      if (that.data.showCoverView == true) {
        videoContext = wx.createVideoContext(that.data.preVideoId, this)
        videoContext.pause()
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '视频加载中',
    })
    var that = this;
    wx.request({
      // url: 'https://route.showapi.com/255-1?showapi_appid=48824&type=41&title=&page=2&showapi_sign=8febc8562cc640259207e476414b26af',
      url: 'https://route.showapi.com/255-1?type=41',
      data: {
        showapi_appid: "48824",
        showapi_sign: "8febc8562cc640259207e476414b26af",
        page: videoPage,
      },
      header: {
        'content-type': ''
      },
      success: function (res) {
        console.log('成功');
        that.setData({
          videoList: res.data.showapi_res_body.pagebean.contentlist,
        });
        console.log(res.data.showapi_res_body.pagebean.contentlist);
        wx.hideLoading();
      },
      fail: function () {
        console.log("访问失败")
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    videoPage++;
    wx.showToast({
      title: "加载更多"
    });
    wx.request({
      url: 'https://route.showapi.com/255-1?type=41',
      data: {
        showapi_appid: "48824",
        showapi_sign: "8febc8562cc640259207e476414b26af",
        page: videoPage,
      },
      success(res) {
        var moreVideo = res.data.showapi_res_body.pagebean.contentlist;
        var newVideo = that.data.videoList;
        for (var i in moreVideo) {
          newVideo.push(moreVideo[i])
        }
        that.setData({
          videoList: newVideo
        })
        console.log(newVideo.length);
      }
    });


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
})