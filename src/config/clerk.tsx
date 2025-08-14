import React, { ReactNode } from "react";
import * as SecureStore from "expo-secure-store";
import { ClerkProvider } from "@clerk/clerk-expo";
import Constants from "expo-constants";

const tokenCache = {
  getToken: (key: string) => SecureStore.getItemAsync(key),
  saveToken: (key: string, value: string) =>
    SecureStore.setItemAsync(key, value),
  clearToken: (key: string) => SecureStore.deleteItemAsync(key),
};

const CLERK_PUBLISHABLE_KEY =
  process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  (Constants.expoConfig?.extra as any)?.clerkPublishableKey;

export function ClerkWrapper({ children }: { children: ReactNode }) {
  if (!CLERK_PUBLISHABLE_KEY) {
    console.warn(
      "⚠️ Clerk publishable key em falta! Define EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY no .env"
    );
    return <>{children}</>;
  }
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      {children}
    </ClerkProvider>
  );
}
