export function useAuth() {
  return {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    db: null, //
    updateUserPassword: async (currentPassword: string, newPassword: string) => {
      throw new Error("Funkcionalnost promjene lozinke trenutno nije omogućena u demo režimu.");
    },
  };
}
