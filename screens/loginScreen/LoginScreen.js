import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { OrDivider } from '../letsYouIn/LetsYouInScreen'
import LoginForm from '../../components/loginScreen/LoginForm';
import { bg, borderLight, fontLight, light, primary } from '../../assets/styles';


const LoginScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
        <View>
        <TouchableOpacity onPress={() => navigation.goBack()} >
            <Ionicons name="arrow-back-outline" size={32} color="black" style={styles.backIcon} />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
            <Text style={styles.title}>Login to your Account</Text>
        </View>
        <View style={styles.signUpFormContainer} >
            <LoginForm />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
            <OrDivider title={'or continue with'} />
        </View>
        <View>
            <LoginOption />
        </View>
        </View>
        <View style={styles.alreadyHaveAccountContainer}>
            <TouchableOpacity>
                <Text style={styles.alreadyHaveAccountTitle} onPress={() => navigation.push('CreateAccountScreen')}>
                    Don't have an account? <Text style={styles.loginTitle}>Sign Up</Text>
                </Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

const LoginOption = () => {
    return (
        <View style={styles.signupOptionsContainer}>
            <TouchableOpacity style={styles.signOptionContainer}>
                <FontAwesome5 name="facebook" size={24} color="#1b95eb" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.signOptionContainer}>
                <AntDesign name="google" size={24} color="#e34034" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.signOptionContainer}>
                <AntDesign name="apple1" size={24} color="black" />
            </TouchableOpacity>          
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flex: 1,
        height: '100%',
        justifyContent: 'space-between',
        backgroundColor: bg 
    },
    titleContainer: {
        marginTop: 48
    },
    backIcon: {
        marginVertical: 20
    },
    title: {
        fontFamily: 'UrbanistExtraBold', 
        fontSize: 38,
        fontWeight: '600',
    },
    signUpFormContainer: {
        marginTop: 48,
    },
    signupOptionsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    signOptionContainer: {
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderColor: borderLight,
        borderWidth: 1,
        borderRadius: 16,
        marginHorizontal: 10,
    },
    alreadyHaveAccountContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 36,
    },
    alreadyHaveAccountTitle: {
        color: fontLight,
        fontFamily: 'UrbanistSemiBold',
    },
    loginTitle: {
        color: primary,
        fontFamily: 'UrbanistBold',
    }
})