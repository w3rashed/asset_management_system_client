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
import { IoMdSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import useMyEmployeeList from "@/Hooks/useMyEmployeeList";
import useAuth from "@/Hooks/useAuth";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import SectionTitle from "@/components/SectionTitle/SectionTitle";

const columns = [
  { id: "Image", label: "Image", minWidth: 170 },
  { id: "Name", label: "Name", minWidth: 170 },
  { id: "User Tpye", label: "User Tpye", minWidth: 170 },
  { id: "Action", label: "Action", minWidth: 170 },
];

export default function MyEmployeeList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // --------------------------------------------------
  const [myEmployeeList, refetch] = useMyEmployeeList();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const hrEmail = user?.email;
  console.log(myEmployeeList);

  const handleRemove = (row) => {
    const employee_email = row.employee_email;
    const userInfo = {
      email: row.employee_email,
      affiliate: "false",
    };
    if (!hrEmail) {
      return alert("email not found");
    }
    axiosPublic
      .delete(`/my_employee/${employee_email}?hrEmail=${hrEmail}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.result2.deletedCount > 0) {
          refetch();
          axiosPublic.post(`/users`, userInfo).then((res) => {
            console.log(res.data);
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Your successfully remove the employe",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        }
      });
    console.log(row);
  };

  // --------------------------------

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
        <title>Asset Nex | My Employee List</title>
      </Helmet>
      <SectionTitle heading="my employees"></SectionTitle>
      <h3 className="my-4">
        <span className="font-medium">Total Employee:</span>{" "}
        <span className="border-2 py-1 px-3 rounded-xl">
          {myEmployeeList.length}
        </span>
      </h3>
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
              {myEmployeeList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      <TableCell>
                        <img
                          src={row?.employee_img}
                          className="size-14 rounded-full"
                        />
                      </TableCell>
                      <TableCell>{row?.elployee_name}</TableCell>
                      <TableCell>{row?.role}</TableCell>
                      {/* <TableCell>{row?.added_date.slice(0, 10)}</TableCell> */}
                      <TableCell>
                        <div className="flex gap-2">
                          <Button onClick={() => handleRemove(row)}>
                            Remove
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
          count={myEmployeeList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
