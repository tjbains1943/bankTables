import React, { PureComponent } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Link from "@material-ui/core/Link";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import TablePagination from "@material-ui/core/TablePagination";
import { updateCurrentRecords } from "../redux/modules/landingPage";

const styles = {
  cellWidth: {
    padding: "inherit",
  },
  paper: {
    width: "100%",
    marginBottom: 16,
  },
};

class RecordsTable extends PureComponent {
  state = {
    pageCount: 0,
  };

  handlePageChange = (event, newPage) => {
    this.setState({ pageCount: newPage });
  };

  handleAccountModal = record => () => {
    const { updateCurrentRecords } = this.props;
    updateCurrentRecords(record);
  };

  render() {
    const { records, classes } = this.props;
    const { pageCount } = this.state;
    return (
      <Paper className={classes.paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Account</TableCell>
              <TableCell align="center">Account Name</TableCell>
              <TableCell align="center">Currency Name</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Transaction Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records
              .slice(pageCount * 100, pageCount * 100 + 100)
              .map((record, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Link
                      component="button"
                      color="secondary"
                      onClick={this.handleAccountModal(record)}
                    >
                      {record.account}
                    </Link>
                  </TableCell>
                  <TableCell align="center">{record.accountName}</TableCell>
                  <TableCell align="center">{record.currencyName}</TableCell>
                  <TableCell align="center">{record.amount}</TableCell>
                  <TableCell align="center">{record.transactionType}</TableCell>
                  <TableCell />
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component={"div"}
          count={records.length}
          rowsPerPageOptions={[100]}
          page={pageCount}
          rowsPerPage={100}
          backIconButtonProps={{
            "aria-label": "previous page",
          }}
          nextIconButtonProps={{
            "aria-label": "next page",
          }}
          onChangePage={this.handlePageChange}
        />
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  records: state.dataTable.records,
});

const mapDispatchToProps = {
  updateCurrentRecords,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(RecordsTable));
