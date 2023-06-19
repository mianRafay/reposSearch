import { Grid } from '@material-ui/core';
import { searchRepositories, toggleSnackbar } from 'app/actions';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import CustomDataGrid from 'app/components/RepoList';
import { GridCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import Button from '../Utils/Button';
import useLocales from 'app/hooks/useLocales';

function Favorites() {
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
    const [favorites, setFavorites] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    
    const [searchTable] = useLocales('searchTable');
    const [general] = useLocales('general');

    const handlePageChange = (params: any) => {
        const newPage = params.page;
        const newPageSize = params.pageSize;
        setPaginationModel(prevState => ({
            ...prevState,
            page: newPage,
            pageSize: newPageSize,
        }));
    };

    useEffect(() => {
        const fav = JSON.parse(localStorage.getItem('favorites') || '[]');
        setFavorites(fav);
        setTotalCount(fav.length);
    }, []); // Remove "favorites" from the dependency array

    const handleRemoveToFavorites = (params: GridCellParams) => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const isExist = favorites.filter((e: any) => e.id !== params.row.id);
        localStorage.setItem('favorites', JSON.stringify(isExist));
        setFavorites(isExist);
    };

    const renderActionCell = (params: GridCellParams) => {
        return (
            <>
                <Grid container spacing={1}>
                    <Grid item sm={6} xs={12}>
                        <Button
                            name={general.removeBookmark}
                            onClick={() => handleRemoveToFavorites(params)}
                            style={{ color: '#fff', width: '100%', top: '3px' }}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        {/* <Button
                            name="View Detail"
                            onClick={() => handleAddToFavorites(params)}
                            style={{ color: '#fff', width: '100%', top: '3px' }}
                        ></Button> */}
                    </Grid>
                </Grid>
            </>
        );
    };
    const columns = [
      { field: 'id', headerName: searchTable.id, minWidth: 90, flex: 1 },
      { field: 'name', headerName: searchTable.name, minWidth: 180, flex: 1 },
      { field: 'full_name', headerName: searchTable.fullName, minWidth: 180, flex: 1 },
      {
          field: 'Owner Name',
          headerName: searchTable.owner,
          valueGetter: (params: GridValueGetterParams) => {
              return params.row.owner.login;
          },
          minWidth: 180,
          flex: 1,
      },
      {
          field: 'stargazers_count',
          headerName: searchTable.stars,
          sortable: false,
          minWidth: 50,
          flex: 1,
      },
      {
          field: 'Action',
          headerName: searchTable.action,
          minWidth: 180,
          flex: 1,
          renderCell: renderActionCell,
      },
    ];

    return (
        <>
            {favorites.length > 0 && (
                <Grid container spacing={1}>
                    <Grid item sm={12} xs={12}>
                        <a href="/">{general.dashoardLink}</a>
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
