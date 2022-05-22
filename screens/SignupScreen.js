import { useDispatch, useSelector } from 'react-redux';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { registerOrLogInThunk } from '../redux/userSlice';

function SignupScreen() {
  const dispatch = useDispatch();
  const isFetching = useSelector((state) => state.user.isFetching);

  const signUpHandler = async (email, password) => {
    dispatch(
      registerOrLogInThunk({
        mode: 'register',
        email,
        password,
      })
    );
  };

  if (isFetching) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
