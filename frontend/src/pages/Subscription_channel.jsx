import React, { useEffect } from 'react'
import { useAppContext } from '../providers/AppProvider'
import { bigintToShortStr } from '../config/utils'
import BigNumber from 'bignumber.js'

const Subscription_channel = () => {
  const { contract } = useAppContext()
  const getPackage = () => {
    if (contract) {
      contract.get_package(1).then(res => {
        console.log("package: ", res)
        console.log(bigintToShortStr(res.sub_package))
        console.log(BigNumber(res.price).toNumber())
      }).catch(e => {
        console.log("Error loading package:- ", e)
      })
    }
  }
  useEffect(() => {
    getPackage()
  }, [])
  return (
    <div>

    </div>
  )
}

export default Subscription_channel