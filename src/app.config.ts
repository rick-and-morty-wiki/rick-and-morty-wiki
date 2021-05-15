
export default {
  pages: [
    'pages/index/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: "#606468",
    selectedColor: "#0089ff",
    backgroundColor: '#fff',
    // borderStyle: 'white',
    custom: false,
    list: [{
      pagePath: 'pages/event/index',
      text: 'Wiki',
      iconPath: 'assets/tab/event.png',
      selectedIconPath: 'assets/tab/event_active.png',
    },
    {
      pagePath: 'pages/schedule/index',
      text: 'Game',
      iconPath: 'assets/tab/schedule.png',
      selectedIconPath: 'assets/tab/schedule_active.png',
    },
    {
      pagePath: 'pages/home/index',
      text: 'About',
      iconPath: 'assets/tab/home.png',
      selectedIconPath: 'assets/tab/home_active.png',
    },
    ]
  },
}
