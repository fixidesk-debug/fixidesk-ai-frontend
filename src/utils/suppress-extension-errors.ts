// Suppress Chrome extension messaging errors
if (typeof window !== 'undefined') {
  const originalError = console.error;
  console.error = (...args) => {
    const message = args[0]?.toString() || '';
    if (
      message.includes('Could not establish connection') ||
      message.includes('Receiving end does not exist') ||
      message.includes('Extension context invalidated')
    ) {
      return; // Suppress extension errors
    }
    originalError.apply(console, args);
  };
}