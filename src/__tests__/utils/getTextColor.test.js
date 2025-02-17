 
 
import { expect, test } from 'vitest';
import { getTextColor } from '../../utils/getTextColor';

test("return black text for bright colors", () => {
    expect(getTextColor("#FFFFFF")).toBe("#000");
    expect(getTextColor("#FFFF00")).toBe("#000");
});

test('returns white text for dark colors', () => {
    expect(getTextColor('#000000')).toBe("#fff");
    expect(getTextColor('#123456')).toBe("#fff");
});

test('returns black text if no color is provided', () => {
    expect(getTextColor()).toBe("#000");
});