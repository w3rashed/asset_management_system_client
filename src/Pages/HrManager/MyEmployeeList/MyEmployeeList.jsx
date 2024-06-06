import useMyEmployeeList from "@/Hooks/useMyEmployeeList";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { Button } from "@/components/ui/button";

const MyEmployeeList = () => {
  const [myEmployeeList] = useMyEmployeeList();
  console.log(myEmployeeList);

  const handleRemove = () => {};
  return (
    <div>
      <SectionTitle heading="my employees"></SectionTitle>
      <h3 className="my-4">
        <span className="font-medium">Total Employee:</span>{" "}
        <span className="border-2 py-1 px-3 rounded-xl">
          {myEmployeeList.length}
        </span>
      </h3>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>User Tpye</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {myEmployeeList.map((employee, idx) => (
              <tr key={employee._id}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>{idx + 1}</th>
                <td>
                  <img
                    src={employee?.employee_img}
                    className="size-14 rounded-full"
                  />
                </td>
                <td className="uppercase">{employee.elployee_name}</td>
                <td className="uppercase">employee</td>
                <th onClick={() => handleRemove(employee)}>
                  <Button>Remove</Button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyEmployeeList;
