cat > app.config.js << "EOF";
export default {
  expo: {
    name: "RevClone",
    slug: "revclone",
    scheme: "revclone",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      bundleIdentifier: "com.galaxies.fintech",
      supportsTablet: true,
    },
    android: {
      package: "com.galaxies.fintech",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: ["expo-router", "expo-asset", "expo-font", "expo-secure-store"],
    extra: {
      clerkPublishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
    },
    experiments: {
      tsconfigPaths: true,
    },
  },
};
EOF;
