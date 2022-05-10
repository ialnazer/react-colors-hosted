import React from "react";
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import { useNavigate } from "react-router-dom";
import DraggableColorBoxList from "./DraggableColorBoxList";
import { arrayMove } from 'react-sortable-hoc';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import useStyles from './styles/NewPaletteFormStyles';
import seedColors from './seedColors';

// const drawerWidth = 400;

export default function NewPaletteForm(props) {

    const classes = useStyles();
    // const theme = useTheme();

    const [open, setOpen] = React.useState(false);
    // const [background, setBackground] = React.useState('teal');
    // const [colors, setColors] = React.useState(props.palettes[0].colors); //initialize with material-ui-colors from palettes if it still exists !
    const [colors, setColors] = React.useState(seedColors[0].colors); //initialize with material-ui-colors from seddColors to guarante that they exist
    // const [newColorName, setNewColorName] = React.useState(''); 
    // const [newPaletteName, setNewPaletteName] = React.useState('');
    // const [newNames, setNewNames] = React.useState({ newColorName: '', newPaletteName: '' }); // to update all inputs in one shot bl handleChange
    // moving the palette form nav as a separate component
    // const [newNames, setNewNames] = React.useState({ newColorName: '' });

    const paletteIsFull = colors.length >= props.maxColors;

    const navigate = useNavigate();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    // const handleChangeComplete = (color) => {
    //     setBackground(color.hex);
    // };
    const handleAddColor = (background, newColorName) => {
        const newColor = {
            color: background,
            name: newColorName
            // name: newNames.newColorName
        };
        setColors([...colors, newColor]);
    };

    // // handle each input aside
    // const handleColorNameChange = (evt) => { // handle each input aside
    //     setNewColorName(evt.target.value);
    // }
    // const handlePaletteNameChange = (evt) => { // handle each input aside
    //     setNewPaletteName(evt.target.value);
    // }

    // // handle all inputs change depending on the evt target name
    // const handleChange = (evt) => {
    //     setNewNames({ ...newNames, [evt.target.name]: evt.target.value });
    // }
    const handleSavePalette = (paletteName, emoji) => {
        // let paletteName = newPaletteName;
        // let paletteName = newNames.newPaletteName;
        const newPalette = {
            paletteName: paletteName,
            id: paletteName.toLowerCase().replace(/ /g, '-'),
            colors: colors,
            emoji: emoji
        }
        props.savePalette(newPalette);
        navigate('/')
    }
    const deleteColor = (key) => {
        let newColors = colors.filter(color => color.name !== key);
        setColors(newColors);
        // console.log('delete' + key)
    }
    const onSortEnd = ({ oldIndex, newIndex }) => {
        setColors(arrayMove(colors, oldIndex, newIndex))
    }
    const clearColors = () => {
        setColors([])
    }
    const addRandomColor = () => {
        const allColors = props.palettes.map(p => p.colors).flat(); // here we get multiple arrays inside one array, so .flat
        let randomColor;
        let isDuplicateColor = true;
        while (isDuplicateColor) {
            // console.log(allColors)
            randomColor = allColors[Math.floor(Math.random() * allColors.length)];
            // console.log(randomColor)
            isDuplicateColor = colors.some(color => color.name === randomColor.name);
        }
        setColors([...colors, randomColor]);
    }
    // React.useEffect(() => {
    //     ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
    //         // check for the uniqueness of the entered color name
    //         return colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase()
    //         );
    //     });
    //     ValidatorForm.addValidationRule('isColorUnique', (value) => {
    //         // check for the uniqueness of the entered color
    //         return colors.every(({ color }) => color !== background
    //         );
    //     });
    //     // ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
    //     //     // check for the uniqueness of the entered palette name
    //     //     return props.palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
    //     //     );
    //     // });
    // })
    return (
        <div className={classes.root}>
            <PaletteFormNav
                open={open}
                palettes={props.palettes}
                handleDrawerOpen={handleDrawerOpen}
                handleSavePalette={handleSavePalette}
            />
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <div className={classes.container}>
                    <Typography variant="h4" gutterBottom>Design Your Palette</Typography>
                    <div className={classes.buttons}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={clearColors}
                            className={classes.button}
                        >
                            Clear Palette
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={addRandomColor}
                            disabled={paletteIsFull}
                            className={classes.button}
                        >
                            {paletteIsFull ? 'Palette Full' : 'Random Color'}
                        </Button>
                    </div>
                    <ColorPickerForm
                        paletteIsFull={paletteIsFull}
                        handleAddColor={handleAddColor}
                        colors={colors}
                    />
                </div>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <DraggableColorBoxList
                    onSortEnd={onSortEnd}
                    axis="xy"
                    colors={colors}
                    deleteColor={deleteColor}
                    distance={20}
                />
            </main>
        </div>
    );
}

// class NewPaletteForm extends React.Component {
//     constructor(props) {
//         super(props)
//     }
//     render() {
//         return (
//             <div>gtgtg
//                 <ValidatorForm>
//                     <TextValidator
//                         label="Name"
//                         onChange={this.handleChange}
//                         name="newName"
//                         value={newName}
//                         validators={['required']}
//                         errorMessages={['this field is required']}
//                     />
//                 </ValidatorForm>

//             </div>
//         )
//     }
// }

// export default NewPaletteForm;