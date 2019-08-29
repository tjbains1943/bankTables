import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const styles = {
  modal: {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalSize: {
    width: "50%",
    height: "40%",
  },

  closeButton: {
    "&:hover": {
      background: "rgba(0,0,0,0)",
    },
  },
};

class StatsModal extends PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    record: PropTypes.array,
  };

  static defaultProps = {
    record: [],
  };

  render() {
    const { isOpen, handleClose, classes, record } = this.props;

    return (
      <Modal
        className={classes.modal}
        aria-labelledby="modal-title"
        aria-describedby="modal-budget"
        open={isOpen}
        onClose={handleClose}
      >
        <Paper className={classes.modalSize} p={4}>
          <Box display="flex" justifyContent="space-around">
            <Box />
            <h2 id="modal-title">Statistics</h2>
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
              className={classes.closeButton}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Box id="modal-budget">
            {record && (
              <Box display="flex" justifyContent="center">
                <List component="p">
                  <ListItem>{`Account No.: ${record.account}`}</ListItem>
                  <ListItem>{`Account Name: ${record.accountName}`}</ListItem>
                  <ListItem>{`Currency Code: ${record.currencyCode}`}</ListItem>
                  <ListItem>{`Amount: ${record.amount}`}</ListItem>
                  <ListItem>{`Transaction Type: ${record.transactionType}`}</ListItem>
                </List>
              </Box>
            )}
          </Box>
        </Paper>
      </Modal>
    );
  }
}

export default withStyles(styles)(StatsModal);
