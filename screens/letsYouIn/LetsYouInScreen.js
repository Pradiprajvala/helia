import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { bg, borderLight, fontLight, primary } from '../../assets/styles'
import { Ionicons, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { Divider } from 'react-native-elements';



const LetsYouInScreen = ({ navigation }) => {

   
    
  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity>
            <Ionicons name="arrow-back-outline" size={32} color="black" style={styles.backIcon} />
        </TouchableOpacity>
        <View>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>Let's you in</Text>
        </View>
        <View style={styles.loginOptions}>
            <TouchableOpacity style={styles.loginOptionContainer}>
            <FontAwesome5 name="facebook" size={24} color="#1b95eb" />
            <Text style={styles.loginOptionTitle}>Continue With facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginOptionContainer} onPress={() => GoogleLogin()}>
            <AntDesign name="google" size={24} color="#e34034" />
            <Text style={styles.loginOptionTitle}>Continue With Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginOptionContainer}>
            <AntDesign name="apple1" size={24} color="black" />
            <Text style={styles.loginOptionTitle}>Continue With Apple</Text>
            </TouchableOpacity>           
        </View>
        <View>
            <OrDivider title={'or'} />
        </View>
        <View style={styles.signInWithPasswordButtonContainer}>
            <TouchableOpacity style={styles.signInWithPasswordButton} onPress={() => navigation.push('LoginScreen')}>
                <Text style={styles.signInWithPasswordButtonTitle}>Sign in with password</Text>
            </TouchableOpacity>
        </View>
        </View>
        <View style={styles.dontHaveAccountContainer}>
            <TouchableOpacity onPress={() => navigation.push('CreateAccountScreen')}>
                <Text style={styles.dontHaveAccountTitle}>
                    Don't have an account? <Text style={styles.signUpTitle}>Sign Up</Text>
                </Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export const OrDivider = ({ title }) => {
    return (
        <View style={styles.orContainer}>
            <Divider style={{ width: '35%', marginHorizontal: 12}} orientation='horizontal' width={1}/>
            <Text style={styles.orTitle}>{title}</Text>
            <Divider style={{ width: '35%', marginHorizontal: 12}} orientation='horizontal' width={1}/>
        </View>
    )
}

export default LetsYouInScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: bg,
        justifyContent: 'space-between',
    },
    titleContainer: {
        flexDirection: 'row',
        width: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 64,
    },
    loginOptions: {
        marginTop: 64,
    },
    loginOptionContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: borderLight,
        padding: 16,
        marginHorizontal: 24,
        marginVertical: 8,
        alignItems: 'center',
    },
    orContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 48,
    },
    signInWithPasswordButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    dontHaveAccountContainer: {
        flexDirection: 'row',
        marginTop: 'auto',
        marginBottom: 36,
        justifyContent: 'center'
    },
    backIcon: {
        marginVertical: 20,
        marginHorizontal: 20
    },
    title: {
        fontFamily: 'UrbanistExtraBold', 
        fontSize: 38,
        fontWeight: '600',
    },
    loginOptionTitle: {
        marginLeft: 8,
        fontSize: 18,
        fontFamily : 'UrbanistSemiBold',
    },
    orTitle: {
        fontSize: 14,
        fontFamily : 'UrbanistSemiBold',
        color: fontLight,
    },
    signInWithPasswordButton: {
        backgroundColor: primary,
        width: '85%',
        alignItems: 'center',
        borderRadius: 32,
        padding: 16,
    },
    signInWithPasswordButtonTitle: {
        color: 'white',
        fontFamily: 'UrbanistSemiBold',
        fontSize: 16,
    },
    dontHaveAccountTitle: {
        color: fontLight,
        fontFamily: 'UrbanistSemiBold',
    },
    signUpTitle: {
        color: primary,
        fontFamily: 'UrbanistBold',
    }
})