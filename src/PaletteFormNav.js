import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import PaletteMetaForm from './PaletteMetaForm'
import useStyles from './styles/PaletteFormNavStyles';

export default function PaletteFormNav(props) {

    const { open, handleDrawerOpen, handleSavePalette, palettes } = props;

    const [formShowing, setFormShowing] = React.useState(false);
    const [emojiPickerShowing, setEmojiPickerShowing] = React.useState(false);

    const classes = useStyles();

    const showForm = () => {
        setFormShowing(true);
    };
    const closeForm = () => {
        setFormShowing(false);
    };
    const showEmojiPicker = () => {
        setFormShowing(false);
        setEmojiPickerShowing(true);
    };
    // const [newPaletteName, setNewPaletteName] = React.useState('');

    // const handlePaletteNameChange = (evt) => {
    //     setNewPaletteName(evt.target.value);
    // }
    // React.useEffect(() => {
    //     ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
    //         // check for the uniqueness of the entered palette name
    //         return palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
    //         );
    //     });
    // })

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                color="default"
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
                // combine classes depending on conditions (Material UI)
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    // combine classes depending on conditions in another synthax
                    >
                        {/* <MenuIcon /> */}
                        <AddToPhotosIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Create A Palette
                    </Typography>
                </Toolbar>
                <div className={classes.navBtns}>
                    {/* <ValidatorForm onSubmit={() => handleSavePalette(newPaletteName)}>
                        <TextValidator
                            //   value={newPaletteName}  
                            // value={newNames.newPaletteName}
                            value={newPaletteName}
                            label='Palette Name'
                            onChange={handlePaletteNameChange}
                            // onChange={handleChange}
                            name='newPaletteName'
                            validators={['required', 'isPaletteNameUnique']}
                            errorMessages={[
                                'Enter a palette name',
                                'Palette name must be unique'
                            ]}
                        />
                        <Button variant="contained" color="primary" type="submit">
                            Save Palette
                        </Button>
                    </ValidatorForm> */}
                    <Link to='/'>
                        <Button className={classes.button} variant='contained' color='secondary'>Go Back</Button>
                    </Link>
                    <Button className={classes.button} variant="contained" color="primary" onClick={showForm}>
                        Save
                    </Button>
                </div>
            </AppBar>
            <PaletteMetaForm
                handleSavePalette={handleSavePalette}
                palettes={palettes}
                formShowing={formShowing}
                handleClose={closeForm}
                emojiPickerShowing={emojiPickerShowing}
                showEmojiPicker={showEmojiPicker}
            />
        </div>
    );
}

