import sanitizeHtml from 'sanitize-html';

export function sanitize(input: string) {
  return sanitizeHtml(input, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2']),
    allowedAttributes: {
      a: ['href', 'name', 'target', 'rel'],
      img: ['src', 'alt'],
      '*': ['style'],
    },
    allowedSchemes: ['http', 'https', 'data', 'mailto', 'tel'],
  });
}
