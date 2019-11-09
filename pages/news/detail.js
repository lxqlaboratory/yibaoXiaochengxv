const util = require('../../utils/util.js')
Page(
  {
    data: {
      remind: "加载中",
      title: "",    // 新闻标题
      date: "",     // 发布日期
      author: "",   // 发布作者
      reading: "",   // 阅读量
      content: "",  // 新闻内容
      files_len: 0,  // 附件数量
      files_list: [],
      file_loading: false, //下载状态

    },

    convertHtmlToText: function (inputText) {
      var returnText = "" + inputText;
      returnText = returnText.replace(/<\/?[^>]*>/g, '').replace(/[ | ]*\n/g, '\n').replace(/ /ig, '')
        .replace(/&mdash/gi, '-').replace(/&ldquo/gi, '“').replace(/&rdquo/gi, '”').replace(/&nbsp;/ig, "").replace(/&amp;/ig, "");
      return returnText;
    },

    onLoad: function (options) {
      var _this = this;
      util.request("/news/newsDetail", { newsid: options.id},function(res){

        var news = JSON.parse(res.data).news;
        var downloadlist = JSON.parse(res.data).downloadlist;
        console.log(downloadlist)
        console.log(news)
        wx.setNavigationBarTitle({
          title: news.title
        })
        _this.setData({
          date: news.newsTime || "",
          author: news.modifier,     
          reading: news.totalAccess ,  
          title: news.title,            
          content: _this.convertHtmlToText(news.content), 
         
        });
      })

    },

    getFj: function (e) {
      var _this = this;
      wx.showModal({
        title: '提示',
        content: '预览或下载附件需要消耗流量，是否继续？',
        confirmText: '继续',
        success: function (res) {
          if (res.confirm) {
            app.showLoadToast('下载中，请稍候');
            wx.showNavigationBarLoading();
            _this.setData({
              file_loading: true
            });
            //下载
            wx.downloadFile({
              url: e.currentTarget.dataset.url,
              success: function (res) {
                var filePath = res.tempFilePath;
                if (e.currentTarget.dataset.preview == 'true') {
                  //预览
                  wx.openDocument({
                    filePath: filePath,
                    success: function (res) {
                      _this.setData({
                        file_loading: false
                      });
                    },
                    fail: function (res) {
                      app.showErrorModal(res.errMsg, '预览失败');
                
                    },
                    complete: function () {
                      wx.hideNavigationBarLoading();
                      wx.hideToast();
                    }
                  });
                } else {
                  //保存
                  _this.saveFj(filePath);
                }
              },
              file: function (res) {
                _this.setData({
                  file_loading: false
                });
                app.showErrorModal(res.errMsg, '下载失败');
              }
            });
          }
        }
      });
    },

    saveFj: function (path) {
      var _this = this;
    
      wx.saveFile({
        tempFilePath: path,
        success: function (res) {
          var savedFilePath = res.savedFilePath;
          app.showErrorModal('成功下载至 ' + savedFilePath, '下载成功');
        },
        fail: function (res) {
          app.showErrorModal(res.errMsg, '下载失败');
        },
        complete: function () {
          wx.hideNavigationBarLoading();
          wx.hideToast();
          _this.setData({
            file_loading: false
          });
        }
      });
    }
  }
)
