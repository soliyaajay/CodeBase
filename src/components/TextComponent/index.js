import { Text } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';
import { Color, Constants } from '../../common/styles';

class TextComponent extends React.Component {
    onClick = () => this.props.onPress();

    render() {
        const stylesArray = [];
        if (this.props.large) stylesArray.push({ fontSize: Constants.LARGE });
        else if (this.props.normal) stylesArray.push({ fontSize: Constants.NORMAL });
        else if (this.props.small) stylesArray.push({ fontSize: Constants.SMALL });
        else if (this.props.extraLarge) stylesArray.push({ fontSize: Constants.EXTRA_LARGE });
        else if (this.props.xxxLarge) stylesArray.push({ fontSize: Constants.XXXLARGE });
        else stylesArray.push({ fontSize: Constants.NORMAL });

        if (this.props.regularFont)
            stylesArray.push({ fontFamily: Constants.FONT_REGULAR });
        else if (this.props.boldFont)
            stylesArray.push({ fontFamily: Constants.FONT_BOLD });
        else if (this.props.mediumFont)
            stylesArray.push({ fontFamily: Constants.FONT_MEDIUM });
        else if (this.props.extraBoldFont)
            stylesArray.push({ fontFamily: Constants.FONT_EXTRA_BOLD });
        else if (this.props.semiBoldFont)
            stylesArray.push({ fontFamily: Constants.FONT_SEMIBOLD });
        else
            stylesArray.push({ fontFamily: Constants.FONT_REGULAR });

        stylesArray.push({
            color: this.props.secondary ? Color.black : this.props.color,
            marginTop: this.props.mtop,
            marginBottom: this.props.mbottom,
            marginLeft: this.props.mleft,
            marginRight: this.props.mright,
            textAlign: this.props.align
        });
        stylesArray.push(this.props.style);

        let lines = null;
        if (this.props.numberOfLines) {
            lines = this.props.numberOfLines;
        } else if (this.props.singleLine) {
            lines = 1;
        }

        let value = null;
        if (this.props.uppercase) {
            value = this.props.children.toUpperCase();
        } else if (this.props.lowercase) {
            value = this.props.children.toLowerCase();
        }

        return (
            <Text
                {...this.props}
                numberOfLines={lines}
                style={[stylesArray, this.props.containerStyle]}
                onPress={this.props.onPress ? this.onClick : null}>
                {value != null ? value : this.props.children}
            </Text>
        );
    }
}

TextComponent.defaultProps = {
    small: false,
    normal: false,
    large: false,
    bold: false,
    bolder: false,
    lighter: false,
    light: false,
    singleLine: false,
    uppercase: false,
    lowercase: false,
    secondary: false,
    color: Color.TEXT_PRIMARY,
    avenir_book: false,
    avenir_heavy: false,
    avenir_medium: false,
    mtop: 0,
    mbottom: 0,
    mleft: 0,
    mright: 0,
    align: 'left'
};
TextComponent.propTypes = {
    small: PropTypes.bool,
    normal: PropTypes.bool,
    large: PropTypes.bool,
    bold: PropTypes.bool,
    bolder: PropTypes.bool,
    light: PropTypes.bool,
    lighter: PropTypes.bool,
    color: PropTypes.string,
    singleLine: PropTypes.bool,
    uppercase: PropTypes.bool,
    lowercase: PropTypes.bool,
    secondary: PropTypes.bool,
    avenir_book: PropTypes.bool,
    avenir_heavy: PropTypes.bool,
    avenir_medium: PropTypes.bool,
    mtop: PropTypes.number,
    mbottom: PropTypes.number,
    mleft: PropTypes.number,
    mright: PropTypes.number,
    align: PropTypes.string
};
export default TextComponent;