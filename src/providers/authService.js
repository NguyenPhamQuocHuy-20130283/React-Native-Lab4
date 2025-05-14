import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from '@react-native-firebase/auth';
import {getApp} from '@react-native-firebase/app';

// Cấu hình Google Signin
GoogleSignin.configure({
  webClientId:
    '276209684810-5ohim8g8vl4mrcijg2ssvfsb0bu930ch.apps.googleusercontent.com',
});

export const googleSignIn = async () => {
  try {
    const auth = getAuth();

    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

    const signInResult = await GoogleSignin.signIn();

    let idToken = signInResult.data?.idToken;

    if (!idToken) {
      idToken = signInResult.idToken;
    }

    if (!idToken) {
      throw new Error('No ID token found from Google SignIn');
    }

    // Tạo Google Credential
    const googleCredential = GoogleAuthProvider.credential(idToken);

    // Đăng nhập Firebase bằng credential
    const userCredential = await signInWithCredential(auth, googleCredential);
    console.log('Login succeed. User credential:', userCredential);

    return userCredential.user;
  } catch (error) {
    console.error('Google Sign-In error:', error);

    throw error;
  }
};
