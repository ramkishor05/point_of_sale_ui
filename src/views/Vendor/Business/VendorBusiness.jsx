import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, IconButton, DeleteIcon } from 'material-ui';
import { AddAlert } from 'material-ui-icons';

import SaveBusinessModal from './Modals/addBusinessModal';
import EditBusinessModal from './Modals/EditBusinessModal';
import UpdateBusinessModal from './Modals/UpdateBusinessModal';

import { RegularCard, VendorBusinessTable, ItemGrid, Snackbar } from 'components';

import Loader from 'Loader';

import { getAllVendorBusinessList, addVendorBusiness, getAllVendorList } from 'actions';

class Business extends Component {
    state = {
        notificationGroup: 'add',
        showAddBusinessModal: false,
        showEditBusinessModal: false,
        showUpdateBusinessModal: false,
        tr: false,
        tc: false,
    };

    componentDidMount() {
        this.props.getAllVendorBusinessList();
        this.props.getAllVendorList();
    }

    // Check if the user is super admin.
    isSuperAdmin = () => {
        return true; //this.props.user.role.name === 'super_admin';
    };

    tableHead = () => {
        return this.isSuperAdmin()
            ? ['Logo','Name','Phone number', 'Mobile number', 'Email address', 
            'Create Dt','Updated Dt', 'Actions']
            : ['Logo','Name','Phone number', 'Mobile number', 'Email address', 
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
                return 'business added successfully';
            } else if (this.state.notificationGroup === 'edit') {
                return 'business edited successfully';
            } else {
                return 'business updated successfully';
            }
        } else if (type === 'error') {
            if (this.state.notificationGroup === 'edit') {
                return 'Error business could not be edited';
            } else if (this.state.notificationGroup === 'add') {
                return 'Error business could not be added';
            } else {
                return 'Error business could not be updated';
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
                            cardTitle="Business List"
                            cardSubtitle="This is a list of all business in the system"
                            button={
                                this.isSuperAdmin() && (
                                    <Button
                                        style={ styles.addBusinessButton }
                                        onClick={() => this.setState({ showAddBusinessModal: true, notificationGroup: 'add' })}>ADD</Button>
                                )
                            }
                            content={
                                <VendorBusinessTable
                                    tableHeaderColor="primary"
                                    tableHead={this.tableHead()}
                                    tableData={this.props.vendorBusinessList}
                                    editVendorBusiness={() => this.setState({ showEditBusinessModal: true, notificationGroup: 'edit' })}
                                    updateVendorBusiness={() => this.setState({ showUpdateBusinessModal: true, notificationGroup: 'update' })}
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

                <SaveBusinessModal
                    open={this.state.showAddBusinessModal}
                    close={() => this.setState({ showAddBusinessModal: false })}
                    addVendorBusiness={this.props.addVendorBusiness}
                    vendorList = {this.getAllVendorList}
                    refresh={this.props.getAllVendorBusinessList}
                    successNotification={() => this.showNotification('tr')}
                    errorNotification={() => this.showNotification('tc')}
                />

                <EditBusinessModal
                    open={this.state.showEditBusinessModal}
                    close={() => this.setState({ showEditBusinessModal: false })}
                    refresh={this.props.getAllVendorBusinessList}
                    vendorList = {this.getAllVendorList}
                    successNotification={() => this.showNotification('tr')}
                    errorNotification={() => this.showNotification('tc')}
                />

                <UpdateBusinessModal
                    open={this.state.showUpdateBusinessModal}
                    close={() => this.setState({ showUpdateBusinessModal: false })}
                    refresh={this.props.getAllVendorBusinessList}
                    successNotification={() => this.showNotification('tr')}
                    errorNotification={() => this.showNotification('tc')}
                />

                <Loader open={this.props.show_business_loader} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { user } = state.users;
    const { vendorBusinessList, show_business_loader } = state.vendorBusinessReducer;
    return { user, vendorBusinessList, show_business_loader };
};

const styles = {
    addBusinessButton: {
        color: 'white',
        backgroundColor: 'purple'
    },
};

export default connect(mapStateToProps, { getAllVendorList, getAllVendorBusinessList, addVendorBusiness })(Business);
