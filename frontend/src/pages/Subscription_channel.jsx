import React, { useEffect, useState } from 'react'
import { Grid } from '@mantine/core'
// import { contract } from '../config/config'
import SubscriptionPackage from "./../components/SubscriptionPackage"
import {useAppContext} from "./../providers/AppProvider"

const Subscription_channel = () => {
  const { contract } = useAppContext()
  const [spackages, setPackages] = useState(null)

  const getPackages = () => {
    if (contract) {
      contract.get_packages().then(res => {
        setPackages(res)
      }).catch(e => {
        console.log("Error loading package:- ", e)
      })
    }
  }

  useEffect(() => {
    getPackages()
  }, [])
  return (
    <div>
      <Grid>
        {
          spackages?.map((package_, i) => (
            <Grid.Col key={`package_${i}`} span={{ xs: 4, md: 3 }}>
              <SubscriptionPackage {...package_} />
            </Grid.Col>

          ))
        }
      </Grid>
    </div>
  )
}

export default Subscription_channel