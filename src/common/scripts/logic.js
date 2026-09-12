/**
 * 业务逻辑薄封装。
 * 真正的数据与检索实现都在 data.js 中，这里只做一层稳定的门面，
 * 避免页面直接依赖 data.js 的内部结构。
 */
import * as data from './data.js';

export default {
  /** 预热数据并返回可用句子总数。 */
  init() {
    return data.init();
  },

  /** 句子总数。 */
  getCount() {
    return data.getCount();
  },

  /**
   * 随机取一句。
   * @returns {{idx:number,t:string,f:string}|null}
   */
  getRandom() {
    return data.getRandom();
  },

  /**
   * 只按「出处」检索。
   * @param {string} kw
   * @returns {Array<{idx:number,t:string,f:string}>}
   */
  search(kw) {
    return data.search(kw);
  },

  /** 按下标取句。 */
  getByIndex(idx) {
    return data.getByIndex(idx);
  }
};
