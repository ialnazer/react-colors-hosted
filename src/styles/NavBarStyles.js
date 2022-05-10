import sizes from './sizes'

export default {
    selectContainer: {
        marginLeft: 'auto',
        marginRight: '1rem'
    },
    logo: {
        marginRight: '15px',
        padding: '0 13px',
        background: '#eceff1',
        fontSize: '22px',
        fontFamily: 'Roboto',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        '& a': {
            textDecoration: 'none',
            color: 'black'
        },
        [sizes.down('xs')]: {
            // display: 'none',
            //
            width: '100px',
            fontSize: '12px',
            padding: 0
            //
        },
    },
    Navbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '6vh'
    },
    slider: {
        width: '150px',
        margin: '0 10px',
        display: 'inline-block',
        '& .rc-slider-track': {
            background: 'transparent'
        },
        '& .rc-slider-rail': {
            height: '8px'
        },
        '& .rc-slider-handle, .rc-slider-handle:active, .rc-slider-handle:hover, .rc-slider-handle:focus':
        {
            background: 'green',
            outline: 'none',
            border: '2px solid green',
            boxShadow: 'none',
            width: '13px',
            height: '13px',
            marginLeft: '-7px',
            marginTop: '-3px'
        },
        [sizes.down('sm')]: {
            width: '200px',
        },
        //
        [sizes.down('xs')]: {
            width: '110px',
        },
        //
    },
    //
    levelSpan: {
        [sizes.down('xs')]: {
            fontSize: '12px',
        },
    }
    //
}