import HeroBanner from "@/components/sites/home/HeroBanner";
import Explore from "@/components/sites/home/Explore";
import { useUserProfile } from "@/hooks/fetchUserProfile";
import MarketPlaceworks from "@/components/sites/home/MarketPlaceworks";
import ExtraSection from "@/components/sites/home/ExtraSection";
import PromoteAnything from "@/components/sites/home/PromoteAnything";
import ChooseOmni from "@/components/sites/home/ChooseOmni";
import ReadyStarted from "@/components/sites/home/ReadyStarted";

const Home = () => {
  return (
    <div className="text-black! flex flex-col gap-[120px]">
      <HeroBanner />
      <Explore />
      <MarketPlaceworks />
      <ExtraSection />
      <PromoteAnything />
      <ChooseOmni />
      <ReadyStarted />
    </div>
  );
};

export default Home;
