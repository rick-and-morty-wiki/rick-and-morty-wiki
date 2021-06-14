import React, { useState } from 'react'
import { View } from '@tarojs/components'

import { Drawer } from '@components'

import { PageContent, DrawerContent } from '../components'
import { PlatformEnterProps } from '../type'
import '../index.less'


const AllCharacterRN: React.FC<PlatformEnterProps> = (props) => {
  const { filter, setFilter, reqTrigger, setReqTrigger } = props
  const [drawerWE, setDrawerWE] = useState<boolean>(false)

  return (
    <View className='all-c-container'>
      <Drawer show={drawerWE} onClose={() => setDrawerWE(false)} right width='400rpx'>
        <DrawerContent
          filter={filter}
          setFilter={setFilter}
          setReqTrigger={setReqTrigger}
        />
      </Drawer>
      <PageContent
        filter={filter}
        setDrawerWE={setDrawerWE}
        reqTrigger={reqTrigger}
        setReqTrigger={setReqTrigger}
      />
    </View>
  )

}

export default AllCharacterRN
