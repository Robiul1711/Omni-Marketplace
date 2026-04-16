import React from 'react'
import AboutOmni from '@/components/sites/about/AboutOmni'
import WhatWeDo from '@/components/sites/about/WhatWeDo'
import Practice from '@/components/sites/about/Practice'
import OurMission from '@/components/sites/about/OurMission'
import OurVision from '@/components/sites/about/OurVision'
import CoreValue from '@/components/sites/about/CoreValue'
import ReadyStarted from '@/components/sites/home/ReadyStarted'

const AboutUs = () => {
  return (
    <div>
      <div className='section-padding-x flex flex-col gap-10 sm:gap-20 md:gap-24 xl:gap-32 section-padding-y  mt-24 md:mt-10'>
      <AboutOmni />
      <WhatWeDo />
      <Practice />
      <OurMission />
      <OurVision />
      <CoreValue />

      </div>
      <ReadyStarted />
    </div>
  )
}

export default AboutUs