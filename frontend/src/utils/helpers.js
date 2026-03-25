export const getInitials = (name) => {
  if (!name) return 'NA';
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2); 
};