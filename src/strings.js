// =============================================================================
// Core.js | Strings
// (c) 2017 Mathigon
// =============================================================================



export function words(str) {
  if (!str) return [];
  return str.trim().split(/\s+/);
}

export function toTitleCase(str) {
  return str.replace(/\S+/g, function(a){
    return a.charAt(0).toUpperCase() + a.slice(1);
  });
}

export function toCamelCase(str) {
  return str.toLowerCase().replace(/^-/,'').replace(/-(.)/g, function(match, g) {
    return g.toUpperCase();
  });
}

export function repeat(str, n = 1) {
  for (let i=1; i<n; ++i) str += str;
  return str;
}
