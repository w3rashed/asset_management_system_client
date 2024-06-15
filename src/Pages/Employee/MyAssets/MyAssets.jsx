import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import { Button } from "@/components/ui/button";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import useAuth from "@/Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { IoMdSearch } from "react-icons/io";

import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import jsPDF from "jspdf";

const columns = [
  { id: "Asset Name", label: "Asset Name", minWidth: 170 },
  { id: "Asset Type", label: "Asset Type", minWidth: 170 },
  { id: "Request Date", label: "Request Date", minWidth: 170 },
  { id: "Approval Date", label: "Approval Date", minWidth: 170 },
  { id: "Request Status", label: "Request Status", minWidth: 170 },
  { id: "Action", label: "Action", minWidth: 170 },
];

export default function MyAssets() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const [assets_list, refetch] = useAssetsList();
  const [searchValue, setSearchValue] = React.useState();
  const [filterValue, setFilterValue] = React.useState();

  //------------------------------------------------------------ search

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  // filter
  const handleFilter = (e) => {
    setFilterValue(e.target.value);
  };

  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: myAssets = [], refetch } = useQuery({
    queryKey: ["my assets", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/request_assets/myAssets/${user?.email}`,
        {
          params: {
            searchValue,
            filterValue,
          },
        }
      );
      return res.data;
    },
  });

  React.useEffect(() => {
    if (filterValue !== null || searchValue !== null) {
      refetch();
    }
  }, [refetch, filterValue, searchValue]);

  console.log(searchValue, filterValue);

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

  // -------------------------------------------------------------------------

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <Helmet>
        <title>Asset Nex | My Assets</title>
      </Helmet>
      <div className="flex justify-center mt-2 mb-4 gap-4">
        <label className="input input-bordered flex items-center gap-2">
          <input
            onChange={handleSearch}
            value={searchValue}
            type="text"
            className="grow"
            placeholder="Search"
          />
          <IoMdSearch></IoMdSearch>
        </label>
        <div className="input input-bordered flex">
          <select onChange={handleFilter} className="focus:outline-none w-full">
            <option value="" disabled selected>
              Select Filter
            </option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="returnable">Returnable</option>
            <option value="non_returnable">Non Returnable</option>
          </select>
        </div>
      </div>
      <Paper sx={{ width: "100%" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {myAssets
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      <TableCell>{row?.name}</TableCell>
                      <TableCell>{row?.type}</TableCell>
                      <TableCell>{row?.request_date?.slice(0, 10)}</TableCell>
                      <TableCell>{row?.Aproved_date?.slice(0, 10)}</TableCell>
                      <TableCell>{row?.status}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <div>
                            {row.status === "approved" &&
                            row.type === "returnable" ? (
                              <Button onClick={() => handleReturn(row)}>
                                Return
                              </Button>
                            ) : (
                              <Button disabled>Return</Button>
                            )}
                          </div>
                          <div>
                            {row.status === "approved" ||
                            row.status === "returned" ? (
                              <Button onClick={() => handlePrint(row)}>
                                Print
                              </Button>
                            ) : (
                              <Button disabled>Print</Button>
                            )}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={myAssets.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
