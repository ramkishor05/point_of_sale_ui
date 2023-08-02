import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Grid, Button, Modal } from 'material-ui';

import { RegularCard, ItemGrid, CustomInput, CustomSelect } from 'components';

import { editCustomer } from 'actions';

const units =[{'id' : 1, 'name':'KGS'}];

class EditCustomerModal extends Component {
    state = {
        id: '',
        title: '',
        name: '',
        desc: '',
        stockQnt: 0,
        purchasePrice: 0,
        purchaseUnit: 1,
        wholePrice: 0,
        wholeUnit: 1,
        retailPrice: 0,
        retailUnit: 1
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

    _setDesc = event => {
        this.setState({ desc: event.target.value });
    };

    _setUnitPrice = event => {
        this.setState({ unitPrice: event.target.value });
    };

    _setPurchasePrice = event => {
        this.setState({ purchasePrice: event.target.value });
    };

    _setPurchaseUnit = event => {
        this.setState({ purchaseUnit: event.target.value });
    };

    _setWholePrice = event => {
        this.setState({ wholePrice: event.target.value });
    };

    _setWholeUnit = event => {
        this.setState({ wholeUnit: event.target.value });
    };

    _setRetailPrice = event => {
        this.setState({ retailPrice: event.target.value });
    };

    _setRetailUnit = event => {
        this.setState({ retailUnit: event.target.value });
    };

    _setStockQnt = event => {
        this.setState({ stockQnt: event.target.value });
    };

    _editCustomer = () => {
        const 
            id = this.props.customer.id;
        if (id) {
            this.props.editCustomer(id, this.state, this.clearAndRefresh, this.props.successNotification, this.props.errorNotification);
        } else {
            this.props.errorNotification();
        }
    };

    clearAndRefresh = () => {
        this.props.close();
        this.props.refresh();
    }
    
    render() {
        const { classes, open, close, customer } = this.props;

        return (
            <Modal
                aria-labelledby="Edit Customer"
                aria-describedby="Modal for editing customers"
                open={open}
                onClose={close}
            >
                <div style={this.getModalStyle()} className={classes.paper}>
                    <Grid container>
                        <ItemGrid xs={12} sm={12} md={12}>
                            <RegularCard
                                cardTitle="EDIT customer"
                                cardSubtitle="Fill the form below to edit customer to the system"
                                content={
                                    <div>
                                        <Grid container>
                                            <ItemGrid xs={4} sm={4} md={4}>
                                                <CustomInput
                                                    autoFocus
                                                    labelText="Title"
                                                    id="cust-customer-title"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setTitle }
                                                    defaultValue={ customer.title }
                                                />
                                            </ItemGrid>
                                            <ItemGrid xs={4} sm={4} md={4}>
                                                <CustomInput
                                                    autoFocus
                                                    labelText="Name"
                                                    id="cust-customer-name"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setName }
                                                    defaultValue={ customer.name }
                                                />
                                            </ItemGrid>
                                            <ItemGrid xs={4} sm={4} md={4}>
                                                <CustomInput
                                                    autoFocus
                                                    labelText="Desciption"
                                                    id="cust-customer-desc"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setDesc }
                                                    defaultValue={ customer.desc }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>
                                            
                                            <ItemGrid xs={4} sm={4} md={4}>
                                            <div style={{display: 'flex'}}>
                                                <CustomInput
                                                    labelText="Purchase price"
                                                    id="cust-customer-purchase-price"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setPurchasePrice }
                                                    defaultValue={ customer.purchasePrice }
                                                />
                                                <CustomSelect
                                                   labelText="Purchase Unit"
                                                    id="cust-customer-purchase-unit"
                                                    formControlProps={{ fullWidth:true, marginLeft: 10 }}
                                                    type="text"
                                                    onChange={ this._setPurchaseUnit }
                                                    defaultValue={ customer.purchaseUnit|1 }
                                                    items= {units}
                                                    value={ customer.purchaseUnit |1}
                                                ></CustomSelect>
                                            </div>
                                            </ItemGrid>
                                            

                                            <ItemGrid xs={4} sm={4} md={4}>
                                               <div style={{display: 'flex'}}>
                                                <CustomInput
                                                    labelText="Retail price"
                                                    id="cust-customer-retail-price"
                                                    formControlProps={{ fullWidth:true , marginRight: 10 }}
                                                    type="text"
                                                    onChange={ this._setRetailPrice }
                                                    defaultValue={ customer.retailPrice }
                                                />
                                            
                                                <CustomSelect
                                                   labelText="Retail Unit"
                                                    id="cust-customer-retail-unit"
                                                    formControlProps={{ fullWidth:true, marginLeft: 10 }}
                                                    type="text"
                                                    onChange={ this._setRetailUnit }
                                                    defaultValue={ customer.retailUnit | 1 }
                                                    items= {units}
                                                    value={ customer.retailUnit | 1 }
                                                ></CustomSelect>
                                              </div>
                                            </ItemGrid>
                                            <ItemGrid xs={4} sm={4} md={4}>
                                            <div style={{display: 'flex'}}>
                                                <CustomInput
                                                    labelText="Whole price"
                                                    id="cust-customer-whole-price"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setWholePrice }
                                                    defaultValue={ customer.wholePrice }
                                                />
                                                <CustomSelect
                                                   labelText="Whole Unit"
                                                    id="cust-customer-whole-unit"
                                                    formControlProps={{ fullWidth:true, marginLeft: 10 }}
                                                    type="text"
                                                    onChange={ this._setWholeUnit }
                                                    defaultValue={ customer.wholeUnit | 1 }
                                                    items= {units}
                                                    value={ customer.wholeUnit | 1 }
                                                ></CustomSelect>
                                                </div>
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>.
                                            <ItemGrid xs={4} sm={4} md={4}>
                                            <CustomInput
                                                    autoFocus
                                                    labelText="Stock Qnt"
                                                    id="cust-customer-stack-qnt"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setStockQnt }
                                                    defaultValue={ customer.stockQnt }
                                                />
                                                
                                            </ItemGrid>
                                        </Grid>
                                    </div>
                                }
                                
                                footer={
                                    <Button
                                        variant="raised" 
                                        style={{ backgroundColor: 'purple', color: 'white' }} 
                                        onClick={this._editCustomer}>Edit</Button>
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
    const { customer } = state.customerList;
    return { customer };
};

const EditModalWrapped = withStyles(styles)(EditCustomerModal);

export default connect(mapStateToProps, { editCustomer })(EditModalWrapped);
