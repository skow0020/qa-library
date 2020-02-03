import {getCategoryTheme, getLanguageTheme} from './util';

describe('Util tests', () => {
  test('getCategoryTheme ui automation returns', () => {
    expect(getCategoryTheme('ui automation')).toBe('#2196f3');
  });

  test('getCategoryTheme general returns', () => {
    expect(getCategoryTheme('general')).toBe('#006f51');
  });

  test('getCategoryTheme api automation returns', () => {
    expect(getCategoryTheme('api automation')).toBe('#f44336');
  });

  test('getLanguageTheme c# returns', () => {
    expect(getLanguageTheme('c#')).toBe('#2196f3');
  });

  test('getLanguageTheme javascript returns', () => {
    expect(getLanguageTheme('javascript')).toBe('#4caf50');
  });

  test('getLanguageTheme asdf returns', () => {
    expect(getLanguageTheme('asdf')).toBe('#6D7078');
  });
});