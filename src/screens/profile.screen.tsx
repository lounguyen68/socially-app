import * as ImagePicker from 'expo-image-picker';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Avatar } from '@/src/components/Avatar.component';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { colors } from '../constants/colors.const';
import Icon from '../components/Icon';
import { apiLogout } from '../api/logout.api';
import { usePopup, useServices } from '../context';
import { logout, updateUserData } from '../redux/userSlice';
import { ProfileScreenProps } from '@/type';
import { setConversations } from '../redux/conversationsSlice';
import { useCallback, useState } from 'react';

export const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const { user } = useSelector((state: RootState) => state.user);
  const { http, storageService, userService } = useServices();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { showPopup } = usePopup();

  const handleChangeAvatar = async () => {
    if (loading) return;

    ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    }).then((result) => {
      if (result.canceled) return;
      setLoading(true);
      const avatar = result.assets[0];
      userService
        .updateUserAvatar(avatar)
        .then((userData) => {
          if (!userData) return;

          storageService.setUserInfo(userData);
          dispatch(updateUserData(userData));
        })
        .catch((error) => {
          showPopup(error);
        });
    });
  };

  const handleLogout = () => {
    apiLogout()
      .then(async () => {
        dispatch(setConversations({ conversations: [], isRefreshing: true }));
        http.setToken('');
        await storageService.clearRefreshToken();
        await storageService.clearUserInfo();
        // navigation.reset({
        //   index: 0,
        //   routes: [{ name: 'login' }],
        // });
        dispatch(logout());
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <View style={styles.background} />
        <TouchableOpacity style={styles.avatar} onPress={handleChangeAvatar}>
          <Avatar src={user?.avatarPath} setLoading={() => setLoading(false)} />
          {loading ? (
            <ActivityIndicator size={40} style={styles.cameraIcon} />
          ) : (
            <Icon name="camera" size={40} style={styles.cameraIcon} />
          )}
        </TouchableOpacity>
        <Text style={styles.userName}>{user?.name}</Text>
      </View>

      <View style={styles.userFeatures}>
        <TouchableOpacity style={styles.userFeatureItem} onPress={handleLogout}>
          <Icon name="logout" size={28} />
          <Text style={styles.userFeatureText}>{'Log out'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteColor,
  },
  userInfo: {
    paddingTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderBottomWidth: 2,
    borderColor: '#E1F6F4',
  },
  userName: {
    fontWeight: '700',
    fontSize: 22,
    paddingVertical: 10,
  },
  userFeatures: {
    padding: 20,
  },
  userFeatureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  userFeatureText: {
    fontSize: 16,
  },
  background: {
    backgroundColor: '#E1F6F4',
    width: 600,
    height: 600,
    position: 'absolute',
    top: -490,
    borderRadius: 300,
  },
  avatar: {
    opacity: 0.8,
  },
  cameraIcon: {
    position: 'absolute',
    top: 75,
    left: 75,
    transform: [{ translateX: -20 }, { translateY: -20 }],
  },
});
