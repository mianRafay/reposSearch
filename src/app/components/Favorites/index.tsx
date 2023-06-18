import { Grid } from "@material-ui/core";
import { searchRepositories, toggleSnackbar } from "app/actions";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import CustomDataGrid from "app/components/RepoList";
import { GridCellParams, GridValueGetterParams } from "@mui/x-data-grid";

function Favorites() {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10
  });
  const [favorites, setFavorites] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const handlePageChange = (params: any) => {
    const newPage = params.page;
    const newPageSize = params.pageSize;
    setPaginationModel(prevState => ({
      ...prevState,
      page: newPage,
      pageSize: newPageSize
    }));
  };

  useEffect(() => {
    const fav = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(fav);
    setTotalCount(fav.length);
  }, []); // Remove "favorites" from the dependency array

  const handleRemoveToFavorites = (params: GridCellParams) => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const isExist = favorites.filter((e: any) => e.id !== params.row.id);
    localStorage.setItem("favorites", JSON.stringify(isExist));
    setFavorites(isExist);
  };

  const renderActionCell = (params: GridCellParams) => {
    return (
      <>
        {params.value}
        <br />
        <button onClick={() => handleRemoveToFavorites(params)}>
          Remove Favorite
        </button>
      </>
    );
  };
  const columns = [
    { field: "id", headerName: "ID", minWidth: 90, flex: 1 },
    { field: "name", headerName: "Name", minWidth: 180, flex: 1 },
    { field: "full_name", headerName: "Full name", minWidth: 180, flex: 1 },
    {
      field: "Owner Name",
      headerName: "Owner",
      valueGetter: (params: GridValueGetterParams) => {
        return params.row.owner.login;
      },
      minWidth: 180,
      flex: 1
    },
    {
      field: "stargazers_count",
      headerName: "Stars",
      sortable: false,
      minWidth: 180,
      flex: 1
    },
    {
      field: "Action",
      headerName: "Action",
      minWidth: 180,
      flex: 1,
      renderCell: renderActionCell
    }
  ];

  return (
    <>
      {favorites.length > 0 && (
        <Grid container spacing={1}>
          <Grid item sm={12} xs={12}>
            <a href="/">Go Back to Main Screen</a>
          </Grid>
          <CustomDataGrid
            rows={favorites}
            columns={columns}
            rowCount={totalCount}
            pagination
            paginationModel={paginationModel}
            pageSize={paginationModel.pageSize}
            paginationMode="client"
            onPaginationModelChange={handlePageChange}
          />
        </Grid>
      )}
    </>
  );
}

export default connect(null, { searchRepositories, toggleSnackbar })(Favorites);
