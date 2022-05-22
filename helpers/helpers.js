import { Alert } from 'react-native';

export const alertFunction = () => {
  Alert.alert(
    `An error occured!`,
    `Something went wrond with authentication. Check your input data or try again later!`,
    [{ text: 'Ok', style: 'default' }]
  );
};
