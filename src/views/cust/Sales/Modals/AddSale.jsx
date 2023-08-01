import React, { Component } from 'react';
import { withStyles, Grid, Button, Modal } from 'material-ui';

import { RegularCard, ItemGrid, CustomInput, CustomSelect } from 'components';

class AddSale extends Component {
    state = {
        item_index: '',
        retailQnt: 0.00,
        wholeQnt: 0.00,
    }

    calculate = type => {
        if (!this.state.item_index && this.state.item_index !== 0) {
            return () => 0.00;
        }

        let item = this.props.items[this.state.item_index];

        return () => {
            switch(type) {
                case "retailPrice":
                    return Number(item.retailPrice);

                case "wholePrice":
                    return Number(item.wholePrice);

                case "retailAmount":
                    return (Number(this.state.retailQnt) * Number(item.retailPrice)).toFixed(2);
                
                case "wholeAmount":
                    return (Number(this.state.wholeQnt) * Number(item.wholePrice)).toFixed(2);

                case "totalAmount":
                    let retail_price = Number(this.state.retailQnt) * Number(item.retailPrice);
                    let whole_price = Number(this.state.wholeQnt) * Number(item.wholePrice);

                    return (retail_price + whole_price).toFixed(2);

                default:
                    return 0.00;
            }
        }
    };

    // Function for disabling quantity input if corresponding price is 0.
    disableInput = type => {
        if (this.state.item_index || this.state.item_index === 0) {
    
            let item = this.props.items[this.state.item_index];

            if (Number(item[type]) !== 0) {
                return false;
            }
        }

        return true;
    };

    // Function for adding sales to database.
    _addSale = () => {
        const { item_index, retailQnt, wholeQnt } = this.state;
        const { refreshSales, successNotification, errorNotification } = this.props;

        if (!item_index && item_index !== 0) {
            return;
        }

        if (!Number(retailQnt) && !Number(wholeQnt)) {
            errorNotification && errorNotification();
            return;
        }

        let custProductSale = {
            discounts: 0.0,
            retailSaleTotals: 0.0,
            wholeSaletotals: 0.0,
            custProductRetailSaleList: [],
            custProductWholeSaleList: []
        }

        let item = this.props.items[item_index];
        let item_id= item.id;
        
        if(retailQnt){
            let custProductRetailSale={
                name: item.name,
                desc: item.desc,
                purchasePrice: item.purchasePrice,
                purchaseUnitId: 1,
                retailQnt: retailQnt,
                retailPrice: item.retailPrice,
                retailUnitId: 1,
                custProductId: item_id
            }
            custProductSale.custProductRetailSaleList.push(custProductRetailSale);
        }
        if(wholeQnt){
            let custProductWholeSale={
                name: item.name,
                desc: item.desc,
                purchasePrice: item.purchasePrice,
                purchaseUnitId: 1,
                wholeQnt: wholeQnt,
                wholePrice: item.wholePrice,
                wholeUnitId: 1,
                custProductId: item_id
            }
            custProductSale.custProductWholeSaleList.push(custProductWholeSale);
        }
        this.props.addSale(custProductSale, refreshSales, this.clear, successNotification, errorNotification);
    };

    clear = () => {
        this.setState({
            item_index: '',
            retailQnt: 0.00,
            wholeQnt: 0.00,
        });

        this.props.close();
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
        const { classes, open, close } = this.props;

        return (
            <Modal
                aria-labelledby="Add Sale"
                aria-describedby="Modal for adding sales"
                open={open}
                onClose={close}
            >
                <div style={this.getModalStyle()} className={classes.paper}>
                    <Grid container>
                        <ItemGrid xs={12} sm={12} md={12}>
                            
                            <RegularCard
                                cardTitle="ADD SALE"
                                cardSubtitle="Fill the form below to add sale to the system"
                                content={
                                    <div>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                                <CustomSelect
                                                    labelText="Item name"
                                                    id="item-name"
                                                    formControlProps={{ fullWidth: true }}
                                                    onChange={event => this.setState({ item_index: event.target.value })}
                                                    value={this.state.item_index}
                                                    items={this.props.items}
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={4} md={4}>
                                                <CustomInput
                                                    disabled={this.disableInput("retailPrice")}
                                                    labelText="Retail quantity"
                                                    id="retail-quantity"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="number"
                                                    onChange={event => this.setState({ retailQnt: event.target.value })}
                                                    defaultValue={ this.state.retailQnt }
                                                />
                                            </ItemGrid>
                                            <ItemGrid xs={12} sm={4} md={4}>
                                                <CustomInput
                                                    disabled
                                                    labelText="Retail price"
                                                    id="retail-price"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="number"
                                                    value={ this.calculate("retailPrice")() }
                                                />
                                            </ItemGrid>
                                            <ItemGrid xs={12} sm={4} md={4}>
                                                <CustomInput
                                                    disabled
                                                    labelText="Retail amount"
                                                    id="retail-amount"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="number"
                                                    value={ this.calculate("retailAmount")() }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={4} md={4}>
                                                <CustomInput
                                                    disabled={this.disableInput("wholePrice")}
                                                    labelText="Whole quantity"
                                                    id="whole-quantity"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="number"
                                                    onChange={event => this.setState({ wholeQnt: event.target.value })}
                                                    defaultValue={ this.state.wholeQnt }
                                                />
                                            </ItemGrid>
                                            <ItemGrid xs={12} sm={4} md={4}>
                                                <CustomInput
                                                    disabled
                                                    labelText="Whole price"
                                                    id="whole-price"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="number"
                                                    value={ this.calculate("wholePrice")() }
                                                />
                                            </ItemGrid>
                                            <ItemGrid xs={12} sm={4} md={4}>
                                                <CustomInput
                                                    disabled
                                                    labelText="Whole amount"
                                                    id="whole-amount"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="number"
                                                    value={ this.calculate("wholeAmount")() }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    disabled
                                                    labelText="Total amount"
                                                    id="total-amount"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="number"
                                                    value={ this.calculate("totalAmount")() }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                    </div>
                                }
                                
                                footer={
                                    <Button 
                                        variant="raised" 
                                        style={{ backgroundColor: 'purple', color: 'white' }} 
                                        onClick={this._addSale}
                                    >Add</Button>
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
        width: theme.spacing.unit * 60,
        backgroundColor: 'transparent',
        padding: theme.spacing.unit * 4,
    },
});

const AddModalWrapped = withStyles(styles)(AddSale);

export default AddModalWrapped;






