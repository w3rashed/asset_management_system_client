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
import { IoMdSearch } from "react-icons/io";
import Swal from "sweetalert2";
import useAllRequest from "@/Hooks/useAllRequest";
import useAuth from "@/Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { TextField } from "@mui/material";

const columns = [
  { id: "Product Name", label: "Product Name", minWidth: 120 },
  { id: "Product Type", label: "Product Type", minWidth: 100 },
  { id: "Email of requester", label: "Email of requester", minWidth: 80 },
  { id: "Name of requester", label: "Name of requester", minWidth: 70 },
  { id: "Request Date", label: "Request Date", minWidth: 120 },
  { id: "Additional note", label: "Additional note", minWidth: 170 },
  { id: "Status", label: "Status", minWidth: 50 },
  { id: "Action", label: "Action", minWidth: 170 },
];

export default function AllRequest() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const [assets_list, refetch] = useAssetsList();
  const [searchValue, setSearchValue] = React.useState();
  // const [filterValue, setFilterValue] = React.useState();
  // const [sortValue, setSortValue] = React.useState();
  const [note, setNote] = React.useState("");
  const currentDate = new Date();

  const handleNote = (e) => {
    e.preventDefault();
    setNote(e.target.value);
  };
  console.log(note);

  // search

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  // // filter
  // const handleFilter = (e) => {
  //   setFilterValue(e.target.value);
  // };

  // // sort
  // const handleSort = (e) => {
  //   setSortValue(e.target.value);
  // };

  const axiosPublic = useAxiosPublic();

  const { user } = useAuth();

  const { data: AllAssetsRequest = [], refetch } = useQuery({
    queryKey: ["assets request list", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/request_assets/${user?.email}`, {
        params: {
          searchValue,
        },
      });
      return res.data;
    },
  });
  // const { data: assets_list = [], refetch } = useQuery({
  //   queryKey: ["assets_lists sort search filter", user?.email],
  //   queryFn: async () => {
  //     const res = await axiosPublic.get(`/assets/${user?.email}`, {
  //       params: {
  //         searchValue,
  //         filterValue,
  //         sortValue,
  //       },
  //     });
  //     return res.data;
  //   },
  // });

  React.useEffect(() => {
    if (searchValue !== null) {
      refetch();
    }
  }, [searchValue, refetch]);

  console.log(searchValue);

  // delete an asset
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

  // reject
  const rejectData = {
    status: "rejected",
    note: note,
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <div className="flex justify-center mt-2 mb-4 gap-4">
        <label className="input input-bordered flex items-center gap-2">
          <input
            onChange={handleSearch}
            value={searchValue}
            type="text"
            className="grow"
            placeholder="Search employee name"
          />
          <IoMdSearch></IoMdSearch>
        </label>
        {/* <div className="input input-bordered flex">
          <select onChange={handleFilter} className="focus:outline-none w-full">
            <option value="" disabled selected>
              Select Filter
            </option>
            <option value="available">Available</option>
            <option value="out_of_stock">Out of Stock</option>
            <option value="returnable">Returnable</option>
            <option value="non_returnable">Non Returnable</option>
          </select>
        </div> */}
        {/* <div className="input input-bordered flex">
          <select onChange={handleSort} className="focus:outline-none w-full">
            <option value="" disabled selected>
              Select Sort
            </option>
            <option value="Quantity">Quantity</option>
          </select>
        </div> */}
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
              {AllAssetsRequest.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              ).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    <TableCell>{row?.name}</TableCell>
                    <TableCell>{row?.type}</TableCell>
                    <TableCell>{row?.employee_email}</TableCell>
                    <TableCell>{row?.employee_name}</TableCell>
                    <TableCell>{row?.request_date.slice(0, 10)}</TableCell>
                    <TableCell>
                      <div>
                        <TextField
                          onChange={handleNote}
                          name="note"
                          id="filled-search"
                          label="note"
                          type="text"
                          variant="filled"
                          required
                        />
                      </div>
                    </TableCell>
                    <TableCell>{row?.status}</TableCell>

                    <TableCell>
                      <div className="flex gap-2">
                        <Button onClick={() => handleApprove(row)}>
                          Approve
                        </Button>
                        <Button onClick={() => handleReject(row)}>
                          Reject
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
          count={AllAssetsRequest.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

// import useAllRequest from "@/Hooks/useAllRequest";
// import useAxiosPublic from "@/Hooks/useAxiosPublic";
// import { Button } from "@/components/ui/button";
// import { TextField } from "@mui/material";
// import { useState } from "react";
// import { Helmet } from "react-helmet";
// import Swal from "sweetalert2";

// const AllRequest = () => {
//   const [AllAssetsRequest, refetch] = useAllRequest();
//   const axiosPublic = useAxiosPublic();
//   const currentDate = new Date();
//   const [note, setNote] = useState("");

//   const handleNote = (e) => {
//     e.preventDefault();
//     setNote(e.target.value);
//   };

//   const rejectData = {
//     status: "rejected",
//     note: note,
//   };
//   const handleApprove = (asset) => {
//     const assetId = asset.asset_id;

//     const approveData = {
//       status: "approved",
//       note: note,
//       Aproved_date: currentDate.toISOString(),
//     };
//     console.log(asset);
//     axiosPublic
//       .patch(`/request_assets/approdev/${asset._id}`, approveData)
//       .then((res) => {
//         console.log(res.data);
//         // dicriment product quantity
//         if (res.data.modifiedCount > 0) {
//           axiosPublic.patch(`/asset/dicriment/${assetId}`).then((res) => {
//             console.log(res.data);
//             Swal.fire({
//               position: "top-end",
//               icon: "success",
//               title: "Request has been approved",
//               showConfirmButton: false,
//               timer: 1500,
//             });
//           });
//         }
//         refetch();
//       });
//   };
//   const handleReject = (asset) => {
//     console.log(asset);
//     axiosPublic
//       .patch(`/request_assets/reject/${asset._id}`, rejectData)
//       .then((res) => {
//         if (res.data.modifiedCount > 0) {
//           Swal.fire({
//             position: "top-end",
//             icon: "success",
//             title: "Request has been rejected",
//             showConfirmButton: false,
//             timer: 1500,
//           });
//         }
//         console.log(res.data);
//         refetch();
//       });
//   };
//   return (
//     <div>
//       <Helmet>
//         <title>Asset Nex | All Request</title>
//       </Helmet>
//       <div className="overflow-x-auto">
//         <table className="table">
//           {/* head */}
//           <thead>
//             <tr>
//               <th></th>
//               <th>Asset Name</th>
//               <th>Asset Type</th>
//               <th>Email of Requester</th>
//               <th>Request Date</th>
//               <th>Additional Note</th>
//               <th>Status</th>
//               <th>action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {AllAssetsRequest.map((asset, idx) => (
//               <tr key={asset._id}>
//                 <th>{idx + 1}</th>
//                 <td>{asset.name}</td>
//                 <td>{asset.type}</td>
//                 <td>{asset.employee_email}</td>
//                 <td>{asset.date}</td>
//                 <td>
//                   <TextField
//                     onChange={handleNote}
//                     name="note"
//                     id="filled-search"
//                     label="note"
//                     type="text"
//                     variant="filled"
//                     required
//                   />
//                 </td>
//                 <td>{asset.status}</td>
//                 <td>
//                   <div className="flex gap-2">
//                     <Button onClick={() => handleApprove(asset)}>
//                       Approve
//                     </Button>
//                     <Button onClick={() => handleReject(asset)}>Reject</Button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AllRequest;
