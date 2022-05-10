import React from 'react'
import styles from './styles/PaletteFooterStyles';
import { withStyles } from '@material-ui/styles';

function PaletteFooter(props) {
    return (
        <footer className={props.classes.PaletteFooter}>
            {props.paletteName}
            <span className={props.classes.emoji}>{props.emoji}</span>
        </footer>
    )
}
export default withStyles(styles)(PaletteFooter);