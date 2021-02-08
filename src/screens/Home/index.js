import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Image, SafeAreaView } from 'react-native'
import { CommonActions } from '@react-navigation/native'

// import components
import styles from './styles'
import images from '../../common/helper/Images'
import { TextComponent } from '../../components'
import { Storage } from '../../common/localStorage';
import AsynchStorageKey from '../../common/localStorage/AsynchStorageKey';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            userEmail: '',
        }
    }

    async componentDidMount() {
        const user_info = await Storage.getItem(AsynchStorageKey.accountInfo);
        if (user_info) {
            this.setState({ userEmail: user_info.userEmail })
        }
    }

    render() {

        const { userEmail } = this.state;

        return (
            <SafeAreaView style={styles.info}>
                <Image source={images.img_splash} style={styles.styleLogo} resizeMode='contain'></Image>
                <TextComponent mtop={20} extraBoldFont extraLarge children='Idea Maker' />
                <TextComponent regularFont normal children={`Welcome ${userEmail}`} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)
