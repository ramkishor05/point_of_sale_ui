import React, { Component } from 'react';
import { withStyles, Grid, Button, Modal } from 'material-ui';

import { RegularCard, ItemGrid, CustomInput, CustomSelect } from 'components';

const ids = {
        id: '',
        name: '',
        desc: '',
        typeId: '',
        glbCategoryGroupId: 0
};
const units =[{'id' : 1, 'name':'KGS'}];

class AddGlobalCategory extends Component {
    
    state = {...ids};

    _setCategoryName = event => {
        this.setState({ name: event.target.value });
    };

    _setCategoryDesc = event => {
        this.setState({ desc: event.target.value });
    };

    _setCategoryTypeId = event => {
        this.setState({ typeId: event.target.value });
    };

    _setCategoryGroupId = event => {
        this.setState({ glbCategoryGroupId: event.target.value });
    };


    _addItem = () => {
        const {name} = this.state;

        if (name) {
            this.props.addGlobalCategory(this.state, this.props.refresh, this._resetInput, this.props.successNotification, this.props.errorNotification);
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
                aria-labelledby="Add Category"
                aria-describedby="Modal for adding Categorys"
                open={open}
                onClose={close}
            >
                <div style={this.getModalStyle()} className={classes.paper}>
                    <Grid container>
                        <ItemGrid xs={12} sm={12} md={12}>
                            <RegularCard
                                cardTitle="Add Category"
                                cardSubtitle="Fill the form below to add category to the system"
                                content={
                                    <div>
                                        <Grid container>
                                        <ItemGrid xs={12} sm={12} md={12}>
                                            <CustomSelect
                                                   labelText="Retail Unit"
                                                    id="cust-product-retail-unit"
                                                    formControlProps={{ fullWidth:true, marginLeft: 10 }}
                                                    type="text"
                                                    onChange={ this._setCategoryGroupId }
                                                    defaultValue={ this.state.glbCategoryGroupId }
                                                    items= {this.props.glbCategoryGroups}
                                                    value={ this.state.glbCategoryGroupId }
                                                    idKey="id"
                                                    valueKey="name"
                                                ></CustomSelect>
                                            </ItemGrid>
                                            <ItemGrid xs={4} sm={4} md={4}>
                                                <CustomInput
                                                    autoFocus
                                                    labelText="Category Type Id"
                                                    id="category-typeId"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setCategoryTypeId }
                                                    defaultValue={ this.state.typeId }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>
                                            <ItemGrid xs={4} sm={4} md={4}>
                                                <CustomInput
                                                    autoFocus
                                                    labelText="Category Name"
                                                    id="category-name"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setCategoryName }
                                                    defaultValue={ this.state.name }
                                                />
                                            </ItemGrid>
                                            <ItemGrid xs={4} sm={4} md={4}>
                                                <CustomInput
                                                    autoFocus
                                                    labelText="Category Desc"
                                                    id="category-desc"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setCategoryDesc }
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
                                        onClick={this._addItem}>Add</Button>
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

const AddModalWrapped = withStyles(styles)(AddGlobalCategory);

export default AddModalWrapped;






