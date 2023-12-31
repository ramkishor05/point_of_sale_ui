import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, } from 'material-ui';
import { compose } from 'redux';

import { Switch, Route, Redirect } from 'react-router-dom';
// creates a beautiful scrollbar
import PerfectScrollbar from 'perfect-scrollbar';
import "perfect-scrollbar/css/perfect-scrollbar.css";

import { Header, Sidebar } from 'components';

import appRoutes from 'routes/app.jsx';

import { appStyle } from 'variables/styles';

import image from 'assets/img/sidebar-2.jpg';
import logo from 'assets/img/reactlogo.png';
import { connect } from 'react-redux';
import { getUser } from '../../actions';

const switchRoutes = (appRouteList) => (
    <Switch>
        {
            appRouteList.map((prop, key) => {
                if (prop.redirect) {
                    return (
                        <Redirect from={prop.path} to={prop.to} key={key}/>
                    );
                }
                return (
                    <Route path={prop.path} component={prop.component} key={key}/>
                );
            })
        }
    </Switch>);

class App extends React.Component {
    state = {
        mobileOpen: false,
    };

    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };

    getRoute() {
        return this.props.location.pathname !== "/maps";
    }

    componentDidMount() {
        
        if (window.innerWidth > 991) {
            // eslint-disable-next-line
            const ps = new PerfectScrollbar(this.refs.mainPanel);
        }
    }

    componentDidUpdate() {
        this.refs.mainPanel.scrollTop = 0;
    }

    render() {
        
        const { classes,token, user, ...rest } = this.props;
       
        return (
            <div className={classes.wrapper}>
                <Sidebar
                    routes={appRoutes['MANAGER']}
                    logoText={"P O S"}
                    logo={logo}
                    image={image}
                    handleDrawerToggle={this.handleDrawerToggle}
                    open={this.state.mobileOpen}
                    color="blue"
                    {...rest}
                />
                <div className={classes.mainPanel} ref="mainPanel">
                    <Header
                        routes={appRoutes['MANAGER']}
                        handleDrawerToggle={this.handleDrawerToggle}
                        {...rest}
                    />
                    {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
                    {
                        this.getRoute() 
                            ? (
                                <div className={classes.content}>
                                    <div className={classes.container}>
                                        {switchRoutes(appRoutes['MANAGER'])}
                                    </div>
                                </div>
                            )
                            : (
                                <div className={classes.map}>
                                    {switchRoutes(appRoutes['MANAGER'])}
                                </div>
                            )
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { isLoggedIn, token} = state.authReducer;
    const { show_loader } = state.loader;
    const { user} = state.userReducer;
    return { isLoggedIn, show_loader, user , token};
};

App.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default compose(
  connect(mapStateToProps, { getUser }) ,
  withStyles(appStyle, { withTheme: true }),
)(App);
