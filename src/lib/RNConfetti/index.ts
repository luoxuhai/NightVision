import { NativeModules } from 'react-native';

interface Options {
  duration: number;
}

export async function start(options: Options): Promise<void> {
  return await NativeModules.RNConfetti.start(options);
}

export async function stop() {
  NativeModules.RNConfetti.stop();
}
