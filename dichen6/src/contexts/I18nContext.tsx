import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type Language = "en" | "zh";

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// 翻译数据 - 与原有的 i18n.js 保持一致
const translations = {
  en: {
    "nav.home": "Home",
    "nav.posts": "Blogs",
    "nav.projects": "Projects",
    "nav.category": "Category",
    "nav.about": "About",
    "nav.dayMode": "Day mode",
    "nav.nightMode": "Night mode",
    "home.greeting": "I'm Dichen 6",
    "home.title": "Researcher & Developer",
    "home.affiliation": "Nanjing, China",
    "home.focus": "Questioning the world, and myself",
    "home.quote": '"The science of today is the technology of tomorrow."',
    "home.researchTitle": "Research Interests",
    "home.research1": "Artificial Intelligence",
    "home.research2": "Geospatial Intelligence",
    "home.research3": "Environmental Science",
    "home.research4": "Web Development",
    "home.cardName": "Dichen Liu",
    "home.cardTitle": "Researcher",
    "home.cardAffiliation": "Nanjing University",
    "home.statPapers": "Papers",
    "home.statCitations": "Citations",
    "home.statHIndex": "h-index",
    "home.currentFocus": "Current Focus",
    "home.currentProject":
      "Investigating the applications of LLMs in geospatial analysis and environmental monitoring.",
    "home.statusOpen": "Open to Collaboration",
    "home.location": "Nanjing, China",
    "home.followButton": "Follow me on 𝕏",
    "home.writingsSeparator": "Some of my writing",
    "home.whatIDo": "What I Do",
    "home.keywords": "Build · Explore · Observe · Understand",
    "pagination.previous": "Previous",
    "pagination.next": "Next",
    "pagination.pageInfo": "Page {current} of {total}",
    "writings.title": "My Writings",
    "writings.description":
      "Along with coding I also like to write about life and technology. Here are some of my recent posts.",
    "writings.viewAll": "View All My Writing",
    "posts.title": "My Writing",
    "posts.description":
      "Dive into my musings on life and tech in my latest posts; a blend of introspection and innovation.",
    "projects.title": "My Projects",
    "projects.description":
      "Here are some of the current projects I've been working on. I really enjoy creating new projects and coming up with new ideas.",
    "about.title": "About Me",
    "about.description":
      "Hello 👋 I'm a frontend engineer from Nanjing, China. I'm passionate about building new products and learning new technology.",
    "about.shortBio": "Short Bio",
    "about.bioContent":
      "Front-end cutter 🧑🏻‍💻, back-end amateur 🤷🏻‍♂️, operations digging holes person 🤦🏻‍♂️.",
    "about.experience": "Experience",
    "about.connect": "Let's Connect",

    "category.ai-adventist.name": "AI Adventist",
    "category.ai-adventist.desc": `时代的变化常常不是轰鸣开始的，
而是一阵无人注意的风。
AI 的到来也是如此——
它改变的是我们以为不会被改变的部分。

我在这里写下自己看见的那点风声，
不是为了预测未来，
而是为了在未来真正到来之前，
先学会听懂它。`,
    "category.snow-like.name": "Snow Like",
    "category.snow-like.desc": `从初一开始接触辩论，最先接触的就是**黄执中**。
他的辩论，我看了一遍又一遍；不过瘾，就下载到手机里继续看；
他的微博，我刷到不能再刷；连“少爷”那些略带尺度、略显淘气的配图，都成了少年时期独特的记忆。
他的博客我反复看，不够就下载保存，不够就打印出来一页页翻。
后来他的博客没了。幸运的是，我手上还有一份完整备份（也感谢网上愿意保存、愿意传承的人）。

上大学后，我一腔热血加入辩论社——我狠狠地打辩论，近乎疯狂，妄图成为像他那样的人。
但天资平平，没能打出什么名堂；
我不聪明，但我固执。四年打辩论，没进校队，却从没离开过赛场。
这种纯爱好、零收益、零回报、纯粹投入的事，至今再没第二件。

辩论教会我的，也远不止“怎么赢一场比赛”。
更重要的，是——**怎么认识你自己，怎么认识这个世界🌍；**
直到现在，我依然时不时会让左右脑打上一架，
依然对辩论这种“小众的游戏”抱有温热的关注。

如今开始写博客，我很清楚：
黄执中对我思考方式的塑造，是根系一样的深、空气一样的常态。

**“微光影响微光”**，是我开这个专栏的全部理由。
我希望把我从他那里得到的那一点点光，继续传递给更多人。
如果有人因这些内容受益一二，那是我能想到的最好的回馈。`,
    "category.idle-thoughts.name": "Idle Thoughts",
    "category.idle-thoughts.desc": `这里不是答案的仓库，而是**问题的温室**。

那些在路上被忽略的念头、深夜里突然跳出来的疑问、看似无用却让人停下脚步的片段，都放在这里。
      
不是为了说服谁，只是为了让自己看得更清楚。`,
    "category.shoulders-of-giants.name": "Shoulders of Giants",
    "category.shoulders-of-giants.desc": `我们总以为自己在"原创"，其实更多时候是在与前人的回声对话。

这里收集那些比我**更早、更深、更远**的声音——不是为了致敬，

而是为了提醒自己：*视野的边界，往往不是天生的，而是被启发扩出去的。*`,
  },
  zh: {
    "nav.home": "首页",
    "nav.posts": "博客",
    "nav.category": "分类",
    "nav.category.desc": "按主题组织的文章分类",
    "nav.projects": "项目",
    "nav.about": "关于",
    "nav.dayMode": "日间模式",
    "nav.nightMode": "夜间模式",
    "home.greeting": "我是 Dichen 6",
    "home.intro": "我是一名生活在南京的前端程序员。",
    "home.focus": "追问世界，追问自己",
    "home.helpTitle": "我可以帮助你：",
    "home.skill1": "Vue.js 开发",
    "home.skill2": "React.js 开发",
    "home.skill3": "Node.js 开发",
    "home.skill4": "网站设计",
    "home.skill5": "以及更多...",
    "home.followButton": "在 𝕏 上关注我",
    "home.writingsSeparator": "我的一些文章",
    "home.whatIDo": "我在做什么",
    "home.keywords": "构建系统 · 探索智能 · 观察地球 · 理解世界",
    "pagination.previous": "上一页",
    "pagination.next": "下一页",
    "pagination.pageInfo": "第 {current} 页，共 {total} 页",
    "writings.title": "我的文章",
    "writings.description":
      "除了编程，我也喜欢写一些关于生活和技术的文章。这是我最近的一些文章。",
    "writings.viewAll": "查看所有文章",
    "posts.title": "我的文章",
    "posts.description":
      "在我最新的文章中深入了解我对生活和技术的思考；这是内省与创新的融合。",
    "projects.title": "我的项目",
    "projects.description":
      "这是我目前正在做的一些项目。我非常喜欢创建新项目和想出新点子。",
    "about.title": "关于我",
    "about.description":
      "你好 👋 我是一名来自中国南京的前端工程师。我热衷于构建新产品和学习新技术。",
    "about.shortBio": "简介",
    "about.bioContent": "前端切图仔 🧑🏻‍💻，后端门外汉 🤷🏻‍♂️，运维挖坑人 🤦🏻‍♂️。",
    "about.experience": "工作经历",
    "about.connect": "联系我",

    "category.ai-adventist.name": "AI 降临派",
    "category.ai-adventist.desc": `时代的变化常常不是轰鸣开始的，
而是一阵无人注意的风。
AI 的到来也是如此——
它改变的是我们以为不会被改变的部分。

我在这里写下自己看见的那点风声，
不是为了预测未来，
而是为了在未来真正到来之前，
先学会听懂它。`,
    "category.snow-like.name": "满座衣冠似雪",
    "category.snow-like.desc": `从初一开始接触辩论，最先接触的就是**黄执中**。
他的辩论，我看了一遍又一遍；不过瘾，就下载到手机里继续看；
他的微博，我刷到不能再刷；连“少爷”那些略带尺度、略显淘气的配图，都成了少年时期独特的记忆。
他的博客我反复看，不够就下载保存，不够就打印出来一页页翻。
后来他的博客没了。幸运的是，我手上还有一份完整备份（也感谢网上愿意保存、愿意传承的人）。

上大学后，我一腔热血加入辩论社——我狠狠地打辩论，近乎疯狂，妄图成为像他那样的人。
但天资平平，没能打出什么名堂；
我不聪明，但我固执。四年打辩论，没进校队，却从没离开过赛场。
这种纯爱好、零收益、零回报、纯粹投入的事，至今再没第二件。

辩论教会我的，也远不止“怎么赢一场比赛”。
更重要的，是——**怎么认识你自己，怎么认识这个世界🌍；**
直到现在，我依然时不时会让左右脑打上一架，
依然对辩论这种“小众的游戏”抱有温热的关注。

如今开始写博客，我很清楚：
黄执中对我思考方式的塑造，是根系一样的深、空气一样的常态。

**“微光影响微光”**，是我开这个专栏的全部理由。
我希望把我从他那里得到的那一点点光，继续传递给更多人。
如果有人因这些内容受益一二，那是我能想到的最好的回馈。`,
    "category.idle-thoughts.name": "杂念",
    "category.idle-thoughts.desc": `这里不是答案的仓库，而是**问题的温室**。

那些在路上被忽略的念头、深夜里突然跳出来的疑问、看似无用却让人停下脚步的片段，都放在这里。
      
不是为了说服谁，只是为了让自己看得更清楚。`,
    "category.shoulders-of-giants.name": "巨人的肩膀",

    "category.shoulders-of-giants.desc": `我们总以为自己在"原创"，其实更多时候是在与前人的回声对话。

这里收集那些比我**更早、更深、更远**的声音——不是为了致敬，

而是为了提醒自己：*视野的边界，往往不是天生的，而是被启发扩出去的。*`,
  },
};

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem("lang");
    return saved === "zh" || saved === "en" ? saved : "en";
  });

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
  };

  const t = (key: string): string => {
    const translation = translations[lang] as Record<string, string>;
    return translation[key] || key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
};
