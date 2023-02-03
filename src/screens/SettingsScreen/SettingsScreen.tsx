import { StatusBar, Text } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '@/navigators';
import { TextButton } from '@/components/TextButton';

export const SettingsScreen = observer<NativeStackScreenProps<AppStackParamList, 'Settings'>>(
  (props) => {
    useEffect(() => {
      props.navigation.setOptions({
        headerRight: () => <TextButton text="返回" onPress={props.navigation.goBack} />,
      });
    }, []);

    return (
      <>
        <StatusBar barStyle="light-content" hidden={false} />
      </>
    );
  },
);
