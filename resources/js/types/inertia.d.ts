export interface PageProps {
  flash: {
    success?: string;
    error?: string;
  };
  [key: string]: any; // ✅ Isso permite outras props como user, auth, errors, etc.
}
