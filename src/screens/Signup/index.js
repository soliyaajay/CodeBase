import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Image, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { CommonActions } from "@react-navigation/native";

import {
    userRegistrationWatcher,
    userNameChanged,
    userPhoneChanged,
    userEmailChanged,
    userPasswordChanged,
    userTokenChanged,
    userConfirmPasswordChanged,
    clearSignupAllField,
} from '../../store/action';

// import components
import styles from './styles'
import { ButtonComponent, TextComponent, TextInputComponent, ToastComponent, LoadingComponent } from '../../components';
import { Matrics, Color, Constants } from "../../common/styles";
import { validateEmail } from '../../common/helper/common';
import images from '../../common/helper/Images';
import { Storage } from '../../common/localStorage';
import AsynchStorageKey from '../../common/localStorage/AsynchStorageKey';

class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            policyChecked: false,
            isDisplay: false,
            message: "",
            isLoading: false,
        }
    }

    componentDidMount() {
    }

    //-----USER SIGNUP API CALLING... ------//
    userRegistration() {
        if (this.props.userEmail === "") {
            this.displayToast("Email field may not be blank.");
        } else if (validateEmail(this.props.userEmail) === false) {
            this.displayToast("Please enter valid email address.");
        } else if (this.props.userName === "") {
            this.displayToast("Name field may not be blank.");
        } else if (this.props.userPassword === "") {
            this.displayToast("Password field may not be blank.");
        } else if (this.props.userConfirmPassword === "") {
            this.displayToast("Confirm password field may not be blank.");
        } else if (this.props.userConfirmPassword != this.props.userPassword) {
            this.displayToast("Confirm password does not match.");
        } else if (this.state.policyChecked === false) {
            this.displayToast("Please agree our privacy policy.");
        } else {

            this.startLoading();

            const param = {
                username: this.props.userName,
                email: this.props.userEmail,
                password1: this.props.userPassword,
                password2: this.props.userPassword,
                phone: this.props.userPhone,
            };

            this.props.userRegistrationWatcher(param, (response) => {
                this.stopLoading();
                if (response.status === 200 || response.status === 201) {

                    const token = response.data.token;
                    const userId = response.data.user.id;
                    const userFirstName = response.data.user.first_name;
                    const userLastName = response.data.user.last_name;
                    const userEmail = response.data.user.email;
                    const userPhone = response.data.user.phone;
                    const userPhoto = response.data.user.photo;

                    const obj = { token, userId, userFirstName, userLastName, userEmail, userPhone, userPhoto };

                    Storage.setItem(AsynchStorageKey.accountInfo, obj)

                    this.goToNextView('Home');
                } else if (response.status === 400) {
                    if (response.data.username !== undefined) {
                        this.displayToast(response.data.username[0]);
                    } else if (response.data.password1 !== undefined) {
                        this.displayToast(response.data.password1[0]);
                    } else if (response.data.email !== undefined) {
                        this.displayToast(response.data.email[0]);
                    } else {
                        this.displayToast('Please enter correct information');
                    }
                }
            }, (error) => {
                this.stopLoading();
                console.log('11111111', error);
            });
        }
    }


    goToNextView = (nextView = null) => {
        this.props.navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: nextView }],
            }),
        )
        return
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

        const { policyChecked, isLoading, isDisplay } = this.state;

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
                                <TextComponent mtop={Matrics.ScaleValue(20)} semiBoldFont xxxLarge children='Sign Up' />
                                <TextComponent color={Color.GREY} mtop={Matrics.ScaleValue(10)} regularFont large children='Welcome' />
                                <TextComponent color={Color.GREY} regularFont large children='Sign up to continue' />
                            </View>
                            <View style={styles.styleMain}>

                                <TextInputComponent
                                    onChangeText={(text) => this.props.userNameChanged(text)}
                                    value={this.props.userName}
                                    placeholder={'Enter your name'}
                                    children='Your full name'
                                    bordered
                                    borderColor={Color.PRIMARY} />

                                <TextInputComponent
                                    onChangeText={(text) => this.props.userEmailChanged(text)}
                                    value={this.props.userEmail}
                                    placeholder={'Enter your e-mail'}
                                    keyboardType={'email-address'}
                                    children='Your e-mail'
                                    bordered
                                    borderColor={Color.PRIMARY} />

                                <TextInputComponent
                                    onChangeText={(text) => this.props.userPhoneChanged(text)}
                                    value={this.props.userPhone}
                                    placeholder={'Enter your phone number'}
                                    keyboardType={'number-pad'}
                                    children='Your phone number'
                                    bordered
                                    borderColor={Color.PRIMARY} />

                                <TextInputComponent
                                    onChangeText={(text) => this.props.userPasswordChanged(text)}
                                    value={this.props.userPassword}
                                    placeholder={'Enter your password'}
                                    isSecureText={true}
                                    children='Your password'
                                    bordered
                                    borderColor={Color.PRIMARY} />

                                <TextInputComponent
                                    onChangeText={(text) => this.props.userConfirmPasswordChanged(text)}
                                    value={this.props.userConfirmPassword}
                                    placeholder={'Enter confirm password'}
                                    isSecureText={true}
                                    children='Confirm password'
                                    bordered
                                    borderColor={Color.PRIMARY} />
                            </View>
                            <View style={styles.styleBottom}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => { this.setState({ policyChecked: !policyChecked }) }}>
                                        <Image source={policyChecked ? images.img_checkbox_fill : images.img_checkbox_blank} style={styles.styleImage} resizeMode='contain' />
                                    </TouchableOpacity>
                                    <TextComponent mleft={Matrics.ScaleValue(5)} color={Color.GREY} regularFont small children={`I agree with our`} />
                                    <TouchableOpacity onPress={() => { }}>
                                        <TextComponent color={Color.PRIMARY} regularFont small children=' Terms and Conditions' />
                                    </TouchableOpacity>
                                </View>

                                <ButtonComponent
                                    click={() => {
                                        this.userRegistration();
                                    }}
                                    mtop={Matrics.ScaleValue(5)}
                                    borderRadius={Matrics.ScaleValue(5)}
                                    backgroundColor={Color.PRIMARY}
                                    textColor={Color.WHITE}
                                    textSize={Constants.LARGE}
                                    children='Create Account' />

                                <View style={{ flexDirection: 'row' }}>
                                    <TextComponent color={Color.GREY} mtop={Matrics.ScaleValue(10)} regularFont normal children={`Already have an account?`} />
                                    <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
                                        <TextComponent color={Color.PRIMARY} mtop={Matrics.ScaleValue(10)} regularFont normal children=' Sign In' />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <ToastComponent children={this.state.message} isDisplay={isDisplay} />

                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
}

//---- Connect to props functions and values -----//
function mapStateToProps({ signupReducer }) {
    const { registrationData, userToken, userName, userEmail, userPhone, userPassword, userConfirmPassword } = signupReducer;
    return { registrationData, userToken, userName, userEmail, userPhone, userPassword, userConfirmPassword };
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        userRegistrationWatcher,
        userNameChanged,
        userPhoneChanged,
        userEmailChanged,
        userPasswordChanged,
        userConfirmPasswordChanged,
        userTokenChanged,
        clearSignupAllField
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
