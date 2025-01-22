import { TokenData } from "@interfaces/index";

/**
 * DEVUELVE LA CARGA UTIL DEL TOKEN EN UN OBJETO
 * @param token string
 * @returns TokenData | null
 */
export const parseJwt = (token: string): TokenData | null => {
  try {
    if (!token || !token.includes('.')) {
      return null;
    }

    const base64Url = token.split('.')[1];
    if (!base64Url) {
      return null;
    }

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = atob(base64);

    return JSON.parse(jsonPayload) as TokenData;
  } catch (error) {
    console.error('Error al analizar el token JWT:', error);
    return null;
  }
};


export const hasTokenExpired = (token: TokenData): boolean => {
  const expirationDate = new Date(token.exp * 1000)
  return expirationDate < new Date()
}

export function getTokenRemainingTime(tokenTime: number): number {
  if (tokenTime > 0) {
    const expirationDate = new Date(tokenTime * 1000);
    const currentDate = new Date();
    const diffInMilliseconds = expirationDate.getTime() - currentDate.getTime();
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));

    return diffInMinutes;
  }
  return 0;
}

