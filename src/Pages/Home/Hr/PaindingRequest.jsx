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
import Swal from "sweetalert2";
import { TextField } from "@mui/material";
import { Helmet } from "react-helmet";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import useAllRequest from "@/Hooks/useAllRequest";

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

export default function PaindingRequest() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [note, setNote] = React.useState("");
  const currentDate = new Date();

  const handleNote = (e) => {
    e.preventDefault();
    setNote(e.target.value);
  };
  console.log(note);

  const axiosPublic = useAxiosPublic();
  const [AllAssetsRequest, refetch] = useAllRequest();

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
      <Helmet>
        <title>Asset Nex | five Requests</title>
      </Helmet>
      <SectionTitle heading="Painding five Requests"></SectionTitle>

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
              {AllAssetsRequest.slice(0, 5).map((row) => {
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
