import storage from '@system.storage';
import { hitokotoData, buildFromIndex, getRandom, getByUuid, searchByFrom } from './data.js';

// 收藏的Key
const FAVORITE_KEY = 'hitokoto_favorites';

// 当前句子
let currentSentence = null;
// 出处索引
let fromIndex = null;

export default {
  // 初始化
  init() {
    console.info('一言逻辑模块初始化');
    // 构建出处索引
    fromIndex = buildFromIndex();
    console.info(`已构建索引，共${Object.keys(fromIndex).length}个唯一出处`);
  },

  // 获取随机一句
  getRandomSentence() {
    currentSentence = getRandom();
    return currentSentence;
  },

  // 获取当前句子
  getCurrentSentence() {
    return currentSentence;
  },

  // 按出处搜索
  search(fromText) {
    if (!fromIndex) {
      fromIndex = buildFromIndex();
    }
    return searchByFrom(fromText, fromIndex);
  },

  // 获取所有出处列表
  getAllFromList() {
    if (!fromIndex) {
      fromIndex = buildFromIndex();
    }
    return Object.keys(fromIndex).sort();
  },

  // 根据UUID获取句子
  getSentenceByUuid(uuid) {
    return getByUuid(uuid);
  },

  // 获取收藏列表 (UUID数组)
  getFavorites() {
    try {
      const data = storage.getSync({ key: FAVORITE_KEY });
      if (data && typeof data === 'string') {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('读取收藏失败:', e);
    }
    return [];
  },

  // 添加收藏
  addFavorite(uuid) {
    try {
      const favorites = this.getFavorites();
      if (!favorites.includes(uuid)) {
        favorites.push(uuid);
        storage.setSync({
          key: FAVORITE_KEY,
          value: JSON.stringify(favorites)
        });
        console.info(`已收藏：${uuid}`);
        return true;
      }
      return false; // 已存在
    } catch (e) {
      console.error('添加收藏失败:', e);
      return false;
    }
  },

  // 取消收藏
  removeFavorite(uuid) {
    try {
      const favorites = this.getFavorites();
      const index = favorites.indexOf(uuid);
      if (index > -1) {
        favorites.splice(index, 1);
        storage.setSync({
          key: FAVORITE_KEY,
          value: JSON.stringify(favorites)
        });
        console.info(`已取消收藏：${uuid}`);
        return true;
      }
      return false; // 未找到
    } catch (e) {
      console.error('取消收藏失败:', e);
      return false;
    }
  },

  // 检查是否已收藏
  isFavorite(uuid) {
    const favorites = this.getFavorites();
    return favorites.includes(uuid);
  },

  // 获取收藏的句子列表
  getFavoriteSentences() {
    const favorites = this.getFavorites();
    return favorites.map(uuid => getByUuid(uuid)).filter(item => item !== null);
  }
};
