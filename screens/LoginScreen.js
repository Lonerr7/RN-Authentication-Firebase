import AuthContent from '../components/Auth/AuthContent';
import { useState } from 'react';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { authApi } from '../api/api';
import { Alert } from 'react-native';

function LoginScreen() {
  const [isFetching, setIsFetching] = useState(false);

  const logInHandler = async ({ email, password }) => {
    setIsFetching(true);
    try {
      const response = await authApi.login(email, password);
      console.log(`RESPONSE DATA: `, response.data);
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
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent isLogin onAuthenticate={logInHandler} />;
}

export default LoginScreen;
