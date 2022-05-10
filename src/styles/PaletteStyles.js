import sizes from './sizes'

export default {
    Palette: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
    },
    colors: {
        height: '90%'
    },
    goBack: {
        width: '20%',
        height: '50%',
        margin: '0 auto',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        marginBottom: '-4px',
        backgroundColor: 'black',
        '& a': { // Link is an anchor tag
            width: '80%',
            height: '30px',
            display: 'inline-block',
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginLeft: '-40%',
            marginTop: '-15px',
            textAlign: 'center',
            outline: 'none',
            background: 'rgba(255, 255, 255, 0.3)',
            fontSize: '1rem',
            lineHeight: '30px',
            color: 'white',
            textTransform: 'uppercase',
            border: 'none',
            textDecoration: 'none'
        },        
        [sizes.down('lg')]: {
            width: '25%',
            height: '33.3333%',
        },        
        [sizes.down('md')]: {
            width: '50%',
            height: '20%',
        },        
        [sizes.down('xs')]: {
            width: '100%',
            height: '10%',
        },
    }
}