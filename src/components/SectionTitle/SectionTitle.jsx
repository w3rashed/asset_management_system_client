const SectionTitle = ({ heading, shortDis }) => {
  return (
    <div className="text-center mx-auto md:w-[50%]  ">
      <h3 className="text-3xl uppercase font-medium  ">{heading}</h3>
      <p className="text-yellow-600 mb-2">{shortDis}</p>
    </div>
  );
};

export default SectionTitle;
