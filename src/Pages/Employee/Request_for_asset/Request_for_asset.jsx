import useAssetsRequest from "@/Hooks/useAssetsRequest";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import useUsers from "@/Hooks/useUsers";
import { Button } from "@/components/ui/button";
import { data } from "autoprefixer";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";

const Request_for_asset = () => {
  const [userData, refetch] = useUsers();
  const [request_assets_list] = useAssetsRequest();
  const axiosPublic = useAxiosPublic();
  const currentDate = new Date();
  console.log(userData, "hhhhhhhhhhhhhh");
  console.log(request_assets_list);

  const handleRequest = (asset) => {
    // console.log(asset);
    const assetInfo = {
      name: asset.product_name,
      type: asset.product_type,
      hr_email: asset.email,
      employee_email: userData?.email,
      employee_name: userData?.name,
      request_date: currentDate.toISOString(),
      asset_id: asset._id,
      status: "pending",
    };
    console.log(assetInfo);
    axiosPublic.post("/request_assets", assetInfo).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your request has beed successfully send",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      refetch();
    });
  };
  return (
    <div>
      <Helmet>
        <title>Asset Nex | Request for an Assets</title>
      </Helmet>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Asset Name</th>
              <th>Asset Type</th>
              <th>Availability</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {request_assets_list.map((asset, idx) => (
              <tr key={asset._id}>
                <th>{idx + 1}</th>
                <th>{asset?.product_name}</th>
                <th>{asset?.product_type}</th>

                <th>
                  {asset?.product_quantity !== 0 ? "Available" : "Out of stock"}
                </th>
                <th>
                  {asset?.product_quantity !== 0 ? (
                    <Button onClick={() => handleRequest(asset)}>
                      Request
                    </Button>
                  ) : (
                    <Button disabled>Request</Button>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Request_for_asset;
