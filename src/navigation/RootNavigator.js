import React, {useState, useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {getAuth, onAuthStateChanged} from '@react-native-firebase/auth';
import {AuthStack} from './AuthStack';
import {AppStack} from './AppStack';
import {AuthenticatedUserContext} from '../providers';
import {LoadingIndicator} from '../components';

export const RootNavigator = () => {
  const {user, setUser} = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuthStateChanged = onAuthStateChanged(
      auth,
      authenticatedUser => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      },
    );
    // unsubscribe auth listener on unmount
    return unsubscribeAuthStateChanged;
  }, [user]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
