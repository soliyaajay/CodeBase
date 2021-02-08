import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Image, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { CommonActions } from "@react-navigation/native";

import {
    userLoginWatcher,
    userLoginEmailChanged,
    userLoginPasswordChanged,
    userLoginTokenChanged,
} from "../../store/action";

// import components
import styles from './styles';
import images from '../../common/helper/Images';
import { ButtonComponent, TextComponent, TextInputComponent, ToastComponent, LoadingComponent } from '../../components';
import { Matrics, Color, Constants } from "../../common/styles";
import { validateEmail } from '../../common/helper/common';
import { Storage } from '../../common/localStorage';
import AsynchStorageKey from '../../common/localStorage/AsynchStorageKey';

class Login extends Component {
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

    //-----USER LOGIN API CALLING... ------//
    userLogin() {
        if (this.props.userEmail === "") {
            this.displayToast("Email field may not be blank.");
        } else if (this.props.userPassword === "") {
            this.displayToast("Password field may not be blank.");
        } else if (validateEmail(this.props.userEmail) === false) {
            this.displayToast("Please enter valid email address.");
        } else {

            this.startLoading();

            const param = {
                email: this.props.userEmail,
                password: this.props.userPassword
            };

            this.props.userLoginWatcher(param, (response) => {
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
                    if (response.data.password !== undefined) {
                        this.displayToast(response.data.password1[0]);
                    } else if (response.data.email !== undefined) {
                        this.displayToast(response.data.email[0]);
                    } else {
                        this.displayToast('Please enter correct credential');
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

        const { isLoading, isDisplay } = this.state;

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
                                <Image source={images.img_splash} style={styles.styleLogo} resizeMode='contain' />
                                <TextComponent mtop={Matrics.ScaleValue(10)} extraBoldFont normal children='Idea Maker' />
                                <TextComponent regularFont small children='The Power of Friendship' />
                                <TextComponent mtop={Matrics.ScaleValue(30)} semiBoldFont xxxLarge children='Log In' />
                                <TextComponent color={Color.GREY} mtop={Matrics.ScaleValue(10)} regularFont large children='Welcome' />
                                <TextComponent color={Color.GREY} regularFont large children='Sign in to continue' />
                            </View>
                            <View style={styles.styleMain}>
                                <TextInputComponent
                                    onChangeText={(text) => this.props.userLoginEmailChanged(text)}
                                    value={this.props.userEmail}
                                    placeholder={'Enter your e-mail'}
                                    keyboardType={'email-address'}
                                    children='Your e-mail'
                                    bordered
                                    borderColor={Color.PRIMARY} />

                                <TextInputComponent
                                    onChangeText={(text) => this.props.userLoginPasswordChanged(text)}
                                    value={this.props.userPassword}
                                    placeholder={'Enter your password'}
                                    isSecureText={true}
                                    children='Your password'
                                    bordered
                                    borderColor={Color.PRIMARY} />

                                <TouchableOpacity style={{ width: '90%' }} onPress={() => { this.props.navigation.navigate("ForgotPassword", {}) }}>
                                    <TextComponent
                                        align={'right'}
                                        color={Color.PRIMARY}
                                        mtop={Matrics.ScaleValue(5)}
                                        small
                                        children='Forgot password?' />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.styleBottom}>
                                <ButtonComponent
                                    click={() => {
                                        this.userLogin();
                                    }}
                                    mtop={Matrics.ScaleValue(10)}
                                    borderRadius={Matrics.ScaleValue(5)}
                                    backgroundColor={Color.PRIMARY}
                                    textColor={Color.WHITE}
                                    textSize={Constants.LARGE}
                                    children='Log In' />

                                <View style={{ flexDirection: 'row' }}>
                                    <TextComponent color={Color.GREY} mtop={Matrics.ScaleValue(10)} regularFont normal children={`Don't have an account?`} />
                                    <TouchableOpacity onPress={() => { this.props.navigation.navigate("Signup", {}) }}>
                                        <TextComponent color={Color.PRIMARY} mtop={Matrics.ScaleValue(10)} regularFont normal children=' Create account' />
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
function mapStateToProps({ loginReducer }) {
    const { loginData, userToken, userEmail, userPassword } = loginReducer;
    return { loginData, userToken, userEmail, userPassword };
}

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        userLoginWatcher,
        userLoginEmailChanged,
        userLoginPasswordChanged,
        userLoginTokenChanged
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login)
