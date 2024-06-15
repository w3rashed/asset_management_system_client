import useAddLimit from "@/Hooks/useAddLimit";
import useAllEmployee from "@/Hooks/useAllEmployee";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import useUsers from "@/Hooks/useUsers";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddAnEmployee = () => {
  const [allEmployee, refetch] = useAllEmployee();
  const [AddLimit, refetchLimit = refetch] = useAddLimit();
  const axiosPublic = useAxiosPublic();
  const [data] = useUsers();
  const navigate = useNavigate();

  console.log(AddLimit, "all employee");

  const handleAdd = (employee) => {
    console.log(employee, "handle add");
    const teamInfo = {
      hrEmail: data.email,
      company_logo: data.company_logo,

      employee_email: employee.email,
      elployee_name: employee.name,
      employee_img: employee.image,
      employee_birth_of_date: employee.birth_date,
      role: "employee",
    };

    const userInfo = {
      email: employee.email,
      affiliate: "true",
      hr_email: data.email,
      company_logo: data.company_logo,
      company_name: data.company_name,
    };

    console.log(teamInfo, "team info");
    if (AddLimit.member <= 0 || AddLimit.length == 0) {
      console.log(AddLimit, "add limit aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
      navigate("/subscription_page");
    } else {
      Swal.fire({
        title: `Are you sure? Add: ${employee.name}`,

        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosPublic.post("/my_employee", teamInfo).then((res) => {
            console.log(res.data.result2);
            if (res.data.result2.insertedId) {
              axiosPublic.post(`/users`, userInfo).then((res) => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                  Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: `Successfully added: ${employee.name}`,
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  refetch();
                  refetchLimit();
                }
              });
            }
          });
        }
      });
    }
  };
  return (
    <div>
      <Helmet>
        <title>Asset Nex | Add An Employee</title>
      </Helmet>
      <SectionTitle heading="Add employee"></SectionTitle>
      <h3 className="my-4">
        <span className="font-medium">Your Limit:</span>{" "}
        <span className="border-2 py-1 px-3 rounded-xl">{AddLimit.member}</span>
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
                  <img src={employee?.image} className="size-14 rounded-full" />
                </td>
                <td className="uppercase">{employee.name}</td>
                <td className="uppercase">{employee.role}</td>
                <td className="uppercase">{employee.birth_date}</td>
                {employee.affiliate == "true" ? (
                  <th>
                    <Button disabled>Add </Button>
                  </th>
                ) : (
                  <th onClick={() => handleAdd(employee)}>
                    <Button>Add</Button>
                  </th>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddAnEmployee;
