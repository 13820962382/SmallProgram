// wys_tongcheng/tc_video/record_video/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    upload:false,
    recording: false,
    btn_text:["开始录制","停止录制"]
  },
  /**
   * 录制视频
   */
  bindtap: function () {
    var that = this;
    if (!that.data.upload){
      that.setData({
        upload: true
      })
    }else{
      that.setData({
        upload: false
      })
    }
  },

  recodVideo: function () {
    var that = this;
    var cameraContext = wx.createCameraContext(this)
    if (that.data.recording==false) {
      cameraContext.startRecord({
        success(res) {
          wx.showToast({
            title: '视频录制中',
          })
        },
        complete(res) {
          that.setData({
            recording: true
          })
        },
      })
    } else {
      cameraContext.stopRecord({
        success(res) {
          wx.saveVideoToPhotosAlbum({
            filePath: res.tempVideoPath,
          })
          wx.uploadFile({
            url: 'https://linshi.ningyongping.top/video/',
            filePath: res.tempVideoPath,
            name: 'test',
            success(){
              console.log("上传成功")
            }
          })
        },

        complete(res) {
          that.setData({
            recording: false
          })
        },
      })
    }


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})