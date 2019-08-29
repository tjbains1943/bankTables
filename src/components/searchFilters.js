import React, { PureComponent } from "react";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/styles";
import grey from "@material-ui/core/colors/grey";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import {
  updateAccountFilters,
  updateTransactionFilters,
  updateRecords,
} from "../redux/modules/landingPage";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const styles = theme => ({
  paper: {
    background: grey[300],
    padding: theme.spacing(2),
  },
  searchIcon: {
    marginLeft: 8,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
});

class SearchFilters extends PureComponent {
  componentDidUpdate() {
    this.runFilters();
  }

  // handle checkbox for accounts
  handleAccountBox = type => ({ target: { checked } }) => {
    const { updateAccountFilters, accountFilters } = this.props;
    const newFilters = {
      ...accountFilters,
      [type]: checked,
    };
    for (var key in newFilters) {
      if (newFilters[key] === false) delete newFilters[key];
    }
    updateAccountFilters(newFilters);
  };

  // handle checkbox for transactions
  handleTransactionBox = type => ({ target: { checked } }) => {
    const { updateTransactionFilters, transactionFilters } = this.props;
    const newFilters = {
      ...transactionFilters,
      [type]: checked,
    };
    for (var key in newFilters) {
      if (newFilters[key] === false) delete newFilters[key];
    }
    updateTransactionFilters(newFilters);
  };

  // run all filters on transactions
  runFilters = () => {
    const { transactionFilters, initialRecords, updateRecords } = this.props;

    const activeFilters = [];
    const activeAccountFilters = this.transformAccountKeys();

    for (var key in transactionFilters) {
      activeFilters.push(key);
    }

    let newRecords = initialRecords;
    if (activeFilters.length) {
      newRecords = newRecords.filter(record => {
        if (activeFilters.includes(record.transactionType)) {
          return true;
        }
        return false;
      });
    }
    if (activeAccountFilters.length) {
      newRecords = newRecords.filter(record => {
        if (activeAccountFilters.includes(record.accountName)) {
          return true;
        }
        return false;
      });
    }
    updateRecords(newRecords);
  };

  // change camel case to actual transaction input
  transformAccountKeys = () => {
    const { accountFilters } = this.props;

    let activeAccountFilters = [];

    for (var accountKey in accountFilters) {
      if (accountFilters[accountKey] === true) {
        switch (accountKey) {
          case "savingsAccount":
            activeAccountFilters.push("Savings Account");
            break;

          case "checkingAccount":
            activeAccountFilters.push("Checking Account");
            break;

          case "autoLoanAccount":
            activeAccountFilters.push("Auto Loan Account");
            break;

          case "creditCardAccount":
            activeAccountFilters.push("Credit Card Account");
            break;

          case "homeLoanAccount":
            activeAccountFilters.push("Home Loan Account");
            break;

          case "investmentAccount":
            activeAccountFilters.push("Investment Account");
            break;

          case "personalLoanAccount":
            activeAccountFilters.push("Personal Loan Account");
            break;

          case "moneyMarketAccount":
            activeAccountFilters.push("Money Market Account");
            break;

          default:
            return;
        }
      }
    }
    return activeAccountFilters;
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <Box display="flex" mb={1}>
          <Typography variant="h6">Filters</Typography>
          <SearchIcon className={classes.searchIcon} />
        </Box>
        <Typography variant="subtitle2">
          Use the different filters to narrow down records.
        </Typography>
        <Box display="flex" flexDirection="inherit">
          <Box mt={3} display="flex" flexWrap="wrap">
            <Box mb={2}>
              <Typography variant={"h6"}>
                <u>Account Name</u>
              </Typography>
            </Box>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={this.handleAccountBox("savingsAccount")}
                  />
                }
                label={"Savings Account"}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={this.handleAccountBox("checkingAccount")}
                  />
                }
                label={"Checking Account"}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={this.handleAccountBox("autoLoanAccount")}
                  />
                }
                label={"Auto Loan Account"}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={this.handleAccountBox("creditCardAccount")}
                  />
                }
                label={"Credit Card Account"}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={this.handleAccountBox("investmentAccount")}
                  />
                }
                label={"Investment Account"}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={this.handleAccountBox("personalLoanAccount")}
                  />
                }
                label={"Personal Loan Account"}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={this.handleAccountBox("moneyMarketAccount")}
                  />
                }
                label={"Money Market Account"}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={this.handleAccountBox("homeLoanAccount")}
                  />
                }
                label={"Home Loan Account"}
              />
            </FormGroup>
          </Box>
          <Box display="flex" my={3} flexWrap="wrap">
            <Typography variant={"h6"}>
              <u>Transaction Type</u>
            </Typography>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox onChange={this.handleTransactionBox("deposit")} />
                }
                label={"Deposit"}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={this.handleTransactionBox("withdrawal")}
                  />
                }
                label={"Withdrawal"}
              />
              <FormControlLabel
                control={
                  <Checkbox onChange={this.handleTransactionBox("invoice")} />
                }
                label={"Invoice"}
              />
              <FormControlLabel
                control={
                  <Checkbox onChange={this.handleTransactionBox("payment")} />
                }
                label={"Payment"}
              />
            </FormGroup>
          </Box>
        </Box>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  accountFilters: state.dataTable.accountFilters,
  transactionFilters: state.dataTable.transactionFilters,
  initialRecords: state.dataTable.initialRecords,
});

const mapDispatchToProps = {
  updateAccountFilters,
  updateTransactionFilters,
  updateRecords,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(SearchFilters));
