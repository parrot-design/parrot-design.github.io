module.exports = {
  title: "宝哥博客",
  description: "Just playing around",
  themeConfig: {
    sidebarDepth: 1,
    displayAllHeaders: false,
    sidebar: [
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
            ],
          },
          {
            title: "Css面试题",
            collapsable: true,
            children: [
              "interview/css/1",
              "interview/css/2",
              "interview/css/3",
              "interview/css/4",
              "interview/css/5",
              "interview/css/6",
              "interview/css/7",
              "interview/css/8",
            ],
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
            children: ["jsbase/es6/Map"],
          },
        ],
      },
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
        ],
      },
    ],
  },
};
