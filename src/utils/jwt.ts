import base64 from 'base-64';

/**
 * Generates a mock JWT token for frontend testing purposes.
 * It encodes a header and a payload using base64 and appends a dummy signature.
 * Expiration is set to 1 hour from the time of generation.
 * @param email The user's email address
 * @returns A string representing the mock JWT token
 */
export const generateMockJWT = (email: string): string => {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  // Set expiration to 1 hour (3600 seconds) from now
  const payload = {
    email,
    exp: Math.floor(Date.now() / 1000) + 3600,
    iat: Math.floor(Date.now() / 1000),
  };

  const encodedHeader = base64.encode(JSON.stringify(header));
  const encodedPayload = base64.encode(JSON.stringify(payload));
  const dummySignature = 'mock-signature-for-frontend-testing-only';

  return `${encodedHeader}.${encodedPayload}.${dummySignature}`;
};

/**
 * Validates a mock JWT by checking if it has expired.
 * @param token The mock JWT token
 * @returns true if valid, false if expired or invalid format
 */
export const isMockJWTValid = (token: string): boolean => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return false;
    }

    const payloadString = base64.decode(parts[1]);
    const payload = JSON.parse(payloadString);

    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      // Token has expired
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Decodes a mock JWT to extract the payload (e.g., email).
 * @param token The mock JWT token
 * @returns The parsed payload object or null if invalid
 */
export const decodeMockJWT = (token: string): any | null => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    const payloadString = base64.decode(parts[1]);
    return JSON.parse(payloadString);
  } catch (error) {
    return null;
  }
};
