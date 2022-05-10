import React from 'react';
import ColorBox from './ColorBox';
// import './Palette.css';
import Navbar from './NavBar';
import PaletteFooter from './PaletteFooter';
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteStyles';


class Palette extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            level: 500,
            format: 'hex'
        }
        this.changeLevel = this.changeLevel.bind(this)
        this.changeFormat = this.changeFormat.bind(this)
    }
    changeLevel(level) {
        this.setState({ level });;
    }
    changeFormat(format) {
        this.setState({ format });;
    }
    render() {
        const {classes} = this.props
        let colorBoxes = this.props.palette.colors[this.state.level].map((color, index) =>
            <ColorBox
                colorId={color.id}
                paletteId={this.props.palette.id}
                key={color.id}
                background={color[this.state.format]}
                name={color.name}
                showingFullPalette
            />)
        return (
            <div className={classes.Palette}>
                <Navbar
                    sliderDefaultValue={this.state.level}
                    sliderMin={100}
                    sliderMax={900}
                    sliderStep={100}
                    changeLevel={this.changeLevel}
                    changeFormat={this.changeFormat}
                    showingAllColors
                />
                <div className={classes.colors}>
                    {colorBoxes}
                </div>
                {/* <footer className='Palette-footer'>
                    {this.props.palette.paletteName}
                    <span className='emoji'>{this.props.palette.emoji}</span>
                </footer> */}
                <PaletteFooter
                    paletteName={this.props.palette.paletteName}
                    emoji={this.props.palette.emoji}
                />
            </div>
        );
    }
}
export default withStyles(styles)(Palette);