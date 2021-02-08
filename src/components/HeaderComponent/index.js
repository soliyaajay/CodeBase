import { Text } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';
import { Color, Constants } from '../../common/styles';

class HeaderComponent extends React.Component {
    onClick = () => this.props.onPress();

    render() {
        const {
            textColor,
            textSize,
        } = this.props;

        btnTextStylesArray.push({
            color: textColor,
            fontFamily: Constants.FONT_MEDIUM,
            fontSize: textSize,
        });

        return (
            <TextComponent style={btnTextStylesArray} normal regularFont>
                {children}
            </TextComponent>
        );
    }
}

HeaderComponent.defaultProps = {
    textColor: Color.white,
    textSize: Constants.NORMAL,
};
HeaderComponent.propTypes = {
    textColor: PropTypes.string,
    textSize: PropTypes.number,
};
export default HeaderComponent;