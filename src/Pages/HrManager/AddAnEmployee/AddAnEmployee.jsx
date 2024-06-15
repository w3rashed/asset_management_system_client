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
import { Helmet } from "react-helmet";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import useAllEmployee from "@/Hooks/useAllEmployee";
import useAddLimit from "@/Hooks/useAddLimit";
import useUsers from "@/Hooks/useUsers";
import { useNavigate } from "react-router-dom";

const columns = [
  { id: "Image", label: "Image", minWidth: 170 },
  { id: "Name", label: "Name", minWidth: 170 },
  { id: "User Tpye", label: "User Tpye", minWidth: 170 },
  { id: "Birth Of Date", label: "Birth Of Date", minWidth: 170 },
  { id: "Action", label: "Action", minWidth: 170 },
];

export default function MyEmAddAnEmployeeployeeList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // --------------------------------------------------
  const [allEmployee, refetch] = useAllEmployee();
  const [AddLimit, refetchLimit = refetch] = useAddLimit();
  const axiosPublic = useAxiosPublic();
  const [data] = useUsers();
  const navigate = useNavigate();

  console.log(AddLimit, "all employee");

  const handleAdd = (row) => {
    console.log(row, "handle add");
    const teamInfo = {
      hrEmail: data.email,
      company_logo: data.company_logo,

      employee_email: row.email,
      elployee_name: row.name,
      employee_img: row.image,
      employee_birth_of_date: row.birth_date,
      role: "employee",
    };

    const userInfo = {
      email: row.email,
      affiliate: "true",
      hr_email: data.email,
      company_logo: data.company_logo,
      company_name: data.company_name,
    };

    console.log(teamInfo, "team info");
    if (AddLimit.member <= 0 || AddLimit.length == 0) {
      console.log(AddLimit, "add limit aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
      navigate("/subscription_page");
    } else {
      Swal.fire({
        title: `Are you sure? Add: ${row.name}`,

        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosPublic.post("/my_employee", teamInfo).then((res) => {
            console.log(res.data.result2);
            if (res.data.result2.insertedId) {
              axiosPublic.post(`/users`, userInfo).then((res) => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                  Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: `Successfully added: ${row.name}`,
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  refetch();
                  refetchLimit();
                }
              });
            }
          });
        }
      });
    }
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
        <title>Asset Nex | Add An Employee</title>
      </Helmet>
      <SectionTitle heading="Add employee"></SectionTitle>
      <h3 className="my-4">
        <span className="font-medium">Your Limit:</span>{" "}
        <span className="border-2 py-1 px-3 rounded-xl">{AddLimit.member}</span>
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
              {allEmployee
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      <TableCell>
                        <img
                          src={row?.image}
                          className="size-14 rounded-full"
                        />
                      </TableCell>
                      <TableCell>{row?.name}</TableCell>
                      <TableCell>{row?.role}</TableCell>
                      <TableCell>{row?.birth_date}</TableCell>
                      {/* <TableCell>{row?.added_date.slice(0, 10)}</TableCell> */}
                      <TableCell>
                        {row.affiliate == "true" ? (
                          <th>
                            <Button disabled>Add </Button>
                          </th>
                        ) : (
                          <th onClick={() => handleAdd(row)}>
                            <Button>Add</Button>
                          </th>
                        )}
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
          count={allEmployee.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
