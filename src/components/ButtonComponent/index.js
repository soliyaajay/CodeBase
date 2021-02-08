import React from 'react';
import { View, TouchableOpacity, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import { TextComponent } from '../../components'
import { Color, Constants, Matrics } from '../../common/styles';

class ButtonComponent extends React.Component {
  onClick = () => {
    Keyboard.dismiss();
    if (this.props.click) this.props.click();
  };

  render() {
    const btnContainerStylesArray = [];
    const btnTextStylesArray = [];
    const {
      btn_block,
      mtop,
      mbottom,
      mleft,
      mright,
      center,
      borderColor,
      borderRadius,
      textColor,
      textSize,
      style,
      children,
      bordered,
      backgroundColor
    } = this.props;

    btnContainerStylesArray.push({
      paddingHorizontal: Matrics.ScaleValue(20),
      paddingVertical: Matrics.ScaleValue(12)
    });

    const btnWholeStyles = [];
    btnWholeStyles.push({
      marginTop: mtop,
      marginBottom: mbottom,
      marginLeft: mleft,
      marginRight: mright,
      backgroundColor
    });

    if (btn_block) {
      btnWholeStyles.push({
        width: '90%'
      });
    }

    if (center) {
      btnWholeStyles.push({
        alignSelf: 'center'
      });
    }

    btnContainerStylesArray.push({
      alignItems: 'center'
    });

    if (bordered) {
      btnContainerStylesArray.push({
        borderColor,
        borderWidth: 1,
        borderRadius
      });
    }

    btnTextStylesArray.push({
      color: textColor,
      fontFamily: Constants.FONT_MEDIUM,
      fontSize: textSize,
    });

    return (
      <TouchableOpacity  onPress={this.onClick} style={[style, btnWholeStyles, { borderRadius }]}>
        <View style={btnContainerStylesArray}>
          <TextComponent style={btnTextStylesArray} normal regularFont>
            {children}
          </TextComponent>
        </View>
      </TouchableOpacity>
    );
  }
}

ButtonComponent.defaultProps = {
  ...TouchableOpacity.defaultProps,
  textColor: Color.white,
  textSize: Constants.NORMAL,
  backgroundColor: Color.PRIMARY,
  btn_block: true,
  borderRadius: Matrics.ScaleValue(50),
  mtop: 0,
  mbottom: 0,
  mleft: 0,
  mright: 0,
  center: false,
  borderColor: Color.PRIMARY,
  bordered: false
};
ButtonComponent.propTypes = {
  ...TouchableOpacity.propTypes,
  textColor: PropTypes.string,
  textSize: PropTypes.number,
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,

  btn_block: PropTypes.bool,
  borderRadius: PropTypes.number,
  mtop: PropTypes.number,
  mbottom: PropTypes.number,
  mleft: PropTypes.number,
  mright: PropTypes.number,
  center: PropTypes.bool,
  bordered: PropTypes.bool
};
export default ButtonComponent;
