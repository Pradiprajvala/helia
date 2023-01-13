import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { dark, fontLight, light, primary, primaryDark, primaryLight, warning } from '../../assets/styles'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'; 
import { CheckBox } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup'
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const SignUpForm = () => {

    const SignupFormSchema = Yup.object().shape({
        email: Yup.string().email().required('An email is required'),
        password: Yup.string().min(8, 'Password has to have 8 character').required('A password is required'),
    })

    const [viewPassword, setViewPassword] = useState(false)
    const [emailFocused, setEmailFocused] = useState(false)
    const [passwordFocused, setPasswordFocused] = useState(false)
    const [remenberMe, setRemenberMe] = useState(false)
    const [isSubmitPressed, setIsSubmitPressed] = useState(false)
    const [emailAlreadyUsed, setEmailAlreadyUsed] = useState(false)
    const [errorCreatingAccount, setErrorCreatingAccount] = useState(false)

    const handelCreateAccount = async (email, password) => {
        try {
            const authUser = await createUserWithEmailAndPassword(auth, email, password)

            // Signed in and user created
            const user = authUser.user 
            console.log('user created')

            // add user to firestore
            await setDoc(doc(db, "users", user.email), {
            }).catch((error) => {
                console.log('Error in adding user to firebase',error)
            })
            console.log('user added to firestore')

        } catch(error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('error',errorMessage)
            
            switch(errorCode){
                case 'auth/email-already-in-use':
                    console.log('email already in used before')
                    setErrorCreatingAccount(false)
                    setEmailAlreadyUsed(true)
                    break
                default:
                    console.log('some error',errorCode)
                    setEmailAlreadyUsed(false)
                    setErrorCreatingAccount(true)
            }
        }
        
    }

  return (
    <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={SignupFormSchema} 
        onSubmit={ (values) => {
            setIsSubmitPressed(true)
            handelCreateAccount(values.email, values.password)
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
                <View style={styles.signupButtonContainer}>
                    <TouchableOpacity 
                        style={styles.signupButton(isValid)} 
                        disabled={!isValid} onPress={handleSubmit}
                        >
                        <Text style={styles.signupButtonTitle}>Sign up</Text>
                    </TouchableOpacity>
                </View>
                {
                    emailAlreadyUsed && 
                    <View style={styles.wrongCredentialsContainer}>
                        <Text style={styles.wrongCredentialsTitle}>Email already used!!!</Text>
                    </View>
                }
                {
                    errorCreatingAccount && 
                    <View style={styles.wrongCredentialsContainer}>
                        <Text style={styles.wrongCredentialsTitle}>Could not create account!!!</Text>
                    </View>
                }
            </View>
        )}
    </Formik>
    
  )
}

export default SignUpForm

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
    signupButtonContainer: {
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
    signupButton: (isValid) => ({
        backgroundColor: isValid ? primary : primaryDark,
        width: '85%',
        alignItems: 'center',
        borderRadius: 32,
        padding: 16,
    }),
    signupButtonTitle: {
        color: 'white',
        fontFamily: 'UrbanistSemiBold',
        fontSize: 16,
    },
    wrongCredentialsTitle: {
        fontFamily: 'UrbanistBold',
        color: warning,
    }
})