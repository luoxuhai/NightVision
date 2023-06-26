import React from 'react';
import Lottie, { AnimatedLottieViewProps } from 'lottie-react-native';

export type LottieSourceTypes = keyof typeof lottieRegistry;

interface LottieViewProps extends AnimatedLottieViewProps {
  source: LottieSourceTypes;
}

export const LottieView = ({ source, ...rest }: LottieViewProps) => {
  const _source = lottieRegistry[source];
  return <Lottie source={_source} {...rest} />;
};

export const lottieRegistry = {
  Pro: require('@/assets/pro.json'),
};
