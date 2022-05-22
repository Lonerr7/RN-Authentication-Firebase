import { Alert } from 'react-native';

export const alertFunction = (message) => {
  Alert.alert(
    `An error occured!`,
    message
      ? message
      : `Something went wrond with authentication. Check your input data or try again later!`,
    [{ text: 'Ok', style: 'default' }]
  );
};
