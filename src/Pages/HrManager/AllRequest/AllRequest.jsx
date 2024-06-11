import useAllRequest from "@/Hooks/useAllRequest";
import { Button } from "@/components/ui/button";
import { TextField } from "@mui/material";

const AllRequest = () => {
  const [AllAssetsRequest, refetch] = useAllRequest();
  const handleApprove = (asset) => {
    console.log(asset);
  };
  const handleReject = (asset) => {
    console.log(asset);
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
