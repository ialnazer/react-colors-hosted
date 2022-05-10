import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import styles from './styles/ColorBoxStyles';

class ColorBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // value: '',
            copied: false
        }
        this.changeCopyState = this.changeCopyState.bind(this)
    }
    changeCopyState() {
        this.setState({ copied: true }, () => {
            setTimeout(() => this.setState({ copied: false }), 1500);
        });
    }
    render() {
        const {
            name,
            background,
            paletteId,
            colorId,
            showingFullPalette,
            classes
        } = this.props;

        const { copied } = this.state;
        // const isDarkColor = chroma(background).luminance() <= 0.08
        // const isLightColor = chroma(background).luminance() >= 0.7
        return (
            <div className={classes.ColorBox} style={{ background }}>
                <div
                    style={{ background }}
                    // className={`${classes.copyOverlay} ${copied && classes.showOverlay}`}
                    className={clsx(classes.copyOverlay, copied && classes.showOverlay)}
                />
                <div
                    // className={`${classes.copyMsg} ${copied && classes.showMsg}`}
                    className={clsx(classes.copyMsg, copied && classes.showMsg)}
                >
                    <h1>Copied!</h1>
                    {/* <p className={`${isLightColor && 'dark-text'}`}>{background}</p> */}
                    <p className={classes.copyText}>{background}</p>
                </div>
                <div>
                    <div className={classes.boxContent}>
                        {/* <span className={isDarkColor ? 'light-text' : ''}>{name}</span> */}
                        <span className={classes.colorName}>{name}</span>
                    </div>
                    <CopyToClipboard text={background}
                        onCopy={this.changeCopyState}
                    >
                        {/* <button className={`copy-button ${isLightColor && 'dark-text'}`}>Copy</button> */}
                        <button className={classes.copyButton}>Copy</button>
                    </CopyToClipboard>
                    {showingFullPalette && (
                        <Link to={`/palette/${paletteId}/${colorId}`} onClick={e => e.stopPropagation()}>
                            {/* <span className={isLightColor ? 'dark-text see-more' : 'see-more'}>More</span> */}
                            {/* <span className={`see-more ${isLightColor && 'dark-text'}`}>More</span> */}
                            <span className={classes.seeMore}>More</span>
                        </Link>)
                    }
                </div>
            </div>
        );
    }
}
export default withStyles(styles)(ColorBox);