import useMyTeam from "@/Hooks/useMyTeam";
import { Helmet } from "react-helmet";

const MyTeam = () => {
  const [myTeam] = useMyTeam();
  console.log(myTeam);
  return (
    <div>
      <Helmet>
        <title>Asset Nex | My Team</title>
      </Helmet>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Image</th>
              <th>Name</th>
              <th>Member Type</th>
            </tr>
          </thead>
          <tbody>
            {myTeam.map((item, idx) => (
              <tr key={item._id}>
                <th>{idx + 1}</th>
                <td>
                  <img
                    src={item.employee_img}
                    alt=""
                    className="w-20 h-20 rounded-full"
                  />
                </td>
                <td>{item.elployee_name}</td>
                <td>{item.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTeam;
