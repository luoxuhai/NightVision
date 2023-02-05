import { NativeModules } from 'react-native';

type ToastOptions = {
  title?: string;
  message?: string;
  preset: 'done' | 'error';
  haptic?: 'success' | 'warning' | 'error' | 'none';
  duration?: number;
};

function toast(options: ToastOptions) {
  NativeModules.RNToast.show({
    duration: 2,
    ...options,
    title: options.title ?? '',
    message: options.message ?? '',
    haptic: options.haptic ?? 'none',
  });
}

export const Overlay = { toast };
