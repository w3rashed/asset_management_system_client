import { Helmet } from "react-helmet";
import BannerSlider from "./BannerSlider/BannerSlider";
import SubscriptionsCard from "./SubscriptionsCard/SubscriptionsCard";
import useAuth from "@/Hooks/useAuth";
import About from "./About/About";

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
    </div>
  );
};

export default Home;
