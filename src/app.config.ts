import { useGlobalIconFont } from './components/Iconfont/helper';

export default {
  pages: [
    
    "pages/wiki/index",
    "pages/game/index",
    "pages/about/index",

    "pages/game/pages/game-result/index",

    "pages/wiki/pages/character/index",
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
    color: "#9c9d9e",
    selectedColor: "#0089ff",
    backgroundColor: "#24292F",
    borderStyle: "black",
    custom: false,
    list: [
      {
        pagePath: "pages/wiki/index",
        text: "百科",
        iconPath: "assets/tab/wiki.png",
        selectedIconPath: "assets/tab/wiki_active.png"
      },
      {
        pagePath: "pages/game/index",
        text: "游戏",
        iconPath: "assets/tab/game.png",
        selectedIconPath: "assets/tab/game_active.png"
      },
      {
        pagePath: "pages/about/index",
        text: "关于",
        iconPath: "assets/tab/about.png",
        selectedIconPath: "assets/tab/about_active.png"
      }
    ]
  },
  usingComponents: Object.assign(useGlobalIconFont()),
};
