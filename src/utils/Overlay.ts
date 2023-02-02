import * as Burnt from 'burnt';
import { HapticFeedback } from './HapticFeedback';

type ToastOptions = {
  title?: string;
  message?: string;
  preset: 'done' | 'error'; // TODO custom option
  /**
   * Duration in seconds.
   */
  duration?: number;
  haptic?: 'success' | 'warning' | 'error' | 'none';
  /**
   * Defaults to `true`.
   */
  shouldDismissByDrag?: boolean;
};

function toast(options: ToastOptions) {
  dismissAllAlerts();
  Burnt.toast({
    duration: 2,
    ...options,
    title: options.title ?? '',
    message: options.message ?? '',
    haptic: options.haptic ?? 'none',
  });
}

function dismissAllAlerts() {
  Burnt.dismissAllAlerts();
}

type AlertOptions = {
  title?: string;
  message?: string;
  shouldDismissByTap?: boolean;
  /**
   * @default true
   */
  shouldDismissAllAlerts?: boolean;
} & (
  | {
      preset: 'heart' | 'done' | 'error';

      /**
       * Duration in seconds.
       */
      duration?: number;
    }
  | {
      preset: 'spinner';
      /**
       * Max timeout of the spinner in seconds. Required for this preset to avoid an infinite spinner.
       *
       * It's highly, highly recommended that you manually dismiss the alert using `Burnt.dismissAllAlerts()`.
       *
       * If you don't, then you risk having an infinite loading spinner for users.
       *
       * ```ts
       * Burnt.alert({
       *   preset: "spinner",
       *   title: 'Loading...',
       *   duration: 10, // Maximum of 10 seconds
       * })
       *
       * try {
       *   await createUser()
       * } finally {
       *   Burnt.dismissAllAlerts()
       * }
       * ```
       */
      duration: number;
    }
);

function alert({ preset = 'done', shouldDismissAllAlerts = true, ...options }: AlertOptions) {
  if (shouldDismissAllAlerts) {
    dismissAllAlerts();
  }

  Burnt.alert({
    preset,
    duration: 3,
    ...options,
    title: options.title ?? '',
    message: options.message ?? '',
  });

  switch (preset) {
    case 'done':
      HapticFeedback.notification.success();
      break;
    case 'error':
      HapticFeedback.notification.error();
      break;
  }
}

export const Overlay = { toast, alert, dismissAllAlerts };
