import React from 'react';
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import styles from './styles/PaletteListStyles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";

class PaletteList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDeleteShowing: false,
            deleteId: ''
        };
        this.confirmDelete = this.confirmDelete.bind(this);
        this.cancelDelete = this.cancelDelete.bind(this);
        this.handleDeletePalette = this.handleDeletePalette.bind(this);
    }
    confirmDelete(paletteID) {
        this.setState({ confirmDeleteShowing: true, deleteId: paletteID })
    }
    cancelDelete() {
        this.setState({ confirmDeleteShowing: false, deleteId: '' })
    }
    handleDeletePalette() {
        this.props.deletePalette(this.state.deleteId) // ok hiye rah truh end l parent bas fina ne3mel shi mn ba3da as follows :)
        this.cancelDelete()
    }
    render() {
        const { classes } = this.props;
        const palettes = this.props.palettes.map((palette) =>
            <CSSTransition
                key={palette.id}
                timeout={500}
                classNames='fade'
            >
                <MiniPalette
                    id={palette.id}
                    key={palette.id}
                    {...palette}
                    // deletePalette={this.props.deletePalette}// or () => this.props.deletePalette(palette.id)
                    deletePalette={this.confirmDelete}// or () => this.props.deletePalette(palette.id) bs kermel l pure component -memo
                />
            </CSSTransition>
        )
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1 className={classes.heading}>React Colors</h1>
                        <Link to='/palette/new'>Create Palette</Link>
                    </nav>
                    {/* <div className={classes.palettes}> */}
                    <TransitionGroup className={classes.palettes}>
                        {palettes}
                    </TransitionGroup>
                    {/* </div> */}
                </div>
                <Dialog
                    open={this.state.confirmDeleteShowing}
                    aria-labelledby='delete-dialog-title'
                    onClose={this.cancelDelete}
                >
                    <DialogTitle id='delete-dialog-title'>
                        Delete This Palette?
                    </DialogTitle>
                    <List>
                        <ListItem button onClick={this.handleDeletePalette}>
                            <ListItemAvatar>
                                <Avatar
                                    style={{ backgroundColor: blue[100], color: blue[600] }}
                                >
                                    <CheckIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary='Delete' />
                        </ListItem>
                        <ListItem button onClick={this.cancelDelete}>
                            <ListItemAvatar>
                                <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                                    <CloseIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary='Cancel' />
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        );
    }
}
export default withStyles(styles)(PaletteList);