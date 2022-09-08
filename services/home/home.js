import { config, cdnBase, urlBase } from '../../config/index';
import { cloud } from '../_utils/request'

/** 获取首页数据 */
function mockFetchHome() {
  const { delay } = require('../_utils/delay');
  const { genSwiperImageList } = require('../../model/swiper');
  return delay().then(() => {
    return {
      swiper: genSwiperImageList(),
      tabList: [
        {
          text: '精选推荐',
          key: 0,
        },
        {
          text: '夏日防晒',
          key: 1,
        },
        {
          text: '二胎大作战',
          key: 2,
        },
        {
          text: '人气榜',
          key: 3,
        },
        {
          text: '好评榜',
          key: 4,
        },
        {
          text: 'RTX 30',
          key: 5,
        },
        {
          text: '手机也疯狂',
          key: 6,
        },
      ],
      activityImg: `${cdnBase}/activity/banner.png`,
    };
  });
}

/** 获取首页数据 */
export function fetchHome() {
  if (config.useMock) {
    return mockFetchHome();
  }
  // mockFetchHome().then(res => {
  //   const { swiper, tabList } = res
  //   console.log(swiper);
  //   cloud('addSwiper', { list: swiper })
  //   cloud('addTabList', { list: tabList })
  // })
  return new Promise(async (resolve) => {
    const { swiper, tabList } = await cloud("fetchHome", {})
    // console.log(swiper)
    // console.log(swiper)
    resolve({ swiper, tabList })
  });
}
