import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { SiBasicattentiontoken } from "react-icons/si";
const SubscriptionsCard = () => {
  return (
    <div>
      <SectionTitle heading="explore our subscriptions"></SectionTitle>
      <div className="bg-slate-100 h-[200px] w-3/4 mt-20">
        <h2>Standard</h2>
        <SiBasicattentiontoken></SiBasicattentiontoken>
        {/* <h2>Professional</h2>
        <h2>interprise</h2> */}
      </div>
    </div>
  );
};

export default SubscriptionsCard;
