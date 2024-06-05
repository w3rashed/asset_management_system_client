import { Helmet } from "react-helmet";
import BannerSlider from "./BannerSlider/BannerSlider";
import SubscriptionsCard from "./SubscriptionsCard/SubscriptionsCard";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Asset Nex | Home</title>
      </Helmet>
      {/* <BannerSlider></BannerSlider> */}
      <SubscriptionsCard></SubscriptionsCard>
    </div>
  );
};

export default Home;
