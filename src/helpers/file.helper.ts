export function getFileExtension(filename: string) {
  if (!filename) return '';

  const match = filename.match(/\.([a-zA-Z0-9]+)$/);

  return match ? match[1].toLowerCase() : '';
}
