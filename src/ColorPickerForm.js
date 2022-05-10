import React from "react";
import Button from '@material-ui/core/Button';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import useStyles from './styles/ColorPickerFormStyles';

export default function ColorPickerForm(props) {
    const {
        paletteIsFull,
        handleAddColor,
        colors
    } = props;

    const classes = useStyles(); // hun li2an material UI styles

    const [background, setBackground] = React.useState('teal');
    const [newColorName, setNewColorName] = React.useState('');

    const handleChangeComplete = (color) => {
        setBackground(color.hex);
    };
    const handleColorNameChange = (evt) => { // handle each input aside, see other comments
        setNewColorName(evt.target.value);
    }
    const handleSubmit = () => {
        handleAddColor(background, newColorName);
        setNewColorName('');
    }

    React.useEffect(() => {
        ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
            return colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase()
            );
        });
        ValidatorForm.addValidationRule('isColorUnique', (value) => {
            return colors.every(({ color }) => color !== background
            );
        });
    })

    return (
        <div>
            <ChromePicker
                className={classes.picker}
                color={background}
                onChangeComplete={handleChangeComplete}
            />
            <ValidatorForm
                onSubmit={handleSubmit}
                instantValidate={false}
            >
                <TextValidator
                    placeholder="Color Name"
                    className={classes.colorNameInput}
                    variant='filled'
                    margin='normal'
                    label="Color Name"
                    onChange={handleColorNameChange}
                    // onChange={handleChange}
                    name="newColorName"
                    value={newColorName}
                    // value={newNames.newColorName}
                    validators={['required', 'isColorNameUnique', 'isColorUnique']}
                    errorMessages={[
                        'Enter a color name',
                        'Color name must be unique',
                        'Color already used!'
                    ]}
                />
                <Button
                    className={classes.addColor}
                    style={{
                        backgroundColor: paletteIsFull
                            ? 'grey'
                            : background
                    }}
                    variant="contained"
                    type="submit"
                    disabled={paletteIsFull}
                >
                    {paletteIsFull ? 'Palette Full' : 'Add Color'}
                </Button>
            </ValidatorForm>
        </div>
    )
}