// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { list } = event
  list.forEach(async (element) => {
    // console.log(element);
    await exports.add('swiper', {
      img: element.img,
      text: element.text,
      url: null,
      status: true,
      addTime: (new Date()).getTime(),
      updateTime: (new Date()).getTime()
    })
  });
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}
exports.delete = async (con, where) => {
  return new Promise((resolve) => {
    const db = cloud.database()
    db.collection(con).where(where).remove().then(resolve)
  })
}
exports.update = async (con, where, data) => {
  return new Promise((resolve) => {
    const db = cloud.database()
    db.collection(con).where(where)
      .update({
        data: data,
      })
  })
}
exports.query = async (con, where = {}) => {
  return new Promise((resolve) => {
    const db = cloud.database()
    db.collection(con).where(where).get().then(res => {
      // res.data 包含该记录的数据
      resolve(res)
      // console.log(res.data)
    })
  })
}
exports.add = async (con, data) => {
  return new Promise((resolve) => {
    const db = cloud.database()
    db.collection(con).add({
      // data 字段表示需新增的 JSON 数据
      data: data,
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        // console.log(res)
        resolve(res)
      }
    })
  })
}