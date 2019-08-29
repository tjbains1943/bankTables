import React, { PureComponent } from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Table from "./recordsTable";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import DownloadIcon from "@material-ui/icons/SaveAlt";
import { connect } from "react-redux";
import StatsModal from "./statsModal";
import SnackBarSuccess from "./snackBar";
import SearchFilters from "./searchFilters";
import { closeModal, closeSnackbar } from "../redux/modules/landingPage";

const styles = {
  boldText: {
    fontWeight: "bold",
  },
  iconStyle: {
    marginLeft: 8,
  },
  buttonText: {
    paddingRight: 16,
  },
};

class ContentArea extends PureComponent {
  handleModalClose = () => {
    const { closeModal } = this.props;
    closeModal();
  };

  handleSnackbarClose = () => {
    const { closeSnackbar } = this.props;
    closeSnackbar();
  };

  render() {
    const { classes, isModalOpen, showSnackBar, currentRecord } = this.props;

    return (
      <Container>
        <Box mt={10} mb={2}>
          <Box py={4}>
            <Box display="flex" pb={1} justifyContent="space-between">
              <Typography className={classes.boldText} variant="h5">
                Transactions
              </Typography>

              <Box display="flex" flexDirection="column">
                <Button
                  variant="contained"
                  color="default"
                  className={classes.buttonText}
                >
                  EXPORT
                  <DownloadIcon className={classes.iconStyle} />
                </Button>
              </Box>
            </Box>
            <Typography variant="body1">
              This table displays all the records. Click on the title for more
              info on each record.
            </Typography>
          </Box>
          <Box mt={3}>
            <SearchFilters />
          </Box>
          <Box mb={2}>
            <Table />
          </Box>
        </Box>
        <Box my={2}>
          <Button
            style={{ color: "white" }}
            variant="contained"
            color="primary"
          >
            Add a New Record
          </Button>
        </Box>
        <StatsModal
          isOpen={isModalOpen}
          handleClose={this.handleModalClose}
          record={currentRecord}
        />
        <SnackBarSuccess
          isOpen={showSnackBar}
          handleClose={this.handleSnackbarClose}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isModalOpen: state.dataTable.isModalOpen,
  currentRecord: state.dataTable.currentRecord,
  showSnackbar: state.dataTable.showSnackbar,
});

const mapDispatchToProps = { closeModal, closeSnackbar };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ContentArea));
