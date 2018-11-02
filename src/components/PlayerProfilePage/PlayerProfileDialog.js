import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import PlayerProfilePage from './PlayerProfilePage';

import './PlayerProfilePage.css';

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  dialogContent: {
    padding: 0,
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
          className="dialogContainer"
        >
          <DialogContent className={this.props.classes.dialogContent} >
              <PlayerProfilePage handleClose={this.handleClose} />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

PlayerProfileDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlayerProfileDialog);