import React, { PureComponent, Fragment } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

class NavBar extends PureComponent {
  render() {
    return (
      <Fragment>
        <AppBar>
          <Toolbar>
            <Typography style={{ color: "white" }} variant="h6">
              Project BankTables
            </Typography>
          </Toolbar>
        </AppBar>
      </Fragment>
    );
  }
}

export default NavBar;
