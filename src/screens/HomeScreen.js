import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {getAuth, signOut} from '@react-native-firebase/auth';

export const HomeScreen = () => {
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  };

  return (
    <View style={styles.container}>
      <Button title="Sign Out" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
