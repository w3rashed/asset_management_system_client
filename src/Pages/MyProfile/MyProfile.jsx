import useAuth from "@/Hooks/useAuth";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import useUsers from "@/Hooks/useUsers";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { Button } from "@/components/ui/button";
import { TextField } from "@mui/material";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";

const MyProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const [userData, refetch] = useUsers();
  const axiosPublic = useAxiosPublic();

  console.log(userData);
  if (!user) {
    <span className="loading loading-infinity loading-lg"></span>;
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    const name = e.target.name.value;

    const data = {
      name: e.target.name.value,
      email: user?.email,
    };

    console.log(name);
    updateUserProfile(name);
    axiosPublic.patch("/users", data).then((res) => {
      console.log(res.data);
      if (res.data.matchedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `successfully update your name is ${name}`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>Asset Nex | My Profile</title>
      </Helmet>
      <SectionTitle heading="Update Profile"></SectionTitle>

      <form onSubmit={handleUpdate}>
        <div className="grid gap-3 md:w-[300px] mx-auto">
          <div className="avatar size-32 flex mx-auto">
            <div className=" rounded-full">
              <img src={user?.photoURL} className="" />
            </div>
          </div>
          <TextField
            id="standard-read-only-input"
            name="name"
            label="Full Name"
            defaultValue={`${user?.displayName}`}
            variant="standard"
            required
          />
          <TextField
            id="standard-read-only-input"
            label="Email"
            defaultValue={`${user?.email}`}
            InputProps={{
              readOnly: true,
            }}
            variant="standard"
          />
          <Button>Update</Button>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;
