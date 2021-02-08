import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { TextComponent } from '..';
import { Color, Constants, Matrics } from '../../common/styles';
import styles from './styles';

class LoadingComponent extends React.Component {
  render() {
    const btnTextStylesArray = [];
    const {
      isLoading,
      children,
    } = this.props;

    btnTextStylesArray.push({
      color: Color.WHITE,
      fontFamily: Constants.FONT_MEDIUM,
      fontSize: Constants.NORMAL,
    });

    return (
      isLoading
        ?
        <View style={styles.LoaderContainer}>
          <View style={styles.LoaderWrapper}>
            <ActivityIndicator
              animating={isLoading}
              size="large"
              color={Color.WHITE}
              style={{ marginBottom: Matrics.ScaleValue(5) }}
            />
            <TextComponent style={btnTextStylesArray} normal regularFont>
              {children}
            </TextComponent>
          </View>
        </View>
        :
        null
    )
  }
}
export default LoadingComponent;
