import React, { Component } from 'react';
import { withStyles, Grid, Button, Modal } from 'material-ui';

import { RegularCard, ItemGrid, CustomInput } from 'components';

class AddCustUnitGroup extends Component {
    state = {
        typeId: '',
        displayName: '',
        shortDesc: '',
        longDesc: ''
    };

    _setName = event => {
        this.setState({ shortDesc: event.target.value,longDesc: event.target.value });
    };

    _setTypeId = event => {
        this.setState({ typeId: event.target.value });
    };

    _setDisplayName = event => {
        this.setState({ displayName: event.target.value, typeId: event.target.value });
    };
    
    _setShortDesc = event => {
        this.setState({ shortDesc: event.target.value });
    };

    _setLongDesc = event => {
        this.setState({ longDesc: event.target.value });
    };

    _addUnit = () => {
        const { typeId } = this.state;
        const { refresh, successNotification, errorNotification } = this.props;
        if (typeId!=='') {
            this.props.addCustUnitGroup(this.state, refresh, this.clear, successNotification, errorNotification);
        } else {
            errorNotification();
        }
    };

    clear = () => {
        this.setState({ shortDesc: '', dispayName: '' });
        this.props.close();
    };

    getModalStyle() {
        const top = 50;
        const left = 50;

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }
    
    render() {
        const { classes, open, close } = this.props;

        return (
            <Modal
                aria-labelledby="Add Unit"
                aria-describedby="Modal for adding Unit"
                open={open}
                onClose={close}
            >
                <div style={this.getModalStyle()} className={classes.paper}>
                    <Grid container>
                        <ItemGrid xs={12} sm={12} md={12}>
                            <RegularCard
                                cardTitle="ADD Unit"
                                cardSubtitle="Fill the form below to add Unit to the system"
                                content={
                                    <div>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    autoFocus
                                                    labelText="Name"
                                                    id="name"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setName }
                                                    defaultValue={ this.state.shortDesc }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    labelText="friendlyName"
                                                    id="friendlyName"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setDisplayName }
                                                    defaultValue={ this.state.displayName }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                    </div>
                                }
                                
                                footer={
                                    <Button 
                                        variant="raised" 
                                        style={{ backgroundColor: 'purple', color: 'white' }} 
                                        onClick={this._addUnit}>Add</Button>
                                }
                            />
                        </ItemGrid>
                    </Grid>
                </div>
            </Modal>
        );
    }
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 60,
        backgroundColor: 'transparent',
        padding: theme.spacing.unit * 4,
    },
});

const AddModalWrapped = withStyles(styles)(AddCustUnitGroup);

export default AddModalWrapped;






