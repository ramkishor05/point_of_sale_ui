import React, { Component } from 'react';
import { withStyles, Grid, Button, Modal } from 'material-ui';

import { RegularCard, ItemGrid, CustomInput, CustomSelect } from 'components';

const ids = {
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
const units =[{'id' : 1, 'name':'KGS'}];

class addCustProductModal extends Component {
    
    state = {...ids};

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

    _addCustProduct = () => {
        const {name} = this.state;

        if (name) {
            this.props.addCustProduct(this.state, this.props.refresh, this._resetInput, this.props.successNotification, this.props.errorNotification);
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
        const { classes, open, close } = this.props;

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
                                            <ItemGrid xs={4} sm={4} md={4}>
                                                <CustomInput
                                                    autoFocus
                                                    labelText="Title"
                                                    id="cust-product-title"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setTitle }
                                                    defaultValue={ this.state.title }
                                                />
                                            </ItemGrid>
                                            <ItemGrid xs={4} sm={4} md={4}>
                                                <CustomInput
                                                    autoFocus
                                                    labelText="Name"
                                                    id="cust-product-name"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setName }
                                                    defaultValue={ this.state.name }
                                                />
                                            </ItemGrid>
                                            <ItemGrid xs={4} sm={4} md={4}>
                                                <CustomInput
                                                    autoFocus
                                                    labelText="Desciption"
                                                    id="cust-product-desc"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setDesc }
                                                    defaultValue={ this.state.desc }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>
                                            
                                            <ItemGrid xs={4} sm={4} md={4}>
                                            <div style={{display: 'flex'}}>
                                                <CustomInput
                                                    labelText="Purchase price"
                                                    id="cust-product-purchase-price"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setPurchasePrice }
                                                    defaultValue={ this.state.purchasePrice }
                                                />
                                                <CustomSelect
                                                   labelText="Purchase Unit"
                                                    id="cust-product-purchase-unit"
                                                    formControlProps={{ fullWidth:true, marginLeft: 10 }}
                                                    type="text"
                                                    onChange={ this._setPurchaseUnit }
                                                    defaultValue={ this.state.purchaseUnit }
                                                    items= {units}
                                                    value={ this.state.purchaseUnit }
                                                    idKey="id"
                                                    valueKey="name"
                                                ></CustomSelect>
                                            </div>
                                            </ItemGrid>
                                            

                                            <ItemGrid xs={4} sm={4} md={4}>
                                               <div style={{display: 'flex'}}>
                                                <CustomInput
                                                    labelText="Retail price"
                                                    id="cust-product-retail-price"
                                                    formControlProps={{ fullWidth:true , marginRight: 10 }}
                                                    type="text"
                                                    onChange={ this._setRetailPrice }
                                                    defaultValue={ this.state.retailPrice }
                                                />
                                            
                                                <CustomSelect
                                                   labelText="Retail Unit"
                                                    id="cust-product-retail-unit"
                                                    formControlProps={{ fullWidth:true, marginLeft: 10 }}
                                                    type="text"
                                                    onChange={ this._setRetailUnit }
                                                    defaultValue={ this.state.retailUnit }
                                                    items= {units}
                                                    value={ this.state.retailUnit }
                                                    idKey="id"
                                                    valueKey="name"
                                                ></CustomSelect>
                                              </div>
                                            </ItemGrid>
                                            <ItemGrid xs={4} sm={4} md={4}>
                                            <div style={{display: 'flex'}}>
                                                <CustomInput
                                                    labelText="Whole price"
                                                    id="cust-product-whole-price"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setWholePrice }
                                                    defaultValue={ this.state.wholePrice }
                                                />
                                                <CustomSelect
                                                   labelText="Whole Unit"
                                                    id="cust-product-whole-unit"
                                                    formControlProps={{ fullWidth:true, marginLeft: 10 }}
                                                    type="text"
                                                    onChange={ this._setWholeUnit }
                                                    defaultValue={ this.state.wholeUnit }
                                                    items= {units}
                                                    value={ this.state.wholeUnit }
                                                    idKey="id"
                                                    valueKey="name"
                                                ></CustomSelect>
                                                </div>
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>.
                                            <ItemGrid xs={4} sm={4} md={4}>
                                            <CustomInput
                                                    autoFocus
                                                    labelText="Stock Qnt"
                                                    id="cust-product-stack-qnt"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setStockQnt }
                                                    defaultValue={ this.state.stockQnt }
                                                />
                                                
                                            </ItemGrid>
                                        </Grid>
                                    </div>
                                }
                                
                                footer={
                                    <Button
                                        variant="raised" 
                                        style={{ backgroundColor: 'purple', color: 'white' }} 
                                        onClick={this._addCustProduct}>Add</Button>
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


const AddModalWrapped = withStyles(styles)(addCustProductModal);

export default AddModalWrapped;






