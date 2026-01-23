export const ROOT_NAME = 'ColorPicker';
export const ROOT_IMPL_NAME = 'ColorPickerImpl';
export const TRIGGER_NAME = 'ColorPickerTrigger';
export const CONTENT_NAME = 'ColorPickerContent';
export const AREA_NAME = 'ColorPickerArea';
export const HUE_SLIDER_NAME = 'ColorPickerHueSlider';
export const ALPHA_SLIDER_NAME = 'ColorPickerAlphaSlider';
export const SWATCH_NAME = 'ColorPickerSwatch';
export const EYE_DROPPER_NAME = 'ColorPickerEyeDropper';
export const FORMAT_SELECT_NAME = 'ColorPickerFormatSelect';
export const INPUT_NAME = 'ColorPickerInput';

export const colorFormats = ['hex', 'rgb', 'hsl', 'hsb'] as const;
export type ColorFormat = (typeof colorFormats)[number];

/**
 * @see https://gist.github.com/bkrmendy/f4582173f50fab209ddfef1377ab31e3
 */
export interface EyeDropper {
    open: (options?: { signal?: AbortSignal }) => Promise<{ sRGBHex: string }>;
}

declare global {
    interface Window {
        EyeDropper?: {
            new (): EyeDropper;
        };
    }
}

export interface ColorValue {
    r: number;
    g: number;
    b: number;
    a: number;
}

export interface HSVColorValue {
    h: number;
    s: number;
    v: number;
    a: number;
}

export function hexToRgb(hex: string, alpha?: number): ColorValue {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: Number.parseInt(result[1] ?? '0', 16),
              g: Number.parseInt(result[2] ?? '0', 16),
              b: Number.parseInt(result[3] ?? '0', 16),
              a: alpha ?? 1
          }
        : { r: 0, g: 0, b: 0, a: alpha ?? 1 };
}

export function rgbToHex(color: ColorValue): string {
    const toHex = (n: number) => {
        const hex = Math.round(n).toString(16);
        return hex.length === 1 ? `0${hex}` : hex;
    };
    return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`;
}

export function rgbToHsv(color: ColorValue): HSVColorValue {
    const r = color.r / 255;
    const g = color.g / 255;
    const b = color.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;

    let h = 0;
    if (diff !== 0) {
        switch (max) {
            case r:
                h = ((g - b) / diff) % 6;
                break;
            case g:
                h = (b - r) / diff + 2;
                break;
            case b:
                h = (r - g) / diff + 4;
                break;
        }
    }
    h = Math.round(h * 60);
    if (h < 0) h += 360;

    const s = max === 0 ? 0 : diff / max;
    const v = max;

    return {
        h,
        s: Math.round(s * 100),
        v: Math.round(v * 100),
        a: color.a
    };
}

export function hsvToRgb(hsv: HSVColorValue): ColorValue {
    const h = hsv.h / 360;
    const s = hsv.s / 100;
    const v = hsv.v / 100;

    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    let r: number;
    let g: number;
    let b: number;

    switch (i % 6) {
        case 0: {
            r = v;
            g = t;
            b = p;
            break;
        }
        case 1: {
            r = q;
            g = v;
            b = p;
            break;
        }
        case 2: {
            r = p;
            g = v;
            b = t;
            break;
        }
        case 3: {
            r = p;
            g = q;
            b = v;
            break;
        }
        case 4: {
            r = t;
            g = p;
            b = v;
            break;
        }
        case 5: {
            r = v;
            g = p;
            b = q;
            break;
        }
        default: {
            r = 0;
            g = 0;
            b = 0;
        }
    }

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255),
        a: hsv.a
    };
}

export function colorToString(
    color: ColorValue,
    format: ColorFormat = 'hex'
): string {
    switch (format) {
        case 'hex':
            return rgbToHex(color);
        case 'rgb':
            return color.a < 1
                ? `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
                : `rgb(${color.r}, ${color.g}, ${color.b})`;
        case 'hsl': {
            const hsl = rgbToHsl(color);
            return color.a < 1
                ? `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${color.a})`
                : `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
        }
        case 'hsb': {
            const hsv = rgbToHsv(color);
            return color.a < 1
                ? `hsba(${hsv.h}, ${hsv.s}%, ${hsv.v}%, ${color.a})`
                : `hsb(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`;
        }
        default:
            return rgbToHex(color);
    }
}

export function rgbToHsl(color: ColorValue) {
    const r = color.r / 255;
    const g = color.g / 255;
    const b = color.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;
    const sum = max + min;

    const l = sum / 2;

    let h = 0;
    let s = 0;

    if (diff !== 0) {
        s = l > 0.5 ? diff / (2 - sum) : diff / sum;

        if (max === r) {
            h = (g - b) / diff + (g < b ? 6 : 0);
        } else if (max === g) {
            h = (b - r) / diff + 2;
        } else if (max === b) {
            h = (r - g) / diff + 4;
        }
        h /= 6;
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

export function hslToRgb(
    hsl: { h: number; s: number; l: number },
    alpha = 1
): ColorValue {
    const h = hsl.h / 360;
    const s = hsl.s / 100;
    const l = hsl.l / 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h * 6) % 2) - 1));
    const m = l - c / 2;

    let r = 0;
    let g = 0;
    let b = 0;

    if (h >= 0 && h < 1 / 6) {
        r = c;
        g = x;
        b = 0;
    } else if (h >= 1 / 6 && h < 2 / 6) {
        r = x;
        g = c;
        b = 0;
    } else if (h >= 2 / 6 && h < 3 / 6) {
        r = 0;
        g = c;
        b = x;
    } else if (h >= 3 / 6 && h < 4 / 6) {
        r = 0;
        g = x;
        b = c;
    } else if (h >= 4 / 6 && h < 5 / 6) {
        r = x;
        g = 0;
        b = c;
    } else if (h >= 5 / 6 && h < 1) {
        r = c;
        g = 0;
        b = x;
    }

    return {
        r: Math.round((r + m) * 255),
        g: Math.round((g + m) * 255),
        b: Math.round((b + m) * 255),
        a: alpha
    };
}

export function parseColorString(value: string): ColorValue | null {
    const trimmed = value.trim();

    // Parse hex colors
    if (trimmed.startsWith('#')) {
        const hexMatch = trimmed.match(/^#([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/);
        if (hexMatch) {
            return hexToRgb(trimmed);
        }
    }

    // Parse rgb/rgba colors
    const rgbMatch = trimmed.match(
        /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)$/
    );
    if (rgbMatch) {
        return {
            r: Number.parseInt(rgbMatch[1] ?? '0', 10),
            g: Number.parseInt(rgbMatch[2] ?? '0', 10),
            b: Number.parseInt(rgbMatch[3] ?? '0', 10),
            a: rgbMatch[4] ? Number.parseFloat(rgbMatch[4]) : 1
        };
    }

    // Parse hsl/hsla colors
    const hslMatch = trimmed.match(
        /^hsla?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*([\d.]+))?\s*\)$/
    );
    if (hslMatch) {
        const h = Number.parseInt(hslMatch[1] ?? '0', 10);
        const s = Number.parseInt(hslMatch[2] ?? '0', 10) / 100;
        const l = Number.parseInt(hslMatch[3] ?? '0', 10) / 100;
        const a = hslMatch[4] ? Number.parseFloat(hslMatch[4]) : 1;

        // Convert HSL to RGB
        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
        const m = l - c / 2;

        let r = 0;
        let g = 0;
        let b = 0;

        if (h >= 0 && h < 60) {
            r = c;
            g = x;
            b = 0;
        } else if (h >= 60 && h < 120) {
            r = x;
            g = c;
            b = 0;
        } else if (h >= 120 && h < 180) {
            r = 0;
            g = c;
            b = x;
        } else if (h >= 180 && h < 240) {
            r = 0;
            g = x;
            b = c;
        } else if (h >= 240 && h < 300) {
            r = x;
            g = 0;
            b = c;
        } else if (h >= 300 && h < 360) {
            r = c;
            g = 0;
            b = x;
        }

        return {
            r: Math.round((r + m) * 255),
            g: Math.round((g + m) * 255),
            b: Math.round((b + m) * 255),
            a
        };
    }

    // Parse hsb/hsba colors
    const hsbMatch = trimmed.match(
        /^hsba?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*([\d.]+))?\s*\)$/
    );
    if (hsbMatch) {
        const h = Number.parseInt(hsbMatch[1] ?? '0', 10);
        const s = Number.parseInt(hsbMatch[2] ?? '0', 10);
        const v = Number.parseInt(hsbMatch[3] ?? '0', 10);
        const a = hsbMatch[4] ? Number.parseFloat(hsbMatch[4]) : 1;

        return hsvToRgb({ h, s, v, a });
    }

    return null;
}
