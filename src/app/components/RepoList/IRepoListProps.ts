import { GridColDef} from '@mui/x-data-grid';
export interface IRepoListProps {
    rows: any[];
    columns: GridColDef[];
    rowCount: number;
    pagination: boolean;
    pageSize: number;
    paginationMode: string;
    paginationModel: any;
    onPaginationModelChange: (params: any) => void;
}