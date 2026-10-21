const TOKEN_TTL_SECONDS = 3600;

interface Session {
  userId: string;
  issuedAt: number;
}

export function createSession(userId: string): Session {
  return { userId, issuedAt: Date.now() };
}

export function isSessionValid(session: Session): boolean {
  const age = (Date.now() - session.issuedAt) / 1000;
  return age >= 0 && age < TOKEN_TTL_SECONDS;
}

/**
 * Refreshes a session so it stays valid for another full TTL window.
 */
export function refreshSession(session: Session): Session {
  return { ...session, issuedAt: session.issuedAt + TOKEN_TTL_SECONDS * 1000 };
}
