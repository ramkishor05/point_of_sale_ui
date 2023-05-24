import React, { Component } from 'react';
import { withStyles, Grid, Button, Modal } from 'material-ui';

import { RegularCard, ItemGrid, CustomInput, CustomSelect } from 'components';

const ids = {
    id: '',
        title: '',
        name: '',
        description: '',
        unitPrice: 0,
        purchasePrice: 0,
        purchaseUnit: 1,
        wholePrice: 0,
        wholeUnit: 1,
        retailPrice: 0,
        retailUnit: 1
};
const units =[{'id' : 1, 'name':'KGS'}];

class AddItem extends Component {
    
    state = {...ids};

    _setItemTitle = event => {
        this.setState({ title: event.target.value });
    };

    _setItemName = event => {
        this.setState({ name: event.target.value });
    };

    _setItemDesc = event => {
        this.setState({ description: event.target.value });
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


    _addItem = () => {
        const {name, unitPrice, retailPrice, purchasePrice, stockQuantity} = this.state;

        if (name) {
            this.props.addItem(this.state, this.props.refresh, this._resetInput, this.props.successNotification, this.props.errorNotification);
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
                aria-labelledby="Add Item"
                aria-describedby="Modal for adding items"
                open={open}
                onClose={close}
            >
                <div style={this.getModalStyle()} className={classes.paper}>
                    <Grid container>
                        <ItemGrid xs={12} sm={12} md={12}>
                            <RegularCard
                                cardTitle="ADD ITEM"
                                cardSubtitle="Fill the form below to add item to the system"
                                content={
                                    <div>
                                        <Grid container>
                                            <ItemGrid xs={4} sm={4} md={4}>
                                                <CustomInput
                                                    autoFocus
                                                    labelText="Item title"
                                                    id="item-name"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setItemName }
                                                    defaultValue={ this.state.name }
                                                />
                                            </ItemGrid>
                                            <ItemGrid xs={4} sm={4} md={4}>
                                                <CustomInput
                                                    autoFocus
                                                    labelText="Item name"
                                                    id="item-name"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setItemName }
                                                    defaultValue={ this.state.name }
                                                />
                                            </ItemGrid>
                                            <ItemGrid xs={4} sm={4} md={4}>
                                                <CustomInput
                                                    autoFocus
                                                    labelText="Item Desc"
                                                    id="item-name"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setItemDesc }
                                                    defaultValue={ this.state.description }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>
                                            
                                            <ItemGrid xs={4} sm={4} md={4}>
                                            <div style={{display: 'flex'}}>
                                                <CustomInput
                                                    labelText="Purchase price"
                                                    id="purchase-price"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setPurchasePrice }
                                                    defaultValue={ this.state.purchasePrice }
                                                />
                                                <CustomSelect
                                                   labelText="Purchase Unit"
                                                    id="purchase-unit"
                                                    formControlProps={{ fullWidth:true, marginLeft: 10 }}
                                                    type="text"
                                                    onChange={ this._setPurchaseUnit }
                                                    defaultValue={ this.state.purchaseUnit }
                                                    items= {units}
                                                    value={ this.state.purchaseUnit }
                                                ></CustomSelect>
                                            </div>
                                            </ItemGrid>
                                            

                                            <ItemGrid xs={4} sm={4} md={4}>
                                               <div style={{display: 'flex'}}>
                                                <CustomInput
                                                    labelText="Retail price"
                                                    id="retail-price"
                                                    formControlProps={{ fullWidth:true , marginRight: 10 }}
                                                    type="text"
                                                    onChange={ this._setRetailPrice }
                                                    defaultValue={ this.state.retailPrice }
                                                />
                                            
                                                <CustomSelect
                                                   labelText="Retail Unit"
                                                    id="retail-unit"
                                                    formControlProps={{ fullWidth:true, marginLeft: 10 }}
                                                    type="text"
                                                    onChange={ this._setRetailUnit }
                                                    defaultValue={ this.state.retailUnit }
                                                    items= {units}
                                                    value={ this.state.retailUnit }
                                                ></CustomSelect>
                                              </div>
                                            </ItemGrid>
                                            <ItemGrid xs={4} sm={4} md={4}>
                                            <div style={{display: 'flex'}}>
                                                <CustomInput
                                                    labelText="Whole price"
                                                    id="whole-price"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setWholePrice }
                                                    defaultValue={ this.state.wholePrice }
                                                />
                                                <CustomSelect
                                                   labelText="Whole Unit"
                                                    id="whole-unit"
                                                    formControlProps={{ fullWidth:true, marginLeft: 10 }}
                                                    type="text"
                                                    onChange={ this._setWholeUnit }
                                                    defaultValue={ this.state.wholeUnit }
                                                    items= {units}
                                                    value={ this.state.wholeUnit }
                                                ></CustomSelect>
                                                </div>
                                            </ItemGrid>
                                        </Grid>
                                    </div>
                                }
                                
                                footer={
                                    <Button
                                        variant="raised" 
                                        style={{ backgroundColor: 'purple', color: 'white' }} 
                                        onClick={this._addItem}>Add</Button>
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
        width: theme.spacing.unit * 90,
        backgroundColor: 'transparent',
        padding: theme.spacing.unit * 4,
    },
});

const AddModalWrapped = withStyles(styles)(AddItem);

export default AddModalWrapped;






