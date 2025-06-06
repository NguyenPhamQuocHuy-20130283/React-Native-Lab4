import React, {useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import auth, {
  getAuth,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';
import {View, TextInput, Logo, Button, FormErrorMessage} from '../components';
import {Images, Colors} from '../config';
import {useTogglePasswordVisibility} from '../hooks';
import {loginValidationSchema} from '../utils';
import {googleSignIn} from '../providers/authService';

export const LoginScreen = ({navigation}) => {
  const [errorState, setErrorState] = useState('');
  const {passwordVisibility, handlePasswordVisibility, rightIcon} =
    useTogglePasswordVisibility();

  const handleLogin = values => {
    const {email, password} = values;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({user}) => console.log(user))
      .catch(error => setErrorState(error.message));
  };

  const handleGoogleLogin = async () => {
    try {
      console.log('Login button clicked');
      const user = await googleSignIn();
      Alert.alert('Đăng nhập thành công', `Chào ${user.displayName}`);
    } catch (err) {
      Alert.alert('Lỗi', err.message);
    }
  };

  return (
    <>
      <View isSafe style={styles.container}>
        <KeyboardAwareScrollView enableOnAndroid={true}>
          {/* LogoContainer: consits app logo and screen title */}
          <View style={styles.logoContainer}>
            <Logo uri={Images.logo} />
            <Text style={styles.screenTitle}>Welcome back!</Text>
          </View>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={loginValidationSchema}
            onSubmit={values => handleLogin(values)}>
            {({
              values,
              touched,
              errors,
              handleChange,
              handleSubmit,
              handleBlur,
            }) => (
              <>
                {/* Input fields */}
                <TextInput
                  name="email"
                  leftIconName="email"
                  placeholder="Enter email"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  autoFocus={true}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                />
                <FormErrorMessage
                  error={errors.email}
                  visible={touched.email}
                />
                <TextInput
                  name="password"
                  leftIconName="key-variant"
                  placeholder="Enter password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={passwordVisibility}
                  textContentType="password"
                  rightIcon={rightIcon}
                  handlePasswordVisibility={handlePasswordVisibility}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                />
                <FormErrorMessage
                  error={errors.password}
                  visible={touched.password}
                />
                {/* Display Screen Error Mesages */}
                {errorState !== '' ? (
                  <FormErrorMessage error={errorState} visible={true} />
                ) : null}
                {/* Login button */}
                <Button style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Login</Text>
                </Button>
                {/* Google Sign-In button */}
                <Button
                  style={[styles.button, {backgroundColor: '#4285F4'}]}
                  onPress={handleGoogleLogin}>
                  <Text style={styles.buttonText}>Login with Google</Text>
                </Button>
              </>
            )}
          </Formik>
          {/* Button to navigate to SignupScreen to create a new account */}
          <Button
            style={styles.borderlessButtonContainer}
            borderless
            title={'Create a new account?'}
            onPress={() => navigation.navigate('Signup')}
          />
          <Button
            style={styles.borderlessButtonContainer}
            borderless
            title={'Forgot Password'}
            onPress={() => navigation.navigate('ForgotPassword')}
          />
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
  },
  logoContainer: {
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.black,
    paddingTop: 20,
  },
  footer: {
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingBottom: 48,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.orange,
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: Colors.orange,
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: '700',
  },
  borderlessButtonContainer: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
