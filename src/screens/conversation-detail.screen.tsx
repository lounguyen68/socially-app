import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { Avatar } from '../components/Avatar.component';
import { colors } from '../constants';
import MessageItem from '../components/MessageItem.component';
import { ConversationDetailProps } from '@/type';
import ChatInput from '../components/ChatInput.component';
import Icon from '../components/Icon';

const { height } = Dimensions.get('window');

export const ConversationDetail = ({
  navigation,
  route,
}: ConversationDetailProps) => {
  const params = route.params;

  const [text, setText] = useState('');

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      });
  }, [navigation]);

  const Header = () => {
    return (
      <View style={styles.header}>
        <Avatar
          src={params.conversationAvatar}
          containerStyle={styles.avatar}
        />
        <Text style={styles.userName}>{params.conversationName}</Text>
      </View>
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: colors.lightWhiteColor,
      },
      headerTitle: Header,
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={[]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <MessageItem message={item} />}
        contentContainerStyle={styles.messageList}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.inputContainer}>
        <Icon name="album" size={30} />
        <Icon name="attachment" size={30} />
        <ChatInput
          placeholder="Write a message"
          style={styles.input}
          value={text}
          setValue={setText}
        />
        <Icon name="send" size={30} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteColor,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  avatar: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  messageList: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    paddingBottom: height * 0.1,
  },
  inputContainer: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    maxHeight: height * 0.08,
  },
});
