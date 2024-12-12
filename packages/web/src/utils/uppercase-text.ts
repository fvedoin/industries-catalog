export const uppercaseText = (text: string): string => {
  return text.replace(/\b[a-z]/g, (char) => char.toUpperCase());
};