
import { Area } from "../../../models/area.js";
import {
  getWindowHeightRpx
} from "../../../utils/system";

Page({
  data: {

  },

  onLoad: async function (options) {
    const windowHeight = await getWindowHeightRpx();
    const h = windowHeight - 100; // 100 是底部tabbar的高度  自定义的tabbar高度是不包含在 windowHeight里的
    this.setData({
      h,
    })
  }
})