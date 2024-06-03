const SectionTitle = ({ heading, shortDis }) => {
  return (
    <div className="text-center mx-auto md:w-[50%] my-8 ">
      <h3 className="text-3xl uppercase  py-4">{heading}</h3>
      <p className="text-yellow-600 mb-2">{shortDis}</p>
    </div>
  );
};

export default SectionTitle;
