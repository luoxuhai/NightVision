import { useColorScheme, PlatformColor } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';

import { t } from '@/locales';

import { HomeScreen, SettingsScreen, AppMaskScreen } from '../screens';

export type AppStackParamList = {
  Home: undefined;
  Settings: undefined;
  AppMask: undefined;
};

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>;

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = observer(function AppStack() {
  const isDark = useColorScheme() === 'dark';

  return (
    <Stack.Navigator
      screenOptions={{
        headerBlurEffect: isDark ? 'systemMaterialDark' : 'systemMaterialLight',
        headerTransparent: true,
      }}
    >
      <Stack.Screen
        name="Home"
        options={{
          headerShown: false,
        }}
        component={HomeScreen}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          presentation: 'modal',
          title: t('settingsScreen.title'),
        }}
      />
      <Stack.Screen
        name="AppMask"
        component={AppMaskScreen}
        options={{
          headerShown: false,
          animation: 'fade',
          presentation: 'transparentModal',
          autoHideHomeIndicator: true,
        }}
      />
    </Stack.Navigator>
  );
});

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const isDark = useColorScheme() === 'dark';

  const theme = {
    dark: isDark,
    colors: {
      primary: PlatformColor('systemBlue'),
      card: PlatformColor('systemBackground'),
      background: PlatformColor('systemBackground'),
      text: PlatformColor('label'),
      border: PlatformColor('separator'),
      notification: PlatformColor('systemRed'),
    },
  };

  return (
    <NavigationContainer {...props} theme={theme}>
      <AppStack />
    </NavigationContainer>
  );
});
