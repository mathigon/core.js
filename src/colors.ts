// =============================================================================
// Core.ts | Color Functions
// (c) Mathigon
// =============================================================================


import {last, tabulate, total} from './arrays';


const shortHexRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
const longHexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i;
const rgbaRegex = /rgba?\(([0-9.]+), ?([0-9.]+), ?([0-9.]+)(, ?([0-9.]+))?\)/;

const rainbow = ['#22ab24', '#009ea6', '#0f82f2', '#6d3bbf',
  '#cd0e66', '#eb4726', '#fd8c00'];


function pad2(str: string) {
  return str.length === 1 ? `0${str}` : str;
}

/** Gets the color of a multi-step gradient at a given percentage p */
function getColorAt(gradient: Array<Color|string>, p: number) {
  if (p <= 0) return Color.from(gradient[0]);
  if (p >= 1) return Color.from(last(gradient));

  const r = Math.floor(p * (gradient.length - 1));
  const q = p * (gradient.length - 1) - r;
  return Color.mix(gradient[r + 1], gradient[r], q);
}

function hue2rgb(p: number, q: number, t: number) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1/6) return p + (q - p) * 6 * t;
  if (t < 1/2) return q;
  if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
  return p;
}


/** Color generation and conversion class. */
export class Color {

  constructor(public r: number, public g: number, public b: number,
              public a = 1) {}

  /** Converts this color to a hex string. */
  get hex() {
    const c = [this.r, this.g, this.b].map(x => pad2(Math.round(x).toString(16)));
    const alpha = this.a >= 1 ? '' : pad2(Math.round(this.a * 255).toString(16));
    return `#${c.join('')}${alpha}`;
  }

  /** Converts this color to an rgba string. */
  get rgb() {
    const c = [this.r, this.g, this.b].map(x => Math.round(x)).join(',');
    return `rgba(${c},${this.a})`;
  }

  /** Get the brightness of this color. */
  get brightness() {
    return (this.r * 299 + this.g * 587 + this.g * 114) / 1000;
  }

  /** Converts this color to an HSL array. */
  get hsl() {
    const r = this.r / 255;
    const g = this.g / 255;
    const b = this.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (min + max) / 2;
    const delta = max - min;

    if (max === min) return [0, 0, Math.round(l * 100)];  // achromatic

    let h = (r === max) ? (g - b) / delta : (g === max) ? 2 + (b - r) / delta : 4 + (r - g) / delta;
    h = Math.min(h * 60, 360);
    if (h < 0) h += 360;

    const s = (l <= 0.5) ? delta / (max + min) : delta / (2 - max - min);

    return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
  }

  get chroma() {
    return Math.max(this.r, this.g, this.b) - Math.min(this.r, this.g, this.b);
  }

  toString() {
    return this.rgb;
  }

  /** Creates a copy of this color. */
  copy() {
    return new Color(this.r, this.g, this.b, this.a);
  }

  // ---------------------------------------------------------------------------

  static from(color: Color|string) {
    if (typeof color !== 'string') return color;
    return color.startsWith('#') ? Color.fromHex(color) : Color.fromRgb(color);
  }

  static fromRgb(color: string) {
    const match = color.match(rgbaRegex);
    if (!match) return new Color(0, 0, 0);

    const a = match[4] ? (+match[5] || 0) : 1;
    return new Color(+match[1], +match[2], +match[3], a);
  }

  /** Creates a Color instance from a hex string. */
  static fromHex(hex: string) {
    hex = hex.replace(shortHexRegex, (_m, r, g, b) => r + r + g + g + b + b);

    const rgbParts = longHexRegex.exec(hex);
    if (!rgbParts) return new Color(0, 0, 0);

    return new Color(
      parseInt(rgbParts[1], 16),
      parseInt(rgbParts[2], 16),
      parseInt(rgbParts[3], 16),
      rgbParts[4] ? parseInt(rgbParts[4], 16) / 255 : 1
    );
  }

  static fromHsl(h: number, s: number, l: number) {
    h /= 360;
    s /= 100;
    l /= 100;

    if (s === 0) {
      const l1 = Math.round(l * 255);
      return new Color(l1, l1, l1);
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    const r = hue2rgb(p, q, h + 1/3);
    const g = hue2rgb(p, q, h);
    const b = hue2rgb(p, q, h - 1/3);
    return new Color(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
  }

  /** Generates a rainbow gradient with a given number of steps. */
  static rainbow(steps: number) {
    return tabulate(x => getColorAt(rainbow, x / (steps - 1)), steps);
  }

  /** Generates a rainbow gradient with a given number of steps. */
  static gradient(colors: Array<Color|string>, steps: number) {
    return tabulate(x => getColorAt(colors, x / (steps - 1)), steps);
  }

  static shades(color: Color|string, steps: number, range = 0.5) {
    const light = Color.mix('#fff', color, range);
    const dark = Color.mix('#000', color, range);
    return Color.gradient([light, color, dark], steps);
  }

  /** Linearly interpolates two colors or hex strings. */
  static mix(c1: Color|string, c2: Color|string, p = 0.5) {
    c1 = Color.from(c1);
    c2 = Color.from(c2);

    return new Color(
      p * c1.r + (1 - p) * c2.r,
      p * c1.g + (1 - p) * c2.g,
      p * c1.b + (1 - p) * c2.b,
      p * c1.a + (1 - p) * c2.a
    );
  }

  static mixMany(colors: Color[], weights?: number[]) {
    if (!weights) weights = colors.map(() => 1);
    const weight = total(weights);

    const hsl = colors.map(c => c.hsl);

    // Hue is a circle, so there are two directions in which we could merge.
    const hue = hsl.map(c => c[0]);
    const altHue = hue.map(h => h < 180 ? h + 360 : h);

    // We also weight the hue by its color intensity (chroma)
    const hueWeights = weights.map((w, i) => w * Math.sqrt(colors[i].chroma));
    const hueWeight = total(hueWeights);

    const h1 = total(hue.map((h, i) => h * hueWeights[i])) / hueWeight;
    const h2 = total(altHue.map((h, i) => h * hueWeights[i])) / hueWeight;
    const r1 = total(hue.map((h, i) => Math.abs(h - h1) * hueWeights[i]));
    const r2 = total(altHue.map((h, i) => Math.abs(h - h2) * hueWeights[i]));
    const h = (r1 <= r2) ? h1 : h2 % 360;

    const s = total(hsl.map((c, i) => weights![i] * c[1])) / weight;
    const l = total(hsl.map((c, i) => weights![i] * c[2])) / weight;
    return Color.fromHsl(h, s, l);
  }
}
