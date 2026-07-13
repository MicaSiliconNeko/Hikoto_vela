// 一言数据文件 - 示例数据，请替换为你的完整7000+条数据
export const hitokotoData = [
  {
    "uuid": "9818ecda-9cbf-4f2a-9af8-8136ef39cfcd",
    "hitokoto": "与众不同的生活方式很累人呢，因为找不到借口。",
    "from": "幸运星"
  },
  {
    "uuid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "hitokoto": "人生就像一盒巧克力，你永远不知道下一块是什么味道。",
    "from": "阿甘正传"
  },
  {
    "uuid": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    "hitokoto": "活着就是为了改变世界，难道还有其他原因吗？",
    "from": "乔布斯"
  },
  {
    "uuid": "c3d4e5f6-a7b8-9012-cdef-123456789012",
    "hitokoto": "不要问国家能为你做什么，而要问你能为国家做什么。",
    "from": "肯尼迪"
  },
  {
    "uuid": "d4e5f6a7-b8c9-0123-def0-234567890123",
    "hitokoto": "知识就是力量。",
    "from": "培根"
  }
  // ... 请在这里添加你的全部7000+条数据
];

// 构建出处索引映射 (from -> uuid列表)
export function buildFromIndex() {
  const fromIndex = {};
  hitokotoData.forEach(item => {
    if (!fromIndex[item.from]) {
      fromIndex[item.from] = [];
    }
    fromIndex[item.from].push(item.uuid);
  });
  return fromIndex;
}

// 根据UUID获取句子
export function getByUuid(uuid) {
  return hitokotoData.find(item => item.uuid === uuid) || null;
}

// 随机获取一句
export function getRandom() {
  const randomIndex = Math.floor(Math.random() * hitokotoData.length);
  return hitokotoData[randomIndex];
}

// 按出处搜索 (返回该出处的所有句子)
export function searchByFrom(fromText, fromIndex) {
  if (!fromText || !fromIndex) {
    return [];
  }
  // 模糊匹配出处
  const matchedKeys = Object.keys(fromIndex).filter(key => 
    key.toLowerCase().includes(fromText.toLowerCase())
  );
  
  const results = [];
  matchedKeys.forEach(key => {
    fromIndex[key].forEach(uuid => {
      const item = getByUuid(uuid);
      if (item) {
        results.push(item);
      }
    });
  });
  
  return results;
}

// 获取所有唯一的出处列表
export function getAllFromList(fromIndex) {
  return Object.keys(fromIndex).sort();
}
