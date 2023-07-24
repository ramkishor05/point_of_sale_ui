import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from 'material-ui';
import { AddAlert } from 'material-ui-icons';

import { getAllGlobalUnitGroups, addGlobalUnitGroup, editGlobalUnitGroup } from '../../../actions';

import { CustomDatepicker, RegularCard, UnitTable, ItemGrid, CustomInput, Snackbar } from 'components';

import AddGlobalUnitGroupModal from './Modals/AddGlobalUnitGroup';
import EditGlobalUnitGroupModal from './Modals/EditGlobalUnitGroup';


class GlobalUnitGroup extends Component {
    state = {
        notificationGroup: 'add',
        from: '2018-05-21',
        to: '2018-05-21',
        showAddUnitModal: false,
        showEditUnitModal: false,
        tr: false,
        tc: false,
    };

    componentDidMount() {
        this.setState({ from: this.dateNow(), to: this.dateNow() }, this._getGlobalUnitGroups);
    }

    from = event => {
        this.setState({ from: event.target.value }, this._getGlobalUnitGroups);
    };

    to = event => {
        this.setState({ to: event.target.value }, this._getGlobalUnitGroups);
    };

    total = () => {
        let total = 0;

        for (let unit of this.props.globalUnitGroups) {
            total += 1;
        }

        return total.toFixed(2);
    };

    _getGlobalUnitGroups = () => {
        this.props.getAllGlobalUnitGroups();
    };

    dateNow = () => {
        let date = new Date(),
            year = String(date.getFullYear()),
            month = String(date.getMonth() + 1), // Month starts from 0 so add 1 to make up for the 0.
            day = String(date.getDate());

        if (month.length === 1) {
            month = `0${month}`;
        }

        if (day.length === 1) {
            day = `0${day}`;
        }

        return `${year}-${month}-${day}`;
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
                return 'Unit added successfully';
            } else {
                return 'Unit edited successfully';
            }
        } else if (type === 'error') {
            if (this.state.notificationGroup === 'edit') {
                return 'Error Unit could not be edited';
            } else {
                return 'Error Unit could not be added';
            }
        }
    };

    // Check if the user is super admin.
    isSuperAdmin = () => {
        return true;//this.props.user.role.name === 'super_admin';
    };

    tableHead = () => {
        return this.isSuperAdmin()
            ? ['No.', 'Name', 'Amount', 'Date Added', 'Date Updated', '']
            : ['No.', 'Name', 'Amount', 'Date Added', 'Date Updated'] 
    };
    
    render() {
        return (
            <div>
                <Grid container>
                    <ItemGrid xs={12} sm={12} md={12}>
                        <RegularCard
                            padIt
                            cardTitle="Unit"
                            cardSubtitle="List of Unit entries in the system"
                            button={
                                <Button 
                                    style={ styles.addTransactionButton } 
                                    onClick={() => this.setState({ showAddUnitModal: true, notificationGroup: 'add' })}>ADD Unit</Button>
                            }
                            total={
                                <div>
                                    <CustomInput
                                        disabled
                                        labelText="Total Amount"
                                        id="total-amount"
                                        formControlProps={{ fullWidth: true }}
                                        type="number"
                                        value={ this.total() }
                                    />
                                </div>
                            }
                            date_picker={
                                <div style={ styles.datepickers }>
                                    <div style={{ paddingRight: 10 }}>
                                        <CustomDatepicker
                                            label="From"
                                            value={this.state.from}
                                            onChange={this.from}
                                        />
                                    </div>
                                    <div>
                                        <CustomDatepicker
                                            label="To"
                                            value={this.state.to}
                                            onChange={this.to}
                                        />
                                    </div>
                                </div>
                            }
                            content={
                                <UnitTable
                                    tableHeaderColor="primary"
                                    tableHead={this.tableHead()}
                                    tableData={this.props.units}
                                    editUnit={() => this.setState({ showEditUnitModal: true, notificationGroup: 'edit' })}
                                    deleteUnit={() => this.setState({ notificationGroup: 'delete' })}
                                    getUnits={this._getUnits}
                                />
                            }
                        />
                    </ItemGrid>
                </Grid>

                <AddGlobalUnitGroupModal
                    open={this.state.showAddUnitModal}
                    close={() => this.setState({ showAddUnitModal: false })}
                    addUnit={this.props.addGlobalUnitGroup}
                    refresh={this._getGlobalUnitGroups}
                    successNotification={() => this.showNotification('tr')}
                    errorNotification={() => this.showNotification('tc')}
                />

                <EditGlobalUnitGroupModal
                    open={this.state.showEditUnitModal}
                    close={() => this.setState({ showEditUnitModal: false })}
                    editUnit={this.props.editGlobalUnitGroup}
                    refresh={this._getGlobalUnitGroups}
                    successNotification={() => this.showNotification('tr')}
                    errorNotification={() => this.showNotification('tc')}
                />

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
            </div>
        );
    }
}

const styles = {
    addTransactionButton: {
        color: '#FFF',
        backgroundColor: 'purple',
        marginLeft: 20,
    },
    datepickers: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
};

const mapStateToProps = state => {
    const { user } = state.users;
    const { globalUnitGroups } = state.globalUnitGroups;

    return { user, globalUnitGroups };
};

export default connect(mapStateToProps, { getAllGlobalUnitGroups, addGlobalUnitGroup, editGlobalUnitGroup })(GlobalUnitGroup);
