import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, IconButton, DeleteIcon } from 'material-ui';
import { AddAlert } from 'material-ui-icons';

import AddGlobalCategoryGroup from '../Category/Modals/AddGlobalCategoryGroup';
import EditGlobalCategoryGroup from '../Category/Modals/EditGlobalCategoryGroup';
import UpdateGlobalCategoryGroup from '../Category/Modals/UpdateGlobalCategoryGroup';
import { RegularCard, GlobalCategoryGroupTable, ItemGrid, Snackbar } from 'components';

import Loader from '../../../Loader';

import { getGlobalCategoryGroupList, addGlobalCategoryGroup } from '../../../actions';
import { DynamciTable } from '../../../components/DynamicTable/DynamicTable';

class GlobalCategoryGroup extends Component {
    
    state = {
        notificationGroup: 'add',
        showAddGlobalCategoryGroupModal: false,
        showEditGlobalCategoryGroupModal: false,
        showUpdateGlobalCategoryGroupModal: false,
        tr: false,
        tc: false,
    };

    componentDidMount() {
        this.props.getGlobalCategoryGroupList();
    }

    // Check if the user is super admin.
    isSuperAdmin = () => {
        console.log("env=", process.env.PRODUCTION_APP_URL)
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
                return 'GlobalCategoryGroup added successfully';
            } else if (this.state.notificationGroup === 'edit') {
                return 'GlobalCategoryGroup edited successfully';
            } else {
                return 'GlobalCategoryGroup updated successfully';
            }
        } else if (type === 'error') {
            if (this.state.notificationGroup === 'edit') {
                return 'Error GlobalCategoryGroup could not be edited';
            } else if (this.state.notificationGroup === 'add') {
                return 'Error GlobalCategoryGroup could not be added';
            } else {
                return 'Error GlobalCategoryGroup could not be updated';
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
                            cardTitle="GlobalCategoryGroups"
                            cardSubtitle="This is a list of all categories in the system"
                            button={
                                this.isSuperAdmin() && (
                                    <Button
                                        style={ styles.addGlobalCategoryGroupButton }
                                        onClick={() => this.setState({ showAddGlobalCategoryGroupModal: true, notificationGroup: 'add' })}>ADD</Button>
                                )
                            }
                            content={
                                <div>
                                <GlobalCategoryGroupTable
                                    tableHeaderColor="primary"
                                    tableHead={this.tableHead()}
                                    tableData={this.props.globalCategoryGroupList}
                                    editGlobalCategoryGroup={() => this.setState({ showEditGlobalCategoryGroupModal: true, notificationGroup: 'edit' })}
                                    updateGlobalCategoryGroup={() => this.setState({ showUpdateGlobalCategoryGroupModal: true, notificationGroup: 'update' })}
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

                <AddGlobalCategoryGroup
                    open={this.state.showAddGlobalCategoryGroupModal}
                    close={() => this.setState({ showAddGlobalCategoryGroupModal: false })}
                    addGlobalCategoryGroup={this.props.addGlobalCategoryGroup}
                    refresh={this.props.getGlobalCategoryGroupList}
                    successNotification={() => this.showNotification('tr')}
                    errorNotification={() => this.showNotification('tc')}
                />

                <EditGlobalCategoryGroup
                    open={this.state.showEditGlobalCategoryGroupModal}
                    close={() => this.setState({ showEditGlobalCategoryGroupModal: false })}
                    refresh={this.props.getGlobalCategoryGroupList}
                    successNotification={() => this.showNotification('tr')}
                    errorNotification={() => this.showNotification('tc')}
                />

                <UpdateGlobalCategoryGroup
                    open={this.state.showUpdateGlobalCategoryGroupModal}
                    close={() => this.setState({ showUpdateGlobalCategoryGroupModal: false })}
                    refresh={this.props.getGlobalCategoryGroupList}
                    successNotification={() => this.showNotification('tr')}
                    errorNotification={() => this.showNotification('tc')}
                />

                <Loader open={this.props.show_global_category_loader} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { user } = state.users;
    const { globalCategoryGroupList, show_global_category_group_loader } = state.globalCategoryGroupReducer;

    return { user, globalCategoryGroupList, show_global_category_group_loader };
};

const styles = {
    addGlobalCategoryGroupButton: {
        color: 'white',
        backgroundColor: 'purple'
    },
};

export default connect(mapStateToProps, { getGlobalCategoryGroupList, addGlobalCategoryGroup })(GlobalCategoryGroup);
