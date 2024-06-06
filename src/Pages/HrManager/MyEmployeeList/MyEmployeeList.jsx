import useMyEmployeeList from "@/Hooks/useMyEmployeeList";

const MyEmployeeList = () => {
  const [myEmployeeList] = useMyEmployeeList();
  console.log(myEmployeeList);
  return (
    <div>
      <h3>my employee list:{myEmployeeList?.length}</h3>
    </div>
  );
};

export default MyEmployeeList;
