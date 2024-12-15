import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  name: 'Socially',
  slug: 'socially',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/socially-icon.png',
  scheme: 'socially-app',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/images/socially-splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/socially-icon.png',
      backgroundColor: '#ffffff',
    },
    permissions: ['android.permission.READ_MEDIA_IMAGES'],
    package: 'com.lounguyen68.socially',
    googleServicesFile:
      process.env.GOOGLE_SERVICES_JSON ?? './google-services.json',
  },
  plugins: [
    [
      'expo-dev-launcher',
      {
        launchMode: 'most-recent',
      },
    ],
    [
      'expo-build-properties',
      {
        android: {
          usesCleartextTraffic: true,
        },
      },
    ],
    [
      'expo-image-picker',
      {
        photosPermission:
          'The app accesses your photos to let you share them with your friends.',
      },
    ],
    [
      'expo-document-picker',
      {
        iCloudContainerEnvironment: 'Production',
      },
    ],
    'expo-secure-store',
  ],
  extra: {
    eas: {
      projectId: '29a260a6-71ac-4166-bb9e-ec44a0b4d1ff',
    },
  },
});
