import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, IconButton, DeleteIcon } from 'material-ui';
import { AddAlert } from 'material-ui-icons';

import AddCustCategory from './Modals/AddCustCategory';
import EditCustCategory from './Modals/EditCustCategory';
import UpdateCustCategory from './Modals/UpdateCustCategory';
import { RegularCard, CustCategoryTable, ItemGrid, Snackbar } from 'components';

import Loader from '../../../Loader';

import { getCustCategoryList, addCustCategory } from '../../../actions';

class CustCategory extends Component {
    state = {
        notificationGroup: 'add',
        showAddCustCategoryModal: false,
        showEditCustCategoryModal: false,
        showUpdateCustCategoryModal: false,
        tr: false,
        tc: false,
    };

    componentDidMount() {
        this.props.getCustCategoryList();
    }

    // Check if the user is super admin.
    isSuperAdmin = () => {
        return true; //this.props.user.role.name === 'super_admin';
    };

    tableHead = () => {
        return this.isSuperAdmin()
            ? ['Logo','Iden No.','Name', 'Description', 'Type', 'Actions']
            : ['Logo','Iden No.','Name', 'Description', 'Type',  'Actions']
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
                return 'CustCategory added successfully';
            } else if (this.state.notificationGroup === 'edit') {
                return 'CustCategory edited successfully';
            } else {
                return 'CustCategory updated successfully';
            }
        } else if (type === 'error') {
            if (this.state.notificationGroup === 'edit') {
                return 'Error CustCategory could not be edited';
            } else if (this.state.notificationGroup === 'add') {
                return 'Error CustCategory could not be added';
            } else {
                return 'Error CustCategory could not be updated';
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
                            cardTitle="CustCategorys"
                            cardSubtitle="This is a list of all categories in the system"
                            button={
                                this.isSuperAdmin() && (
                                    <Button
                                        style={ styles.addCustCategoryButton }
                                        onClick={() => this.setState({ showAddCustCategoryModal: true, notificationGroup: 'add' })}>ADD</Button>
                                )
                            }
                            content={
                                <CustCategoryTable
                                    tableHeaderColor="primary"
                                    tableHead={this.tableHead()}
                                    tableData={this.props.custCategoryList}
                                    editCustCategory={() => this.setState({ showEditCustCategoryModal: true, notificationGroup: 'edit' })}
                                    updateCustCategory={() => this.setState({ showUpdateCustCategoryModal: true, notificationGroup: 'update' })}
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

                <AddCustCategory
                    open={this.state.showAddCustCategoryModal}
                    close={() => this.setState({ showAddCustCategoryModal: false })}
                    addCustCategory={this.props.addCustCategory}
                    refresh={this.props.getCustCategoryList}
                    successNotification={() => this.showNotification('tr')}
                    errorNotification={() => this.showNotification('tc')}
                />

                <EditCustCategory
                    open={this.state.showEditCustCategoryModal}
                    close={() => this.setState({ showEditCustCategoryModal: false })}
                    refresh={this.props.getCustCategoryList}
                    successNotification={() => this.showNotification('tr')}
                    errorNotification={() => this.showNotification('tc')}
                />

                <UpdateCustCategory
                    open={this.state.showUpdateCustCategoryModal}
                    close={() => this.setState({ showUpdateCustCategoryModal: false })}
                    refresh={this.props.getCustCategoryList}
                    successNotification={() => this.showNotification('tr')}
                    errorNotification={() => this.showNotification('tc')}
                />

                <Loader open={this.props.show_cust_category_loader} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { user } = state.userReducer;
    const { custCategoryList, show_cust_category_loader } = state.custCategoryReducer;

    return { user, custCategoryList, show_cust_category_loader };
};

const styles = {
    addCustCategoryButton: {
        color: 'white',
        backgroundColor: 'purple'
    },
};

export default connect(mapStateToProps, { getCustCategoryList, addCustCategory })(CustCategory);
