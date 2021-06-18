# Rick and Morty Wiki

这里可以查看几乎所有在动画中出现的人物、得知他们的故事，外加有趣的小游戏。

灵感和基础数据来源于[afuh/rick-and-morty-api](https://github.com/afuh/rick-and-morty-api)。

---

## 技术

基于Taro3.2+，实现小程序端、IOS和Android端（React Native）同步支持。
- 语言：TypeScript
- 框架：React(Hook)

支持状态：
- [x] React Native
- [x] 微信小程序
- [ ] H5


## 规划

- [x] 基础角色/地点/剧集图鉴
- [x] Dead or Alive Game
- [ ] 其他图鉴（音乐等）


## 开发
首先将代码克隆到本地，并安装好依赖：

```
$ git clone ...
$ cd rick-and-morty-wiki
$ npm install
```

#### 编译到微信小程序

直接运行：
```
$ npm run dev
```

更多信息请参考[Taro文档](https://taro-docs.jd.com/taro/docs/GETTING-STARTED#%E7%BC%96%E8%AF%91%E8%BF%90%E8%A1%8C)。


#### 编译到React Native
在进行以下操作之前，请确保自己的电脑上安装了正确的RN环境。参考：[react-native中文网](https://www.react-native.cn/docs/environment-setup)。如果在编译的过程中遇到了问题，请参考[Taro文档](https://taro-docs.jd.com/taro/docs/react-native#%E5%BC%80%E5%8F%91)。

##### 1. 克隆native-shell到项目内
将[rick-and-morty-wiki/RMwiki-native-shell](https://github.com/rick-and-morty-wiki/RMwiki-native-shell)克隆到项目根目录内。
```
$ git clone https://github.com/rick-and-morty-wiki/RMwiki-native-shell.git
```

##### 2. 为native-shell安装依赖
按顺序执行下面的命令：
```
$ cd taro-native-shell
$ npm install
$ cd ios & pod install
```

##### 3. 编译到指定平台（快捷指令）

cd到项目根目录下，拆分一个终端（或新建一个终端）。以**编译到Android端**为例，首先在第一个终端内运行：
```
$ npm run and1
```
等待几秒。当出现 `Welcome to React Native!` 后，在第二个终端内运行：
```
$ npm run and2
```
之后第一个终端会开始编译。在进行下一步操作之前，请确保自己的电脑连接了一台可调式的设备（或安装了虚拟机）。等待编译完成后，在第二个终端内运行：
```
$ npm run and3
```
这一步的等待时间可能较长，也比较容易出现报错。通常情况下等待的时间在半分钟左右，但第一次编译可能会有几分钟。编译成功后，会自动将app安装在电脑连接的调试设备（或虚拟机）上。

**编译到IOS端**的步骤与Android基本一致，不同之处在于运行的三行命令需要更换为：
```
$ npm run ios1
$ npm run ios2
$ npm run ios3
```


> 以上是编译到指定平台的快捷方法，你也可以采用taro原始的方法进行编译，以下是编译步骤：

1. 进入Taro RN编译预览模式
```
$ npm run dev:rn
```
2. 构建目标平台
>上一步编译完成后，在浏览器请求下方url（二选一）  
Android: http://127.0.0.1:8081/index.bundle?platform=android&dev=true  
IOS: http://127.0.0.1:8081/index.bundle?platform=ios&dev=true

3. 启动React Native项目（Android）
```
$ npm run android
```
4. 启动React Native项目（IOS）
```
$ npm run ios
```
