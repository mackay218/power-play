import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from 'axios';

//dialog for forgot password 
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const mapStateToProps = state => ({
    user: state.user,
  });
  
  class ForgotPasswordDialog extends Component {
   
    constructor(props){
      super(props);
      this.state = {
        open: false,
        email: '',
      }
    }

    handleClickOpen = () => {
      this.setState({ open: true });
    };

    handleClose = () => {
      this.setState({ open: false });
    };

    handleInputChangeFor = propertyName => (event) => {
      this.setState({
        [propertyName]: event.target.value,
      });
    }

    sendEmailAddress = (event) => {
      event.preventDefault();
      console.log('email submitted');

      axios.get('/api/password/' + this.state.email)
        .then((response) => {
          console.log('response finding email:', response);
        })
        .catch((error) => {
          if(error.status === 404){
            alert('Sorry we can\'t find that email in our database.');
          }
          
          else{
            alert('error finding email address.')
          }
          console.log('error finding email in database:', error);

        });

    }

    render() {
      return (
        <div>
          <Button onClick={this.handleClickOpen}>forgot password?</Button>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter your email address we will send you a link to reset your password.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="email"
                name="email"
                label="Email Address"
                type="email"
                fullWidth
                onChange={this.handleInputChangeFor("email")}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
            </Button>
              <Button onClick={this.sendEmailAddress} color="primary">
                Send
            </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
  }
  
  // this allows us to use <App /> in index.js
  export default connect(mapStateToProps)(ForgotPasswordDialog);