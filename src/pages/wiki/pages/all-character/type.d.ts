import { CharacterFilterType } from '@constants/types'
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';

// 控制请求的开关
export interface ReqTriggerType {
  trigger: boolean,
  firstFilter: boolean,
}

export type SetReqTriggerType = React.Dispatch<React.SetStateAction<ReqTriggerType>>

export type SetFilterType = React.Dispatch<React.SetStateAction<CharacterFilterType>>

export type SetDrawerWEType = React.Dispatch<React.SetStateAction<boolean>>

export type DrawerRNType = React.MutableRefObject<DrawerLayout>

// 文件夹rn、weapp内组件的props
export interface PlatformEnterProps {
  filter: CharacterFilterType,
  setFilter: SetFilterType,
  reqTrigger: ReqTriggerType,
  setReqTrigger: SetReqTriggerType,
}

// PageContent的props
export interface AllCharacterPageContentProps {
  drawerRN?: DrawerRNType,
  setDrawerWE?: SetDrawerWEType,
  filter: CharacterFilterType,
  reqTrigger: ReqTriggerType,
  setReqTrigger: SetReqTriggerType,
}

// DrawerContent的props
export interface DrawerContentProps {
  filter: CharacterFilterType,
  setFilter: SetFilterType,
  setReqTrigger: SetReqTriggerType,
}
