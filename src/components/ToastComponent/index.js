import React from 'react';
import { View, Keyboard, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { TextComponent } from '..';
import { Color, Constants, Matrics } from '../../common/styles';
import styles from './styles';

class ToastComponent extends React.Component {
  render() {
    const btnTextStylesArray = [];
    const {
      isDisplay,
      children,
    } = this.props;

    btnTextStylesArray.push({
      color: Color.WHITE,
      fontFamily: Constants.FONT_MEDIUM,
      fontSize: Constants.NORMAL,
    });

    return (
      isDisplay
        ?
        <View style={styles.styleView}>
          <TextComponent style={btnTextStylesArray} normal regularFont>
            {children}
          </TextComponent>
        </View>
        :
        null
    );
  }
}
export default ToastComponent;
