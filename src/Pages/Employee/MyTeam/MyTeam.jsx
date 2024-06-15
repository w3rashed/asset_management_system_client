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

const columns = [
  { id: "Image", label: "Image", minWidth: 170 },
  { id: "Name", label: "Name", minWidth: 170 },
  { id: "Member Type", label: "Member Type", minWidth: 170 },
];

export default function MyTeam() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // --------------------------------------------------
  const [myTeam] = useMyTeam();
  console.log(myTeam);

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
        <title>Asset Nex | My Team</title>
      </Helmet>
      <SectionTitle heading="my team"></SectionTitle>
      <h3 className="my-4">
        <span className="font-medium">Total:</span>{" "}
        <span className="border-2 py-1 px-3 rounded-xl">{myTeam.length}</span>
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
              {myTeam
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
                      <TableCell>{row?.role}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={myTeam.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
