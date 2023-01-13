import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { dark, fontLight, light, primary, primaryDark, primaryLight, warning } from '../../assets/styles'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'; 
import { CheckBox } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

const LoginForm = () => {
    const LoginFormSchema = Yup.object().shape({
        email: Yup.string().email().required('An email is required'),
        password: Yup.string().required('A password is required')
    })

    const [viewPassword, setViewPassword] = useState(false)
    const [emailFocused, setEmailFocused] = useState(false)
    const [passwordFocused, setPasswordFocused] = useState(false)
    const [remenberMe, setRemenberMe] = useState(false)
    const [isSubmitPressed, setIsSubmitPressed] = useState(false)
    const [ wrongCredentials, setWrongCredentials ] = useState(false)

    const handleLogin = async (email, password) => {
        try {
            const authUser = await signInWithEmailAndPassword(auth, email, password)

            // Signed in 
            const user = authUser.user 
            console.log('user signed in')

        } catch(error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('error',errorMessage)
            switch(errorCode){
                case 'auth/user-not-found':
                    setWrongCredentials(true)
                    break
                case 'auth/wrong-password':
                    setWrongCredentials(true)
                    break
                default:
                    console.log('some error',errorCode)
            }
        }
    }

  return (
    <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginFormSchema} 
        onSubmit={values => {
            console.log(values)
            setIsSubmitPressed(true)
            handleLogin(values.email, values.password)
        }}
        validateOnMount={true}
        >
        {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
            <View style={styles.container}>
                <View style={styles.textInputContainer(emailFocused, errors.email ? false : true, isSubmitPressed)}>
                    <MaterialIcons name="email" size={20} color={emailFocused ? primary : fontLight} />
                    <TextInput 
                        onBlur={() => { 
                            handleBlur('email') 
                            setEmailFocused(false)}
                        } 
                        onFocus={() => setEmailFocused(true)} 
                        onChangeText={handleChange('email')} 
                        autoCorrect={false} 
                        placeholderTextColor={fontLight} 
                        keyboardType='email-address' 
                        textContentType='emailAddress' 
                        placeholder='Email' 
                        value={values.email}
                        style={styles.textInput(emailFocused)} 
                        />
                </View>
                <View style={styles.textInputContainer(passwordFocused, errors.password ? false : true, isSubmitPressed)}>
                    <MaterialIcons name="lock" size={20} color={passwordFocused ? primary : fontLight} />
                    <TextInput 
                        onBlur={() => 
                            {
                                handleBlur('password')
                                setPasswordFocused(false)
                            }
                        } 
                        onFocus={() => setPasswordFocused(true)} 
                        onChangeText={handleChange('password')} 
                        placeholderTextColor={fontLight} 
                        textContentType='password' 
                        secureTextEntry={!viewPassword} 
                        placeholder='Password' 
                        value={values.password}
                        style={styles.textInput(passwordFocused)} 
                        />
                    <TouchableOpacity style={{ marginLeft: 'auto'}} onPress={() => setViewPassword(!viewPassword)}>
                        <Ionicons name={viewPassword ? "md-eye-sharp" : "md-eye-off-sharp"} size={24} color={passwordFocused ? primary : fontLight} />
                    </TouchableOpacity>
                </View>
                <View style={styles.remenberMeContainer}>
                    <CheckBox checked={remenberMe} onPress={() => setRemenberMe(!remenberMe)} checkedColor={primary} containerStyle={{width: 24}} />
                    <Text style={styles.remenberMeTitle}>Remember me</Text>
                </View>
                <View style={styles.signinButtonContainer}>
                    <TouchableOpacity 
                        style={styles.signinButton(isValid)} 
                        disabled={!isValid} onPress={handleSubmit}
                        >
                        <Text style={styles.signinButtonTitle}>Sign in</Text>
                    </TouchableOpacity>
                </View>
                {
                    wrongCredentials && <View style={styles.wrongCredentialsContainer}>
                    <Text style={styles.wrongCredentialsTitle}>Wrong creadentials entered!!!</Text>
                </View>
                }
                
                {/* TODO: Forget Password Button */}
            </View>
        )}
    </Formik>
    
  )
}

export default LoginForm


const styles = StyleSheet.create({
    textInputContainer: (isFocus, isValid, isSubmitPressed) => ({
        flexDirection: 'row',
        backgroundColor: isFocus ? primaryLight : light,
        padding: 20,
        marginVertical: 8,
        borderRadius: 16,
        alignItems: 'center',
        borderColor: isFocus ? !isValid && isSubmitPressed ? 'red' : primary : 'white',
        borderWidth: 1.5,
    }),
    textInput: (isFocus) => ({
        flex: 1,
        marginLeft: 12,
        color: dark,
        fontFamily: 'UrbanistBold',
        fontSize: 18,
        letterSpacing: 0.5,
    }),
    remenberMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signinButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 8,
    },
    wrongCredentialsContainer: {
        alignItems: 'center',
        marginTop: 8,
    },
    remenberMeTitle: {
        color: dark,
        fontFamily: 'UrbanistSemiBold',
        fontSize: 16,
        marginLeft: 8,
    },
    signinButton: (isValid) => ({
        backgroundColor: isValid ? primary : primaryDark,
        width: '85%',
        alignItems: 'center',
        borderRadius: 32,
        padding: 16,
    }),
    signinButtonTitle: {
        color: 'white',
        fontFamily: 'UrbanistSemiBold',
        fontSize: 16,
    },
    wrongCredentialsTitle: {
        fontFamily: 'UrbanistBold',
        color: warning,
    }
})