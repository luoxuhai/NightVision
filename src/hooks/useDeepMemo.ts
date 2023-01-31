import React, { FunctionComponent } from 'react';
import isEqual from 'react-fast-compare';

const useDeepCompareMemoize = (value: any) => {
  const ref = React.useRef([]);

  if (!isEqual(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
};

export const useDeepMemo = <T>(factory: () => T, dependencies: any): T => {
  return React.useMemo(factory, useDeepCompareMemoize(dependencies));
};

export const deepMemo = <P extends object>(component: FunctionComponent<P>) =>
  React.memo(component, isEqual);