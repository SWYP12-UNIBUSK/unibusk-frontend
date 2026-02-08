// 두 ID 배열이 길이와 순서까지 완전히 동일한지 검사
export function isSameOrderedIds(a: string[], b: string[]) {
  if (a.length !== b.length) {
    return false;
  }

  return a.every((id, index) => id === b[index]);
}
