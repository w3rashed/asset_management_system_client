import useAxiosPublic from "@/Hooks/useAxiosPublic";
import useMyEmployeeList from "@/Hooks/useMyEmployeeList";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

const MyEmployeeList = () => {
  const [myEmployeeList, refetch] = useMyEmployeeList();
  const axiosPublic = useAxiosPublic();
  console.log(myEmployeeList);

  const handleRemove = (employee) => {
    const employee_email = employee.employee_email;
    const userInfo = {
      name: employee.elployee_name,
      email: employee.employee_email,
      image: employee.employee_img,
      birth_date: employee.employee_birth_of_date,
      role: "employee",
    };
    axiosPublic.delete(`/my_employee/${employee_email}`).then((res) => {
      if (res.data.deletedCount > 0) {
        axiosPublic.patch("/users", userInfo).then((res) => {
          console.log(res.data);
          if (res.data.result.insertedId) {
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Your successfully remove the employe",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
        refetch();
      }
    });
    console.log(employee);
  };
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
