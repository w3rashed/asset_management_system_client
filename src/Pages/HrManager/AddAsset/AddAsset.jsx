import useAuth from "@/Hooks/useAuth";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { Button } from "@/components/ui/button";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";

const AddAsset = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
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
