import useAuth from "@/Hooks/useAuth";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { Button } from "@/components/ui/button";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AddAsset = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const item = {
      product_name: data.product_name,
      product_type: data.product_type,
      product_quantity: data.product_quantity,
      email: user.email,
    };
    axiosPublic.post("/asstes", item).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.product_name} added successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  return (
    <div className="">
      <SectionTitle heading="Add an asset"></SectionTitle>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <div className="grid w-2/4 mx-auto gap-2">
          <TextField
            {...register("product_name", { required: true })}
            name="product_name"
            id="standard-basic"
            label="Product Name *"
            variant="standard"
            className=""
          />
          <TextField
            {...register("product_type", { required: true })}
            name="product_type"
            id="standard-basic"
            label="Product Type *"
            variant="standard"
            className=""
          />
          <TextField
            {...register("product_quantity", { required: true })}
            name="product_quantity"
            id="standard-basic"
            label="Product Quantity *"
            variant="standard"
            type="number"
            className=""
          />
          <Button className="mt-3">Add</Button>
        </div>
      </form>
    </div>
  );
};

export default AddAsset;
