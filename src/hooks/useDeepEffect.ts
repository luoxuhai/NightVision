import { EffectCallback, DependencyList } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

/**
 * It's React's useEffect hook, except using deep comparison on the inputs, not reference equality
 */
export function useDeepEffect(effect: EffectCallback, deps?: DependencyList) {
  return useDeepCompareEffect(effect, deps);
}
