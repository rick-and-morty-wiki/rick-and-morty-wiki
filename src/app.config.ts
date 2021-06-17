import { useGlobalIconFont } from './components/Iconfont/helper';


export default {
  pages: [
    
    "pages/wiki/index",
    "pages/game/index",
    "pages/about/index",

    "pages/wiki/pages/character/index",
    "pages/wiki/pages/all-character/index",
    "pages/wiki/pages/all-episode/index",
    "pages/wiki/pages/character-list/index",

    "pages/game/pages/game-result/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#ffffff",
    navigationStyle: 'custom',
    navigationBarTextStyle: "white"
  },
  rn: {
    screenOptions: {
      // 设置页面的options，参考https://reactnavigation.org/docs/stack-navigator/#options
      // shadowOffset: { width: 0, height: 0 },
      // borderWidth: 0,
      elevation: 10000,
      // shadowOpacity: 1,
      // borderBottomWidth: 0,
      gestureEnabled: true,
      // cardStyle: { with: '100%' },
      cardOverlayEnabled: true,
      // animationTypeForReplace: 'push',
      // cardStyle: { backgroundColor: 'transparent' },
      // cardStyleInterpolator: ({ current: { progress } }) => ({
      //   cardStyle: {
      //     opacity: progress.interpolate({
      //       inputRange: [0, 0.5, 0.9, 1],
      //       outputRange: [0, 0.25, 0.7, 1],
      //     }),
      //   },
      //   overlayStyle: {
      //     opacity: progress.interpolate({
      //       inputRange: [0, 1],
      //       outputRange: [0, 0.5],
      //       extrapolate: 'clamp',
      //     }),
      //   },
      // }),
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
      // {
      //   pagePath: "pages/about/index",
      //   text: "关于",
      //   iconPath: "assets/tab/about.png",
      //   selectedIconPath: "assets/tab/about_active.png"
      // }
    ]
  },
  usingComponents: Object.assign(useGlobalIconFont()),
};
