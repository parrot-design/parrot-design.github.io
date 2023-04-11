module.exports = {
  title: "宝哥博客",
  description: "Just playing around",
  themeConfig: {
    sidebarDepth: 1,
    displayAllHeaders: false,
    sidebar: [
      {
        title: "React源码解析",
        children: ["react-core/1"],
      },
      {
        title: "Angular学习",
        children: ["angular/1","angular/2","angular/3"],
      },
      {
        title: "HMR原理",
        children: ["hmr/1"],
      },
      {
        title: "webpack原理",
        children: ["webpack/1"],
      },
      {
        title: "面试题",
        collapsable: true,
        children: [
          {
            title: "JS",
            collapsable: true,
            children: [
              "interview/js/datatype",
              "interview/js/valuetype",
              "interview/js/scope",
              "interview/js/closure",
              "interview/js/prototype",
              "interview/js/bdom",
              "interview/js/ajax",
              "interview/js/event",
              "interview/js/this",
              "interview/js/code",
              "interview/js/1",
            ],
          },

          {
            title: "vue面试题",
            collapsable: true,
            children: [
              "interview/vue/1",
              "interview/vue/2",
              "interview/vue/3",
              "interview/vue/4",
              "interview/vue/5",
              "interview/vue/6",
              "interview/vue/7",
              "interview/vue/8",
              "interview/vue/9",
              "interview/vue/10",
              "interview/vue/11",
              "interview/vue/12",
              "interview/vue/13",
              "interview/vue/14",
            ],
          },
          {
            title: "vue3面试题",
            collapsable: true,
            children: [
              "interview/vue3/1",
              "interview/vue3/2",
              "interview/vue3/3",
              "interview/vue3/4",
              "interview/vue3/5",
            ],
          },
          {
            title: "vue & react面试题",
            collapsable: true,
            children: ["interview/vue & react/1"],
          },
          {
            title: "css面试题",
            collapsable: true,
            children: [
              "interview/css/1",
              "interview/css/2",
              "interview/css/3",
              // "interview/css/4",
              // "interview/css/5",
            ],
          },
          {
            title: "ts面试题",
            collapsable: true,
            children: [
              "interview/ts/1",
              "interview/ts/2",
              // "interview/ts/3",
              // "interview/ts/4",
              // "interview/ts/5",
            ],
          },
          {
            title: "webpack面试题",
            collapsable: true,
            children: [
              "interview/webpack/1",
              // "interview/webpack/2",
              // "interview/webpack/3",
              // "interview/webpack/4",
              // "interview/webpack/5",
              // "interview/webpack/6",
              // "interview/webpack/7",
              // "interview/webpack/8",
              // "interview/webpack/9",
            ],
          },
          {
            title: "微信小程序面试题",
            collapsable: true,
            children: [
              "interview/webapp/1",
              "interview/webapp/2",
              "interview/webapp/3",
              "interview/webapp/4",
              "interview/webapp/5",
              "interview/webapp/6",
              "interview/webapp/7",
              "interview/webapp/8",
              // "interview/webpack/8",
              // "interview/webpack/9",
            ],
          },
          {
            title: "wcc面试题",
            collapsable: true,
            children: [
              "interview/wcc/1",
              "interview/wcc/2",
              "interview/wcc/3",
              "interview/wcc/4",
              "interview/wcc/5",
              "interview/wcc/6",
              "interview/wcc/7",
              "interview/wcc/8",
              "interview/wcc/9",
            ],
          },
          {
            title: "ql面试题",
            collapsable: true,
            children: [
              "interview/ql/1",
              "interview/ql/2",
              "interview/ql/3",
              "interview/ql/4",
              "interview/ql/5",
            ],
          },
          {
            title: "yzxx面试题",
            collapsable: true,
            children: ["interview/yzxx/1"],
          },
        ],
      },
      {
        title: "JS基础",
        collapsable: true,
        children: [
          {
            title: "ES6",
            collapsable: true,
            children: ["jsbase/es6/Map", "jsbase/es6/Set"],
          },
        ],
      },
      // {
      //   title: "Webpack基础",
      //   collapsable: true,
      //   children: [
      //     {
      //       title: "基础配置",
      //       collapsable: true,
      //       children: ["webpackbase/config/Map", "jsbase/es6/Set"],
      //     },
      //   ],
      // },
      {
        title: "Leetcode",
        collapsable: true,
        children: [
          {
            title: "栈",
            collapsable: true,
            children: ["leetcode/stack/20"],
          },
          {
            title: "哈希表",
            collapsable: true,
            children: ["leetcode/hashmap/389"],
          },
          {
            title: "树",
            collapsable: true,
            children: ["leetcode/tree/100"],
          },
          {
            title: "链表",
            collapsable: true,
            children: ["leetcode/linklist/21", "leetcode/linklist/83"],
          },
          {
            title: "堆",
            collapsable: true,
            children: ["leetcode/heap/1046"],
          },
        ],
      },
      {
        title: "随身小记",
        collapsable: true,
        children: [
          {
            title: "git",
            collapsable: true,
            children: ["note/git/1","note/git/2"],
          },
          {
            title: "npm",
            collapsable: true,
            children: ["note/npm/1"],
          },
          {
            title: "yarn",
            collapsable: true,
            children: ["note/yarn/1"],
          },
          {
            title: "node",
            collapsable: true,
            children: ["note/node/1"],
          },
          {
            title: "nvm",
            collapsable: true,
            children: ["note/nvm/1"]
          },
          {
            title: "ts",
            collapsable: true,
            children: ["note/ts/1"],
          },
          {
            title: "n",
            collapsable: true,
            children: ["note/n/1"],
          },
          {
            title: "package.json",
            collapsable: true,
            children: ["note/package.json/1","note/package.json/2","note/package.json/3","note/package.json/4"],
          },
          {
            title: "npm",
            collapsable: true,
            children: ["note/npm/1","note/npm/2","note/npm/3","note/npm/4"],
          },
          {
            title: "node_module",
            collapsable: true,
            children: ["note/node_module/1"],
          }
        ],
      },
      {
        title: "手写JS代码系列",
        collapsable: true,
        children: [
          "js_code/reduce",
          "js_code/bubble-sort",
          "js_code/call",
          "js_code/bind",
          "js_code/apply",
          "js_code/debounce",
          "js_code/throttle",
        ],
      },
    ],
  },
};
