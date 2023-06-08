import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from 'material-ui';
import { AddAlert } from 'material-ui-icons';

import { getCategoryByDate, addCategory, editCategory } from '../../actions';

import { CustomDatepicker, RegularCard, CategoryTable, ItemGrid, CustomInput, Snackbar } from 'components';

import AddCategoryModal from './Modals/AddCategory';
import EditCategoryModal from './Modals/EditCategory';


class Category extends Component {
     state = {
        notificationGroup: 'add',
        openAddCategoryModal: false,
        openEditCategoryModal: false,
        from: '2018-05-21',
        to: '2018-05-21',
        tr: false,
        tc: false,
    };

    componentDidMount() {
        this.setState({ from: this.dateNow(), to: this.dateNow() }, this._getCategory);
    }

    from = event => {
        this.setState({ from: event.target.value }, this._getCategory);
    };

    to = event => {
        this.setState({ to: event.target.value }, this._getCategory);
    };

    total = () => {
        let total = 0;

        for (let category of this.props.categorys) {
            total += Number(category.amount);
        }

        return total.toFixed(2);
    };

    _getCategory = () => {
        this.props.getCategoryByDate(this.state.from, this.state.to);
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
                return 'Category added successfully';
            } else {
                return 'Category edited successfully';
            }
        } else if (type === 'error') {
            if (this.state.notificationGroup === 'edit') {
                return 'Error category could not be edited';
            } else {
                return 'Error category could not be added';
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
                            cardTitle="Category"
                            cardSubtitle="List of category match entries in the system"
                            button={
                                <Button 
                                    style={ styles.addTransactionButton } 
                                    onClick={() => this.setState({ openAddCategoryModal: true, notificationGroup: 'add' })}>Add Category</Button>
                            }
                            total={
                                <div>
                                    <CustomInput
                                        disabled
                                        labelText="Total Amount"
                                        id="total-amount"
                                        formControlProps={{ fullWidth: true }}
                                        type="number"
                                        value={this.total()}
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
                                <CategoryTable
                                    tableHeaderColor="primary"
                                    tableHead={['No.', 'Match', 'Unit Charge', 'Number of People', 'Amount', 'Date Added', 'Date Updated', '']}
                                    tableData={this.props.Categorys}
                                    editCategory={() => this.setState({ openEditCategoryModal: true, notificationGroup: 'edit' })}
                                    getCategorys={this._getCategory}
                                />
                            }
                        />
                    </ItemGrid>
                    
                    <AddCategoryModal
                        open={this.state.openAddCategoryModal}
                        close={() => this.setState({ openAddCategoryModal: false })}
                        addCategory={this.props.addCategory}
                        refresh={this._getCategory}
                        successNotification={() => this.showNotification('tr')}
                        errorNotification={() => this.showNotification('tc')}
                    />

                    <EditCategoryModal
                        open={this.state.openEditCategoryModal}
                        close={() => this.setState({ openEditCategoryModal: false })}
                        editCategory={this.props.editCategory}
                        refresh={this._getCategory}
                        successNotification={() => this.showNotification('tr')}
                        errorNotification={() => this.showNotification('tc')}
                    />
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
    const { categorys, openAddCategoryModal } = state.categorys;
    return { categorys, openAddCategoryModal };
};

export default connect(mapStateToProps, {
    getCategoryByDate, addCategory, editCategory
})(Category);
