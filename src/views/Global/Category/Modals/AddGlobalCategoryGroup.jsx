import React, { Component } from 'react';
import { withStyles, Grid, Button, Modal } from 'material-ui';

import { RegularCard, ItemGrid, CustomInput} from 'components';

const ids = {
        id: '',
        name: '',
        desc: '',
        typeId: ''
};

class AddGlobalCategoryGroup extends Component {
    
    state = {...ids};

    _setName = event => {
        this.setState({ name: event.target.value });
    };

    _setDesc = event => {
        this.setState({ desc: event.target.value });
    };

    _setTypeId = event => {
        this.setState({ typeId: event.target.value });
    };


    _addGlobalCategoryGroup = () => {
        const {name} = this.state;

        if (name) {
            this.props.addGlobalCategoryGroup(this.state, this.props.refresh, this._resetInput, this.props.successNotification, this.props.errorNotification);
        } else {
            this.props.errorNotification();
        }
    };

    _resetInput = () => {
        this.setState(ids, this.props.close);
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
                aria-labelledby="Add category group"
                aria-describedby="Modal for adding category groups"
                open={open}
                onClose={close}
            >
                <div style={this.getModalStyle()} className={classes.paper}>
                    <Grid container>
                        <ItemGrid xs={12} sm={12} md={12}>
                            <RegularCard
                                cardTitle="Add category group"
                                cardSubtitle="Fill the form below to add category group to the system"
                                content={
                                    <div>
                                        <Grid container>
                                            
                                            <ItemGrid xs={4} sm={4} md={4}>
                                                <CustomInput
                                                    autoFocus
                                                    labelText="Type Id"
                                                    id="category-group-typeId"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setTypeId }
                                                    defaultValue={ this.state.typeId }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>
                                            <ItemGrid xs={4} sm={4} md={4}>
                                                <CustomInput
                                                    autoFocus
                                                    labelText="Name"
                                                    id="category-group-name"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setName }
                                                    defaultValue={ this.state.name }
                                                />
                                            </ItemGrid>
                                            <ItemGrid xs={4} sm={4} md={4}>
                                                <CustomInput
                                                    autoFocus
                                                    labelText="Description"
                                                    id="category-group-desc"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setDesc }
                                                    defaultValue={ this.state.desc }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        
                                    </div>
                                }
                                
                                footer={
                                    <Button
                                        variant="raised" 
                                        style={{ backgroundColor: 'purple', color: 'white' }} 
                                        onClick={this._addGlobalCategoryGroup}>Add</Button>
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
        width: theme.spacing.unit * 100,
        backgroundColor: 'transparent',
        padding: theme.spacing.unit * 4,
        marginLeft: theme.spacing.unit *10
    },
});

const AddModalWrapped = withStyles(styles)(AddGlobalCategoryGroup);

export default AddModalWrapped;






