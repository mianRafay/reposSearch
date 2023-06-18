import * as React from 'react';

import MaterialTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LoadingSpinner from '../LoadingSpinner';
import styles from './index.scss';
import { connect } from 'react-redux';

import { ITableProps } from './ITableProps';
import { Grid } from '@material-ui/core';

export interface ITableState {
  advanceSearch?: boolean;
}

class Table extends React.Component<ITableProps, ITableState> {
  constructor(props: ITableProps, context?: any) {
    super(props);
    this.state = {
      advanceSearch: this.props.advanceSearch ? this.props.advanceSearch : false,
    };
  }
  render() {
    const {
      headerText,
      items,
      rowsPerPage,
      page,
      headerRender,
      onSearchBoxExecute,
      onChangePage,
      onChangeRowsPerPage,
      actionsRender
    } = this.props;
    const itemsLength: number = items !== undefined ? items.length : 0;
    let limitPage = this.props.limitPage;
    let emptyRows = rowsPerPage - Math.min(rowsPerPage, itemsLength - page * rowsPerPage);
    emptyRows = itemsLength > rowsPerPage ? emptyRows : 0;

    const { locales } = this.props;
    let Locales = locales ? locales.utils.table : {};

    return (
      <div>
        <Grid container spacing={4} style={{ marginBottom: '5px' }}>
          <Grid item xs={12} sm={12}>
            <Typography variant="h2" className={styles.header} gutterBottom>
              {(!onSearchBoxExecute || !actionsRender) && headerText}
              {onSearchBoxExecute && actionsRender && headerText && (
                <Grid item xs={12} sm={12}>
                  {headerText}
                </Grid>
              )}
              <span>{actionsRender && actionsRender()}</span>
            </Typography>
          </Grid>
        </Grid>

        <Paper className={styles.overflowXauto}>
          <MaterialTable>
            <TableHead>{headerRender()}</TableHead>
            <TableBody>
              {this._getRows()}
              {(this.props.loading === false && emptyRows) !== 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={5} />
                </TableRow>
              )}
            </TableBody>
          </MaterialTable>
          {this.props.loading && <LoadingSpinner />}
          {this.props.loading === false && itemsLength == 0 && (
            <Typography variant="subtitle2" className={`styles.header ${styles.center}`} gutterBottom>
              {Locales.noDataFound}
            </Typography>
          )}
          {!this.props.hidePagination && (
            <>
            </>
            // <TablePagination
            //   component="div"
            //   count={itemsLength}
            //   rowsPerPage={rowsPerPage}
            //   page={page}
            //   rowsPerPageOptions={limitPage ? [5] : [5, 15, 50]}
            //   backIconButtonProps={{
            //     'aria-label': 'Previous Page',
            //   }}
            //   nextIconButtonProps={{
            //     'aria-label': 'Next Page',
            //   }}
            // //   onChangePage={onChangePage}
            // //   onChangeRowsPerPage={onChangeRowsPerPage}
            //   labelRowsPerPage={Locales.labelRowsPerPage}
            // />
          )}
        </Paper>
      </div>
    );
  }

  private _getRows = () => {
    const { items, rowsPerPage, page, tableRows } = this.props;
    if (items === undefined) {
      return tableRows();
    }
    return items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((invoice, index) => {
      return <React.Fragment key={index}>{tableRows(invoice, index)}</React.Fragment>;
    });
  };
}

const mapStateToProps = state => ({
  locales: state.localesReducer.locales,
});

export default connect(mapStateToProps, {})(Table);
