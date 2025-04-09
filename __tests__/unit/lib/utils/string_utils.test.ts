import { splitString, parseLinkHeaders, getQueryParams } from "@/lib/utils/string_utils";

describe("StringUtils", () => {
  it("splitString 定義テスト", () => {
    const result = splitString("test,example", ",");
    expect(result).toBeDefined();
  });

  it("splitString 処理対象にカンマあり", () => {
    const result = splitString("test,example", ",");
    expect(result).toEqual(["test", "example"]);
  });

  it("splitString 処理対象にカンマなし", () => {
    const result = splitString("test example", ",");
    expect(result).toEqual(["test example"]);
  });

  it("splitString 空文字", () => {
    expect(() => splitString("", ",")).toThrow(
      "入力文字列と区切り文字を指定してください。"
    );
  });

  it("splitString 区切り文字なし", () => {
    expect(() => splitString("test example", "")).toThrow(
      "入力文字列と区切り文字を指定してください。"
    );
  });

  it("splitString 両方空文字", () => {
    expect(() => splitString("", "")).toThrow(
      "入力文字列と区切り文字を指定してください。"
    );
  });

  it("parseLinkHeaders 定義テスト", () => {
    const result = parseLinkHeaders([
      '<https://api.github.com/user/123>; rel="self"',
    ]);
    expect(result).toBeDefined();
  });

  it("parseLinkHeaders 配列一つ", () => {
    const result = parseLinkHeaders([
      '<https://api.github.com/user/123>; rel="first"',
    ]);
    expect(result).toEqual([
      { url: "https://api.github.com/user/123", rel: "first" },
    ]);
  });

  it("parseLinkHeaders 配列二つ", () => {
    const result = parseLinkHeaders([
      '<https://api.github.com/user/123>; rel="first"',
      '<https://api.github.com/user/456>; rel="last"',
    ]);
    expect(result).toEqual([
      { url: "https://api.github.com/user/123", rel: "first" },
      { url: "https://api.github.com/user/456", rel: "last" },
    ]);
  });

  it("parseLinkHeaders 空配列", () => {
    const result = parseLinkHeaders([]);
    expect(result).toEqual([]);
  });

  it("parseLinkHeaders 不正なフォーマット rel", () => {
    expect(() =>
      parseLinkHeaders(['<https://api.github.com/user/123>; drel="invalid"'])
    ).toThrow('ヘッダーのフォーマットが不正です: <https://api.github.com/user/123>; drel="invalid"');
  });

  it("parseLinkHeaders 不正なフォーマット url", () => {
    expect(() =>
      parseLinkHeaders(['https://api.github.com/user/123>; rel="invalid"'])
    ).toThrow('ヘッダーのフォーマットが不正です: https://api.github.com/user/123>; rel="invalid"');
  });

  it("parseLinkHeaders 不正なフォーマット url2", () => {
    expect(() =>
      parseLinkHeaders(['<https://api.github.com/user/123; rel="invalid"'])
    ).toThrow('ヘッダーのフォーマットが不正です: <https://api.github.com/user/123; rel="invalid"');
  });

  it("parseLinkHeaders 不正なフォーマット url3", () => {
    expect(() =>
      parseLinkHeaders(['<https://api.github.com/user/123>; relinvalid"'])
    ).toThrow('ヘッダーのフォーマットが不正です: <https://api.github.com/user/123>; relinvalid"');
  });

  it("getQueryParams 定義テスト", () => {
    const result = getQueryParams("https://example.com?param1=value1&param2=value2");
    expect(result).toBeDefined();
  }
  );

  it("getQueryParams クエリパラメータあり", () => {
    const result = getQueryParams("https://example.com?param1=value1&param2=value2");
    expect(result).toEqual({
      param1: "value1",
      param2: "value2",
    });
  });

  it("getQueryParams クエリパラメータなし", () => {
    const result = getQueryParams("https://example.com");
    expect(result).toEqual({});
  });

  it("getQueryParams クエリパラメータが空", () => {
    const result = getQueryParams("https://example.com?");
    expect(result).toEqual({});
  });

  it("getQueryParams クエリパラメータが空2", () => {
    const result = getQueryParams("https://example.com?param1=");
    expect(result).toEqual({
      param1: "",
    });
  });

  it("getQueryParams クエリパラメータが空3", () => {
    const result = getQueryParams("https://example.com?param1=value1&param2=");
    expect(result).toEqual({
      param1: "value1",
      param2: "",
    });
  });
});
