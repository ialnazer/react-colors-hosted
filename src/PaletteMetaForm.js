import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

export default function PaletteMetaForm(props) {

    const { handleSavePalette, palettes, formShowing, handleClose, emojiPickerShowing, showEmojiPicker } = props;

    // const [open, setOpen] = React.useState(false);
    const [newPaletteName, setNewPaletteName] = React.useState('');

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };
    const handlePaletteNameChange = (evt) => {
        setNewPaletteName(evt.target.value);
    };
    const addEmoji = (emoji) => {
        handleSavePalette(newPaletteName, emoji.native)
    };

    React.useEffect(() => {
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
            // check for the uniqueness of the entered palette name
            return palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            );
        });
    })

    return (
        <div>
            {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open form dialog
            </Button> */}
            <Dialog open={formShowing} onClose={handleClose} aria-labelledby="form-dialog-title">
                {/* the onClose here is to close the form when clicking anywhere */}
                <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
                {/* <ValidatorForm onSubmit={() => handleSavePalette(newPaletteName)}> */}
                <ValidatorForm onSubmit={showEmojiPicker}>
                    <DialogContent>
                        <DialogContentText>
                            Please enter a name for your palette. Make sure it's unique.
                        </DialogContentText>
                        {/* <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    /> */}
                        {/* <ValidatorForm onSubmit={() => handleSavePalette(newPaletteName)}> */}
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
                            fullWidth
                            margin='normal'
                        />
                        {/* </ValidatorForm> */}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary" type="submit">
                            Save Palette
                        </Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
            {/* <Dialog open={emojiPickerShowing}> */}
            {emojiPickerShowing &&
                <Picker
                    set='apple'
                    onSelect={addEmoji}
                    title='Pick your emoji…'
                    style={{ position: 'absolute', bottom: '20px', right: '20px', zIndex: 2 }}
                />
            }
            {/* </Dialog> */}
        </div>
    );
}