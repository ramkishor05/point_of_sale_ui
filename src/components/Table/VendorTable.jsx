import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Table, TableHead, TableRow, TableBody, TableCell, Button, IconButton} from 'material-ui';
import { DeleteOutlineOutlined, UpdateOutlined } from '@material-ui/icons';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { pink } from 'material-ui/colors';

import logo_img from '../../assets/img/apple-icon.png';
import { tableStyle } from 'variables/styles';

import { renderToVendorEdit } from 'actions';
import { Edit } from 'material-ui-icons';

class VendorTable extends Component {
    // Check if the user is super admin.
    isSuperAdmin = () => {
        return true;//this.props.user.role.name === 'super_admin';
    };

    _renderDate(value) {
        let date = Moment(value);

        return date.isValid() ? date.format('DD/MM/YYYY') : value;
    }

    _renderEdit(prop) {
        this.props.renderToVendorEdit(prop);
        this.props.editVendor();
    }

    _renderUpdate(prop) {
        this.props.renderToVendorEdit(prop);
        this.props.updateVendor();
    }

    _renderTableData = () => {
        let number = 0;
        const { tableData, classes } = this.props;

        return tableData.map((prop, key) => {
            return (
                <TableRow key={key}>
                   <TableCell className={classes.tableCell}>
                        <img src={logo_img} width={30} height= {30}></img>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        { prop.idenNo }
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        { prop.name }
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        { prop.phoneNumber }
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        { prop.mobileNumber }
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        {prop.emailAddress}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        { this._renderDate(prop.createdDt) }
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        { this._renderDate(prop.updatedDt) }
                    </TableCell >
                    {
                        this.isSuperAdmin() && (
                            <TableCell  >
                                <IconButton 
                                onClick={this._renderEdit.bind(this, prop)}>
                                    <Edit></Edit>
                                </IconButton>
                                <IconButton
                                onClick={this._renderUpdate.bind(this, prop)} >
                                    <UpdateOutlined/>
                                </IconButton>
                                <IconButton sx={{ color: pink[500] }} ><DeleteOutlineOutlined /></IconButton>
                            </TableCell>
                        )
                    }
                </TableRow>
            )
        })
    }

    render(){
        const { classes, tableHead, tableData, tableHeaderColor } = this.props;
        return (
            <div className={classes.tableResponsive}>
                <Table className={classes.table}>
                    {
                        tableHead !== undefined
                        ? (
                            <TableHead className={classes[tableHeaderColor+"TableHeader"]}>
                                <TableRow>
                                    {
                                        tableHead.map((prop, key) => {
                                            return (
                                                <TableCell
                                                    className={classes.tableCell + " " + classes.tableHeadCell}
                                                    key={key}>
                                                    {prop}
                                                </TableCell>
                                            );
                                        })
                                    }
                                </TableRow>
                            </TableHead>
                            
                        )
                        : null
                    }
                    {
                        tableData.length
                        ? (
                            <TableBody>
                                { this._renderTableData() }
                            </TableBody>
                        )
                        : null
                    }
                </Table>
            </div>
        );
    }
}

VendorTable.defaultProps = {
    tableHeaderColor: 'gray',
}

VendorTable.propTypes = {
    classes: PropTypes.object.isRequired,
    tableHeaderColor: PropTypes.oneOf(['warning','primary','danger','success','info','rose','gray']),
    tableHead: PropTypes.arrayOf(PropTypes.string),
    tableData: PropTypes.arrayOf(PropTypes.object)
};

const styles = {
    updateButton: {
        color: 'white',
        backgroundColor: 'purple',
        margin: 1
    },
    deleteButton: {
        color: 'white',
        backgroundColor: 'red',
        margin: 1
    }
};

const mapStateToProps = state => {
    const { user } = state.users;
    return { user };
};

const WrappedVendorTable = withStyles(tableStyle)(VendorTable);

export default connect(mapStateToProps, { renderToVendorEdit })(WrappedVendorTable);
