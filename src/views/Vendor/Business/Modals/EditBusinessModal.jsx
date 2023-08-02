import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Grid, Button, Modal } from 'material-ui';

import { RegularCard, ItemGrid, CustomInput, CustomSelect } from 'components';

import { editVendorBusiness } from 'actions';

const units =[{'id' : 1, 'name':'KGS'}];

class EditBusinessModal extends Component {
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
    
    render() {
        const { classes, open, close, vendorBusiness } = this.props;
        console.log("Business=",vendorBusiness)
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
                                            <ItemGrid xs={4} sm={4} md={4}>
                                                <CustomInput
                                                    autoFocus
                                                    labelText="Title"
                                                    id="cust-business-title"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setTitle }
                                                    defaultValue={ vendorBusiness.title }
                                                />
                                            </ItemGrid>
                                            <ItemGrid xs={4} sm={4} md={4}>
                                                <CustomInput
                                                    autoFocus
                                                    labelText="Name"
                                                    id="cust-business-name"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setName }
                                                    defaultValue={ vendorBusiness.name }
                                                />
                                            </ItemGrid>
                                            <ItemGrid xs={4} sm={4} md={4}>
                                                <CustomInput
                                                    autoFocus
                                                    labelText="Desciption"
                                                    id="cust-business-desc"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setDesc }
                                                    defaultValue={ vendorBusiness.desc }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>
                                            
                                            <ItemGrid xs={4} sm={4} md={4}>
                                            <div style={{display: 'flex'}}>
                                                <CustomInput
                                                    labelText="Purchase price"
                                                    id="cust-business-purchase-price"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setPurchasePrice }
                                                    defaultValue={ vendorBusiness.purchasePrice }
                                                />
                                                <CustomSelect
                                                   labelText="Purchase Unit"
                                                    id="cust-business-purchase-unit"
                                                    formControlProps={{ fullWidth:true, marginLeft: 10 }}
                                                    type="text"
                                                    onChange={ this._setPurchaseUnit }
                                                    defaultValue={ vendorBusiness.purchaseUnit|1 }
                                                    items= {units}
                                                    value={ vendorBusiness.purchaseUnit |1}
                                                ></CustomSelect>
                                            </div>
                                            </ItemGrid>
                                            

                                            <ItemGrid xs={4} sm={4} md={4}>
                                               <div style={{display: 'flex'}}>
                                                <CustomInput
                                                    labelText="Retail price"
                                                    id="cust-business-retail-price"
                                                    formControlProps={{ fullWidth:true , marginRight: 10 }}
                                                    type="text"
                                                    onChange={ this._setRetailPrice }
                                                    defaultValue={ vendorBusiness.retailPrice }
                                                />
                                            
                                                <CustomSelect
                                                   labelText="Retail Unit"
                                                    id="cust-business-retail-unit"
                                                    formControlProps={{ fullWidth:true, marginLeft: 10 }}
                                                    type="text"
                                                    onChange={ this._setRetailUnit }
                                                    defaultValue={ vendorBusiness.retailUnit | 1 }
                                                    items= {units}
                                                    value={ vendorBusiness.retailUnit | 1 }
                                                ></CustomSelect>
                                              </div>
                                            </ItemGrid>
                                            <ItemGrid xs={4} sm={4} md={4}>
                                            <div style={{display: 'flex'}}>
                                                <CustomInput
                                                    labelText="Whole price"
                                                    id="cust-business-whole-price"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setWholePrice }
                                                    defaultValue={ vendorBusiness.wholePrice }
                                                />
                                                <CustomSelect
                                                   labelText="Whole Unit"
                                                    id="cust-business-whole-unit"
                                                    formControlProps={{ fullWidth:true, marginLeft: 10 }}
                                                    type="text"
                                                    onChange={ this._setWholeUnit }
                                                    defaultValue={ vendorBusiness.wholeUnit | 1 }
                                                    items= {units}
                                                    value={ vendorBusiness.wholeUnit | 1 }
                                                ></CustomSelect>
                                                </div>
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>.
                                            <ItemGrid xs={4} sm={4} md={4}>
                                            <CustomInput
                                                    autoFocus
                                                    labelText="Stock Qnt"
                                                    id="cust-business-stack-qnt"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setStockQnt }
                                                    defaultValue={ vendorBusiness.stockQnt }
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
    return { vendorBusiness };
};

const EditModalWrapped = withStyles(styles)(EditBusinessModal);

export default connect(mapStateToProps, { editVendorBusiness })(EditModalWrapped);
