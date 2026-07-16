#一言小程序
小米手环 Vela 系统上的一言快应用。随机展示名言/台词，支持按出处搜索。目前在虚拟机都能用，但实体机就显示不出句子………
纯由AI制作！作者不懂任何开发！哪位大佬来教教吾喵！
感谢DS，Qwen，GPTkimi对本应用的开发！
## 功能

- **随机一言** — 每次打开/刷新随机展示一句精选名言
- **按出处搜索** — 支持拼音/中文关键词搜索，结果分页浏览
- **关于页面** — 数据来源说明、开源链接、版权声明

## 数据

精选 **4000 条**高质量句子，来源包括：
- 文学名著（百年孤独、活着、围城……）
- 影视经典（肖申克、阿甘正传、教父……）
- 动漫金句（海贼王、火影、Clannad……）
- 哲学思想（尼采、柏拉图、老子、庄子……）
- 诗词歌赋（李白、苏轼、李清照……）
- 及更多精心挑选的内容

数据来自 [一言开放句子库](https://hitokoto.cn/)，遵守其使用协议。

## 项目结构
hikoto-build/
├── src/
│   ├── manifest.json                    # 应用配置
│   ├── app.ux                           # 应用入口
│   ├── components/
│   │   └── InputMethod/
│   │       ├── InputMethod.ux           # 输入法组件，来自于大佬的
│   │       └── assets/                  # 键盘资源文件
│   ├── common/
│   │   ├── images/
│   │   │   └── icon.png                 # 应用图标
│   │   └── scripts/
│   │       ├── data.js                  # 4000 条句子数据
│   │       └── logic.js                 # 业务逻辑
│   ├── pages/
│   │   ├── index/index.ux               # 主页（随机一言 + 导航）
│   │   ├── search/search.ux             # 搜索页（按出处 + 分页）
│   │   └── about/about.ux               # 关于页
│   └── i18n/                            # 多语言配置
├── package.json
└── .gitignore


## 快速开始

### 环境要求

- Node.js v18+
- 小米 Vela 快应用开发工具（AIoT-IDE 或 CLI）

### 安装

```bash
npm install
构建
npm run build      # 开发模式
npm run release    # 发布模式
构建产物在 dist/ 目录下，格式为 .rpk。

技术栈
小米 Vela 快应用框架
UX 模板 + CSS 语法
Vela InputMethod 输入法组件
License
MIT
