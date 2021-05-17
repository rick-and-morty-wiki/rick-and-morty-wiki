
export const rnConfig = {
  options: {},
};

if (process.env.TARO_ENV === "rn") {
  rnConfig.options = {

  }
  // rnConfig = {
  //   //deep Linking前缀,https://reactnavigation.org/docs/deep-linking
  //   linking: [],
  //   //tabBar页面的设置，https://reactnavigation.org/docs/bottom-tab-navigator/#tabbar 对应options的配置，支持以下属性透传，不支持返回react.Node节点设置的方案
  //   options: {

  //   },
  //   tabBarOptions: {
  //     //tabbarOptions的配置，其他参考https://reactnavigation.org/docs/bottom-tab-navigator/#tabbar tabBarOptions
  //     style: { background: '#000000' }
  //   },
  //   screenOptions: {
  //     //全局screenOptions，作用于非所有页面，注意不支持返回React.Node的属性，参考https://reactnavigation.org/docs/stack-navigator/#options
  //   }
  // };
}

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
  rn: rnConfig
};
