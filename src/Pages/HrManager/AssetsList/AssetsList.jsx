import useAssetsList from "@/Hooks/useAssetsList";
import { DataGrid } from "@mui/x-data-grid";

const AssetsList = () => {
  const [assets_list, refetch] = useAssetsList();
  console.log(assets_list);
  const columns = [
    { field: "id", headerName: "#", width: 70 },
    { field: "name", headerName: "Product Name", width: 130 },
    { field: "type", headerName: "Product Type", width: 130 },
    { field: "quantity", headerName: "Product Quantity", width: 130 },
    { field: "date", headerName: "Date Added", width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      renderCell: (params) => (
        <>
          <button onClick={() => handleUpdate(params.row.id)}>Update</button>
          <button onClick={() => handleDelete(params.row.id)}>Delete</button>
        </>
      ),
    },
  ];

  const rows = assets_list.map((asset, index) => ({
    id: index + 1,
    name: asset.product_name,
    type: asset.product_type,
    quantity: asset.product_quantity,
    date: asset.date,
  }));

  const handleUpdate = (id) => {
    console.log(`Update row with id ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete row with id ${id}`);
  };
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

export default AssetsList;
