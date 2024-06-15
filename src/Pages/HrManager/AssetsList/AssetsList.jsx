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
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const columns = [
  { id: "Product Name", label: "Product Name", minWidth: 170 },
  { id: "Product Type", label: "Product Type", minWidth: 170 },
  { id: "Product Quantity", label: "Product Quantity", minWidth: 170 },
  { id: "Added Date", label: "Added Date", minWidth: 170 },
  { id: "Action", label: "Action", minWidth: 170 },
];

export default function AssetsList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const [assets_list, refetch] = useAssetsList();
  const [searchValue, setSearchValue] = React.useState();
  const [filterValue, setFilterValue] = React.useState();
  const [sortValue, setSortValue] = React.useState();

  // search

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  // filter
  const handleFilter = (e) => {
    setFilterValue(e.target.value);
  };

  // sort
  const handleSort = (e) => {
    setSortValue(e.target.value);
  };

  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const { data: assets_list = [], refetch } = useQuery({
    queryKey: ["assets_lists  search filter", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/assets/${user?.email}`, {
        params: {
          searchValue,
          filterValue,
          sortValue,
        },
      });
      return res.data;
    },
  });

  React.useEffect(() => {
    if (filterValue !== null || sortValue !== null || searchValue !== null) {
      refetch();
    }
  }, [refetch, filterValue, sortValue, searchValue]);

  console.log(searchValue, filterValue, sortValue);

  // delete an asset
  const handleDelete = (row) => {
    axiosPublic.delete(`/deleteAssets/${row._id}`).then((res) => {
      console.log(res.data);
      if (res.data.deletedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${row.product_name} has been deleted`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
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
        <title>Asset Nex | Asset list</title>
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
            <option value="available">Available</option>
            <option value="out_of_stock">Out of Stock</option>
            <option value="returnable">Returnable</option>
            <option value="non_returnable">Non Returnable</option>
          </select>
        </div>
        <div className="input input-bordered flex">
          <select onChange={handleSort} className="focus:outline-none w-full">
            <option value="" disabled selected>
              Select Sort
            </option>
            <option value="Quantity">Quantity</option>
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
              {assets_list
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      {/* {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })} */}
                      <TableCell>{row?.product_name}</TableCell>
                      <TableCell>{row?.product_type}</TableCell>
                      <TableCell>{row?.product_quantity}</TableCell>
                      <TableCell>{row?.added_date.slice(0, 10)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Link to={`update_asset/${row._id}`}>
                            <Button>Update</Button>
                          </Link>
                          <Button onClick={() => handleDelete(row)}>
                            Delete
                          </Button>
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
          count={assets_list.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
