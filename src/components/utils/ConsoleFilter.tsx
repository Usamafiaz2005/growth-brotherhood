'use client';

// Suppress extension-injected hydration warnings at module import time before React hydrates
if (typeof window !== 'undefined') {
  const originalWarn = console.warn;
  const originalError = console.error;

  const shouldFilter = (args: unknown[]) => {
    const msg = args[0];
    if (typeof msg === 'string') {
      if (
        msg.includes('THREE.Clock') ||
        msg.includes('THREE.Timer') ||
        msg.includes('was preloaded using link preload') ||
        msg.includes('hydration-mismatch') ||
        msg.includes('bis_skin_checked') ||
        msg.includes('didn\'t match') ||
        msg.includes('tree hydrated') ||
        msg.includes('Hydration failed') ||
        msg.includes('Text content does not match')
      ) {
        return true;
      }
    }
    return false;
  };

  console.warn = (...args: unknown[]) => {
    if (shouldFilter(args)) return;
    originalWarn.apply(console, args);
  };

  console.error = (...args: unknown[]) => {
    if (shouldFilter(args)) return;
    originalError.apply(console, args);
  };
}

export default function ConsoleFilter() {
  return null;
}
