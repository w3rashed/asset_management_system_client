import SectionTitle from "@/components/SectionTitle/SectionTitle";

const About = () => {
  return (
    <div className="container mx-auto my-20">
      <div className="my-10">
        <SectionTitle heading="About" className=""></SectionTitle>
      </div>
      <p>
        Asset Nex streamlines asset management for HR managers and employees
        alike. With intuitive features tailored to their distinct roles, it
        offers a seamless experience for tracking, maintaining, and utilizing
        company assets. HR managers benefit from robust tools for oversight,
        allocation, and reporting, enabling efficient resource management and
        compliance monitoring. Employees enjoy user-friendly interfaces for
        requesting, accessing, and returning assets, enhancing productivity and
        accountability. Asset Nex ensures transparency, security, and
        optimization throughout the asset lifecycle, fostering a culture of
        responsibility and resourcefulness within the organization. From
        inventory management to asset utilization analytics, Asset Nex empowers
        HR managers and employees to effectively manage company assets, driving
        operational efficiency and strategic decision-making.
      </p>
    </div>
  );
};

export default About;
