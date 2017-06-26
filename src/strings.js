// =============================================================================
// Core.js | Strings
// (c) Mathigon
// =============================================================================



import { tabulate, sortBy } from 'arrays';


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

export function stringDistance(s1, s2) {
  let arr = tabulate(0, s1.length + 1, s2.length + 1);
  for (let i = 0; i <= s1.length; i++) arr[i][0] = i;
  for (let i = 0; i <= s2.length; i++) arr[0][i] = i;

  for (let i = 1; i <= s1.length; i++)
    for (let j = 1; j <= s2.length; j++)
      arr[i][j] = Math.min(arr[i - 1][j - 1] + (s1.charAt(i - 1) == s2.charAt(j - 1) ? 0 : 1),
        arr[i - 1][j] + 1, arr[i][j - 1] + 1);

  return arr[s1.length][s2.length];
}

export function autocorrect(word, dict) {
  let maxDistance = word.length / 2;
  let distances = dict.map(w => ({w, d: stringDistance(word, w)})).filter(({d}) => d < maxDistance);
  let bestMatch = sortBy(distances, 'd')[0];
  return bestMatch ? bestMatch.w : null;
}
