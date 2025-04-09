export function splitString(separetedString: string, delimiter: string): string[] {
  if (!separetedString || !delimiter) {
    throw new Error("入力文字列と区切り文字を指定してください。");
  }
  return separetedString.split(delimiter);
}

export function parseLinkHeaders(linkHeaders: string[]): { url: string; rel: string }[] {
  return linkHeaders.map((header) => {
    const match = header.match(/<(.+?)>; rel="(.+?)"/);
    if (match) {
      const [, url, rel] = match;
      return { url, rel };
    }
    throw new Error(`ヘッダーのフォーマットが不正です: ${header}`);
  });
}

export function getQueryParams(url: string): Record<string, string> {
  const params: Record<string, string> = {};
  const queryString = url.split("?")[1];
  if (!queryString) {
    return params;
  }

  queryString.split("&").forEach((param) => {
    const [key, value] = param.split("=");
    if (key) {
      params[key] = decodeURIComponent(value || "");
    }
  });

  return params;
}