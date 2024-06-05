import useAllEmployee from "@/Hooks/useAllEmployee";

import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { Button } from "@/components/ui/button";

const AddAnEmployee = () => {
  const [allEmployee, refetch] = useAllEmployee();
  console.log(allEmployee, "all employee");

  const handleAdd = (employee) => {
    console.log(employee, "handle add");
  };
  return (
    <div>
      <SectionTitle heading="Add employee"></SectionTitle>
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
              <th>Birth Of Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allEmployee.map((employee, idx) => (
              <tr key={employee._id}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>{idx + 1}</th>
                <td>
                  <img src={employee?.image} alt="" />
                </td>
                <td className="uppercase">{employee.name}</td>
                <td className="uppercase">{employee.role}</td>
                <td className="uppercase">{employee.birth_date}</td>
                <th onClick={() => handleAdd(employee)}>
                  <Button>Add</Button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddAnEmployee;
