import React from 'react';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
// import './Navbar.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import styles from './styles/NavBarStyles';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            format: 'hex',
            open: false
        }
        this.handleFormatChange = this.handleFormatChange.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
    }
    handleFormatChange(evt) {
        this.setState({ format: evt.target.value, open: true }) // to let the select menu synchronized with the selected item
        this.props.changeFormat(evt.target.value) //or we use callback to make sure that state is set before access it as in ColorBox.js/ChangeCopyState func or in JokeList.js/handleGetNewJokes func
    }
    closeSnackbar() {
        this.setState({ open: false })
    }
    render() {
        const {classes} = this.props;
        return (
            <header className={classes.Navbar}>
                <div className={classes.logo}><Link to='/'>reactcolorpicker</Link></div>
                {this.props.showingAllColors && (
                    <div>
                        <span className={classes.levelSpan}>Level: {this.props.level}</span>
                        <div className={classes.slider}>
                            <Slider
                                step={this.props.sliderStep}
                                defaultValue={this.props.sliderDefaultValue}
                                min={this.props.sliderMin}
                                max={this.props.sliderMax}
                                onAfterChange={this.props.changeLevel}
                            />
                        </div>
                    </div>
                )}
                <div className={classes.selectContainer}>
                    <Select value={this.state.format} onChange={this.handleFormatChange}>
                        <MenuItem value='hex'>HEX - #fff</MenuItem>
                        <MenuItem value='rgb'>RGB - rgb(255,255,255)</MenuItem>
                        <MenuItem value='rgba'>RGBA - rgba(255,255,255, 1.0)</MenuItem>
                    </Select>
                </div>
                <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    open={this.state.open}
                    autoHideDuration={3000}
                    message={<span id='message-id'>Format Changed To {this.state.format.toUpperCase()}</span>}
                    ContentProps={{
                        "aria-describedby": "message-id"
                    }}
                    onClose={this.closeSnackbar} // to close the snackbar when clicking anywhere (clickaway)
                    action={[
                        <IconButton
                            onClick={this.closeSnackbar}
                            color='inherit'
                            key='close'
                            aria-controls='close'
                        >
                            <CloseIcon />
                        </IconButton>
                    ]}
                />
            </header>
        );
    }
}
export default withStyles(styles)(Navbar);