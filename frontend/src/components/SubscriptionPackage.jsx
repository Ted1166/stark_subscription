import { Card, Text, Title } from '@mantine/core'
import React from 'react'
import { bigintToShortStr } from '../config/utils'
import BigNumber from 'bignumber.js'

const SubscriptionPackage = ({sub_package, price, channels, package_id}) => {
  return (
    <Card radius={'md'}>
        <Title fw={500} ta={'center'}>{bigintToShortStr(sub_package)}</Title>
        <Text ta={'center'}>{BigNumber(channels).toNumber()} Channels</Text>
        <Text ta={'center'}>Kes {BigNumber(price).toNumber()}/-</Text>
    </Card>
  )
}

export default SubscriptionPackage