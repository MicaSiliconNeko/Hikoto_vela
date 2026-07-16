import storage from '@system.storage';
import { getRandom as dataGetRandom, search as dataSearch } from './data.js';

export default {
  /**
   * 获取随机一句
   * @returns {{ idx, t, f }}
   */
  getRandom() {
    return dataGetRandom();
  },

  /**
   * 按出处搜索
   * @param {string} kw
   * @returns {Array<{ idx, raw }>}
   */
  search(kw) {
    return dataSearch(kw);
  }
};
