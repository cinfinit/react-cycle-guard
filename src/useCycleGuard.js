import { useRef, useEffect } from 'react';
/**
 * Detects excessive re-renders in a React component.
 * Logs a warning if render count exceeds `maxPerSecond` within one second.
 *
 * @param {string} name - Name of the component (for logs)
 * @param {number} maxPerSecond - Threshold to warn on (default: 10 renders/sec)
 */
export function useCycleGuard(name, maxPerSecond = 10) {
  const renders = useRef([]);
  renders.current.push(Date.now());
  // Keep only timestamps from the last 1 second
  renders.current = renders.current.filter(t => Date.now() - t < 1000);
  useEffect(() => {
    if (renders.current.length > maxPerSecond) {
      console.warn(`[CycleGuard] High render frequency in "${name}"`, {
        count: renders.current.length,
        timestamps: renders.current,
      });
    }
  });
}
