import useAssetsRequest from "@/Hooks/useAssetsRequest";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import useUsers from "@/Hooks/useUsers";
import { Button } from "@/components/ui/button";
import { data } from "autoprefixer";

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
      quantity: asset.product_quantity,
      hr_email: asset.email,
      employee_email: userData?.email,
      employee_name: userData?.name,
      date: currentDate.toISOString(),
      status: "pending",
    };
    console.log(assetInfo);
    axiosPublic.post("/employee_assets", assetInfo).then((res) => {
      console.log(res.data);
    });
  };
  return (
    <div>
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
                <th>{asset?.product_quantity}</th>
                <th>
                  <Button onClick={() => handleRequest(asset)}>Request</Button>
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