import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles, Grid } from 'material-ui';
import {
    ContentCopy, Store, InfoOutline, Warning, DateRange,
    LocalOffer, Update, AccessTime, Accessibility, AddAlert
} from 'material-ui-icons';
// react plugin for creating charts
import ChartistGraph from 'react-chartist';

import { CustomDatepicker, StatsCard, ChartCard, ItemGrid, RecordsTable, RegularCard, Snackbar } from 'components';

import { dailySalesChart, completedTasksChart } from 'variables/charts';

import { dashboardStyle } from 'variables/styles';

import {
    getAllCustProducts, getAllSales, getAllFootballs, getAllGlobalUnits, getAllMobileMoneys, getAllCreditTransfers,
    getSalesByDate, getFootballByDate, getGlobalUnitByDate, getMobileMoneyByDate, getCreditTransferByDate,
    getFinishingItems
} from 'actions';

class GlobalDashboard extends Component {
    state = {
        yesterday_from: '2018-05-21',
        yesterday_to: '2018-05-21',
        today_from: '2018-05-21',
        today_to: '2018-05-21',
        from: '',
        to: '',
        showUpdateItemModal: false,
        notificationGroup: 'update',
        tr: false,
        tc: false
    };

    componentDidMount() {
        this.setState({ from: this.getDate(), to: this.getDate() }, () => {
            this.getTotalRecords();
            this.getRecordsToday();
            this.getRecordsYesterday();
            this.getLongRecords();
            this.props.getFinishingItems(10);
        })
    }

    getTotalRecords = () => {
        this.props.getAllCustProducts();
        this.props.getAllSales();
        this.props.getAllFootballs();
        this.props.getAllGlobalUnits();
        this.props.getAllMobileMoneys();
        this.props.getAllCreditTransfers();
    };

    // Get records from yesterday.
    getRecordsYesterday = () => {
        this.getRecords(this.getDate('yesterday'), this.getDate('yesterday'), 'yesterday');
    };

    // Get records from today.
    getRecordsToday = () => {
        this.getRecords(this.getDate(), this.getDate(), 'today');
    };

    // Get records from longer periods eg. days, weeks, months etc.
    getLongRecords = () => {
        this.getRecords(this.state.from, this.state.to, 'long');
    };

    getRecords = (from, to, day) => {
        this.props.getSalesByDate(from, to, day);
        this.props.getFootballByDate(from, to, day);
        this.props.getGlobalUnitByDate(from, to, day);
        this.props.getMobileMoneyByDate(from, to, day);
        this.props.getCreditTransferByDate(from, to, day);
    };

    getDate = type => {
        let date = new Date();

        let year = date.getFullYear();
        let month = date.getMonth() + 1; // Month starts from 0 so +1 to make up for -1.
        let day = date.getDate();

        if (type) {
            if (type === 'yesterday') {
                day -= 1;
            }
        }

        year = String(year);
        month = String(month);
        day = String(day);

        if (month.length === 1) {
            month = `0${month}`;
        }

        if (day.length === 1) {
            day = `0${day}`;
        }

        return `${year}-${month}-${day}`;
    };

    from = event => {
        this.setState({ from: event.target.value }, this.getLongRecords);
    };

    to = event => {
        this.setState({ to: event.target.value }, this.getLongRecords);
    };

    // Check if the user is super admin.
    isSuperAdmin = () => {
        return true;//this.props.user.role.name === 'super_admin';
    };

    // Function for calculating totals.
    calculate = type => {
        let total = 0;

        switch(type) {
            case 'sales':
                return day => {
                    let sales = this.props.sales;

                    if (day === 'today') {
                        sales = this.props.sales_today;
                    } else if (day === 'yesterday') {
                        sales = this.props.sales_yesterday;
                    } else if (day === 'long') {
                        sales = this.props.sales_long;
                    }

                    for (let sale of sales) {
                        total += Number(sale.amount);
                    }

                    return total.toFixed(2);
                };

            case 'footballs':
                return day => {
                    let footballs = this.props.footballs;

                    if (day === 'today') {
                        footballs = this.props.footballs_today;
                    } else if (day === 'yesterday') {
                        footballs = this.props.footballs_yesterday;
                    } else if (day === 'long') {
                        footballs = this.props.footballs_long;
                    }

                    for (let football of footballs) {
                        total += Number(football.amount);
                    }

                    return total.toFixed(2);
                };

            case 'units':
                return day => {
                    let globalUnits = this.props.globalUnits;

                    if (day === 'today') {
                        globalUnits = this.props.globalUnits_today;
                    } else if (day === 'yesterday') {
                        globalUnits = this.props.globalUnits_yesterday;
                    } else if (day === 'long') {
                        globalUnits = this.props.globalUnits_long;
                    }

                    for (let unit of globalUnits) {
                        total += Number(unit.amount);
                    }
                    
                    return total.toFixed(2);
                };

            case 'mobile_moneys':
                return day => {
                    let mobile_moneys = this.props.mobile_moneys;

                    if (day === 'today') {
                        mobile_moneys = this.props.mobile_moneys_today;
                    } else if (day === 'yesterday') {
                        mobile_moneys = this.props.mobile_moneys_yesterday;
                    } else if (day === 'long') {
                        mobile_moneys = this.props.mobile_moneys_long;
                    }
                    
                    for (let mobile_money of mobile_moneys) {
                        total += Number(mobile_money.commission);
                    }

                    return total.toFixed(2);
                };

            case 'credit_transfers':
                return day => {
                    let credit_transfers = this.props.credit_transfers;

                    if (day === 'today') {
                        credit_transfers = this.props.credit_transfers_today;
                    } else if (day === 'yesterday') {
                        credit_transfers = this.props.credit_transfers_yesterday;
                    } else if (day === 'long') {
                        credit_transfers = this.props.credit_transfers_long;
                    }
                    
                    for (let credit_transfer of credit_transfers) {
                        total += Number(credit_transfer.amount);
                    }

                    return total.toFixed(2);
                };   

            default:
                return () => total.toFixed(2);
        }
    };

    records = day => {
        let records = [],
            sales = this.props.sales,
            footballs = this.props.footballs,
            globalUnits = this.props.globalUnits,
            mobile_moneys = this.props.mobile_moneys,
            credit_transfers = this.props.credit_transfers;

        if (day === 'today') {
            sales = this.props.sales_today;
            footballs = this.props.footballs_today;
            globalUnits = this.props.globalUnits_today;
            mobile_moneys = this.props.mobile_moneys_today;
            credit_transfers = this.props.credit_transfers_today;
        } else if (day === 'yesterday') {  
            sales = this.props.sales_yesterday;
            footballs = this.props.footballs_yesterday;
            globalUnits = this.props.globalUnits_yesterday;
            mobile_moneys = this.props.mobile_moneys_yesterday;
            credit_transfers = this.props.credit_transfers_today;
        } else if (day === 'long') {
            sales = this.props.sales_long;
            footballs = this.props.footballs_long;
            globalUnits = this.props.globalUnits_long;
            mobile_moneys = this.props.mobile_moneys_long;
            credit_transfers = this.props.credit_transfers_long;
        }

        records.push({name: 'Sales', total: this.calculate('sales')(day)});
        records.push({name: 'Footballs', total: this.calculate('footballs')(day)});
        records.push({name: 'globalUnits', total: this.calculate('globalUnits')(day)});
        records.push({name: 'Mobile moneys', total: this.calculate('mobile_moneys')(day)});
        records.push({name: 'Credit Transfers', total: this.calculate('credit_transfers')(day)});

        return records;
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
                return 'Item added successfully';
            } else {
                return 'Item updated successfully';
            }
        } else if (type === 'error') {
            if (this.state.notificationGroup === 'update') {
                return 'Error Item could not be updated';
            } else {
                return 'Error Item could not be added';
            }
        }
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    render() {
        return (
            <div> 
                <Grid container>
                    <ItemGrid xs={12} sm={6} md={4}>
                        <StatsCard
                            icon={ContentCopy}
                            iconColor="orange"
                            title="Items"
                            description={this.props.items.length}
                            statIcon={Warning}
                            statText="Number of items in the system"
                        />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={6} md={4}>
                        <StatsCard
                            icon={Store}
                            iconColor="green"
                            title="Sales today"
                            description={`GHS ${this.calculate('sales')('today')}`}
                            statIcon={DateRange}
                            statText="Sales recorded today"
                        />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={6} md={4}>
                        <StatsCard
                            icon={InfoOutline}
                            iconColor="red"
                            title="Footballs today"
                            description={`GHS ${this.calculate('footballs')('today')}`}
                            statIcon={LocalOffer}
                            statText="footballs recorded today"
                        />
                    </ItemGrid>
                </Grid>
                <Grid container>
                    <ItemGrid xs={12} sm={6} md={4}>
                        <StatsCard
                            icon={Accessibility}
                            iconColor="blue"
                            title="globalUnits today"
                            description={`GHS ${this.calculate('globalUnits')('today')}`}
                            statIcon={Update}
                            statText="globalUnits recorded today"
                        />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={6} md={4}>
                        <StatsCard
                            icon={ContentCopy}
                            iconColor="red"
                            title="Mobile moneys today"
                            description={`GHS ${this.calculate('mobile_moneys')('today')}`}
                            statIcon={Warning}
                            statText="Commissions recorded today"
                        />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={6} md={4}>
                        <StatsCard
                            icon={Store}
                            iconColor="blue"
                            title="Credit Transfers today"
                            description={`GHS ${this.calculate('credit_transfers')('today')}`}
                            statIcon={DateRange}
                            statText="Credit transfers recorded today"
                        />
                    </ItemGrid>
                </Grid>

                {
                    this.isSuperAdmin() && (
                        <div>
                            <Grid container>
                            <ItemGrid xs={12} sm={6} md={6}>
                                    
                                </ItemGrid>

                                <ItemGrid xs={12} sm={6} md={6}>
                                    <RegularCard
                                        cardTitle="Periodic records"
                                        cardSubtitle="Get records for specific days, weeks and months"
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
                                            <RecordsTable
                                                tableHeaderColor="info"
                                                tableHead={['Category', 'Amount']}
                                                tableData={this.records('long')}
                                            />
                                        }
                                    />
                                </ItemGrid>
                            </Grid>
                        </div>
                    )
                }
                
                {
                    this.isSuperAdmin() && (
                        <div>
                            <Grid container>
                                <ItemGrid xs={12} sm={12} md={6}>
                                    <ChartCard
                                        chart={
                                            <ChartistGraph
                                                className="ct-chart"
                                                data={{
                                                    labels: ['Sales', 'Footballs', 'globalUnits', 'Mobile Money', 'Credit'],
                                                    series: [
                                                        [
                                                            this.calculate('sales')('yesterday'),
                                                            this.calculate('footballs')('yesterday'),
                                                            this.calculate('globalUnits')('yesterday'),
                                                            this.calculate('mobile_moneys')('yesterday'),
                                                            this.calculate('credit_transfers')('yesterday')
                                                        ]
                                                    ]
                                                }}
                                                type="Line"
                                                options={completedTasksChart.options}
                                                listener={
                                                    completedTasksChart.animation
                                                }
                                            />
                                        }
                                        chartColor="red"
                                        title="Yesterday's Chart"
                                        text="Chart from yesterday's transactions"
                                        statIcon={AccessTime}
                                        statText=":)"
                                    />
                                </ItemGrid>

                                <ItemGrid xs={12} sm={12} md={6}>
                                    <ChartCard
                                        chart={
                                            <ChartistGraph
                                                className="ct-chart"
                                                data={{
                                                    labels: ['Sales', 'Footballs', 'globalUnits', 'Mobile Money', 'Credit'],
                                                    series: [
                                                        [
                                                            this.calculate('sales')('today'),
                                                            this.calculate('footballs')('today'),
                                                            this.calculate('globalUnits')('today'),
                                                            this.calculate('mobile_moneys')('today'),
                                                            this.calculate('credit_transfers')('today')
                                                        ]
                                                    ]
                                                }}
                                                type="Line"
                                                options={dailySalesChart.options}
                                                listener={
                                                    dailySalesChart.animation
                                                }
                                            />
                                        }
                                        chartColor="green"
                                        title="Today's Chart"
                                        text="Chart from today's transactions"
                                        statIcon={AccessTime}
                                        statText=":]"
                                    />
                                </ItemGrid>
                            </Grid>

                            <Grid container>
                                <ItemGrid xs={12} sm={4} md={4}>
                                    <RegularCard
                                        cardTitle="Yesterday's records"
                                        cardSubtitle="Records for transactions for yesterday"
                                        content={
                                            <RecordsTable
                                                tableHeaderColor="info"
                                                tableHead={['Category', 'Amount']}
                                                tableData={this.records('yesterday')}
                                            />
                                        }
                                    />
                                </ItemGrid>
                                <ItemGrid xs={12} sm={4} md={4}>
                                    <RegularCard
                                        cardTitle="Todays's records"
                                        cardSubtitle="Records of transactions for today"
                                        content={
                                            <RecordsTable
                                                tableHeaderColor="info"
                                                tableHead={['Category', 'Amount']}
                                                tableData={this.records('today')}
                                            />
                                        }
                                    />
                                </ItemGrid>
                                <ItemGrid xs={12} sm={4} md={4}>
                                    <RegularCard
                                        cardTitle="Total records"
                                        cardSubtitle="Total records of transactions in the system"
                                        content={
                                            <RecordsTable
                                                tableHeaderColor="info"
                                                tableHead={['Category', 'Amount']}
                                                tableData={this.records()}
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
                        </div>
                    )
                }
                
            </div>
        );
    }
}

const styles = {
    datepickers: {
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'center',
    }
};

GlobalDashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

const dashboardStyleWrapped = withStyles(dashboardStyle)(GlobalDashboard);

const mapStateToProps = state => {
    const { user } = state.userReducer;
    const { items, items_finishing } = state.items;
    const { sales, sales_today, sales_yesterday, sales_long } = state.sales;
    const { globalUnits, globalUnits_today, globalUnits_yesterday, globalUnits_long } = state.globalUnits;
  

    return {
        user,
        items, items_finishing,
        sales, globalUnits, 
        sales_today, globalUnits_today, 
        sales_yesterday, globalUnits_yesterday, 
        sales_long, globalUnits_long
    };
};

export default connect(mapStateToProps, {
    getAllCustProducts, getAllSales, getAllGlobalUnits,
    getSalesByDate, getGlobalUnitByDate,
    getFinishingItems
})(dashboardStyleWrapped);
