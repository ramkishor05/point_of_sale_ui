import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'material-ui';
import { AddAlert } from 'material-ui-icons';

import { RegularCard, Button, CustomInput, ItemGrid, Snackbar } from 'components';

import { login, getUser } from '../../actions';

class Authenticate extends Component {
    state = {
        tr: false,
        tc: false,
        username: "",
        password: ""
    };

    _onChangeUsername = event => {
        console.log(event.target.value)
        this.setState({username: event.target.value});
    };

    _onChangePassword = event => {
        this.setState({password: event.target.value});
    };

    _onClick = () => {
        const { username, password } = this.state;

        console.log("onlick ", username, password)
        if (!username || !password) {
            this.showNotification('tc')
            return;
        }

        this.props.login({ username, password }, this._postCalls);
    };

    // Callback function to clear user's credentials after successful login.
    _postCalls = () => {
        this.setState({username: '',password : ''});
        let token= localStorage.getItem('api_token') ;
        console.log("token=",token)
        if(token){
            this.props.getUser(token);
        }
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
            return 'Sale added successfully';
        } else {
            return 'Error Could not log user in';
        }
    };

    render() {
        return (
            <div>
                {
                    this.props.login_error
                    ? <p style={{textAlign: 'center', fontWeight: 'bold', color: '#F00'}}>{this.props.login_error}</p>
                    : null
                }

                <Grid container justify="center" alignItems="center" style={styles.container}>
                    <ItemGrid xs={12} sm={4} md={4}>
                        <RegularCard
                            cardTitle="LOG IN"
                            cardSubtitle="Log in to your account"
                            style={styles.container}
                            content={
                                <div>
                                    <Grid container>
                                        <ItemGrid xs={12} sm={12} md={12}>
                                            <CustomInput
                                                labelText="Username"
                                                id="username"
                                                
                                                formControlProps={{ fullWidth: true }}
                                                type="text"
                                                onChange={this._onChangeUsername}
                                                defaultValue={this.state.username}
                                            />
                                        </ItemGrid>
                                    </Grid>
                                    <Grid container>
                                        <ItemGrid xs={12} sm={12} md={12}>
                                            <CustomInput
                                                labelText="Password"
                                                id="password"
                                                formControlProps={{ fullWidth: true }}
                                                type="password"
                                                onChange={this._onChangePassword}
                                                defaultValue={this.state.password}
                                            />
                                        </ItemGrid>
                                    </Grid>
                                </div>
                            }

                            footer={
                                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                                    <Button color="primary" onClick={this._onClick}>Log in</Button>
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
            </div>
        );
    }
}

const styles = {
    container: {
        paddingTop: '50px',
    }
};

const mapStateToProps = state => {
    const { token, login_error } = state.authReducer;
    return { token, login_error };
}

export default connect(mapStateToProps, { login, getUser })(Authenticate);
