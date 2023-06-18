import React from 'react';
import { DataGrid} from '@mui/x-data-grid';
import { IRepoListProps } from './IRepoListProps';

import styles from './index.scss';
const RepoList: React.FC<IRepoListProps> = ({
    rows,
    columns,
    rowCount,
    pagination,
    pageSize,
    paginationMode,
    paginationModel,
    onPaginationModelChange,
}) => {
    

    return (
        <DataGrid
            className={styles.dataTable}
            rows={rows}
            rowCount={rowCount}
            pagination
            labelRowsPerPage=''
            paginationMode={paginationMode || 'server'}
            paginationModel={paginationModel}
            onPaginationModelChange={onPaginationModelChange}
            autoWidth
            pageSize={10}
            pageSizeOptions={[10, 25, 50]}
            columns={[
                ...columns
            ]}
        />
    );
};

export default RepoList;
