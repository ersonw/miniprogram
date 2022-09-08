import updateManager from './common/updateManager';
import { cloudId } from './config/index'

App({
  onLaunch: function () {
    wx.cloud.init({
      env: cloudId,
      traceUser: true
    })
  },
  onShow: function () {
    updateManager();
  },
});
