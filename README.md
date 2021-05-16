# Rick and Morty Wiki

这里可以查看几乎所有在动画中出现的人物、得知他们的故事，外加有趣的小游戏。

灵感和基础数据来源于[afuh/rick-and-morty-api](https://github.com/afuh/rick-and-morty-api)。

---

## 技术

基于Taro3.2+，实现H5端、小程序端、IOS和Android端（React Native）同步支持。
- 语言：TypeScript
- 框架：React


## 规划

- [ ] 基础Wiki
- [ ] Alive or Dead Game
- [ ] UGC社区


## 开发

```
$ git clone ...
$ cd rick-and-morty-wiki
$ npm install
```
如果你想要进行React Native端的研发，请额外完成以下操作：

1. 进入Taro RN编译预览模式
```
$ npm run dev:rn
```
2. 构建目标平台
>上一步编译完成后，在浏览器请求下方url（二选一）  
Android: http://127.0.0.1:8081/index.bundle?platform=android&dev=true  
IOS: http://127.0.0.1:8081/index.bundle?platform=ios&dev=true

3. 将[NervJS/taro-native-shell](https://github.com/NervJS/taro-native-shell)克隆到项目内
```
$ git clone https://github.com/NervJS/taro-native-shell.git
```
4. 安装依赖
```
$ cd taro-native-shell
$ npm install
```
5. 启动React Native项目（Android）
```
$ npm run android
```
6. 启动React Native项目（IOS）
```
$ cd ios & pod install
$ cd .. 
$ npm run ios
```

RN端开发详细内容请参考[Taro文档](https://taro-docs.jd.com/taro/docs/react-native#%E5%BC%80%E5%8F%91)
