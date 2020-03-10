// import F2 from '@antv/wx-f2/index.js';

Page({
  data: {
    TabCur: 0,
    scrollLeft: 0,
    tabData: [],
    items2: [{
      id: 1,
      name: '分享者',
      checked: false
    }, {
      id: 2,
      name: '被分享者',
      checked: false
    }],
    nav: [{
        TypeName: "文章信息"
      }, {
        TypeName: "产品阅读"
      },

      {
        TypeName: "定位轨迹"
      },
      {
        TypeName: "行为轨迹"
      },

      {
        TypeName: "分享信息"
      }

    ],
    headers: [],
    row: [],

    onInitChart(F2, config) {
      const chart = new F2.Chart(config);
      const data = [{
          value: 1,
          type: '企业宣传',
          date: '2011-10-01',
          name: '企业宣传',
        },
        {
          value: 2,
          type: '新闻',
          date: '2011-10-01',
          name: '企业宣传'
        },
        {
          value: 3,
          type: '案例展示',
          date: '2011-10-01',
          name: '企业宣传'
        },
        {
          value: 3,
          type: '企业宣传',
          date: '2011-10-02',
          name: '企业宣传'
        },
        {
          value: 6,
          type: '新闻',
          date: '2011-10-02',
          name: '企业宣传'
        },
        {
          value: 9,
          type: '案例展示',
          date: '2011-10-02',
          name: '企业宣传'
        },
        {
          value: 4,
          type: '企业宣传',
          date: '2011-10-03',
          name: '企业宣传'
        },
        {
          value: 20,
          type: '新闻',
          date: '2011-10-03',
          name: '企业宣传'
        },
        {
          value: 40,
          type: '案例展示',
          date: '2011-10-03',
          name: '企业宣传'
        },
      ];
      chart.source(data);
      chart.scale('date', {
        type: 'timeCat',
        tickCount: 3
      });
      chart.scale('value', {
        tickCount: 5
      });
      chart.axis('date', {
        label: function label(text, index, total) {
          // 只显示每一年的第一天
          const textCfg = {};
          if (index === 0) {
            textCfg.textAlign = 'left';
          } else if (index === total - 1) {
            textCfg.textAlign = 'right';
          }
          return textCfg;
        }
      });
      chart.tooltip({
        custom: true, // 自定义 tooltip 内容框
        onChange: function onChange(obj) {
          const legend = chart.get('legendController').legends.top[0];
          const tooltipItems = obj.items;
          const legendItems = legend.items;
          const map = {};
          legendItems.forEach(function(item) {
            // map[item.name] = _.clone(item);
            map[item.name] = "企业宣传";
          });
          tooltipItems.forEach(function(item) {
            console.log(item)
            const name = item.name;
            const value = item.value;
            if (map[name]) {
              map[name].value = value;
            }
          });
          // legend.setItems(_.values(map));
          legend.setItems("企业宣传");
        },
        onHide: function onHide() {
          const legend = chart.get('legendController').legends.top[0];
          legend.setItems(chart.getLegendItems().country);
        }
      });
      chart.line().position('date*value').color('type');
      chart.render();
      // 注意：需要把chart return 出来
      return chart;
    }
  },
  onLoad: function() {
    wx.showModal({
      title: '提示',
      content: '此统计为预览版，后期将会有升级优化版本，仅供参考，谢谢。',
    })
    this._loadData()
    this._loadData1()
    this.tabSelectGetData()
  },
  _loadData() {

    var onInitChart1 = function(F2, config) {
      const chart = new F2.Chart(config);
      const data = [{
        year: '精选',
        sales: 38
      }, {
        year: '汽车',
        sales: 52
      }, {
        year: '美容',
        sales: 61
      }, {
        year: '家具',
        sales: 145
      }, {
        year: '服装',
        sales: 48
      }, {
        year: '蔬菜',
        sales: 38
      }, {
        year: '生鲜',
        sales: 38
      }, {
        year: '儿童',
        sales: 38
      }];

      chart.source(data, {
        sales: {
          tickCount: 5
        }
      });
      chart.tooltip({
        showItemMarker: false,
        onShow: function onShow(ev) {
          const items = ev.items;
          items[0].name = null;
          items[0].name = items[0].title;
          items[0].value = ' ' + items[0].value;
        }
      });
      chart.interval().position('year*sales');
      chart.render();
      // 注意：需要把chart return 出来
      return chart;
    }
    this.setData({
      onInitChart1
    })
  },

  _loadData1() {

    var onInitChart2 = function(F2, config) {
      const chart = new F2.Chart(config);
      const data = [{
        year: '2011-10-01',
        sales: 145
      }, {
        year: '2011-10-01',
        sales: 121
      }, {
        year: '2011-10-01',
        sales: 100
      }, {
        year: '2011-10-01',
        sales: 97
      }, {
        year: '2011-10-01',
        sales: 85
      }];

      chart.source(data, {
        sales: {
          tickCount: 5
        }
      });
      chart.tooltip({
        showItemMarker: false,
        onShow: function onShow(ev) {
          const items = ev.items;
          items[0].name = null;
          items[0].name = items[0].title;
          items[0].value = '¥ ' + items[0].value;
        }
      });

      chart.interval()
        .position('year*sales')
        .color('l(90) 0:#1890ff 1:#70cdd0'); // 定义柱状图渐变色
      chart.render();


      // 注意：需要把chart return 出来
      return chart;
    }
    this.setData({
      onInitChart2
    })
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
    let tabData = [];
    let headers = [];
    let items2 = [];
    let searchName = '';
    switch (TabCur) {
      case 0:
        tabData = [{
          id: 1,
          share: '合作案例',
          sharePhone: '76',
          donee: '孙贺良',
          doneePhone: '案例展示',
        }, {
          id: 1,
          share: '诚邀各路精英加入我们的大家庭',
          sharePhone: '84',
          donee: '孙贺良',
          doneePhone: '公司招聘',
        }, {
          id: 1,
          share: '天津市延期复工通知',
          sharePhone: '106',
          donee: '孙贺良',
          doneePhone: '新闻',
        }, {
          id: 1,
          share: '白衣天使',
          sharePhone: '32',
          donee: '孙贺良',
          doneePhone: '新闻',
        }, {
          id: 1,
          share: '中联集团合作新闻发布会圆满成功',
          sharePhone: '18',
          donee: '孙伟',
          doneePhone: '企业宣传',
        }, ]

        headers = [{
          text: 'share',
          display: '文章名称'
        }, {
          text: 'sharePhone',
          display: '访问次数'
        }, {
          text: 'donee',
          display: '发表人'
        }, {
          text: 'doneePhone',
          display: '文章分类'
        }, ]

        items2 = [{
          id: 1,
          name: '文章名称',
          checked: false
        }, {
          id: 2,
          name: '发表人名称',
          checked: false
        }]
        searchName = "名称查询";
        break;
      case 1:
        tabData = [{
            id: 1,
            share: '黄瓜',
            sharePhone: '13027603342',
            donee: '蔬菜',
            doneePhone: '3',
          },
          {
            id: 1,
            share: '西红柿',
            sharePhone: '13001387099',
            donee: '蔬菜',
            doneePhone: '9',
          },
          {
            id: 1,
            share: '椅子',
            sharePhone: '13001387099',
            donee: '家具',
            doneePhone: '11',
          }, {
            id: 1,
            share: '桌子',
            sharePhone: '13001387099',
            donee: '家具',
            doneePhone: '15',
          }, {
            id: 1,
            share: '凳子',
            sharePhone: '13001387099',
            donee: '家具',
            doneePhone: '5',
          }, {
            id: 1,
            share: '大黄蜂',
            sharePhone: '13001387099',
            donee: '玩具',
            doneePhone: '6',
          },
        ]

        headers = [{
          text: 'share',
          display: '产品名称'
        }, {
          text: 'donee',
          display: '产品分类'
        }, {
          text: 'doneePhone',
          display: '访问次数'
        }, ]
        items2 = [{
          id: 1,
          name: '产品名称',
          checked: false
        }, {
          id: 2,
          name: '产品分类',
          checked: false
        }]
        searchName = "名称查询";

        break;
      case 2:
        tabData = [{
          id: 1,
          share: '曹可',
          sharePhone: '13027603342',
          donee: '2020-02-01',
          doneePhone: '天津市和平区',
        }, {
          id: 1,
          share: '田禹',
          sharePhone: '13001387099',
          donee: '2020-02-01',
          doneePhone: '天津市塘沽',
        }, {
          id: 1,
          share: '孙贺良',
          sharePhone: '13001387099',
          donee: '2020-02-01',
          doneePhone: '天津市宁和',
        }, {
          id: 1,
          share: '孙伟',
          sharePhone: '13001387099',
          donee: '2020-02-01',
          doneePhone: '天津市和平区',
        }, {
          id: 1,
          share: '吕绍康',
          sharePhone: '13001387099',
          donee: '2020-02-01',
          doneePhone: '天津市和平区',
        }]

        headers = [{
          text: 'share',
          display: '手机号'
        }, {
          text: 'sharePhone',
          display: '用户名'
        }, {
          text: 'donee',
          display: '打开时间'
        }, {
          text: 'doneePhone',
          display: '地址'
        }, ]
        items2 = [{
          id: 1,
          name: '手机号',
          checked: false
        }, {
          id: 2,
          name: '用户名',
          checked: false
        }]
        searchName = "手机号或用户名查询";

        break;
      case 3:
        tabData = [{
          id: 1,
          share: '曹可',
          sharePhone: '13027603342',
          donee: '2020-02-01',
          doneePhone: '首页',
        }, {
          id: 1,
          share: '田禹',
          sharePhone: '13001387099',
          donee: '2020-02-01',
          doneePhone: '新闻',
        }, {
          id: 1,
          share: '孙贺良',
          sharePhone: '13001387099',
          donee: '2020-02-01',
          doneePhone: '活动',
        }, {
          id: 1,
          share: '孙伟',
          sharePhone: '13001387099',
          donee: '2020-02-01',
          doneePhone: '招聘',
        }, {
          id: 1,
          share: '吕绍康',
          sharePhone: '13001387099',
          donee: '2020-02-01',
          doneePhone: '热门产品',
        }]

        headers = [{
          text: 'share',
          display: '用户名'
        }, {
          text: 'sharePhone',
          display: '手机号'
        }, {
          text: 'doneePhone',
          display: '动作显示名称'
        }, {
          text: 'donee',
          display: '行为时间'
        }, ]
        items2 = [{
          id: 1,
          name: '手机号',
          checked: false
        }, {
          id: 2,
          name: '用户名',
          checked: false
        }]
        searchName = "手机号或用户名查询";
        break;
      case 4:
        tabData = [{
          id: 1,
          share: '曹可',
          sharePhone: '13027603342',
          donee: '贺良',
          doneePhone: '18522158390',
          shareAction: "产品",
          shareName: "ty",
        }, {
          id: 1,
          share: '田禹',
          sharePhone: '13001387099',
          donee: '李四',
          doneePhone: '13027603342',
          shareAction: "文章",
          shareName: "ty",
        }, {
          id: 1,
          share: '田禹',
          sharePhone: '13001387099',
          donee: '李四',
          doneePhone: '13027603342',
          shareAction: "新闻",
          shareName: "ty",
        }, {
          id: 1,
          share: '田禹',
          sharePhone: '13001387099',
          donee: '孙贺良',
          doneePhone: '13027603342',
          shareAction: "活动",
          shareName: "ty",
        }, {
          id: 1,
          share: '田禹',
          sharePhone: '13001387099',
          donee: '孙伟',
          doneePhone: '12227603333',
          shareAction: "精选",
          shareName: "ty",
        }, {
          id: 1,
          share: '田禹',
          sharePhone: '13001387099',
          donee: '吕绍康',
          doneePhone: '13022223342',
          shareAction: "产品",
          shareName: "ty",
        }, ]

        headers = [{
          text: 'share',
          display: '分享者'
        }, {
          text: 'sharePhone',
          display: '分享者手机号'
        }, {
          text: 'donee',
          display: '被分享者'
        }, {
          text: 'doneePhone',
          display: '被分享者手机号'
        }, {
          text: 'shareAction',
          display: '分享模块'
        }, {
          text: 'shareName',
          display: '被分享者归属员工'
        }, ]
        items2 = [{
          id: 1,
          name: '分享者',
          checked: false
        }, {
          id: 2,
          name: '被分享者',
          checked: false
        }]
        searchName = "手机号或用户名查询";

        break;

    }
    let tempData = []
    for (let i = 0; i < tabData.length; i++) {
      let tempObj = {}
      for (let j = 0; j < headers.length; j++) {
        tempObj[headers[j]['text']] = tabData[i][headers[j]['text']]
      }
      tempData.push(tempObj)
    }
    this.setData({
      headers: headers,
      row: tempData,
      TabCur,
      items2,
      searchName
    })
  },
  change2(e) {
    let index = e.currentTarget.dataset['index'];
    let items = this.data[`items${index}`];
    items.forEach(item => {
      if (item.id == e.detail.key) {
        item.checked = e.detail.checked;
      }
    });
    this.setData({
      [`items${index}`]: items
    });
  },
});