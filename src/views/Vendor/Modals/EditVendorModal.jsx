import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Grid, Button, Modal } from 'material-ui';

import { RegularCard, ItemGrid, CustomInput, CustomSelect } from 'components';

import { editVendor } from 'actions';

class EditVendorModal extends Component {
    state = {
        id: '',
        title: '',
        name: '',
        phoneNumber: '',
        mobileNumber: '',
        emailAddress: '',
        permamentAddress: '',
        presentAddress: ''
    };

    getModalStyle() {
        const top = 50;
        const left = 50;

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }
    _setTitle = event => {
        this.setState({ title: event.target.value });
    };

    _setName = event => {
        this.setState({ name: event.target.value });
    };

    _setPhoneNumber = event => {
        this.setState({ phoneNumber: event.target.value });
    };

    _setMobileNumber = event => {
        this.setState({ mobileNumber: event.target.value });
    };

    _setEmailAddress = event => {
        this.setState({ emailAddress: event.target.value });
    };

    _setPermamentAddress = event => {
        this.setState({ permamentAddress: event.target.value });
    };

    _setPresentAddress = event => {
        this.setState({ presentAddress: event.target.value });
    };
    _editVendor = () => {
        const 
            id = this.props.vendor.id;
        if (id) {
            this.props.editVendor(id, this.state, this.clearAndRefresh, this.props.successNotification, this.props.errorNotification);
        } else {
            this.props.errorNotification();
        }
    };

    clearAndRefresh = () => {
        this.props.close();
        this.props.refresh();
    }
    
    render() {
        const { classes, open, close, vendor } = this.props;
        console.log("vendor=",vendor)
        return (
            <Modal
                aria-labelledby="Edit Vendor"
                aria-describedby="Modal for editing vendors"
                open={open}
                onClose={close}
            >
                <div style={this.getModalStyle()} className={classes.paper}>
                    <Grid container>
                        <ItemGrid xs={12} sm={12} md={12}>
                            <RegularCard
                                cardTitle="ADD VENDOR"
                                cardSubtitle="Fill the form below to add vendor to the system"
                                content={
                                    <div>
                                        <Grid container>
                                            <ItemGrid xs={6} sm={6} md={6}>
                                                <CustomInput
                                                    autoFocus
                                                    labelText="Title"
                                                    id="cust-vendor-title"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setTitle }
                                                    defaultValue={ vendor.title }
                                                />
                                            </ItemGrid>
                                            <ItemGrid xs={6} sm={6} md={6}>
                                                <CustomInput
                                                    autoFocus
                                                    labelText="Name"
                                                    id="cust-vendor-name"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setName }
                                                    defaultValue={ vendor.name }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>
                                            <ItemGrid xs={6} sm={6} md={6}>
                                                <CustomInput
                                                    autoFocus
                                                    labelText="Phone Number"
                                                    id="cust-vendor-phonenumber"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setPhoneNumber }
                                                    defaultValue={ vendor.phoneNumber }
                                                />
                                            </ItemGrid>
                                                                                    
                                            <ItemGrid xs={6} sm={6} md={6}>
                                                <CustomInput
                                                    labelText="Mobile number"
                                                    id="cust-vendor-mobileNumber"
                                                    formControlProps={{ fullWidth:true}}
                                                    type="text"
                                                    onChange={ this._setMobileNumber }
                                                    defaultValue={ vendor.mobileNumber }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>   

                                            <ItemGrid xs={6} sm={6} md={6}>
                                                <CustomInput
                                                    labelText="Email address"
                                                    id="cust-vendor-emailAddress"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setEmailAddress }
                                                    defaultValue={ vendor.emailAddress }
                                                />
                                            </ItemGrid>
                                            <ItemGrid xs={6} sm={6} md={6}>
                                                <CustomInput
                                                    labelText="Permament address"
                                                    id="cust-vendor-permamentAddress"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setPermamentAddress }
                                                    defaultValue={ vendor.permamentAddress }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>.
                                            <ItemGrid xs={6} sm={6} md={6}>
                                            <CustomInput
                                                    autoFocus
                                                    labelText="Present address"
                                                    id="cust-vendor-presentAddress"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setPresentAddress }
                                                    defaultValue={ vendor.presentAddress }
                                                />
                                                
                                            </ItemGrid>
                                        </Grid>
                                    </div>
                                }
                                
                                footer={
                                    <Button
                                        variant="raised" 
                                        style={{ backgroundColor: 'purple', color: 'white' }} 
                                        onClick={this._editVendor}>Edit</Button>
                                }
                            />
                        </ItemGrid>
                    </Grid>
                </div>
            </Modal>
        );
    }
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 100,
        backgroundColor: 'transparent',
        padding: theme.spacing.unit * 4,
        marginLeft: theme.spacing.unit *10
    },
});

const mapStateToProps = state => {
    const { vendor } = state.vendorReducer;
    return { vendor };
};

const EditModalWrapped = withStyles(styles)(EditVendorModal);

export default connect(mapStateToProps, { editVendor })(EditModalWrapped);
