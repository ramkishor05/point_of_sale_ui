import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Grid, Button, Modal } from 'material-ui';

import { RegularCard, ItemGrid, CustomInput, CustomSelect } from 'components';

import { editGlobalCountFreq } from '../../../../actions';

class EditGlobalCountFreq extends Component {
    state = {
        id: '',
        name: '',
        desc: '',
        typeId: ''
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

    _setName = event => {
        this.setState({ name: event.target.value });
    };

    _setDesc = event => {
        this.setState({ desc: event.target.value });
    };

    _setTypeId = event => {
        this.setState({ typeId: event.target.value });
    };

    _editGlobalCountFreq = () => {
        this.state.id=this.props.globalCountFreq_to_edit.id;
        if (this.state.id && this.state.name) {
            this.props.editGlobalCountFreq(this.state.id, this.state, this.clearAndRefresh, this.props.successNotification, this.props.errorNotification);
        } else {
            this.props.errorNotification();
        }
    };

    clearAndRefresh = () => {
        this.props.close();
        this.props.refresh();
    }
    
    render() {
        const { classes, open, close, globalCountFreq_to_edit } = this.props;
        return (
            <Modal
                aria-labelledby="Edit Item"
                aria-describedby="Modal for editing item"
                open={open}
                onClose={close}
            >
                <div style={this.getModalStyle()} className={classes.paper}>
                    <Grid container>
                        <ItemGrid xs={12} sm={12} md={12}>
                            <RegularCard
                                cardTitle="EDIT COUNT FREQ"
                                cardSubtitle="Edit the form below to edit the selected count frequence"
                                content={
                                    <div>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    autoFocus
                                                    labelText="Name"
                                                    id="count-freq-name"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setName }
                                                    defaultValue={ globalCountFreq_to_edit.name }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    autoFocus
                                                    labelText="Description"
                                                    id="count-freq-name"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setDesc }
                                                    defaultValue={ globalCountFreq_to_edit.desc }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    autoFocus
                                                    labelText="Type"
                                                    id="count-freq-type"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setTypeId }
                                                    defaultValue={ globalCountFreq_to_edit.desc }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        
                                    </div>
                                }
                                
                                footer={
                                    <Button 
                                        variant="raised" 
                                        style={{ backgroundColor: 'purple', color: 'white' }} 
                                        onClick={this._editGlobalCountFreq}>Edit</Button>
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
        width: theme.spacing.unit * 50,
        backgroundColor: 'transparent',
        padding: theme.spacing.unit * 4,
        marginLeft: theme.spacing.unit *10
    },
});

const mapStateToProps = state => {
    const { globalCountFreq_to_edit } = state.globalCountFreqReducer;
    return { globalCountFreq_to_edit };
};

const EditModalWrapped = withStyles(styles)(EditGlobalCountFreq);

export default connect(mapStateToProps, { editGlobalCountFreq })(EditModalWrapped);
