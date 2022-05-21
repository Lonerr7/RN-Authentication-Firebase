import { useState } from 'react';
import { authApi } from '../api/api';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';

function SignupScreen() {
  const [isFetching, setIsFetching] = useState(false);

  const signUpHandler = async ({ email, password }) => {
    setIsFetching(true);
    try {
      const response = await authApi.createUser(email, password);
      console.log(`RESPONSE: `, response);
    } catch (error) {
      Alert.alert(
        `An error occured!`,
        `Something went wrond with authentication. Check your input data or try again later!`,
        [{ text: 'Ok', style: 'default' }]
      );
    }

    setIsFetching(false);
  };

  if (isFetching) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
