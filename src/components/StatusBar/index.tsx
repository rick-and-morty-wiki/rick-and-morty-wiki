import React from "react";
import { View } from '@tarojs/components';
import { isAndriod } from '@utils';

let StatusBar: any;
if (IS_RN && isAndriod()) {
  StatusBar = require('react-native').StatusBar;
}

export default function TaroStatusBar(props: any) {
  return StatusBar ? (
    <StatusBar {...props} />
  ) : (
    <View style={{ display: 'none' }} />
  );
}
