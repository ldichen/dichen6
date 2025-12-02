// 引入 marked 库
import { marked } from "marked";

// 配置 marked
marked.setOptions({
  breaks: true, // 支持换行
  gfm: true, // 启用 GitHub Flavored Markdown
});

// 国际化翻译数据
const ui = {
  en: {
    "nav.home": "Home",
    "nav.posts": "Blogs",
    "nav.projects": "Projects",
    "nav.category": "Category",
    "nav.category.desc": "Browse posts by category",
    "nav.about": "About",
    "nav.dayMode": "Day mode",
    "nav.nightMode": "Night mode",
    "home.greeting": "I'm Dichen6.",
    "home.intro": "I'm a front-end programmer living in Nanjing.",
    "home.focus": "I focus on Web development.",
    "home.helpTitle": "I can help you out with:",
    "home.skill1": "Vue.js Development",
    "home.skill2": "React.js Development",
    "home.skill3": "Node.js Development",
    "home.skill4": "Website Design",
    "home.skill5": "and more...",
    "home.followButton": "Follow me on 𝕏",
    "home.writingsSeparator": "Some of my writing",
    "writings.title": "My Writings",
    "writings.description":
      "Along with coding I also like to write about life and technology. Here are some of my recent posts.",
    "writings.viewAll": "View All My Writing",
    "writings.subscribe": "Subscribe my blog",
    "writings.subscribeDesc": "Get my blog updates via",
    "writings.subscribeButton": "Subscribe",
    "posts.title": "My Writing",
    "posts.description":
      "Dive into my musings on life and tech in my latest posts; a blend of introspection and innovation. Keep an eye out for fresh insights and updates!",
    "projects.title": "My Projects",
    "projects.description":
      "Here are some of the current projects I've been working on. I really enjoy creating new projects and coming up with new ideas. I'm always working on something new, so check back often!",
    "about.title": "About Me",
    "about.description":
      "Hello 👋 I'm a frontend engineer from Nanjing, China. I'm passionate about building new products and learning new technology.",
    "about.shortBio": "Short Bio",
    "about.bioContent":
      "Front-end cutter 🧑🏻‍💻, back-end amateur 🤷🏻‍♂️, operations digging holes person 🤦🏻‍♂️.",
    "about.experience": "Experience",
    "about.connect": "Let's Connect",
    "about.connectDesc":
      "If you want to stay up to date with my work be sure to",
    "about.followTwitter": "follow me on twitter",
    "about.orEmail": ", or you can send me an",
    "about.email": "email",
    "about.emailEnd": "and I'll be sure to get back to you.",

    ///////////////////////Snow-Like///////////////////////////
    "nav.category.snow-like": "Snow Like",
    "nav.category.snow-like.desc": "This is Snow Like",
  },
  zh: {
    "nav.home": "首页",
    "nav.posts": "博客",
    "nav.category": "分类",
    "nav.category.desc": "浏览文章分类",
    "nav.projects": "项目",
    "nav.about": "关于",
    "nav.dayMode": "日间模式",
    "nav.nightMode": "夜间模式",
    "home.greeting": "我是 Dichen6",
    "home.intro": "我是一名生活在南京的前端程序员。",
    "home.focus":
      "喜欢探索人工智能的前沿，重点关注地理空间智能/地理学/环境科学/LLM。",
    "home.helpTitle": "我可以帮助你：",
    "home.skill1": "Vue.js 开发",
    "home.skill2": "React.js 开发",
    "home.skill3": "Node.js 开发",
    "home.skill4": "网站设计",
    "home.skill5": "以及更多...",
    "home.followButton": "在 𝕏 上关注我",
    "home.writingsSeparator": "我的一些文章",
    "writings.title": "我的文章",
    "writings.description":
      "除了编程，我也喜欢写一些关于生活和技术的文章。这是我最近的一些文章。",
    "writings.viewAll": "查看所有文章",
    "writings.subscribe": "订阅我的博客",
    "writings.subscribeDesc": "通过以下方式获取我的博客更新：",
    "writings.subscribeButton": "订阅",
    "posts.title": "我的文章",
    "posts.description":
      "在我最新的文章中深入了解我对生活和技术的思考；这是内省与创新的融合。请持续关注新的见解和更新！",
    "projects.title": "我的项目",
    "projects.description":
      "这是我目前正在做的一些项目。我非常喜欢创建新项目和想出新点子。我一直在做新的东西，所以请经常回来看看！",
    "about.title": "关于我",
    "about.description":
      "你好 👋 我是一名来自中国南京的前端工程师。我热衷于构建新产品和学习新技术。",
    "about.shortBio": "简介",
    "about.bioContent": "前端切图仔 🧑🏻‍💻，后端门外汉 🤷🏻‍♂️，运维挖坑人 🤦🏻‍♂️。",
    "about.experience": "工作经历",
    "about.connect": "联系我",
    "about.connectDesc": "如果你想了解我的最新动态，请",
    "about.followTwitter": "在 Twitter 上关注我",
    "about.orEmail": "，或者你可以给我发送",
    "about.email": "邮件",
    "about.emailEnd": "，我会尽快回复你。",

    ///////////////////////满座衣冠似雪///////////////////////////
    "nav.category.snow-like": "满座衣冠似雪",
    "nav.category.snow-like.desc": `从初一开始接触辩论，最先接触的就是**黄执中**。
他的辩论，我看了一遍又一遍；不过瘾，就下载到手机里继续看；他的微博，我刷到不能再刷；连“少爷”那些略带尺度、略显淘气的配图，都成了少年时期独特的记忆。
他的博客我反复看，不够就下载保存，不够就打印出来一页页翻。
后来他的博客没了。幸运的是，我手上还有一份完整备份（也感谢网上愿意保存、愿意传承的人）。<br>
上大学后，我一腔热血加入辩论社——
我狠狠地打辩论，近乎疯狂，妄图成为像他那样的人。
但天资平平，没能打出什么名堂；
我不聪明，但我固执。
四年打辩论，没进校队，却从没离开过赛场。
这种纯爱好、零收益、零回报、纯粹投入的事，至今再没第二件。<br>
辩论教会我的，也远不止“怎么赢一场比赛”。
更重要的，是——**怎么认识你自己，怎么认识这个世界🌍；<br>
直到现在，我依然时不时会让左右脑打上一架，
依然对辩论这种“小众的游戏”抱有温热的关注。<br>
如今开始写博客，我很清楚：
黄执中对我思考方式的塑造，是根系一样的深、空气一样的常态。<br>
**“微光影响微光”**，是我开这个专栏的全部理由。
我希望把我从他那里得到的那一点点光，继续传递给更多人。
如果有人因这些内容受益一二，那是我能想到的最好的回馈。`,

    ////////////////////////AI4Everything///////////////////////////
    "nav.category.ai4everything": "AI4Everything",
    "nav.category.ai4everything.desc":
      "探索 **人工智能** 的无限可能，关注 `AI` 在各个领域的应用",

    /////////////////////////Idle Thoughts///////////////////////////
    "nav.category.idle-thoughts": "杂念",
    "nav.category.idle-thoughts.desc":
      "这里不是答案的仓库，而是**问题的温室**。那些在路上被忽略的念头、深夜里突然跳出来的疑问、看似无用却让人停下脚步的片段，都放在这里。不是为了说服谁，只是为了让自己看得更清楚。",

    /////////////////////////Shoulders of Giants///////////////////////////
    "nav.category.shoulders-of-giants": "巨人的肩膀",
    "nav.category.shoulders-of-giants.desc":
      '我们总以为自己在"原创"，其实更多时候是在与前人的回声对话。这里收集那些比我**更早、更深、更远**的声音——不是为了致敬，而是为了提醒自己：*视野的边界，往往不是天生的，而是被启发扩出去的。*',
  },
};

const defaultLang = "en";

// 获取当前语言
function getLang() {
  if (typeof localStorage !== "undefined") {
    return localStorage.getItem("lang") || defaultLang;
  }
  return defaultLang;
}

// 设置语言
function setLang(lang) {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("lang", lang);
  }
  updatePageLanguage(lang);
}

// 获取翻译
function t(key) {
  const lang = getLang();
  return ui[lang]?.[key] || ui[defaultLang][key] || key;
}

// 检查文本是否包含 Markdown 标记
function hasMarkdown(text) {
  return (
    text.includes("**") || // 粗体
    text.includes("*") || // 斜体
    text.includes("[") || // 链接
    text.includes("`") || // 代码
    text.includes("#") || // 标题
    text.includes("\n") // 换行
  );
}

// 渲染 Markdown
function renderMarkdown(text) {
  return marked.parse(text);
}

// 更新页面上所有带 data-i18n 属性的元素
function updatePageLanguage(lang) {
  document.documentElement.lang = lang;

  // 更新所有带 data-i18n 的元素
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key && ui[lang]?.[key]) {
      const text = ui[lang][key];

      // 检查是否包含 Markdown 标记
      if (hasMarkdown(text)) {
        el.innerHTML = renderMarkdown(text);
      } else {
        el.textContent = text;
      }
    }
  });

  // 更新所有带 data-i18n-placeholder 的元素
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (key && ui[lang]?.[key]) {
      el.placeholder = ui[lang][key];
    }
  });

  // 更新语言切换按钮文字
  const langText = document.getElementById("langText");
  if (langText) {
    langText.textContent = lang === "en" ? "EN" : "中文";
  }
}

// 切换语言
function toggleLang() {
  const currentLang = getLang();
  const newLang = currentLang === "en" ? "zh" : "en";
  setLang(newLang);
}

// 初始化
function initI18n() {
  const lang = getLang();
  updatePageLanguage(lang);

  // 监听语言切换按钮点击
  const langToggle = document.getElementById("langToggle");
  if (langToggle) {
    langToggle.addEventListener("click", toggleLang);
  }
}

// 页面加载完成后初始化
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initI18n);
} else {
  initI18n();
}

// 导出给全局使用
window.i18n = { getLang, setLang, t, updatePageLanguage, toggleLang };
