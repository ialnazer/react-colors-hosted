import React from 'react';
import ColorBox from './ColorBox';
import './Palette.css';
import Navbar from './NavBar';
import PaletteFooter from './PaletteFooter';
import { Link } from 'react-router-dom'
import { mergeClasses, withStyles } from '@material-ui/styles';
import styles from './styles/PaletteStyles';

class SingleColorPalette extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            level: 500,
            format: 'hex'
        }
        this.changeFormat = this.changeFormat.bind(this);
    }
    changeFormat(format) {
        this.setState({ format });
    }
    render() {
        const { classes } = this.props;
        let colorBoxes = this.props.singleColorPalette.map((color, index) =>
            <ColorBox
                key={color.name}//{index}
                background={color[this.state.format]}
                name={color.name}
                showingFullPalette={false}
            />)
        return (
            <div className={classes.Palette}>
                <Navbar
                    changeFormat={this.changeFormat}
                    showingAllColors={false}
                />
                <div className={classes.colors}>
                    {colorBoxes}
                    <div className={classes.goBack}>
                        <Link to={`/palette/${this.props.paletteId}`} onClick={e => e.stopPropagation()}>
                            Go Back
                        </Link>
                    </div>
                </div>
                <PaletteFooter
                    paletteName={this.props.paletteName}
                    emoji={this.props.emoji}
                />
            </div>
        );
    }
}
export default withStyles(styles)(SingleColorPalette);