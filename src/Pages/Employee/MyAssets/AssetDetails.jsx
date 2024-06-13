import React from "react";

const AssetDetails = React.forwardRef(({ asset }, ref) => {
  return (
    <div ref={ref}>
      <h2>Asset Name: {asset.name}</h2>
      <p>Asset Type: {asset.type}</p>
      <p>Request Date: {asset.request_date}</p>
      <p>Approval Date: {asset.approved_date}</p>
      <p>Status: {asset.status}</p>
      {/* Add other details as needed */}
    </div>
  );
});

export default AssetDetails;
