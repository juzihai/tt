// pages/home/index.js
const app = getApp();
import F2 from '../../../f2-canvas/lib/f2.js';
import { Customers } from "../../../models/customers.js";

let chart = null;
let chart1 = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:null,
    TabCur: 0,
    scrollLeft: 0,
    currentKey:1,
    starDate:null,
    endDate: null,
    nav: [{
      TypeName: "进入方式"
    },{
      TypeName: "周使用频率"
    },{
      TypeName: "累计用户量"
    }],
    items2: [{
      id: 1,
      name: '本周',
      checked: false
    }, {
      id: 2,
        name: '上周',
      checked: false
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.initAllData()
  },
  async initAllData() {
    let myDate = new Date();
    console.log(myDate)
        myDate.setDate(myDate.getDate() - 5);
        console.log(myDate)
    let starDate = app.util.tsFormatTime(myDate, 'Y/M/D')
    let endDate = app.util.tsFormatTime(new Date(), 'Y/M/D')
    this.setData({
      starDate,
      endDate
    })
    this.onSubmit()
  },
  /**切换点击 */
  tabSelect(e) {

    this.setData({
      TabCur: e.currentTarget.dataset.index,
    })
    this.tabSelectGetData()
  },
  tabSelectGetData() {
    let TabCur = this.data.TabCur;
    switch (TabCur) {
      case 0:
        this.onSubmit()
        break;
      case 1:
        this.onSubmit1()
        break;
      case 2:
        this.onSubmit2()
        break;
    }
  },
  /**选择时间周期 */
  starDateChange(e) {
    this.setData({
      starDate: e.detail.value
    })
  },
  endDateChange(e) {
    this.setData({
      endDate: e.detail.value
    })
  },

/**查询 */
  async onSubmit(e) {
    var starDate = this.data.starDate;
    var endDate = this.data.endDate;
    if (!starDate) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的时间',
      })
      return;
    }
    if (!endDate) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的时间',
      })
      return;
    }
    if (typeof starDate == 'string' && starDate.indexOf(':') == -1) {
      starDate += ' 00:00:00';
    }
    if (typeof endDate == 'string' && endDate.indexOf(':') == -1) {
      endDate += ' 23:59:59';
    }
    let startTime = new Date(starDate);
    let endTime = new Date(endDate);
    console.log(endTime)

    // // 页面初次加载，请求数据
    let obj = {
      "EnterpriseID": app.config.EnterpriseID,
      startTime: startTime.toUTCString(),
      endTime: endTime.toUTCString()

    }

    const data = await Customers.GetChannelCustomer(obj)
    const NewCustomerData = await Customers.GetNewAddCustomer(obj)

    this.setData({
      data,
      NewCustomerData
    })
    if(data.length>0){
      this._loadChart2(data)
    }


  },

  onChange(e) {
    const {
      currentKey
    } = {
      ...e.detail
    };
    this.setData({
      currentKey
    });
    this.onSubmit1()
  },
  /**查询 */
  async onSubmit1(){
    var type = this.data.currentKey;
    if (!type) {
      wx.showModal({
        title: '提示',
        content: '请选择查询范围',
      })
      return;
    }
    let obj = {
      "EnterpriseID": app.config.EnterpriseID,
      type

    }
    const data = await Customers.PageSearchFrequencyWX(obj)
    this.setData({
      data
    })
    if (data.length > 0) {
      this._loadChart3(data)
    }
  },
   /**查询 */
  async onSubmit2(e) {
    console.log(e)

    var endDate = this.data.endDate;
    if (!endDate) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的时间',
      })
      return;
    }
    if (typeof endDate == 'string' && endDate.indexOf(':') == -1) {
      endDate += ' 23:59:59';
    }
    let endTime = new Date(endDate);
    // // 页面初次加载，请求数据
    let obj = {
      "EnterpriseID": app.config.EnterpriseID,
      endTime: endTime.toUTCString()

    }
    const CustomerData = await Customers.GetTotalCustomer(obj)
    this.setData({
      CustomerData
    })
  },
  

  /**加载图表 */
  _loadChart2(data) {
    var that = this;
    var data = data;
    that.chartComponent = that.selectComponent("#custom-dom")
    that.chartComponent.init((canvas, width, height) => {
      chart = new F2.Chart({
        el: canvas,
        width,
        height,
        animate: false
      });

      chart.source(data);
      chart.coord('polar', {
        transposed: true,
        radius: 0.75
      });
      chart.legend(false);
      chart.axis(false);
      chart.tooltip(false);

      // 添加饼图文本
      chart.pieLabel({
        sidePadding: 40,
        label1: function label1(data, color) {
          let radior = data.radior ? data.radior:0
          return {
            text: `${data.name} (${radior}%)`,
            fill: color
          };
        },
        // label2: function label2(data) {
        //   return {
        //     text: '￥' + String(Math.floor(data.y * 100) / 100).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        //     fill: '#808080',
        //     fontWeight: 'bold'
        //   };
        // }
      });

      chart.interval()
        .position('*value')
        .color('name', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864'])
        .adjust('stack');
      chart.render();
    })
  },
  _loadChart3(data) {
    var that = this;
    var data = data;
    that.chartComponent = that.selectComponent("#custom-dom1")
    that.chartComponent.init((canvas, width, height) => {
      chart = new F2.Chart({
        el: canvas,
        width,
        height,
        animate: false
      });

      chart.source(data, {
        sales: {
          // tickCount: 5
        }
      });
      chart.tooltip({
        showItemMarker: false,
        onShow(ev) {
          const { items } = ev;
          items[0].name = null;
          items[0].name = items[0].title;
          items[0].value = items[0].value + items[0].origin.Percentage;
        }
      });
      chart.interval().position('discribe*count');
      chart.render();
    })
  },


    
})