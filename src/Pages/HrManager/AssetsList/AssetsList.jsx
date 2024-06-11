import useAssetsList from "@/Hooks/useAssetsList";
import { Button } from "@/components/ui/button";
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { format } from "date-fns";
import { Table } from "lucide-react";
import React from "react";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  {
    id: "population",
    label: "Population",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Size\u00a0(km\u00b2)",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Density",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
];

export default function AssetsList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={2}>
                Country
              </TableCell>
              <TableCell align="center" colSpan={3}>
                Details
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

// const AssetsList = () => {

//   const [assets_list, refetch] = useAssetsList();
//   console.log(assets_list);

//   const columns = [
//     { field: "id", headerName: "#", width: 70 },
//     { field: "name", headerName: "Product Name", width: 130 },
//     { field: "type", headerName: "Product Type", width: 130 },
//     { field: "quantity", headerName: "Product Quantity", width: 130 },
//     { field: "date", headerName: "Date Added", width: 130 },

//     {
//       field: "actions",
//       headerName: "Actions",
//       width: 200,
//       renderCell: (params) => (
//         <div className="flex items-center gap-2">
//           <Button onClick={() => handleUpdate(params.row.id)}>Update</Button>
//           <Button onClick={() => handleDelete(params.row.id)}>Delete</Button>
//         </div>
//       ),
//     },
//   ];

//   const rows = assets_list.map((asset, index) => {
//     const date = new Date(asset.added_date);
//     return {
//       id: index + 1,
//       name: asset.product_name,
//       type: asset.product_type,
//       quantity: asset.product_quantity,
//       date: date.toLocaleDateString("en-GB"),
//     };
//   });

//   const handleUpdate = (id) => {
//     console.log(`Update row with id ${id}`);
//   };

//   const handleDelete = (id) => {
//     console.log(`Delete row with id ${id}`);
//   };
//   return (
//     <div></div>

//     // <div style={{ height: 400, width: "100%" }}>
//     //   <DataGrid
//     //     rows={rows}
//     //     columns={columns}
//     //     initialState={{
//     //       pagination: {
//     //         paginationModel: { page: 0, pageSize: 5 },
//     //       },
//     //     }}
//     //     pageSizeOptions={[5, 10]}
//     //     checkboxSelection
//     //   />
//     // </div>
//   );
// };

// export default AssetsList;
