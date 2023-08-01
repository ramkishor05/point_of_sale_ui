import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, IconButton, DeleteIcon } from 'material-ui';
import { AddAlert } from 'material-ui-icons';

import SaveCustProductModal from './Modals/addCustProductModal';
import EditCustProductModal from './Modals/EditCustProductModal';
import UpdateCustProductModal from './Modals/UpdateCustProductModal';

import { RegularCard, CustProductTable, ItemGrid, Snackbar } from 'components';

import Loader from 'Loader';

import { getAllCustProducts, addCustProduct } from 'actions';

class CustProducts extends Component {
    state = {
        notificationGroup: 'add',
        showAddCustProductModal: false,
        showEditCustProductModal: false,
        showUpdateCustProductModal: false,
        tr: false,
        tc: false,
    };

    componentDidMount() {
        this.props.getAllCustProducts();
    }

    // Check if the user is super admin.
    isSuperAdmin = () => {
        return true; //this.props.user.role.name === 'super_admin';
    };

    tableHead = () => {
        return this.isSuperAdmin()
            ? ['Logo','Iden No.','Name','Retail Price', 'Purchase Price', 'Stock Qnt', 
            'Create Dt','Updated Dt', 'Actions']
            : ['Logo','Iden No.','Name','Retail Price', 'Purchase Price', 'Stock Qnt', 
            'Created Dt','Updated Dt', 'Actions']
    };

    showNotification(place) {
        var x = [];
        x[place] = true;
        this.setState(x);

        setTimeout(function() {
            x[place] = false;
            this.setState(x);
        }.bind(this), 3000);
    }

    notificationMessage = type => {
        if (type === 'success') {
            if (this.state.notificationGroup === 'add') {
                return 'Product added successfully';
            } else if (this.state.notificationGroup === 'edit') {
                return 'Product edited successfully';
            } else {
                return 'Product updated successfully';
            }
        } else if (type === 'error') {
            if (this.state.notificationGroup === 'edit') {
                return 'Error product could not be edited';
            } else if (this.state.notificationGroup === 'add') {
                return 'Error product could not be added';
            } else {
                return 'Error product could not be updated';
            }
        }
    };

    render() {
        return (
            <div>
                <Grid container>
                    <ItemGrid xs={12} sm={12} md={12}>
                        <RegularCard
                            padIt
                            cardTitle="Products"
                            cardSubtitle="This is a list of all product in the system"
                            button={
                                this.isSuperAdmin() && (
                                    <Button
                                        style={ styles.addCustProductButton }
                                        onClick={() => this.setState({ showAddCustProductModal: true, notificationGroup: 'add' })}>ADD</Button>
                                )
                            }
                            content={
                                <CustProductTable
                                    tableHeaderColor="primary"
                                    tableHead={this.tableHead()}
                                    tableData={this.props.custProducts}
                                    editCustProduct={() => this.setState({ showEditCustProductModal: true, notificationGroup: 'edit' })}
                                    updateCustProduct={() => this.setState({ showUpdateCustProductModal: true, notificationGroup: 'update' })}
                                />
                            }
                        />
                    </ItemGrid>
                </Grid>

                <Grid container justify='center'>
                    <ItemGrid xs={12} sm={12} md={10} lg={8}>
                        <Grid container>
                            <ItemGrid xs={12} sm={12} md={4}>
                                <Snackbar
                                    place="tr"
                                    color="success"
                                    icon={AddAlert}
                                    message={this.notificationMessage('success')}
                                    open={this.state.tr}
                                    closeNotification={() => this.setState({'tr': false})}
                                    close
                                />
                            </ItemGrid>
                        </Grid>
                    </ItemGrid>
                </Grid>

                <Grid container justify='center'>
                    <ItemGrid xs={12} sm={12} md={10} lg={8}>
                        <Grid container>
                            <ItemGrid xs={12} sm={12} md={4}>
                                <Snackbar
                                    place="tc"
                                    color="danger"
                                    icon={AddAlert}
                                    message={this.notificationMessage('error')}
                                    open={this.state.tc}
                                    closeNotification={() => this.setState({'tc': false})}
                                    close
                                />
                            </ItemGrid>
                        </Grid>
                    </ItemGrid>
                </Grid>

                <SaveCustProductModal
                    open={this.state.showAddCustProductModal}
                    close={() => this.setState({ showAddCustProductModal: false })}
                    addCustProduct={this.props.addCustProduct}
                    refresh={this.props.getAllCustProducts}
                    successNotification={() => this.showNotification('tr')}
                    errorNotification={() => this.showNotification('tc')}
                />

                <EditCustProductModal
                    open={this.state.showEditCustProductModal}
                    close={() => this.setState({ showEditCustProductModal: false })}
                    refresh={this.props.getAllCustProducts}
                    successNotification={() => this.showNotification('tr')}
                    errorNotification={() => this.showNotification('tc')}
                />

                <UpdateCustProductModal
                    open={this.state.showUpdateCustProductModal}
                    close={() => this.setState({ showUpdateCustProductModal: false })}
                    refresh={this.props.getAllCustProducts}
                    successNotification={() => this.showNotification('tr')}
                    errorNotification={() => this.showNotification('tc')}
                />

                <Loader open={this.props.show_cust_product_loader} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { user } = state.users;
    const { custProducts, show_cust_product_loader } = state.custProducts;

    return { user, custProducts, show_cust_product_loader };
};

const styles = {
    addCustProductButton: {
        color: 'white',
        backgroundColor: 'purple'
    },
};

export default connect(mapStateToProps, { getAllCustProducts, addCustProduct })(CustProducts);
