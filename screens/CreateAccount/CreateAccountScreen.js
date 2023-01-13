import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import SignUpForm from '../../components/createAccount/SignUpForm';
import { OrDivider } from '../letsYouIn/LetsYouInScreen';
import { bg, borderLight, fontLight, light, primary } from '../../assets/styles';

const CreateAccountScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
        <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={32} color="black" style={styles.backIcon} />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
            <Text style={styles.title}>Create your Account</Text>
        </View>
        <View style={styles.signUpFormContainer} >
            <SignUpForm />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
            <OrDivider title={'or continue with'} />
        </View>
        <View>
            <SignupOption />
        </View>
        </View>
        <View style={styles.alreadyHaveAccountContainer}>
            <TouchableOpacity>
                <Text style={styles.alreadyHaveAccountTitle} onPress={() => navigation.push('LoginScreen')}>
                    Already have an account? <Text style={styles.loginTitle}>Sign In</Text>
                </Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

const SignupOption = ({ option }) => {
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

export default CreateAccountScreen

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        paddingHorizontal: 20,
        backgroundColor: bg,
        flex: 1,
        height: '100%',
        justifyContent: 'space-between'
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