import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, IconButton, DeleteIcon } from 'material-ui';
import { AddAlert } from 'material-ui-icons';

import AddGlobalCountFreq from '../CountFreq/Modals/AddGlobalCountFreq';
import EditGlobalCountFreq from '../CountFreq/Modals/EditGlobalCountFreq';
import UpdateGlobalCountFreq from '../CountFreq/Modals/UpdateGlobalCountFreq';
import { RegularCard, GlobalCountFreqTable, ItemGrid, Snackbar } from 'components';

import Loader from '../../../Loader';

import { getGlobalCountFreqList, addGlobalCountFreq } from '../../../actions';

class GlobalCountFreq extends Component {
    state = {
        notificationGroup: 'add',
        showAddGlobalCountFreqModal: false,
        showEditGlobalCountFreqModal: false,
        showUpdateGlobalCountFreqModal: false,
        tr: false,
        tc: false,
    };

    componentDidMount() {
        this.props.getGlobalCountFreqList();
    }

    // Check if the user is super admin.
    isSuperAdmin = () => {
        return true; //this.props.user.role.name === 'super_admin';
    };

    tableHead = () => {
        return this.isSuperAdmin()
            ? ['Logo','Iden No.','Name', 'Description', 'Type', 'Actions']
            : ['Logo','Iden No.' ,'Name', 'Description', 'Type',  'Actions']
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
                return 'GlobalCountFreq added successfully';
            } else if (this.state.notificationGroup === 'edit') {
                return 'GlobalCountFreq edited successfully';
            } else {
                return 'GlobalCountFreq updated successfully';
            }
        } else if (type === 'error') {
            if (this.state.notificationGroup === 'edit') {
                return 'Error GlobalCountFreq could not be edited';
            } else if (this.state.notificationGroup === 'add') {
                return 'Error GlobalCountFreq could not be added';
            } else {
                return 'Error GlobalCountFreq could not be updated';
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
                            cardTitle="GlobalCountFreqs"
                            cardSubtitle="This is a list of all GlobalCountFreqs in the system"
                            button={
                                this.isSuperAdmin() && (
                                    <Button
                                        style={ styles.addGlobalCountFreqButton }
                                        onClick={() => this.setState({ showAddGlobalCountFreqModal: true, notificationGroup: 'add' })}>ADD</Button>
                                )
                            }
                            content={
                                <GlobalCountFreqTable
                                    tableHeaderColor="primary"
                                    tableHead={this.tableHead()}
                                    tableData={this.props.globalCountFreqList}
                                    editGlobalCountFreq={() => this.setState({ showEditGlobalCountFreqModal: true, notificationGroup: 'edit' })}
                                    updateGlobalCountFreq={() => this.setState({ showUpdateGlobalCountFreqModal: true, notificationGroup: 'update' })}
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

                <AddGlobalCountFreq
                    open={this.state.showAddGlobalCountFreqModal}
                    close={() => this.setState({ showAddGlobalCountFreqModal: false })}
                    addGlobalCountFreq={this.props.addGlobalCountFreq}
                    refresh={this.props.getGlobalCountFreqList}
                    successNotification={() => this.showNotification('tr')}
                    errorNotification={() => this.showNotification('tc')}
                />

                <EditGlobalCountFreq
                    open={this.state.showEditGlobalCountFreqModal}
                    close={() => this.setState({ showEditGlobalCountFreqModal: false })}
                    refresh={this.props.getGlobalCountFreqList}
                    successNotification={() => this.showNotification('tr')}
                    errorNotification={() => this.showNotification('tc')}
                />

                <UpdateGlobalCountFreq
                    open={this.state.showUpdateGlobalCountFreqModal}
                    close={() => this.setState({ showUpdateGlobalCountFreqModal: false })}
                    refresh={this.props.getGlobalCountFreqList}
                    successNotification={() => this.showNotification('tr')}
                    errorNotification={() => this.showNotification('tc')}
                />

                <Loader open={this.props.show_global_CountFreq_loader} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { user } = state.userReducer;
    const { globalCountFreqList, show_global_CountFreq_loader } = state.globalCountFreqList;

    return { user, globalCountFreqList, show_global_CountFreq_loader };
};

const styles = {
    addGlobalCountFreqButton: {
        color: 'white',
        backgroundColor: 'purple'
    },
};

export default connect(mapStateToProps, { getGlobalCountFreqList, addGlobalCountFreq })(GlobalCountFreq);
