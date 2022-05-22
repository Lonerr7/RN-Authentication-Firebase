import { useDispatch, useSelector } from 'react-redux';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { registerOrLogInThunk } from '../redux/userSlice';

function LoginScreen() {
  const dispatch = useDispatch();
  const isFetching = useSelector((state) => state.user.isFetching);

  const logInHandler = async (email, password) => {
    dispatch(
      registerOrLogInThunk({
        mode: 'logIn',
        email,
        password,
      })
    );
  };

  if (isFetching) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent isLogin onAuthenticate={logInHandler} />;
}

export default LoginScreen;
