// pages/subpackages/propaganda/poster/posterDetail/index.js
import {promisic} from "../../../../../miniprogram_npm/lin-ui/utils/util";

const app = getApp();
import CanvasDrag from '../../../../../components/canvas-drag/canvas-drag';
import {
    File
} from "../../../../../models/file.js";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        graph: {},
        imgHeight: 750
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        let image = options.image;
        this.data.avater = image
        this.getAvaterInfo()
        this.onAddImage()

    },
    getAvaterInfo: function (image) {
        wx.showLoading({
            title: '生成中...',
            mask: true,
        });
        var that = this;
        that.setData({
            showpost: true
        })
        var productImage = that.data.avater;
        if (productImage) {
            wx.downloadFile({
                url: productImage,
                success: function (res) {
                    wx.hideLoading();
                    if (res.statusCode === 200) {
                        var productSrc = res.tempFilePath;
                        that.calculateImg(productSrc, function (data) {
                            CanvasDrag.changeBgImage(productSrc);
                        })


                    } else {
                        wx.showToast({
                            title: '产品图片下载失败！',
                            icon: 'none',
                            duration: 2000,
                            success: function () {

                            }
                        })
                    }
                },
                fail: err => {
                    wx.hideLoading();
                    wx.showToast({
                        title: '产品图片下载失败！',
                        icon: 'none',
                        duration: 2000,
                    })
                },

            })
        } else {
            wx.hideLoading();
            var productSrc = "";

        }
    },
    //计算图片尺寸
    calculateImg: function (src, cb) {
        var that = this;
        wx.getImageInfo({
            src: src,
            success(res) {
                wx.getSystemInfo({
                    success(res2) {
                        var ratio = res.width / res.height;
                        var imgHeight = (res2.windowWidth / ratio);
                        that.setData({
                            imgHeight: imgHeight
                        })
                        cb(imgHeight);
                    }
                })
            }
        })
    },

    /**
     * 添加图片
     */ async onAddImage() {
        let OpenID = wx.getStorageSync('OpenID')
        let dic = {
            SharOpenID: OpenID
        }

        let obj = {
            "EnterpriseID": app.config.EnterpriseID,
            ChannelCode: app.util.random(32),
            ChannelName: JSON.stringify(dic),
            type: 0//员工二维码为0
        }
        wx.showLoading({
            title: '加载中～',
        })
        const file = await File.getQRcode(obj)
        const res=await promisic(wx.downloadFile)({
            url: file
        })
        console.log(res)
        if (res.statusCode === 200) {
            var productSrc = res.tempFilePath;
            this.setData({
                graph: {
                    w: 120,
                    h: 120,
                    type: 'image',
                    url: productSrc,
                }

            })


        }

    },


    /**
     * 导出图片
     */
    onExport() {
        CanvasDrag.export()
            .then((filePath) => {
                console.log(filePath);
                wx.previewImage({
                    urls: [filePath]
                })
            })
            .catch((e) => {
                console.error(e);
            })
    },


})