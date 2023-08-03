import React, { Component } from 'react';
import { withStyles, Grid, Button, Modal } from 'material-ui';

import { RegularCard, ItemGrid, CustomInput, CustomSelect } from 'components';
import { connect } from 'react-redux';

const ids = {
    id: '',
    title: '',
    name: '',
    phoneNumber: '',
    mobileNumber: '',
    emailAddress: '',
    permamentAddress: '',
    presentAddress: ''
};

class addCustomerModal extends Component {
    
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

    _addCustomer = () => {
        const {name} = this.state;
        if (name) {
            this.props.addVendorCustomer(this.state, this.props.refresh, this._resetInput, this.props.successNotification, this.props.errorNotification);
        } else {
            this.props.errorNotification();
        }
    };

    _resetInput = () => {
        this.setState(ids, this.props.close);
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
    
    render() {
        const { classes, open, close, vendorList } = this.props;

        return (
            <Modal
                aria-labelledby="Add Product"
                aria-describedby="Modal for adding Products"
                open={open}
                onClose={close}
            >
                <div style={this.getModalStyle()} className={classes.paper}>
                    <Grid container>
                        <ItemGrid xs={12} sm={12} md={12}>
                            <RegularCard
                                cardTitle="ADD PRODUCT"
                                cardSubtitle="Fill the form below to add product to the system"
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
                                                    value={ this.state.vendorId }
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
                                                    defaultValue={ this.state.title }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>
                                            <ItemGrid xs={6} sm={6} md={6}>
                                                <CustomInput
                                                    autoFocus
                                                    labelText="Name"
                                                    id="cust-vendor-name"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setName }
                                                    defaultValue={ this.state.name }
                                                />
                                            </ItemGrid>
                                       
                                            <ItemGrid xs={6} sm={6} md={6}>
                                                <CustomInput
                                                    autoFocus
                                                    labelText="Phone Number"
                                                    id="cust-vendor-phonenumber"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setPhoneNumber }
                                                    defaultValue={ this.state.phoneNumber }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>   
                                           
                                            <ItemGrid xs={6} sm={6} md={6}>
                                                <CustomInput
                                                    labelText="Mobile number"
                                                    id="cust-vendor-mobileNumber"
                                                    formControlProps={{ fullWidth:true , marginRight: 10 }}
                                                    type="text"
                                                    onChange={ this._setMobileNumber }
                                                    defaultValue={ this.state.mobileNumber }
                                                />
                                            </ItemGrid>
                                       
                                            <ItemGrid xs={6} sm={6} md={6}>
                                                <CustomInput
                                                    labelText="Email address"
                                                    id="cust-vendor-emailAddress"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setEmailAddress }
                                                    defaultValue={ this.state.emailAddress }
                                                />
                                            </ItemGrid>
                                            <ItemGrid xs={6} sm={6} md={6}>
                                                <CustomInput
                                                    labelText="Permament address"
                                                    id="cust-vendor-permamentAddress"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setPermamentAddress }
                                                    defaultValue={ this.state.permamentAddress }
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
                                                    defaultValue={ this.state.presentAddress }
                                                />
                                                
                                            </ItemGrid>
                                        </Grid>
                                    </div>
                                }
                                
                                footer={
                                    <Button
                                        variant="raised" 
                                        style={{ backgroundColor: 'purple', color: 'white' }} 
                                        onClick={this._addCustomer}>Add</Button>
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
    const { vendorList } = state.vendorReducer;
    return { vendorList };
};

const AddModalWrapped = withStyles(styles)(addCustomerModal);

export default connect(mapStateToProps)(AddModalWrapped);






