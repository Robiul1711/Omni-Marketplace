import React from 'react'
import HowOmniWork from '@/components/sites/howItsWork/HowOmniWork'
import ForAdvertisers from '@/components/sites/howItsWork/ForAdvertisers'
import HostSide from '@/components/sites/howItsWork/HostSide'
import ReadyStarted from '@/components/sites/home/ReadyStarted'

const HowItsWork = () => {
  return (
    <div>
        <HowOmniWork/>
        <ForAdvertisers/>
        <HostSide/>
         <ReadyStarted />
    </div>
  )
}

export default HowItsWork