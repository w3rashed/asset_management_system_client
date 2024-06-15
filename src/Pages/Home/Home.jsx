import { Helmet } from "react-helmet";
import BannerSlider from "./BannerSlider/BannerSlider";
import SubscriptionsCard from "./SubscriptionsCard/SubscriptionsCard";
import useAuth from "@/Hooks/useAuth";
import About from "./About/About";
import Sponsor from "./Sponsor";

const Home = () => {
  const { user } = useAuth();
  return (
    <div>
      <Helmet>
        <title>Asset Nex | Home</title>
      </Helmet>
      {!user ? <BannerSlider></BannerSlider> : ""}
      <About></About>
      {!user ? <SubscriptionsCard></SubscriptionsCard> : ""}
      <Sponsor></Sponsor>
    </div>
  );
};

export default Home;
