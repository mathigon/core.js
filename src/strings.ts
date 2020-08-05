// =============================================================================
// Core.ts | String Functions
// (c) Mathigon
// =============================================================================


import {repeat2D, sortBy} from './arrays';


/** Splits a string into space separated words. */
export function words(str: string, divider = /\s+/) {
  if (!str) return [];
  return str.trim().split(divider);
}


/** Converts a string to title case. */
export function toTitleCase(str: string) {
  return str.replace(/\S+/g, a => a.charAt(0).toUpperCase() + a.slice(1));
}


/** Converts a string to camel case. */
export function toCamelCase(str: string) {
  return str.toLowerCase().replace(/^-/, '')
      .replace(/-(.)/g, (_, g) => g.toUpperCase());
}


/** Checks if a string is a palindrome. */
export function isPalindrome(str: string) {
  return str === str.split('').reverse().join('');
}


/**
 * Determines the Levenshtein distance between two strings. If ignoreTrailing
 * is true, we will ignore any additional, trailing characters in s2.
 */
export function stringDistance(s1: string, s2: string, ignoreTrailing = false) {
  const arr = repeat2D(0, s1.length + 1, s2.length + 1);
  for (let i = 0; i <= s1.length; i++) arr[i][0] = i;
  for (let i = 0; i <= s2.length; i++) arr[0][i] = i;

  for (let i = 1; i <= s1.length; i++) {
    for (let j = 1; j <= s2.length; j++) {
      arr[i][j] = Math.min(
          arr[i - 1][j - 1] + (s1.charAt(i - 1) === s2.charAt(j - 1) ? 0 : 1),
          arr[i - 1][j] + 1, arr[i][j - 1] + 1);
    }
  }

  if (ignoreTrailing) return Math.min(...arr[s1.length]);
  return arr[s1.length][s2.length];
}


/** Tries to auto-correct a word from a dictionary. */
export function autoCorrect(word: string, dict: string[]) {
  const maxDistance = word.length / 2;
  const distances = dict.map(w => ({w, d: stringDistance(word, w)}))
      .filter(({d}) => d < maxDistance);
  const bestMatch = sortBy(distances, d => d.d)[0];
  return bestMatch ? bestMatch.w : undefined;
}
