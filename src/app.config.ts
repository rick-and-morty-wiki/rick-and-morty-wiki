export default {
  pages: [
    "pages/wiki/index",
    "pages/game/index",
    "pages/about/index",

    // "pages/wiki/pages/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: " "
    // navigationBarTextStyle: "black"
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
  }
};
