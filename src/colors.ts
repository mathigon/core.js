// =============================================================================
// Core.ts | Color Functions
// (c) Mathigon
// =============================================================================


import {last, tabulate} from './arrays';


const shortHexRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
const longHexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
const rgbaRegex = /rgba?\(([0-9,]+), ?([0-9,]+), ?([0-9,]+)(, ?([0-9,]+))?\)/;

const rainbow = ['#22ab24', '#0f82f2', '#cd0e66', '#fd8c00'];


function pad2(str: string) {
  return str.length === 1 ? '0' + str : str;
}

/** Gets the colour of a multi-step gradient at a given percentage p */
function getColourAt(gradient: (Color|string)[], p: number) {
  if (p <= 0) return Color.from(gradient[0]);
  if (p >= 1) return Color.from(last(gradient));

  const r = Math.floor(p * (gradient.length - 1));
  const q = p * (gradient.length - 1) - r;
  return Color.mix(gradient[r + 1], gradient[r], q);
}


/** Colour generation and conversion class. */
export class Color {

  constructor(public r: number, public g: number, public b: number,
              public a = 1) {}

  /** Converts this colour to a hex string. */
  get hex() {
    const c = [this.r, this.g, this.b].map(
        x => pad2(Math.round(x).toString(16)));
    return '#' + c.join('');
  }

  /** Converts this colour to an rgba string. */
  get rgb() {
    const c = [this.r, this.g, this.b].map(x => Math.round(x)).join(',');
    return 'rgba(' + c + ',' + this.a + ')';
  }

  /** Converts this colour to an hsl string. */
  get hsl() {
    const r = this.r / 255;
    const g = this.g / 255;
    const b = this.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h; let s;
    const l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        default:  // b
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return 'hsl(' + [h, s, l].join(',') + ')';
  }

  toString() {
    return this.rgb;
  }

  /** Creates a copy of this colour. */
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

  /** Creates a Colour instance from a hex string. */
  static fromHex(hex: string) {
    hex = hex.replace(shortHexRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });

    const rgbParts = longHexRegex.exec(hex);
    if (!rgbParts) return new Color(0, 0, 0);

    return new Color(
        parseInt(rgbParts[1], 16),
        parseInt(rgbParts[2], 16),
        parseInt(rgbParts[3], 16)
    );
  }

  /** Generates a rainbow gradient with a given number of steps. */
  static rainbow(steps: number) {
    return tabulate(x => getColourAt(rainbow, x / (steps - 1)), steps);
  }

  /** Generates a rainbow gradient with a given number of steps. */
  static gradient(from: Color|string, to: Color|string, steps: number) {
    return tabulate(x => getColourAt([from, to], x / (steps - 1)), steps);
  }

  /** Linearly interpolates two colours or hex strings. */
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
}
