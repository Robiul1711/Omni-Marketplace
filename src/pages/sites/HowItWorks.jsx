import React from 'react'
import HowOmniWork from '@/components/sites/howItsWork/HowOmniWork'
import ForAdvertisers from '@/components/sites/howItsWork/ForAdvertisers'
import HostSide from '@/components/sites/howItsWork/HostSide'
import ReadyStarted from '@/components/sites/home/ReadyStarted'
import useClient from '@/hooks/useClient'

const HowItWorks = () => {
  const { data: howItWorksData } = useClient({
    queryKey: ["howItWorksCms"],
    url: "/cms-pages/how-it-works",
  });

  const content = howItWorksData?.data?.content;

  return (
    <div>
      <HowOmniWork 
        title={content?.main_title} 
        description={content?.description} 
      />
      <ForAdvertisers 
        title={content?.advertiser_title} 
        subtitle={content?.advertiser_subtitle} 
        sections={content?.advertiser_sections} 
      />
      <HostSide 
        title={content?.host_title} 
        subtitle={content?.host_subtitle} 
        bottomText={content?.host_bottom_text} 
        data={content?.host_sections} 
      />
      <ReadyStarted />
    </div>
  )
}

export default HowItWorks
