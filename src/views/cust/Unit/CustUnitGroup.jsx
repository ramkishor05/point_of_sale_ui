import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from 'material-ui';
import { AddAlert } from 'material-ui-icons';

import { getAllCustUnitGroups, addCustUnitGroup, editCustUnitGroup } from 'actions';

import { CustomDatepicker, RegularCard, CustUnitTable, ItemGrid, CustomInput, Snackbar } from 'components';

import AddCustUnitGroupModal from './Modals/AddCustUnitGroup';
import EditCustUnitGroupModal from './Modals/EditCustUnitGroup';


class CustUnitGroup extends Component {
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
        this.setState({ from: this.dateNow(), to: this.dateNow() }, this._getCustUnitGroups);
    }

    from = event => {
        this.setState({ from: event.target.value }, this._getCustUnitGroups);
    };

    to = event => {
        this.setState({ to: event.target.value }, this._getCustUnitGroups);
    };

    total = () => {
        let total = 0;

        for (let unit of this.props.custUnitGroups) {
            total += 1;
        }

        return total.toFixed(2);
    };

    _getCustUnitGroups = () => {
        this.props.getAllCustUnitGroups();
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
                                <CustUnitTable
                                    tableHeaderColor="primary"
                                    tableHead={this.tableHead()}
                                    tableData={this.props.custUnitGroups}
                                    editUnit={() => this.setState({ showEditUnitModal: true, notificationGroup: 'edit' })}
                                    deleteUnit={() => this.setState({ notificationGroup: 'delete' })}
                                    getUnits={this._getCustUnitGroups}
                                />
                            }
                        />
                    </ItemGrid>
                </Grid>

                <AddCustUnitGroupModal
                    open={this.state.showAddUnitModal}
                    close={() => this.setState({ showAddUnitModal: false })}
                    addCustUnitGroup={this.props.addCustUnitGroup}
                    refresh={this._getCustUnitGroups}
                    successNotification={() => this.showNotification('tr')}
                    errorNotification={() => this.showNotification('tc')}
                />

                <EditCustUnitGroupModal
                    open={this.state.showEditUnitModal}
                    close={() => this.setState({ showEditUnitModal: false })}
                    editCustUnitGroup={this.props.editCustUnitGroup}
                    refresh={this._getCustUnitGroups}
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
    const { user } = state.userReducer;
    const { custUnitGroups } = state.custUnitGroupReducer;

    return { user, custUnitGroups };
};

export default connect(mapStateToProps, { getAllCustUnitGroups, addCustUnitGroup, editCustUnitGroup })(CustUnitGroup);
