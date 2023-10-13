import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, IconButton, DeleteIcon } from 'material-ui';
import { AddAlert } from 'material-ui-icons';

import AddCustCategoryGroup from './Modals/AddCustCategoryGroup';
import EditCustCategoryGroup from './Modals/EditCustCategoryGroup';
import UpdateCustCategoryGroup from './Modals/UpdateCustCategoryGroup';
import { RegularCard, CustCategoryGroupTable, ItemGrid, Snackbar } from 'components';

import Loader from '../../../Loader';

import { getCustCategoryGroupList, addCustCategoryGroup } from '../../../actions';

class CustCategoryGroup extends Component {
    
    state = {
        notificationGroup: 'add',
        showAddCustCategoryGroupModal: false,
        showEditCustCategoryGroupModal: false,
        showUpdateCustCategoryGroupModal: false,
        tr: false,
        tc: false,
    };

    componentDidMount() {
        this.props.getCustCategoryGroupList();
    }

    // Check if the user is super admin.
    isSuperAdmin = () => {
        return true; //this.props.user.role.name === 'super_admin';
    };

    tableHead = () => {
        return this.isSuperAdmin()
            ? ['Iden No.','Logo','Name', 'Description', 'Type', 'Actions']
            : ['Iden No.','Logo','Name', 'Description', 'Type',  'Actions']
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
                return 'CustCategoryGroup added successfully';
            } else if (this.state.notificationGroup === 'edit') {
                return 'CustCategoryGroup edited successfully';
            } else {
                return 'CustCategoryGroup updated successfully';
            }
        } else if (type === 'error') {
            if (this.state.notificationGroup === 'edit') {
                return 'Error CustCategoryGroup could not be edited';
            } else if (this.state.notificationGroup === 'add') {
                return 'Error CustCategoryGroup could not be added';
            } else {
                return 'Error CustCategoryGroup could not be updated';
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
                            cardTitle="CustCategoryGroups"
                            cardSubtitle="This is a list of all categories in the system"
                            button={
                                this.isSuperAdmin() && (
                                    <Button
                                        style={ styles.addCustCategoryGroupButton }
                                        onClick={() => this.setState({ showAddCustCategoryGroupModal: true, notificationGroup: 'add' })}>ADD</Button>
                                )
                            }
                            content={
                                <div>
                                <CustCategoryGroupTable
                                    tableHeaderColor="primary"
                                    tableHead={this.tableHead()}
                                    tableData={this.props.custCategoryGroupList}
                                    editCustCategoryGroup={() => this.setState({ showEditCustCategoryGroupModal: true, notificationGroup: 'edit' })}
                                    updateCustCategoryGroup={() => this.setState({ showUpdateCustCategoryGroupModal: true, notificationGroup: 'update' })}
                                />
                                
                                </div>
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

                <AddCustCategoryGroup
                    open={this.state.showAddCustCategoryGroupModal}
                    close={() => this.setState({ showAddCustCategoryGroupModal: false })}
                    addCustCategoryGroup={this.props.addCustCategoryGroup}
                    refresh={this.props.getCustCategoryGroupList}
                    successNotification={() => this.showNotification('tr')}
                    errorNotification={() => this.showNotification('tc')}
                />

                <EditCustCategoryGroup
                    open={this.state.showEditCustCategoryGroupModal}
                    close={() => this.setState({ showEditCustCategoryGroupModal: false })}
                    refresh={this.props.getCustCategoryGroupList}
                    successNotification={() => this.showNotification('tr')}
                    errorNotification={() => this.showNotification('tc')}
                />

                <UpdateCustCategoryGroup
                    open={this.state.showUpdateCustCategoryGroupModal}
                    close={() => this.setState({ showUpdateCustCategoryGroupModal: false })}
                    refresh={this.props.getCustCategoryGroupList}
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
    const { custCategoryGroupList, show_cust_category_group_loader } = state.custCategoryGroupReducer;

    return { user, custCategoryGroupList, show_cust_category_group_loader };
};

const styles = {
    addCustCategoryGroupButton: {
        color: 'white',
        backgroundColor: 'purple'
    },
};

export default connect(mapStateToProps, { getCustCategoryGroupList, addCustCategoryGroup })(CustCategoryGroup);
