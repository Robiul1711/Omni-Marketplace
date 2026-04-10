import React from 'react'
import HostDetailsBanner from '@/components/sites/hostDetails/HostDetailsBanner'
import HostProfileLeft from '@/components/sites/hostDetails/HostProfileLeft'
import PlacementsFromThisHost from '@/components/sites/hostDetails/PlacementsFromThisHost'
import AboutToTheChanel from '@/components/sites/hostDetails/AboutToTheChanel'

const HostDetaolsPage = () => {
  return (
    <div className='pt-[130px]'>
        <HostDetailsBanner />
        <div className='flex section-padding-x section-padding-y w-full gap-10'>
          <div className='w-[25%]'>
            <HostProfileLeft />
          </div>
          <div className='w-[75%]'>
            <PlacementsFromThisHost />
          </div>
        </div>
        <AboutToTheChanel/>
    </div>
  )
}

export default HostDetaolsPage