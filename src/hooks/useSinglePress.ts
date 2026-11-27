import { useCallback, useRef } from "react";

/**
 * Returns a stable wrapper around `handler` that ignores calls arriving
 * within `delay` ms of the previous accepted call. Prevents duplicate
 * actions from rapid double-taps on TouchableOpacity / Pressable.
 *
 * Uses a ref for the handler so the returned function is stable and never
 * needs to be in a dependency array.
 */
export function useSinglePress(
  handler: (() => void) | undefined,
  delay = 500,
): () => void {
  const lastPressRef = useRef(0);
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  return useCallback(() => {
    const h = handlerRef.current;
    if (!h) return;
    const now = Date.now();
    if (now - lastPressRef.current < delay) return;
    lastPressRef.current = now;
    h();
  }, [delay]);
}
