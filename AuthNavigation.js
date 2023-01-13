import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { SignedOutStack, SignedInStack } from './navigation'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'




const AuthNavigation = () => {
    const [user, setUser] = React.useState(null)

    const userHandler = (user) => { user ? setUser(user) : setUser(null) }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => { userHandler(user) })
    }, [])

  return (
    <>
    {
        user ? <SignedInStack /> : <SignedOutStack />
    }
    </>
    
  )
}

export default AuthNavigation