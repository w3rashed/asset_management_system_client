import { Helmet } from "react-helmet";
import BannerSlider from "./BannerSlider/BannerSlider";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Asset Nex | Home</title>
      </Helmet>
      <BannerSlider></BannerSlider>
    </div>
  );
};

export default Home;
