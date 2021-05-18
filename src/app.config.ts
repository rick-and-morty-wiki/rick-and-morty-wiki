

export default {
  pages: ["pages/wiki/index", "pages/game/index", "pages/about/index"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black"
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
        text: "wiki",
        iconPath: "assets/tab/event.png",
        selectedIconPath: "assets/tab/event_active.png"
      },
      {
        pagePath: "pages/game/index",
        text: "game",
        iconPath: "assets/tab/schedule.png",
        selectedIconPath: "assets/tab/schedule_active.png"
      },
      {
        pagePath: "pages/about/index",
        text: "About",
        iconPath: "assets/tab/home.png",
        selectedIconPath: "assets/tab/home_active.png"
      }
    ]
  },
};
