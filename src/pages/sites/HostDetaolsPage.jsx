import React from 'react'
import HostDetailsBanner from '@/components/sites/hostDetails/HostDetailsBanner'
import HostProfileLeft from '@/components/sites/hostDetails/HostProfileLeft'
import PlacementsFromThisHost from '@/components/sites/hostDetails/PlacementsFromThisHost'
import AboutToTheChanel from '@/components/sites/hostDetails/AboutToTheChanel'

const HostDetaolsPage = () => {
  return (
    <div className='pt-[120px] lg:pt-[130px]'>
        <HostDetailsBanner />
        <div className='flex flex-col lg:flex-row section-padding-x section-padding-y w-full gap-6 lg:gap-10'>
          <div className='w-full lg:w-[30%] xl:w-[25%]'>
            <HostProfileLeft />
          </div>
          <div className='w-full lg:w-[70%] xl:w-[75%]'>
            <PlacementsFromThisHost />
          </div>
        </div>
        <AboutToTheChanel/>
    </div>
  )
}

export default HostDetaolsPage