import React from "react";
import HeroBanner from "@/components/sites/home/HeroBanner";
import Explore from "@/components/sites/home/Explore";
import MarketPlaceworks from "@/components/sites/home/MarketPlaceworks";
import ExtraSection from "@/components/sites/home/ExtraSection";
import PromoteAnything from "@/components/sites/home/PromoteAnything";
import ChooseOmni from "@/components/sites/home/ChooseOmni";
import ReadyStarted from "@/components/sites/home/ReadyStarted";
import FAQ from "@/components/sites/home/FAQ";
import useClient from "@/hooks/useClient";

const Home = () => {
  const { data: homeCmsData, isLoading } = useClient({
    queryKey: ["homePageCms"],
    url: "/cms-pages/home-page",
    isPrivate: false,
  });

  const content = homeCmsData?.data?.content;
  const verifiedHosts = homeCmsData?.data?.verified_hosts;

  return (
    <div className="text-black! flex lg:flex-col flex-col xlg:gap-[120px] md:gap-14 gap-8">
      <HeroBanner
        data={content?.hero}
        verifiedHosts={verifiedHosts}
        isLoading={isLoading}
      />
      <Explore data={content?.explore_placements || content?.explore} />
      <MarketPlaceworks
        data={content?.how_it_works}
        isLoading={isLoading}
      />
      <ExtraSection
        data={content?.secure_transparent}
        isLoading={isLoading}
      />
      <PromoteAnything
        data={content?.promote_anything}
        isLoading={isLoading}
      />
      <ChooseOmni
        data={content?.why_choose_us}
        isLoading={isLoading}
      />
      <FAQ data={content?.faq} />
      <ReadyStarted data={content?.ready_started || content?.get_started} />
    </div>
  );
};

export default Home;

