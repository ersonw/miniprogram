export function cloud(action, data) {
  return new Promise((resolve) => {
    wx.cloud.callFunction({
      // 云函数名称
      name: action,
      // 传给云函数的参数
      data: data,
    }).then(res => {
      resolve(res.result);
      // console.log(res.result) // 3
    }).catch(console.error)
  });
}
