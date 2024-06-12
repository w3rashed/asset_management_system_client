import useAxiosPublic from "@/Hooks/useAxiosPublic";
import useMyAssets from "@/Hooks/useMyAssets";
import { Button } from "@/components/ui/button";

const MyAssets = () => {
  const [myAssets, refetch] = useMyAssets();
  const axiosPublic = useAxiosPublic();
  console.log(myAssets);
  const handleReturn = (asset) => {
    console.log(asset);
    axiosPublic.patch(`/request_assets/return/${asset._id}`).then((res) => {
      console.log(res.data.modifiedCount);
      if (res.data.modifiedCount > 0) {
        axiosPublic.patch(`asset/increase/${asset.asset_id}`).then((res) => {
          console.log(res.data);
        });
      }
      refetch();
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
              <th>Request Date</th>
              <th>Approval Date</th>
              <th>Request Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myAssets.map((asset, idx) => (
              <tr key={asset._id}>
                <th>{idx + 1}</th>
                <th>{asset.name}</th>
                <td>{asset.type}</td>
                <td>{asset.request_date}</td>
                <td>{asset.Aproved_date}</td>
                <td>{asset.status}</td>
                <td className=" flex gap-2">
                  <div>
                    {asset.status === "approved" &&
                    asset.type === "returnable" ? (
                      <Button onClick={() => handleReturn(asset)}>
                        Return
                      </Button>
                    ) : (
                      <Button disabled>Return</Button>
                    )}
                  </div>
                  <div>
                    {asset.status === "approved" ||
                    asset.status === "returned" ? (
                      <Button>print</Button>
                    ) : (
                      <Button disabled>print</Button>
                    )}
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

export default MyAssets;
