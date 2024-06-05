import useAllEmployee from "@/Hooks/useAllEmployee";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import useUsers from "@/Hooks/useUsers";

import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

const AddAnEmployee = () => {
  const [allEmployee, refetch] = useAllEmployee();
  const axiosPublic = useAxiosPublic();
  const [data] = useUsers();
  console.log(allEmployee, "all employee");

  const handleAdd = (employee) => {
    console.log(employee, "handle add");
    const teamInfo = {
      hrEmail: data.email,
      company_logo: data.company_logo,
      employee_email: employee.email,
    };
    console.log(teamInfo, "team info");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.post("/my_employee", teamInfo).then((res) => {
          console.log(res.data);
          if (res.data.insertedId) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
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
