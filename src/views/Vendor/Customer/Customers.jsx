import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, IconButton, DeleteIcon } from 'material-ui';
import { AddAlert } from 'material-ui-icons';

import SaveCustomerModal from './Modals/addCustomerModal';
import EditCustomerModal from './Modals/EditCustomerModal';
import UpdateCustomerModal from './Modals/UpdateCustomerModal';

import { RegularCard, CustomerTable, ItemGrid, Snackbar } from 'components';

import Loader from 'Loader';

import { getAllCustomerList, addCustomer } from 'actions';

class Customers extends Component {
    state = {
        notificationGroup: 'add',
        showAddCustomerModal: false,
        showEditCustomerModal: false,
        showUpdateCustomerModal: false,
        tr: false,
        tc: false,
    };

    componentDidMount() {
        this.props.getAllCustomerList();
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
                            cardTitle="Customers"
                            cardSubtitle="This is a list of all Customer in the system"
                            button={
                                this.isSuperAdmin() && (
                                    <Button
                                        style={ styles.addCustomerButton }
                                        onClick={() => this.setState({ showAddCustomerModal: true, notificationGroup: 'add' })}>ADD</Button>
                                )
                            }
                            content={
                                <CustomerTable
                                    tableHeaderColor="primary"
                                    tableHead={this.tableHead()}
                                    tableData={this.props.customerList}
                                    editCustomer={() => this.setState({ showEditCustomerModal: true, notificationGroup: 'edit' })}
                                    updateCustomer={() => this.setState({ showUpdateCustomerModal: true, notificationGroup: 'update' })}
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

                <SaveCustomerModal
                    open={this.state.showAddCustomerModal}
                    close={() => this.setState({ showAddCustomerModal: false })}
                    addCustomer={this.props.addCustomer}
                    refresh={this.props.getAllCustomerList}
                    successNotification={() => this.showNotification('tr')}
                    errorNotification={() => this.showNotification('tc')}
                />

                <EditCustomerModal
                    open={this.state.showEditCustomerModal}
                    close={() => this.setState({ showEditCustomerModal: false })}
                    refresh={this.props.getAllCustomerList}
                    successNotification={() => this.showNotification('tr')}
                    errorNotification={() => this.showNotification('tc')}
                />

                <UpdateCustomerModal
                    open={this.state.showUpdateCustomerModal}
                    close={() => this.setState({ showUpdateCustomerModal: false })}
                    refresh={this.props.getAllCustomerList}
                    successNotification={() => this.showNotification('tr')}
                    errorNotification={() => this.showNotification('tc')}
                />

                <Loader open={this.props.show_customer_loader} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { user } = state.users;
    const { customerList, show_customer_loader } = state.customerList;

    return { user, customerList, show_customer_loader };
};

const styles = {
    addCustomerButton: {
        color: 'white',
        backgroundColor: 'purple'
    },
};

export default connect(mapStateToProps, { getAllCustomerList, addCustomer })(Customers);
