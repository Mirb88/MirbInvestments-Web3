export interface AuthUser {
  uid: string;
  email?: string | null;
  displayName?: string | null;
}

export function useAuth() {
  return {
    user: null as AuthUser | null,
    isAuthenticated: false,
    isLoading: false,
    db: null as any,
    updateUserPassword: async (currentPassword: string, newPassword: string) => {
      throw new Error("Funkcionalnost promjene lozinke trenutno nije omogućena u demo režimu.");
    },
  };
}
