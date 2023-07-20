import React, { Component } from 'react';
import { withStyles, Grid, Button, Modal } from 'material-ui';

import { RegularCard, ItemGrid, CustomInput } from 'components';

class AddUnit extends Component {
    state = {
        name: '',
        typeId: '',
        dispayName: '',
        shortDesc: '',
        longDesc: ''
    };

    _setName = event => {
        this.setState({ name: event.target.value });
    };

    _setTypeId = event => {
        this.setState({ typeId: event.target.value });
    };

    _setDispayName = event => {
        this.setState({ dispayName: event.target.value });
    };
    
    _setShortDesc = event => {
        this.setState({ shortDesc: event.target.value });
    };

    _setLongDesc = event => {
        this.setState({ longDesc: event.target.value });
    };

    _addUnit = () => {
        const { name, dispayName } = this.state;
        const { refresh, successNotification, errorNotification } = this.props;

        if (name && dispayName) {
            this.props.addUnit(this.state, refresh, this.clear, successNotification, errorNotification);
        } else {
            errorNotification();
        }
    };

    clear = () => {
        this.setState({ name: '', dispayName: '' });
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
                                                    defaultValue={ this.state.name }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    labelText="DispayName"
                                                    id="dispayName"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setDispayName }
                                                    defaultValue={ this.state.dispayName }
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

const AddModalWrapped = withStyles(styles)(AddUnit);

export default AddModalWrapped;






