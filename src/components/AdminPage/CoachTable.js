import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import BanIcon from '@material-ui/icons/Block';
import SuspendIcon from '@material-ui/icons/RemoveCircleOutline';

const mapStateToProps = state => ({
    user: state.user,
    coach: state.coach.coach,
});

// custom styling of table data
const CustomTableCell = withStyles(theme => ({
    head: {
        fontSize: 20,
        maxWidth: 10,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);
// custom styles of entire table
const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    column: {
        maxWidth: 1,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});



class CustomizedTable extends Component {

    constructor() {
        super();
        this.state = {
            page: 0,
        }
    }

    // Function for removing a coach from the database
    deleteCoach = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able undo this action!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                this.props.dispatch({ type: 'DELETE_COACH', payload: id });
                swal('The coach was deleted', {
                    icon: 'success',
                    dangerMode: true,
                });
            }
            else {
                swal('The coach was not deleted', {
                    dangerMode: true,
                });
            }
        })
    }
    // Function for suspending a coach
    suspendCoach = (id) => {
        swal({
            title: "Are you sure you want to suspend this coach?",
            text: "Once suspended, they will not be able view players!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                this.props.dispatch({ type: 'SUSPEND_COACH', payload: id });
                swal('The coach was suspended', {
                    icon: 'success'
                });
            }
            else {
                swal('The coach was not suspended');
            }
        })
    }
    // Funciton for banning a coach
    banCoach = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once banned, they will not be able to log in!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                this.props.dispatch({ type: 'BAN_COACH', payload: id });
                swal('The coach was banned', {
                    icon: 'success'
                });
            }
            else {
                swal('The coach was not banned');
            }
        })
    }

    // Function for going to the previous table page
    previousPage = () => {
        if (this.state.page > 0) {
            this.setState({
                ...this.state,
                page: (this.state.page - 10),
            });
        }
        setTimeout(() => this.props.dispatch({ type: 'PAGE_COACHES', payload: this.state }), 200);
    }
    // Function for going to the next table page
    nextPage = () => {
        this.setState({
            ...this.state,
            page: (this.state.page + 10),
        });
        setTimeout(() => this.props.dispatch({ type: 'PAGE_COACHES', payload: this.state }), 200);
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <div className="page-buttons">
                    {/* Buttons for changing table pages */}
                    <Button variant="contained" color="primary" onClick={this.previousPage}>Previous</Button>
                    <Button variant="contained" color="primary" onClick={this.nextPage}>Next</Button>
                </div>
                <Paper className={classes.root}>
                    <Table className="center-element">
                        <TableHead className="table-head">
                            <TableRow>
                                <CustomTableCell>Name</CustomTableCell>
                                <CustomTableCell>Email</CustomTableCell>
                                <CustomTableCell>Status</CustomTableCell>
                                <CustomTableCell>Suspend</CustomTableCell>
                                <CustomTableCell>Ban</CustomTableCell>
                                <CustomTableCell>Delete</CustomTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* Loops over all of the coaches to create a table row with their data */}
                            {this.props.coach.map(coach => {
                                return (
                                    <TableRow className={classes.row} key={coach.personid}>
                                        <CustomTableCell component="th" scope="row">
                                            {coach.coach_name}
                                        </CustomTableCell>
                                        <CustomTableCell>{coach.email}</CustomTableCell>
                                        <CustomTableCell>{coach.status_type}</CustomTableCell>
                                        {/* Buttons for suspending, banning, and deleting coaches */}
                                        <CustomTableCell><Button variant="outlined" style={{ backgroundColor: "orange", color: "white" }} onClick={() => this.suspendCoach(coach.personid)}><SuspendIcon /> Suspend</Button></CustomTableCell>
                                        <CustomTableCell><Button variant="outlined" style={{ backgroundColor: "black", color: "white" }} onClick={() => this.banCoach(coach.personid)}><BanIcon /> Ban</Button></CustomTableCell>
                                        <CustomTableCell><Button variant="outlined" style={{ backgroundColor: "#f01e3c", color: "white" }} onClick={() => this.deleteCoach(coach.personid)}><DeleteIcon /> Delete</Button></CustomTableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
                <div className="page-buttons">
                    {/* Buttons for changing table pages */}
                    <Button variant="contained" color="primary" onClick={this.previousPage}>Previous</Button>
                    <Button variant="contained" color="primary" onClick={this.nextPage}>Next</Button>
                </div>
            </div>
        );
    }
}

CustomizedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(CustomizedTable));