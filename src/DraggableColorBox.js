import React from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './styles/DraggableColorBoxStyles';
import DeleteIcon from '@material-ui/icons/Delete';
import { SortableElement } from 'react-sortable-hoc';

const DraggableColorBox = SortableElement((props) => {
    const {
        classes,
        color,
        name,
        deleteColor
    } = props;
    return (
        <div className={classes.root} style={{ backgroundColor: color }}>
            <div className={classes.boxContent}>
                <span>{name}</span>
                <DeleteIcon
                    className={classes.deleteIcon}
                    onClick={deleteColor}
                />
            </div>
        </div>
    )
})

export default withStyles(styles)(DraggableColorBox)