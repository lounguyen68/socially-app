import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from '@/src/components/Avatar.component';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { colors } from '../constants/colors.const';
import Icon from '../components/Icon';
import { apiLogout } from '../api/logout.api';
import { useServices } from '../context';
import { logout } from '../redux/userSlice';
import { ProfileScreenProps } from '@/type';

export const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const { user } = useSelector((state: RootState) => state.user);
  const { storageService } = useServices();
  const dispatch = useDispatch();

  const handleLogout = () => {
    apiLogout()
      .then(() => {
        storageService.clearRefreshToken();
        storageService.clearUserInfo();
        dispatch(logout());
        navigation.navigate('login');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <View style={styles.background} />
        <Avatar src={user?.urlAvatar} />
        <Text style={styles.userName}>{user?.username}</Text>
      </View>

      <View style={styles.userFeatures}>
        <TouchableOpacity style={styles.userFeatureItem} onPress={handleLogout}>
          <Icon name="logout" size={28} />
          <Text style={styles.userFeatureText}>{'Logout'}</Text>
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
    fontSize: 18,
    padding: 10,
  },
  background: {
    backgroundColor: '#E1F6F4',
    width: 600,
    height: 600,
    position: 'absolute',
    top: -490,
    borderRadius: 300,
  },
});
