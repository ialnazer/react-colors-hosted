import React, { memo } from 'react';
import { useNavigate } from "react-router-dom";
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './styles/MiniPaletteStyles';

function MiniPalette(props) {
    const navigate = useNavigate();

    const {
        classes,
        paletteName,
        id,
        emoji,
        colors,
        deletePalette
    } = props;

    const miniColorBoxes = colors.map(color => <div
        className={classes.miniColor}
        style={{ backgroundColor: color.color }}
        key={color.name}
    />);

    const handleDeletePalette = (e) => {
        e.stopPropagation();
        deletePalette(id)
    }
    // console.log(paletteName)
    return (
        <div className={classes.root} onClick={() => navigate(`/palette/${id}`)}>
            <DeleteIcon
                className={classes.deleteIcon}
                onClick={handleDeletePalette}
            />
            <div className={classes.colors}>
                {miniColorBoxes}
            </div>
            <h5 className={classes.title}>{paletteName} <span className={classes.emoji}>{emoji}</span> </h5>
        </div>
    )
}

export default withStyles(styles)(memo(MiniPalette));