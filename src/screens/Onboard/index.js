import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Image, SafeAreaView, TouchableOpacity } from 'react-native'

// import components
import styles from './styles'
import images from '../../common/helper/Images'
import { ButtonComponent, TextComponent } from '../../components'
import { Matrics, Color, Constants } from "../../common/styles";

class Onboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
        }
    }

    componentDidMount() {
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

    render() {
        return (
            <SafeAreaView style={styles.info}>
                <View style={[styles.mainView, {}]}>
                    <View style={styles.styleName}>
                        <Image source={images.img_splash} style={styles.styleLogo} resizeMode='contain'></Image>
                        <TextComponent mtop={20} extraBoldFont extraLarge children='Idea Maker' />
                        <TextComponent regularFont normal children='The Power of Friendship' />
                    </View>
                    <View style={styles.styleBottom}>
                        <ButtonComponent
                            click={() => {
                                this.props.navigation.navigate("Signup", {});
                            }}
                            mtop={Matrics.ScaleValue(10)}
                            borderRadius={Matrics.ScaleValue(5)}
                            backgroundColor={Color.PRIMARY}
                            textColor={Color.WHITE}
                            textSize={Constants.LARGE}
                            children='Sign Up' />

                        <View style={{ flexDirection: 'row' }}>
                            <TextComponent color={Color.GREY} mtop={10} regularFont normal children='Already have an account?' />
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate("Login", {}) }}>
                                <TextComponent color={Color.PRIMARY} mtop={10} regularFont normal children=' Log In' />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

//---- Connect to props functions and values -----//
function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Onboard)
