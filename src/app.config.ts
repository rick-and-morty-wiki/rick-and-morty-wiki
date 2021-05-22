export default {
  pages: [
    "pages/wiki/index",
    "pages/game/index",
    "pages/about/index",

    "pages/wiki/pages/wiki-character/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#ffffff",
    navigationStyle: 'custom',
    // navigationBarTextStyle: "black"
  },
  rn: {
    screenOptions: {
      // 设置页面的options，参考https://reactnavigation.org/docs/stack-navigator/#options
      shadowOffset: { width: 0, height: 0 },
      borderWidth: 0,
      elevation: 0,
      shadowOpacity: 1,
      borderBottomWidth: 0,
    },
    options:{
      // tabBarVisible: false,
      title: '222',
   },
  },
  tabBar: {
    color: "#606468",
    selectedColor: "#0089ff",
    backgroundColor: "#fff",
    borderStyle: "white",
    custom: false,
    list: [
      {
        pagePath: "pages/wiki/index",
        text: "百科",
        iconPath: "assets/tab/event.png",
        selectedIconPath: "assets/tab/event_active.png"
      },
      {
        pagePath: "pages/game/index",
        text: "游戏",
        iconPath: "assets/tab/schedule.png",
        selectedIconPath: "assets/tab/schedule_active.png"
      },
      {
        pagePath: "pages/about/index",
        text: "关于",
        iconPath: "assets/tab/home.png",
        selectedIconPath: "assets/tab/home_active.png"
      }
    ]
  },
};
