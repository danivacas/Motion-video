import { useState, useCallback } from 'react';

interface UseClipboardOptions {
  timeout?: number;
  onSuccess?: () => void;
  onError?: (err: unknown) => void;
}

export function useClipboard(options: UseClipboardOptions = {}) {
  const { timeout = 2000, onSuccess, onError } = options;
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        onSuccess?.();
        setTimeout(() => setCopied(false), timeout);
        return true;
      } catch (err) {
        onError?.(err);
        return false;
      }
    },
    [timeout, onSuccess, onError]
  );

  return { copied, copy };
}
