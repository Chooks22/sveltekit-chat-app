export function cookiefyToken(token: string): string {
  return `jwt=${token};HttpOnly;SameSite=Strict;Path=/;`
}
