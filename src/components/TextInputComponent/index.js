import React from 'react';
import { View, TouchableOpacity, Keyboard, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { TextComponent } from '../../components';
import { Color, Constants, Matrics } from '../../common/styles';

class TextInputComponent extends React.Component {
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
      isMultiline,
      isSecureText,
      placeholder,
      value,
      keyboardType,
      isEditable,
      onChangeText,
    } = this.props;

    btnContainerStylesArray.push({
      paddingHorizontal: Matrics.ScaleValue(10),
    });

    const btnWholeStyles = [];
    btnWholeStyles.push({
      marginTop: mtop,
      marginBottom: mbottom,
      marginLeft: mleft,
      marginRight: mright,
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

    if (bordered) {
      btnContainerStylesArray.push({
        borderColor,
        borderWidth: 1,
        borderRadius
      });
    }

    btnTextStylesArray.push({
      color: Color.GREY,
      fontFamily: Constants.FONT_MEDIUM,
      fontSize: Constants.SMALL,
    });

    return (
      <TouchableOpacity style={[style, btnWholeStyles, { borderRadius }]}>
        <TextComponent mbottom={Matrics.ScaleValue(5)} style={btnTextStylesArray} normal regularFont>
          {children}
        </TextComponent>
        <View style={btnContainerStylesArray}>
          <TextInput
            style={{ textAlign: 'left', paddingVertical: Matrics.ScaleValue(10), fontSize: Constants.NORMAL, }}
            multiline={isMultiline}
            onChangeText={onChangeText}
            secureTextEntry={isSecureText}
            placeholder={placeholder}
            value={value}
            keyboardType={keyboardType}
            editable={isEditable}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

TextInputComponent.defaultProps = {
  ...TouchableOpacity.defaultProps,
  textColor: Color.white,
  textSize: Constants.NORMAL,
  btn_block: true,
  borderRadius: Matrics.ScaleValue(5),
  mtop: 20,
  mbottom: 0,
  mleft: 0,
  mright: 0,
  center: false,
  borderColor: Color.PRIMARY,
  bordered: false,

  ...TextInput.defaultProps,
  multiline: false,
  secureTextEntry: false,
  placeholder: '',
  value: '',
  keyboardType: 'default',
  editable: true,
};
TextInputComponent.propTypes = {
  ...TouchableOpacity.propTypes,
  textColor: PropTypes.string,
  textSize: PropTypes.number,
  borderColor: PropTypes.string,

  btn_block: PropTypes.bool,
  borderRadius: PropTypes.number,
  mtop: PropTypes.number,
  mbottom: PropTypes.number,
  mleft: PropTypes.number,
  mright: PropTypes.number,
  center: PropTypes.bool,
  bordered: PropTypes.bool,

  ...TextInput.propTypes,
  isMultiline: PropTypes.bool,
  isSecureText: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  keyboardType: PropTypes.string,
  isEditable: PropTypes.bool,
};
export default TextInputComponent;
