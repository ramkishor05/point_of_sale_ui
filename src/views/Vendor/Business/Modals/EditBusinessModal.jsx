import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Grid, Button, Modal } from 'material-ui';

import { RegularCard, ItemGrid, CustomInput, CustomSelect } from 'components';

import { editVendorBusiness } from 'actions';

const ids = {
    id: '',
    title: '',
    name: '',
    phoneNumber: '',
    mobileNumber: '',
    emailAddress: '',
    permamentAddress: '',
    presentAddress: '',
    vendorId: 0
};

class EditBusinessModal extends Component {
    state = {...ids};
    
    _setVendorId = event => {
        this.setState({ vendorId: event.target.value });
    };

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

    _editVendorBusiness = () => {
        const 
            id = this.props.vendorBusiness.id;
        if (id) {
            this.props.editVendorBusiness(id, this.state, this.clearAndRefresh, this.props.successNotification, this.props.errorNotification);
        } else {
            this.props.errorNotification();
        }
    };

    clearAndRefresh = () => {
        this.props.close();
        this.props.refresh();
    }

    getModalStyle() {
        const top = 50;
        const left = 50;

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }
    
    render() {
        const { classes, open, close, vendorBusiness, vendorList } = this.props;

        return (
            <Modal
                aria-labelledby="Edit business"
                aria-describedby="Modal for editing business "
                open={open}
                onClose={close}
            >
                <div style={this.getModalStyle()} className={classes.paper}>
                    <Grid container>
                        <ItemGrid xs={12} sm={12} md={12}>
                            <RegularCard
                                cardTitle="EDIT business"
                                cardSubtitle="Fill the form below to edit business to the system"
                                content={
                                    <div>
                                        <Grid container> 
                                            <ItemGrid xs={6} sm={6} md={6}>
                                                <CustomSelect
                                                    labelText="Vendors"
                                                    id="cust-product-purchase-unit"
                                                    formControlProps={{ fullWidth:true, marginLeft: 10 }}
                                                    type="text"
                                                    onChange={ this._setVendorId }
                                                    defaultValue={ this.state.vendorId }
                                                    items= {vendorList}
                                                    value={ vendorBusiness.vendorId | this.state.vendorId }
                                                    idKey = "id"
                                                    valueKey = "name"
                                                ></CustomSelect>
                                            </ItemGrid>
                                            <ItemGrid xs={6} sm={6} md={6}>
                                                <CustomInput
                                                    autoFocus
                                                    labelText="Title"
                                                    id="cust-vendor-title"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setTitle }
                                                    defaultValue={ vendorBusiness.title }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>
                                            <ItemGrid xs={6} sm={6} md={6}>
                                                <CustomInput
                                                    autoFocus
                                                    labelText="Name"
                                                    id="cust-vendorBusiness-name"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setName }
                                                    defaultValue={ vendorBusiness.name }
                                                />
                                            </ItemGrid>
                                        
                                            <ItemGrid xs={6} sm={6} md={6}>
                                                <CustomInput
                                                    autoFocus
                                                    labelText="Phone Number"
                                                    id="cust-vendorBusiness-phonenumber"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setPhoneNumber }
                                                    defaultValue={ vendorBusiness.phoneNumber }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>                                               
                                            <ItemGrid xs={6} sm={6} md={6}>
                                                <CustomInput
                                                    labelText="Mobile number"
                                                    id="cust-vendorBusiness-mobileNumber"
                                                    formControlProps={{ fullWidth:true}}
                                                    type="text"
                                                    onChange={ this._setMobileNumber }
                                                    defaultValue={ vendorBusiness.mobileNumber }
                                                />
                                            </ItemGrid>
                                        

                                            <ItemGrid xs={6} sm={6} md={6}>
                                                <CustomInput
                                                    labelText="Email address"
                                                    id="cust-vendorBusiness-emailAddress"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setEmailAddress }
                                                    defaultValue={ vendorBusiness.emailAddress }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>
                                            <ItemGrid xs={6} sm={6} md={6}>
                                                <CustomInput
                                                    labelText="Permament address"
                                                    id="cust-vendorBusiness-permamentAddress"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setPermamentAddress }
                                                    defaultValue={ vendorBusiness.permamentAddress }
                                                />
                                            </ItemGrid>
                                        
                                            <ItemGrid xs={6} sm={6} md={6}>
                                            <CustomInput
                                                    autoFocus
                                                    labelText="Present address"
                                                    id="cust-vendorBusiness-presentAddress"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setPresentAddress }
                                                    defaultValue={ vendorBusiness.presentAddress }
                                                />
                                                
                                            </ItemGrid>
                                        </Grid>
                                    </div>
                                }
                                
                                footer={
                                    <Button
                                        variant="raised" 
                                        style={{ backgroundColor: 'purple', color: 'white' }} 
                                        onClick={this._editVendorBusiness}>Edit</Button>
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
    const { vendorBusiness } = state.vendorBusinessReducer;
    const { vendorList } = state.vendorReducer;
    return { vendorBusiness , vendorList};
};

const EditModalWrapped = withStyles(styles)(EditBusinessModal);

export default connect(mapStateToProps, { editVendorBusiness })(EditModalWrapped);
