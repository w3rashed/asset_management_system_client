import useAllRequest from "@/Hooks/useAllRequest";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { Button } from "@/components/ui/button";
import { TextField } from "@mui/material";
import { useState } from "react";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";

const AllRequest = () => {
  const [AllAssetsRequest, refetch] = useAllRequest();
  const axiosPublic = useAxiosPublic();
  const [note, setNote] = useState("");
  const currentDate = new Date();

  const handleNote = (e) => {
    e.preventDefault();
    setNote(e.target.value);
  };

  const rejectData = {
    status: "rejected",
    note: note,
  };
  const handleApprove = (asset) => {
    const assetId = asset.asset_id;

    const approveData = {
      status: "approved",
      note: note,
      Aproved_date: currentDate.toISOString(),
    };
    console.log(asset);
    axiosPublic
      .patch(`/request_assets/approdev/${asset._id}`, approveData)
      .then((res) => {
        console.log(res.data);
        // dicriment product quantity
        if (res.data.modifiedCount > 0) {
          axiosPublic.patch(`/asset/dicriment/${assetId}`).then((res) => {
            console.log(res.data);
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Request has been approved",
              showConfirmButton: false,
              timer: 1500,
            });
          });
        }
        refetch();
      });
  };
  const handleReject = (asset) => {
    console.log(asset);
    axiosPublic
      .patch(`/request_assets/reject/${asset._id}`, rejectData)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Request has been rejected",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        console.log(res.data);
        refetch();
      });
  };
  return (
    <div>
      <Helmet>
        <title>Asset Nex | All Request</title>
      </Helmet>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Asset Name</th>
              <th>Asset Type</th>
              <th>Email of Requester</th>
              <th>Request Date</th>
              <th>Additional Note</th>
              <th>Status</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {AllAssetsRequest.map((asset, idx) => (
              <tr key={asset._id}>
                <th>{idx + 1}</th>
                <td>{asset.name}</td>
                <td>{asset.type}</td>
                <td>{asset.employee_email}</td>
                <td>{asset.date}</td>
                <td>
                  <TextField
                    onChange={handleNote}
                    name="note"
                    id="filled-search"
                    label="note"
                    type="text"
                    variant="filled"
                    required
                  />
                </td>
                <td>{asset.status}</td>
                <td>
                  <div className="flex gap-2">
                    <Button onClick={() => handleApprove(asset)}>
                      Approve
                    </Button>
                    <Button onClick={() => handleReject(asset)}>Reject</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRequest;
