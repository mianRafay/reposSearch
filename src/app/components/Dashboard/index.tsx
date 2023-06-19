import React, { useState, useEffect, useRef } from 'react';
import { toggleSnackbar } from 'app/actions';
import { connect } from 'react-redux';
import { searchRepositories } from 'app/actions';
import { IDashboardProps } from './IDashboardProps';
import { IGitSearch } from 'app/interfaces/git/IGitSearch';
import { Grid } from '@material-ui/core';
import TextField from 'app/components/Utils/CustomTextField';
import Button from 'app/components/Utils/Button';
import CustomDataGrid from 'app/components/RepoList';
import styles from './index.scss';
import { GridCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import ErrorMessage from '../Utils/ErrorMessage';

import useLocales from 'app/hooks/useLocales';
import SimpleReactValidator from 'simple-react-validator';
import { getValidations } from 'app/utils/common';

function Dashboard(props: IDashboardProps) {
    const validator = useRef(new SimpleReactValidator({ ...getValidations() }));
    const [repos, setRepos] = useState<IGitSearch[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const { searchRepositories } = props;
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    const [searchTable] = useLocales('searchTable');
    const [general] = useLocales('general');
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        if (searchQuery) {
            searchRepos();
        }
    }, [paginationModel]);

    const handlePageChange = (params: any) => {
        const newPage = params.page;
        const newPageSize = params.pageSize;
        setPaginationModel(prevState => ({
            ...prevState,
            page: newPage,
            pageSize: newPageSize,
        }));
    };

    const searchRepos = () => {
        searchRepositories(searchQuery, paginationModel.page + 1, paginationModel.pageSize, 'desc')
            .then(res => {
                setRepos(res.items);
                setTotalCount(res.total_count);
            })
            .catch(err => {
                console.error(err);
            });
    };

    const handleSearchClick = () => {
        setPaginationModel(prevState => ({
            ...prevState,
            page: 0,
        }));
        searchRepos();
    };

    const handleAddToFavorites = (params: GridCellParams) => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const isExist = favorites.find((e: any) => e.id === params.row.id);
        if (!isExist) {
            favorites.push(params.row);
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
    };

    const renderActionCell = (params: GridCellParams) => {
        return (
            <>
                <Grid container spacing={1}>
                    <Grid item sm={6} xs={12}>
                        <Button
                            name={general.bookmark}
                            onClick={() => handleAddToFavorites(params)}
                            style={{ color: '#fff', width: '100%', top: '3px' }}
                        ></Button>
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
            <Grid container spacing={1} className={styles.searchBar}>
                <Grid item sm={8} xs={12}>
                    <TextField
                        type="text"
                        name="emailAddress"
                        value={searchQuery}
                        style={{ borderRadius: '25px' }}
                        onChange={e => {
                            setSearchQuery(e.target.value);
                        }}
                        required
                    />
                    <ErrorMessage validator={validator} value={searchQuery} label="Search Query" />
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Button
                        name={general.search}
                        onClick={handleSearchClick}
                        style={{ color: '#fff', width: '100%', top: '3px' }}
                    />
                </Grid>
                <Grid item sm={12} xs={12}>
                    <a href="/favorites">{general.bookMarkLink}</a>
                </Grid>
            </Grid>
            {repos.length > 0 && (
                <Grid container spacing={1}>
                    <CustomDataGrid
                        rows={repos}
                        columns={columns}
                        rowCount={totalCount}
                        pagination
                        paginationModel={paginationModel}
                        pageSize={paginationModel.pageSize}
                        paginationMode="server"
                        onPaginationModelChange={handlePageChange}
                    />
                </Grid>
            )}
        </>
    );
}

export default connect(null, { searchRepositories, toggleSnackbar })(Dashboard);
