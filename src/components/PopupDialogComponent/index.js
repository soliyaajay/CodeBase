
import React, { Component } from "react";
import { Modal, View, TouchableOpacity, } from 'react-native';
import { Color, Constants, Matrics } from '../../common/styles';
import { TextComponent } from '..';
import styles from './styles';

class PopupDialogComponent extends Component {

    handleExit = () => {
        this.props.toggleModal(!this.props.modalVisible);
    }

    handleOkay = () => {
        this.props.handleButton(!this.props.modalVisible);
    }

    render() {
        const btnTextStylesArray = [];
        const textHeaderStylesArray = [];
        const textStylesArray = [];
        const {
            modalVisible,
            headerText,
            bodyText,
            buttonLeftName,
            buttonRightName,
            numberOfButton,
        } = this.props;

        btnTextStylesArray.push({
            color: Color.WHITE,
            fontFamily: Constants.FONT_SEMIBOLD,
            fontSize: Constants.LARGE,
        });

        textHeaderStylesArray.push({
            color: Color.BLACK,
            fontFamily: Constants.FONT_SEMIBOLD,
            fontSize: Constants.XXXLARGE,
        });

        textStylesArray.push({
            color: Color.BLACK,
            fontFamily: Constants.FONT_REGULAR,
            fontSize: Constants.NORMAL,
        });

        return (
            <Modal
                transparent={true}
                animationType={"none"}
                visible={modalVisible}
                onRequestClose={() => { }}>
                <View style={styles.mainContainer}>
                    <View style={styles.modalContainer}>
                        <TextComponent style={textHeaderStylesArray} normal regularFont>
                            {headerText}
                        </TextComponent>
                        <TextComponent mtop={Matrics.ScaleValue(20)} style={textStylesArray} normal regularFont>
                            {bodyText}
                        </TextComponent>
                        <View style={{ height: Matrics.ScaleValue(60), width: '85%', marginVertical: Matrics.ScaleValue(15), flexDirection: 'row' }}>
                            {
                                numberOfButton == 2
                                    ?
                                    <TouchableOpacity style={[styles.selectedButtonStyle, { flex: 1, backgroundColor: Color.BLACK }]} onPress={() => { this.handleExit() }}>
                                        <TextComponent style={btnTextStylesArray} normal regularFont>{buttonLeftName}</TextComponent>
                                    </TouchableOpacity>
                                    :
                                    null
                            }

                            <TouchableOpacity style={[styles.selectedButtonStyle, { flex: 1, backgroundColor: Color.PRIMARY }]} onPress={() => { this.handleOkay() }}>
                                <TextComponent style={btnTextStylesArray} normal regularFont>{buttonRightName}</TextComponent>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}
export default PopupDialogComponent;
