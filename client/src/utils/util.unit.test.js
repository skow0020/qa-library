import {getCategoryTheme, getLanguageTheme} from './util';

describe('Util tests', () => {
  test('getCategoryTheme ui automation returns', () => {
    expect(getCategoryTheme("ui automation")).toBe("warning");
  });

  test('getCategoryTheme general returns', () => {
    expect(getCategoryTheme("general")).toBe("royal-blue");
  });

  test('getCategoryTheme api returns', () => {
    expect(getCategoryTheme("api")).toBe("dark");
  });

  test('getLanguageTheme c# returns', () => {
    expect(getLanguageTheme("csharp")).toBe("secondary");
  });

  test('getLanguageTheme javascript returns', () => {
    expect(getLanguageTheme("javascript")).toBe("success");
  });

  test('getLanguageTheme asdf returns', () => {
    expect(getLanguageTheme("asdf")).toBe("dark");
  });
});