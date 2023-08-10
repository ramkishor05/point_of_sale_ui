import React, { Component } from 'react';
import { withStyles, Grid, Button, Modal, List, ListItem, ListItemText} from 'material-ui';

import { RegularCard, ItemGrid, CustomInput, CustomSelect } from 'components';
import { connect } from 'react-redux';
import { Box, ButtonGroup, Input } from '@material-ui/core';
import { AddShoppingCart, RemoveCircleOutline, RemoveShoppingCart } from 'material-ui-icons';
import { AddIcCallOutlined } from '@material-ui/icons';

class AddSaleView extends Component {
    state = {
        customerId: 0,
        userId: 0,
        retailQnt: 0.00,
        wholeQnt: 0.00,
        productId: 0,
        custProductRetailSaleMap: {},
        custProductWholeSaleMap: {}
    }

    findById = (items, productId) => {
        return items.find(item=>item['id']==productId);
    };
    
    _setCustomerId = event => {
        this.setState({ customerId: event.target.value });
    };

    _setUserId = event => {
        this.setState({ userId: event.target.value });
    };

    _setProductId = event => {
        this.setState({ productId: event.target.value });
    };

    _setRetailQnt = event => {
        this.setState({ retailQnt: event.target.value });
    };

    _setWholeQnt = event => {
        this.setState({ wholeQnt: event.target.value });
    };

    calculate = type => {
        if (!this.state.productId && this.state.productId !== 0) {
            return () => 0.00;
        }

        let item = this.findById(this.props.custProducts,this.state.productId);
        console.log("item=",item)

        if(!item){
            return () => 0.00; 
        }

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
        if (this.state.productId || (this.state.productId || this.state.productId === 0)) {
            return false;
        }
    
        let item = this.findById(this.props.custProducts,this.state.productId);
        if(!item){
            return false;
        }

        if (Number(item[type]) !== 0) {
            return false;
        }
        

        return true;
    };

    _addSale = () => {
        const {retailQnt, wholeQnt, productId, custProductRetailSaleMap, custProductWholeSaleMap}  = this.state;
        let item = this.findById(this.props.custProducts,this.state.productId);
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
            custProductRetailSaleMap[productId]=custProductRetailSale;
        }
        console.log("this.state.custProductRetailSaleMap=",this.state.custProductRetailSaleMap)
        this.setState({ custProductRetailSaleMap: custProductRetailSaleMap });
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
            custProductWholeSaleMap[productId]=custProductWholeSale;
        }
        this.setState({ custProductWholeSaleMap: custProductWholeSaleMap });

        console.log("this.state.custProductWholeSaleMap=",this.state.custProductWholeSaleMap)
    }

    _setStateValue=(custProductWholeSaleMap, superkey, childKey, value)=>{
        custProductWholeSaleMap[superkey][childKey]=value;
        this.setState({ custProductWholeSaleMap: custProductWholeSaleMap });
    }

    // Function for adding sales to database.
    _saveSale = () => {
        const { productId, retailQnt, wholeQnt } = this.state;
        const { refreshSales, successNotification, errorNotification } = this.props;

        if (!productId && productId === 0) {
            return;
        }

        if (!Number(retailQnt) && !Number(wholeQnt)) {
            errorNotification && errorNotification();
            return;
        }

        let custProductSale = {
           
            customerId: this.state.customerId,
            wholeSaleTotals: 0.0,
            wholeSaleQnt: 0,
            retailSaleTotals: 0.0,
            retailSaleQnt:0,
            discounts: 0.0,
        
            custProductRetailSaleList: [],
            custProductWholeSaleList: []
        }
        Object.entries(this.state.custProductRetailSaleMap).forEach(([productId,custProductRetailSale])=>{
            custProductSale.custProductRetailSaleList.push(custProductRetailSale);
        })
        Object.entries(this.state.custProductWholeSaleMap).forEach(([productId,custProductWholeSale])=>{
            custProductSale.custProductWholeSaleList.push(custProductWholeSale);
        })
        
        this.props.addSale(custProductSale, refreshSales, this.clear, successNotification, errorNotification);
    };

    _cartList = () =>{
       return Object.entries(this.state.custProductRetailSaleMap).map(([productId,custProductRetailSale])=>{
                return ( <ListItem divider>
                    <ListItemText primary={custProductRetailSale.name} />
                    <ButtonGroup>
                        <Button
                            aria-label="reduce"
                            onClick={() => {
                                this._setStateValue(this.state.custProductRetailSaleMap,custProductRetailSale.custProductId,'retailQnt',Math.max(Number(custProductRetailSale.retailQnt) - 1, 0));
                            }}
                        >
                            <RemoveShoppingCart fontSize="small" />
                        </Button>
                        <Input value={custProductRetailSale.retailQnt} style={{width:10, alignSelf: 'center'}}> </Input>
                        <Button
                            aria-label="increase"
                            onClick={() => {
                                this._setStateValue(this.state.custProductRetailSaleMap,custProductRetailSale.custProductId,'retailQnt',Math.max(Number(custProductRetailSale.retailQnt) + 1, 0))
                            }}
                        >
                            <AddShoppingCart fontSize="small" />
                        </Button>
                    </ButtonGroup>
                </ListItem>
                )
         })
    }

    clear = () => {
        this.setState({
            retailQnt: 0.00,
            wholeQnt: 0.00,
            customerId: 0,
            productId: 0,
            userId: 0
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
        const { classes, open, close , vendorCustomerList, custProducts} = this.props;

        return (
                <RegularCard
                    cardTitle="ADD SALE"
                    cardSubtitle="Fill the form below to add sale to the system"
                    content={
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <Grid container>
                                    <ItemGrid xs={4} sm={4} md={4}>
                                        <CustomSelect
                                            labelText="Customer"
                                            id="cust-sale-customer-id"
                                            formControlProps={{ fullWidth:true}}
                                            type="text"
                                            onChange={ this._setCustomerId }
                                            defaultValue={ this.state.customerId }
                                            items= {vendorCustomerList}
                                            value={ this.state.customerId }
                                            idKey = "id"
                                            valueKey = "name"
                                        ></CustomSelect>
                                    </ItemGrid>
                                    <ItemGrid xs={4} sm={4} md={4}>
                                        <CustomSelect
                                            labelText="Item name"
                                            id="item-name"
                                            formControlProps={{ fullWidth: true }}
                                            onChange={this._setProductId }
                                            value={ this.state.productId }
                                            items={custProducts}
                                            idKey = "id"
                                            valueKey = "name"
                                        />
                                    </ItemGrid>
                                </Grid>
                                <Grid container>
                                    <ItemGrid xs={4} sm={4} md={4}>
                                        <CustomInput
                                            disabled={this.disableInput("retailPrice")}
                                            labelText="Retail quantity"
                                            id="retail-quantity"
                                            formControlProps={{ fullWidth: true }}
                                            type="number"
                                            onChange={this._setRetailQnt}
                                            defaultValue={ this.state.retailQnt }
                                        />
                                    </ItemGrid>
                                    <ItemGrid xs={4} sm={4} md={4}>
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
                                            onChange={this._setWholeQnt}
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
                            </Grid>
                            <Grid item xs={4} justifyContent="center">
                                <Grid container>
                                    <ItemGrid xs={12} sm={12} md={12}>
                                        <Button variant="raised" 
                                            style={{ 
                                                backgroundColor: 'purple', 
                                                color: 'white', 
                                                width: '100%'
                                            } }
                                            formControlProps={{ fullWidth: true }}
                                        >
                                        {'Item List'}
                                        </Button>
                                    </ItemGrid>
                                    <ItemGrid xs={12} sm={12} md={12} style={{ maxHeight: 300, minHeight: 300, screenY: true}}>
                                    <center>
                                        <Box sx={{
                                            width: "100%", maxWidth: 360,
                                            bgcolor: "background.paper"
                                        }}>
                                        <nav>
                                            <List>
                                               {
                                                this._cartList()
                                               }
                                            </List>
                                        </nav>
                                        </Box>
                                        </center>
                                        
                                    </ItemGrid>
                                    <ItemGrid xs={12} sm={12} md={12}>

                                        <Button variant="raised" 
                                            style={{ 
                                                backgroundColor: 'green', 
                                                color: 'white', 
                                                width: '100%'
                                            } }
                                            formControlProps={{ fullWidth: true }}
                                            disabled={Object.entries(this.state.custProductRetailSaleMap).length==0 && Object.entries(this.state.custProductWholeSaleMap).length==0}
                                            onClick = {this._saveSale}
                                        >
                                        {'Submit'}
                                        </Button>
                                    </ItemGrid>
                                </Grid>
                            </Grid>
                        </Grid>
                    }
                    
                    footer={
                        <Button 
                            variant="raised" 
                            style={{ backgroundColor: 'purple', color: 'white' , }} 
                            onClick={this._addSale}
                        >Add</Button>
                    }
                />
                       
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

const mapStateToProps = state => {
    const { vendorCustomerList } = state.vendorCustomerReducer;
    const { custProducts } = state.custProducts;
    return { vendorCustomerList, custProducts };
};

const AddModalWrapped = withStyles(styles)(AddSaleView);

export default connect(mapStateToProps)(AddModalWrapped);






