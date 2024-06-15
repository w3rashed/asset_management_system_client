import useAxiosPublic from "@/Hooks/useAxiosPublic";
import useMyAssets from "@/Hooks/useMyAssets";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import { Helmet } from "react-helmet";
import { IoMdSearch } from "react-icons/io";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import useUsers from "@/Hooks/useUsers";

const MyAssets = () => {
  const [myAssets, refetch] = useMyAssets();
  const [search, setSearch] = useState("");
  const [user] = useUsers();
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  console.log(user);
  const axiosPublic = useAxiosPublic();

  const handleReturn = (asset) => {
    axiosPublic.patch(`/request_assets/return/${asset._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        axiosPublic.patch(`asset/increase/${asset.asset_id}`).then((res) => {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Your ${asset.name} has been successfully returned`,
            showConfirmButton: false,
            timer: 1500,
          });
        });
      }
    });
  };

  const handlePrint = (asset) => {
    const doc = new jsPDF();

    // Set properties for PDF document
    doc.setProperties({
      title: `Asset Details - ${asset.name}`,
      subject: "Details of Asset",
      author: "Asset Nex",
      keywords: "asset, details, pdf",
    });

    // Generate content for PDF
    const content = `
    Company Name:${user?.company_name}
      Asset Name: ${asset.name}
      Asset Type: ${asset.type}
      Request Date: ${asset.request_date}
      Approval Date: ${asset.Aproved_date}
      Request Status: ${asset.status}
    `;

    // Add content to PDF document
    doc.text(content, 10, 10);

    // Save the PDF document
    doc.save(`Asset_Details_${asset._id}.pdf`);
  };

  return (
    <div>
      <Helmet>
        <title>Asset Nex | My Assets</title>
      </Helmet>
      <div className="flex justify-center mt-2">
        <label className="input input-bordered flex items-center gap-2">
          <input
            onChange={handleSearch}
            type="text"
            className="grow"
            placeholder="Search"
          />
          <IoMdSearch />
        </label>
      </div>
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
                <td>{idx + 1}</td>
                <td>{asset.name}</td>
                <td>{asset.type}</td>
                <td>{asset.request_date}</td>
                <td>{asset.Aproved_date}</td>
                <td>{asset.status}</td>
                <td className="flex gap-2">
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
                      <Button onClick={() => handlePrint(asset)}>Print</Button>
                    ) : (
                      <Button disabled>Print</Button>
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
