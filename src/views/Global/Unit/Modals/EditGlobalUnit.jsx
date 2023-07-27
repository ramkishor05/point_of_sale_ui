import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Grid, Button, Modal } from 'material-ui';

import { RegularCard, ItemGrid, CustomInput , CustomSelect} from 'components';

const groupUnits =[{'id' : 1, 'name':'LB'}];

const groupUnitMap ={1:{'id' : 1, 'name':'LB'}};

class EditGlobalUnit extends Component {
    state = {...this.props.globalUnit_to_edit};

    _setName = event => {
        this.setState({ name: event.target.value });
    };

    _setDisplayName = event => {
        this.setState({ displayName: event.target.value });
    };

    _setLongDesc = event => {
        this.setState({ longDesc: event.target.value });
    };

    _setShortDesc = event => {
        this.setState({ shortDesc: event.target.value });
    };

    _setTypeId = event => {
        this.setState({ typeId: event.target.value });
    };

    _setGroupId = event => {
        this.setState({ unitGroupId: event.target.value });
    };

    _clear = () => {
        this.setState(this.props.globalUnit_to_edit);
        this.props.close();
    };

    _editGlobalUnit = () => {        
        let id = this.props.globalUnit_to_edit.id,
        name = this.state.name || this.props.globalUnit_to_edit.name
        if (id && name ) {
            this.props.editGlobalUnit(id, this.state, this.props.refresh, this._clear, this.props.successNotification, this.props.errorNotification);
        } else {
            this.props.errorNotification();
        }
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
        const { classes, open, close, globalUnit_to_edit } = this.props;
        return (
            <Modal
                aria-labelledby="Edit Unit"
                aria-describedby="Modal for editing Unit"
                open={open}
                onClose={close}
            >
                <div style={this.getModalStyle()} className={classes.paper}>
                    <Grid container>
                        <ItemGrid xs={12} sm={12} md={12}>
                            <RegularCard
                                cardTitle="EDIT Unit"
                                cardSubtitle="Fill the form below to edit Unit in the system"
                                content={
                                    <div>
                                       <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                               <CustomSelect
                                                   labelText="Group Id"
                                                    id="group-unit-id"
                                                    formControlProps={{ fullWidth:true, marginLeft: 10 }}
                                                    type="text"
                                                    onChange={ this._setGroupId }
                                                    defaultValue={ groupUnitMap[globalUnit_to_edit.unitGroupId]? groupUnitMap[globalUnit_to_edit.unitGroupId].name : '' }
                                                    items= {groupUnits}
                                                    value={ groupUnitMap[globalUnit_to_edit.unitGroupId]? groupUnitMap[globalUnit_to_edit.unitGroupId].name : ''}
                                                ></CustomSelect>
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    autoFocus
                                                    labelText="Name"
                                                    id="name"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setName }
                                                    defaultValue={ globalUnit_to_edit.name }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    labelText="Display Name"
                                                    id="displayName"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setDisplayName }
                                                    defaultValue={ globalUnit_to_edit.displayName }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    labelText="Long desc"
                                                    id="longDesc"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setLongDesc }
                                                    defaultValue={ globalUnit_to_edit.longDesc }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    labelText="Short Desc"
                                                    id="shortDesc"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setShortDesc }
                                                    defaultValue={ globalUnit_to_edit.shortDesc }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    labelText="Type Id"
                                                    id="typeId"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setTypeId }
                                                    defaultValue={ globalUnit_to_edit.typeId }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                    </div>
                                }
                                
                                footer={
                                    <Button 
                                        variant="raised" 
                                        style={{ backgroundColor: 'purple', color: 'white' }} 
                                        onClick={this._editGlobalUnit}>Edit</Button>
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

const EditModalWrapped = withStyles(styles)(EditGlobalUnit);

const mapStateToProps = state => {
    const { globalUnit_to_edit } = state.globalUnits;
    return { globalUnit_to_edit };
}

export default connect(mapStateToProps)(EditModalWrapped);






