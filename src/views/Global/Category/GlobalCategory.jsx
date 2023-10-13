import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, IconButton, DeleteIcon } from 'material-ui';
import { AddAlert } from 'material-ui-icons';

import AddGlobalCategory from '../Category/Modals/AddGlobalCategory';
import EditGlobalCategory from '../Category/Modals/EditGlobalCategory';
import UpdateGlobalCategory from '../Category/Modals/UpdateGlobalCategory';
import { RegularCard, GlobalCategoryTable, ItemGrid, Snackbar } from 'components';

import Loader from '../../../Loader';

import { getGlobalCategoryList, addGlobalCategory } from '../../../actions';

class GlobalCategory extends Component {
    state = {
        notificationGroup: 'add',
        showAddGlobalCategoryModal: false,
        showEditGlobalCategoryModal: false,
        showUpdateGlobalCategoryModal: false,
        tr: false,
        tc: false,
    };

    componentDidMount() {
        this.props.getGlobalCategoryList();
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
                return 'GlobalCategory added successfully';
            } else if (this.state.notificationGroup === 'edit') {
                return 'GlobalCategory edited successfully';
            } else {
                return 'GlobalCategory updated successfully';
            }
        } else if (type === 'error') {
            if (this.state.notificationGroup === 'edit') {
                return 'Error GlobalCategory could not be edited';
            } else if (this.state.notificationGroup === 'add') {
                return 'Error GlobalCategory could not be added';
            } else {
                return 'Error GlobalCategory could not be updated';
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
                            cardTitle="GlobalCategorys"
                            cardSubtitle="This is a list of all categories in the system"
                            button={
                                this.isSuperAdmin() && (
                                    <Button
                                        style={ styles.addGlobalCategoryButton }
                                        onClick={() => this.setState({ showAddGlobalCategoryModal: true, notificationGroup: 'add' })}>ADD</Button>
                                )
                            }
                            content={
                                <GlobalCategoryTable
                                    tableHeaderColor="primary"
                                    tableHead={this.tableHead()}
                                    tableData={this.props.globalCategoryList}
                                    editGlobalCategory={() => this.setState({ showEditGlobalCategoryModal: true, notificationGroup: 'edit' })}
                                    updateGlobalCategory={() => this.setState({ showUpdateGlobalCategoryModal: true, notificationGroup: 'update' })}
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

                <AddGlobalCategory
                    open={this.state.showAddGlobalCategoryModal}
                    close={() => this.setState({ showAddGlobalCategoryModal: false })}
                    addGlobalCategory={this.props.addGlobalCategory}
                    glbCategoryGroups= {this.props.globalCategoryGroupList}
                    refresh={this.props.getGlobalCategoryList}
                    successNotification={() => this.showNotification('tr')}
                    errorNotification={() => this.showNotification('tc')}
                />

                <EditGlobalCategory
                    open={this.state.showEditGlobalCategoryModal}
                    close={() => this.setState({ showEditGlobalCategoryModal: false })}
                    refresh={this.props.getGlobalCategoryList}
                    successNotification={() => this.showNotification('tr')}
                    errorNotification={() => this.showNotification('tc')}
                />

                <UpdateGlobalCategory
                    open={this.state.showUpdateGlobalCategoryModal}
                    close={() => this.setState({ showUpdateGlobalCategoryModal: false })}
                    refresh={this.props.getGlobalCategoryList}
                    successNotification={() => this.showNotification('tr')}
                    errorNotification={() => this.showNotification('tc')}
                />

                <Loader open={this.props.show_global_category_loader} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { user } = state.userReducer;
    const { globalCategoryList, show_global_category_loader } = state.globalCategoryReducer;
    const { globalCategoryGroupList} = state.globalCategoryGroupReducer;

    
    return { user, globalCategoryList, show_global_category_loader, globalCategoryGroupList };
};

const styles = {
    addGlobalCategoryButton: {
        color: 'white',
        backgroundColor: 'purple'
    },
};

export default connect(mapStateToProps, { getGlobalCategoryList, addGlobalCategory })(GlobalCategory);
