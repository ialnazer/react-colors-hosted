import React from 'react';
import DraggableColorBox from './DraggableColorBox';
import { SortableContainer, arrayMove } from 'react-sortable-hoc';

const DraggableColorBoxList = SortableContainer(({ colors, deleteColor }) => {
    // const onSortEnd = ({ oldIndex, newIndex }) => {
    //     const newColors = arrayMove(colors, oldIndex, newIndex);
    //     setColors(newColors)
    // };
    return (
        <div style={{ height: '100%' }}>
            {colors.map((color, i) =>
                <DraggableColorBox
                    index={i}
                    key={color.name}
                    deleteColor={() => deleteColor(color.name)}
                    color={color.color}
                    name={color.name}
                />
            )}
        </div>
    )
})

export default DraggableColorBoxList