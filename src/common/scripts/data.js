// 一言句子数据（分片版）— 由 sentences-bundle 自动生成，请勿手工编辑。
// 为避免单个巨型数组字面量，数据拆成 8 个分片模块（data/p*.js），
// 加载时合并成与单文件版完全相同的三张表，对外 API 不变。

import p0 from './data/p0.js';
import p1 from './data/p1.js';
import p2 from './data/p2.js';
import p3 from './data/p3.js';
import p4 from './data/p4.js';
import p5 from './data/p5.js';
import p6 from './data/p6.js';
import p7 from './data/p7.js';

const PARTS = [p0,p1,p2,p3,p4,p5,p6,p7];

const SRC = [];
const SRC_S = [];
const TXT = [];
for (let i = 0; i < PARTS.length; i++) {
  const p = PARTS[i];
  if (!p.SRC.length) {
    continue;
  }
  const base = TXT.length;
  for (let j = 0; j < p.TXT.length; j++) TXT.push(p.TXT[j]);
  for (let j = 0; j < p.SRC.length; j++) SRC.push(p.SRC[j]);
  for (let j = 0; j < p.SRC_S.length; j++) {
    const v = p.SRC_S[j] + base;
    // 每片末尾的哨兵与下一片首项重合，只保留一个
    if (j === 0 && SRC_S.length > 0 && SRC_S[SRC_S.length - 1] === v) {
      continue;
    }
    SRC_S.push(v);
  }
}

// ------------------------------------------------------------ 运行时
const N = TXT.length;
const M = SRC.length;

/** 二分查找句子 i 属于哪个出处。 */
function sourceIndexOf(i) {
  let lo = 0;
  let hi = M - 1;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (SRC_S[mid] <= i) {
      lo = mid;
    } else {
      hi = mid - 1;
    }
  }
  return lo;
}

/** 组装一条对外结果。 */
function build(i) {
  return { idx: i, t: TXT[i], f: SRC[sourceIndexOf(i)] || '' };
}

export function init() {
  return N;
}

export function getCount() {
  return N;
}

export function getRandom() {
  if (!N) {
    return null;
  }
  return build((Math.random() * N) | 0);
}

export function getByIndex(i) {
  if (i >= 0 && i < N) {
    return build(i);
  }
  return null;
}

/**
 * 只按“出处”检索。
 * @param {string} kw 关键词，不区分大小写
 * @returns {Array<{idx:number,t:string,f:string}>} 最多 8 条
 */
export function search(kw) {
  const k = String(kw == null ? '' : kw).trim().toLowerCase();
  const out = [];
  if (!k) {
    return out;
  }
  for (let i = 0; i < M; i++) {
    if (SRC[i].toLowerCase().indexOf(k) < 0) {
      continue;
    }
    const end = SRC_S[i + 1];
    for (let j = SRC_S[i]; j < end; j++) {
      out.push(build(j));
      if (out.length >= 8) {
        return out;
      }
    }
  }
  return out;
}

export default { SRC, SRC_S, TXT, init, getCount, getRandom, getByIndex, search };
