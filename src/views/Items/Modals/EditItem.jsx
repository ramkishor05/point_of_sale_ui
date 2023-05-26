import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Grid, Button, Modal } from 'material-ui';

import { RegularCard, ItemGrid, CustomInput, CustomSelect } from 'components';

import { editItem } from '../../../actions';
const units =[{'id' : 1, 'name':'KGS'}];
class EditItem extends Component {
    state = {
        id: '',
        title: '',
        name: '',
        description: '',
        purchasePrice: 0,
        purchaseUnit: 1,
        wholePrice: 0,
        wholeUnit: 1,
        retailPrice: 0,
        retailUnit: 1,
        stockQnt: 0
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

    _setStockQnt = event => {
        this.setState({ stockQnt: event.target.value });
    };

    _editItem = () => {
        const 
            id = this.props.edit_item.id,
            name = this.props.edit_item.name,
            retailPrice = this.props.edit_item.retailPrice;
          
        if (id && name && Number(retailPrice) && (Number(retailPrice) || Number(retailPrice) === 0)) {
            this.props.editItem(id, this.state, this.clearAndRefresh, this.props.successNotification, this.props.errorNotification);
        } else {
            this.props.errorNotification();
        }
    };

    clearAndRefresh = () => {
        this.props.close();
        this.props.refresh();
    }
    
    render() {
        const { classes, open, close, edit_item } = this.props;
        return (
            <Modal
                aria-labelledby="Edit Item"
                aria-describedby="Modal for editing item"
                open={open}
                onClose={close}
            >
                <div style={this.getModalStyle()} className={classes.paper}>
                    <Grid container>
                        <ItemGrid xs={12} sm={12} md={12}>
                            <RegularCard
                                cardTitle="EDIT ITEM"
                                cardSubtitle="Edit the form below to edit the selected item"
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
                                                    defaultValue={ edit_item.name }
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
                                                    defaultValue={ edit_item.name }
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
                                                    defaultValue={ edit_item.description }
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
                                                    defaultValue={ edit_item.purchasePrice }
                                                />
                                                <CustomSelect
                                                   labelText="Purchase Unit"
                                                    id="purchase-unit"
                                                    formControlProps={{ fullWidth:true, marginLeft: 10 }}
                                                    type="text"
                                                    onChange={ this._setPurchaseUnit }
                                                    defaultValue={ edit_item.purchaseUnit }
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
                                                    defaultValue={ edit_item.retailPrice }
                                                />
                                            
                                                <CustomSelect
                                                   labelText="Retail Unit"
                                                    id="retail-unit"
                                                    formControlProps={{ fullWidth:true, marginLeft: 10 }}
                                                    type="text"
                                                    onChange={ this._setRetailUnit }
                                                    defaultValue={ edit_item.retailUnit }
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
                                                    defaultValue={ edit_item.wholePrice }
                                                />
                                                <CustomSelect
                                                   labelText="Whole Unit"
                                                    id="whole-unit"
                                                    formControlProps={{ fullWidth:true, marginLeft: 10 }}
                                                    type="text"
                                                    onChange={ this._setWholeUnit }
                                                    defaultValue={ edit_item.wholeUnit }
                                                    items= {units}
                                                    value={ this.state.wholeUnit }
                                                ></CustomSelect>
                                                </div>
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>.
                                            <ItemGrid xs={4} sm={4} md={4}>
                                            <CustomInput
                                                    autoFocus
                                                    labelText="Stock Qnt"
                                                    id="item-stack-qnt"
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
                                        onClick={this._editItem}>Edit</Button>
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
    const { edit_item } = state.items;
    return { edit_item };
};

const EditModalWrapped = withStyles(styles)(EditItem);

export default connect(mapStateToProps, { editItem })(EditModalWrapped);
