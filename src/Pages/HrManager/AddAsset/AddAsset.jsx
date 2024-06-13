import useAssetsList from "@/Hooks/useAssetsList";
import useAuth from "@/Hooks/useAuth";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TextField, Select, MenuItem } from "@mui/material";
import { useState } from "react";
import { Helmet } from "react-helmet";

import Swal from "sweetalert2";

const AddAsset = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [type, setType] = useState();
  const [name, setName] = useState();
  const [assets_list, refetch] = useAssetsList();

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleType = (e) => {
    setType(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const currentDate = new Date();
    const item = {
      product_name: name,
      product_type: type,
      product_quantity: parseInt(form.product_quantity.value),
      email: user.email,
      added_date: currentDate.toISOString(),
    };
    console.log(item);

    axiosPublic.post("/assets", item).then((res) => {
      console.log(res.data);
      if (res.data.message === "exist") {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: ` You have already exist:${name} `,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${name} added successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="">
      <Helmet>
        <title>Asset Nex | Add an Asset</title>
      </Helmet>
      <SectionTitle heading="Add an asset"></SectionTitle>
      <form onSubmit={onSubmit} action="">
        <div className="grid w-2/4 mx-auto gap-2">
          <select
            onChange={handleName}
            className="focus:outline-none border-b-2"
            name="name"
            required
          >
            <option value="" disabled selected>
              Select One
            </option>
            <option value="Laptops">Laptops</option>
            <option value="Keyboards">Keyboards</option>
            <option value="Chairs">Chairs</option>
            <option value="Desks">Desks</option>
            <option value="Mouse">Mouse</option>
            <option value="Cell Phones">Cell Phones</option>
            <option value="Pen">Pen</option>
            <option value="Pancle">Pancle</option>
            <option value="papers">papers</option>
          </select>

          <select
            onChange={handleType}
            className="focus:outline-none border-b-2 mt-3"
            name="product_Type"
            required
          >
            <option value="" disabled selected>
              Select One
            </option>
            <option value="returnable">Returnable</option>
            <option value="non_returnable">Non Returnable</option>
          </select>
          <TextField
            name="product_quantity"
            id="standard-basic"
            label="Product Quantity "
            variant="standard"
            type="number"
            className=""
            required
          />

          <Button type="submit" className="mt-3">
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddAsset;
