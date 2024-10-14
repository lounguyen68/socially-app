import React, { ReactNode } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from './Button.component';
import { colors } from '../constants/colors.const';
import { useNavigation } from '@react-navigation/native';

interface ScreenComponentProps {
  title: string;
  isLoading?: boolean;
  headerLeft?: ReactNode;
  headerRight?: ReactNode;
  children: ReactNode;
}

const HeaderLeft: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Button
      onPress={navigation.goBack}
      icon="chevron-left"
      iconSize={32}
      iconColors={[colors.blackColor]}
      containerStyle={{ backgroundColor: colors.whiteColor }}
    />
  );
};

const ScreenComponent: React.FC<ScreenComponentProps> = ({
  title,
  isLoading = false,
  headerLeft = <HeaderLeft />,
  headerRight = null,
  children,
}) => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>{headerLeft}</View>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={styles.headerRight}>{headerRight}</View>
      </View>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={styles.contentContainer}>{children}</View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    position: 'relative',
  },
  safeAreaView: {
    flex: 1,
  },
  headerContainer: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: colors.whiteColor,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flex: 1,
  },
  headerTitle: {
    flex: 5,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
  },
});

export default ScreenComponent;
