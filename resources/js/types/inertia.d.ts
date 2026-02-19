export interface PageProps {
  flash: {
    success?: string;
    error?: string;
  };
  [key: string]: unknown; // ✅ Isso permite outras props como user, auth, errors, etc.
}
