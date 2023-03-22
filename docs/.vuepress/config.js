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
              "interview/js/1",
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
            children: ["note/git/1"],
          },
        ],
      },
    ],
  },
};
