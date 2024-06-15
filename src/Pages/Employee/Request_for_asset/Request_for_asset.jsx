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
import { Helmet } from "react-helmet";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import useMyTeam from "@/Hooks/useMyTeam";
import Swal from "sweetalert2";
import useUsers from "@/Hooks/useUsers";
import useAssetsRequest from "@/Hooks/useAssetsRequest";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { IoMdSearch } from "react-icons/io";
import useAuth from "@/Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const columns = [
  { id: "Asset Name", label: "Asset Name", minWidth: 170 },
  { id: "Asset Type", label: "Asset Type", minWidth: 170 },
  { id: "Availability", label: "Availability", minWidth: 170 },
  { id: "Action", label: "Action", minWidth: 170 },
];

export default function Request_for_asset() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchValue, setSearchValue] = React.useState("");
  const [filterValue, setFilterValue] = React.useState("");
  const [userData, refetch] = useUsers();
  const axiosPublic = useAxiosPublic();
  const currentDate = new Date();
  const { user } = useAuth();

  const {
    data: request_assets_list = [],
    isLoading,
    error,
    refetch: requestRefetch,
  } = useQuery({
    queryKey: ["request_assets_list", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/requestForAsset/${userData?.hr_email}`,
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

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleFilter = (e) => {
    setFilterValue(e.target.value);
  };

  React.useEffect(() => {
    if (filterValue !== "" || searchValue !== "") {
      requestRefetch();
    }
  }, [requestRefetch, filterValue, searchValue]);

  const handleRequest = (asset) => {
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

    axiosPublic.post("/request_assets", assetInfo).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your request has been successfully sent",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      refetch();
    });
  };

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
        <title>Asset Nex | Request for an Assets</title>
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
          <IoMdSearch />
        </label>
        <div className="input input-bordered flex">
          <select onChange={handleFilter} className="focus:outline-none w-full">
            <option value="" disabled selected>
              Select Filter
            </option>
            <option value="available">Available</option>
            <option value="out_of_stock">Out of Stock</option>
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
                    align="left"
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    Error: {error.message}
                  </TableCell>
                </TableRow>
              ) : (
                request_assets_list
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row._id} hover role="checkbox" tabIndex={-1}>
                      <TableCell>{row?.product_name}</TableCell>
                      <TableCell>{row?.product_type}</TableCell>
                      <TableCell>
                        {row?.product_quantity !== 0
                          ? "Available"
                          : "Out of stock"}
                      </TableCell>
                      <TableCell>
                        <div>
                          {row?.product_quantity !== 0 ? (
                            <Button onClick={() => handleRequest(row)}>
                              Request
                            </Button>
                          ) : (
                            <Button disabled>Request</Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={request_assets_list.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
