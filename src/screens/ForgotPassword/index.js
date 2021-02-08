import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Image, SafeAreaView, KeyboardAvoidingView, ScrollView } from 'react-native';

import {
    userForgotPasswordWatcher,
    userForgotEmailChanged,
} from "../../store/action";

// import components
import styles from './styles';
import images from '../../common/helper/Images';
import { ButtonComponent, TextComponent, TextInputComponent, ToastComponent, LoadingComponent, PopupDialogComponent } from '../../components';
import { Matrics, Color, Constants } from "../../common/styles";
import { validateEmail } from '../../common/helper/common';

class ForgotPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            isDisplay: false,
            message: "",
            isLoading: false,
            showInfoDialog: false,
        }
    }

    componentDidMount() {
    }

    //-----USER LOGIN API CALLING... ------//
    forgotPassword() {
        if (this.props.userEmail === "") {
            this.displayToast("Email field may not be blank.");
        } else if (validateEmail(this.props.userEmail) === false) {
            this.displayToast("Please enter valid email address.");
        } else {

            this.startLoading();

            const param = {
                email: this.props.userEmail,
            };

            this.props.userForgotPasswordWatcher(param, (response) => {
                this.stopLoading();
                if (response.status === 200 || response.status === 201) {
                    this.setState({ showInfoDialog: true })
                } else if (response.status === 400) {
                    if (response.data.email !== undefined) {
                        this.displayToast(response.data.email[0]);
                    } else {
                        this.displayToast('Please enter correct email');
                    }
                }
            }, (error) => {
                this.stopLoading();
                console.log('11111111', error);
            });
        }
    }

    startLoading() {
        this.setState({ isLoading: true })
    }

    stopLoading() {
        this.setState({ isLoading: false })
    }

    displayToast(message) {
        this.setState({ message: message, isDisplay: true })
        setTimeout(() => this.setState({ message: "", isDisplay: false }), 4000);
    }

    render() {

        const { isLoading, isDisplay, showInfoDialog } = this.state;

        return (
            <SafeAreaView style={styles.info}>
                <KeyboardAvoidingView style={styles.info} behavior="padding" enabled>

                    <LoadingComponent children={'Loading...'} isLoading={isLoading} />

                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.container}
                    >
                        <View style={[styles.mainView, {}]}>
                            <View style={styles.styleName}>
                                <TextComponent mtop={Matrics.ScaleValue(30)} semiBoldFont xxxLarge children='Forgot password?' />
                                <TextComponent
                                    style={{ paddingHorizontal: Matrics.ScaleValue(10) }}
                                    align={'center'}
                                    color={Color.GREY}
                                    mtop={Matrics.ScaleValue(10)}
                                    regularFont
                                    large
                                    children='Write your email address to recieve password recovery email from us.' />
                            </View>
                            <View style={styles.styleMain}>
                                <TextInputComponent
                                    onChangeText={(text) => this.props.userForgotEmailChanged(text)}
                                    value={this.props.userEmail}
                                    placeholder={'Enter your e-mail'}
                                    keyboardType={'email-address'}
                                    children='Your e-mail'
                                    bordered
                                    borderColor={Color.PRIMARY} />
                            </View>
                            <View style={styles.styleBottom}>
                                <ButtonComponent
                                    click={() => {
                                        this.forgotPassword();
                                    }}
                                    mtop={Matrics.ScaleValue(10)}
                                    borderRadius={Matrics.ScaleValue(5)}
                                    backgroundColor={Color.PRIMARY}
                                    textColor={Color.WHITE}
                                    textSize={Constants.LARGE}
                                    children='Send the link' />
                            </View>

                            <ToastComponent children={this.state.message} isDisplay={isDisplay} />

                        </View>
                    </ScrollView>

                    {showInfoDialog === true
                        ?
                        <PopupDialogComponent
                            modalVisible={showInfoDialog}
                            headerText="Success"
                            bodyText={`An email has been sent with instructions to reset your password. Please check your inbox and click on the link.`}
                            buttonLeftName="Okay"
                            buttonRightName="Okay"
                            numberOfButton={1}
                            handleButton={value => {
                                this.setState({ showInfoDialog: false }, () => {
                                    this.props.navigation.goBack();
                                });
                            }}
                            toggleModal={value => {
                                this.setState({ showInfoDialog: false }, () => {
                                    this.props.navigation.goBack();
                                });
                            }}
                        />
                        :
                        null
                    }
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
}

//---- Connect to props functions and values -----//
function mapStateToProps({ ForgotPasswordReducer }) {
    const { userForgotPaswordData, userEmail } = ForgotPasswordReducer;
    return { userForgotPaswordData, userEmail };
}

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        userForgotPasswordWatcher,
        userForgotEmailChanged
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
