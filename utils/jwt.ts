import jwtDecode from "jwt-decode";
import { type JwtPayload } from "jwt-decode";

export function isTokenExpired(token: string): boolean {
  const decoded = jwtDecode<JwtPayload>(token);
  const now = Math.floor(Date.now());
  console.log(decoded);
  if (decoded == undefined) return false;
  if (decoded.exp == undefined) return false;
  return decoded.exp > now;
}
