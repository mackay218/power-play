import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import PlayerProfilePage from './PlayerProfilePage';


const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class PlayerProfileDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true});
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="dialogContainer">
        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>Edit Profile</Button>
        <Dialog
          scroll='paper'
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar className="toolbar">
              <h1>Player Details</h1>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <List>
          <PlayerProfilePage handleClose={this.handleClose}/>
            <Divider />
            
          </List>
        </Dialog>
      </div>
    );
  }
}

PlayerProfileDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlayerProfileDialog);