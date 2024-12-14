import React, { useCallback, useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { Avatar } from '../components/Avatar.component';
import { ClientEmitMessages, colors, MessageType } from '../constants';
import MessageItem from '../components/MessageItem.component';
import { ConversationDetailProps } from '@/type';
import ChatInput from '../components/ChatInput.component';
import Icon from '../components/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { apiGetMessages, Attachment } from '../api/getMessages.api';
import {
  setChatRoom,
  setMessages,
  setNewMessage,
} from '../redux/chatRoomSlice';
import { usePopup, useServices, useSocket } from '../context';
import {
  setLastMessage,
  setNewConversation,
  updateLastTimeSeen,
} from '../redux/conversationsSlice';
import { decryptMessages } from '../helpers/message.helper';

const { height } = Dimensions.get('window');
const DOCUMENT_TYPE = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];
const DEFAULT_LIMIT = 15;
const DEFAULT_LIMIT_ATTACHMENT = 5;
const DEFAULT_LIMIT_ATTACHMENT_SIZE = 1000 * 1000 * 500; // 500MB

export const ConversationDetail = ({
  navigation,
  route,
}: ConversationDetailProps) => {
  const { isMockConversation, user } = route.params;
  const [text, setText] = useState('');
  const { user: currentUser } = useSelector((state: RootState) => state.user);
  const { _id, conversation, messages } = useSelector(
    (state: RootState) => state.chatRoom,
  );
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const dispatch = useDispatch();
  const { showPopup } = usePopup();
  const { socket } = useSocket();
  const { chatService } = useServices();

  useEffect(() => {
    if (_id) {
      socket?.emit(ClientEmitMessages.JOIN_CONVERSATION, _id);
    }

    return () => {
      if (_id) {
        socket?.emit(ClientEmitMessages.OUT_CONVERSATION, _id);

        if (currentUser) {
          dispatch(
            updateLastTimeSeen({
              conversationId: _id,
              userId: currentUser._id,
              time: new Date().toISOString(),
            }),
          );
        }
      }
    };
  }, [_id, socket, currentUser, dispatch]);

  useEffect(() => {
    if (_id && messages.length && currentUser) {
      dispatch(
        updateLastTimeSeen({
          conversationId: _id,
          userId: currentUser._id,
          time: new Date().toISOString(),
        }),
      );
    }
  }, [_id, messages, currentUser, dispatch]);

  const pickImages = async () => {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      quality: 0.6,
    }).then(async (result) => {
      if (result.canceled) return;

      const images: Attachment[] = result.assets.map((asset) => ({
        name: asset.fileName ?? '',
        path: asset.uri,
        metadata: {
          mimeType: asset.mimeType ?? '',
          width: asset.width,
          height: asset.height,
          size: asset.fileSize ?? 0,
        },
      }));

      await sendAttachments(images, MessageType.IMAGE);
    });
  };

  const pickDocuments = () => {
    DocumentPicker.getDocumentAsync({
      type: DOCUMENT_TYPE,
      copyToCacheDirectory: true,
      multiple: true,
    }).then(async (result) => {
      if (result.canceled) return;

      const documents: Attachment[] = result.assets.map((asset) => ({
        name: asset.name,
        path: asset.uri,
        metadata: {
          mimeType: asset.mimeType ?? '',
          size: asset.size ?? 0,
        },
      }));

      await sendAttachments(documents, MessageType.FILE);
    });
  };

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
        <Avatar src={user?.avatarPath} containerStyle={styles.avatar} />
        <Text style={styles.userName}>{user?.name}</Text>
      </View>
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: colors.lightWhiteColor,
      },
      headerTitle: Header,
      headerRight: () => (
        <Icon name={conversation?.sharedKey ? 'lock' : 'lock-open'} size={28} />
      ),
    });
  }, [conversation?.sharedKey]);

  const loadMessages = async () => {
    if (!_id || !hasMoreMessages) return;

    try {
      const data = await apiGetMessages({
        limit: DEFAULT_LIMIT,
        skip: messages.length,
        conversationId: _id,
      });

      const decryptedMessages = await decryptMessages(data, conversation);

      dispatch(setMessages(decryptedMessages));

      if (data.length < DEFAULT_LIMIT) {
        setHasMoreMessages(false);
      }
    } catch (error) {
      showPopup('Failed to load messages.');
    }
  };

  const sendMessage = async () => {
    if (!currentUser) return;

    if (!text.trim()) return;

    let conversationId = _id;
    let conversationData = conversation;

    if (isMockConversation && user && !_id) {
      conversationData = await chatService.createMockConversation(user._id);

      if (!conversationData) return;

      conversationId = conversationData._id;

      dispatch(
        setChatRoom({
          _id: conversationId,
          conversation: conversationData,
          messages: [],
        }),
      );

      dispatch(setNewConversation({ conversation: conversationData }));

      socket?.emit(ClientEmitMessages.CREATE_CONVERSATION, conversationData);
    }

    if (!conversationId || !conversationData) {
      navigation.goBack();
      return;
    }

    const senderId = chatService.getSender(conversationData, currentUser?._id);

    if (!senderId) {
      navigation.goBack();
      return;
    }

    const message = await chatService.createMessage({
      content: text,
      type: MessageType.TEXT,
      conversationId: conversationId,
      sender: senderId,
      sharedKey: conversation?.sharedKey,
    });

    if (message) {
      dispatch(setNewMessage(message));
      dispatch(setLastMessage({ conversationId, message }));
      dispatch(
        updateLastTimeSeen({
          conversationId,
          userId: currentUser?._id,
          time: new Date(message.createdAt).toISOString(),
        }),
      );
      setText('');
      socket?.emit(ClientEmitMessages.SEND_MESSAGE, message);
    }
  };

  const sendAttachments = async (
    attachments: Attachment[],
    messageType: MessageType,
  ) => {
    if (attachments.length > DEFAULT_LIMIT_ATTACHMENT)
      return showPopup('Send a maximum of 5 attachments at a time');

    const totalAttachmentSize = attachments.reduce(
      (acc, attachment) => acc + attachment.metadata.size,
      0,
    );

    if (totalAttachmentSize > DEFAULT_LIMIT_ATTACHMENT_SIZE)
      return showPopup('Send a maximum of 500MB at a time');

    if (!currentUser) return;

    let conversationId = _id;
    let conversationData = conversation;

    if (isMockConversation && user && !_id) {
      conversationData = await chatService.createMockConversation(user._id);

      if (!conversationData) return;

      conversationId = conversationData._id;

      dispatch(
        setChatRoom({
          _id: conversationId,
          conversation: conversationData,
          messages: [],
        }),
      );

      dispatch(setNewConversation({ conversation: conversationData }));

      socket?.emit(ClientEmitMessages.CREATE_CONVERSATION, conversationData);
    }

    if (!conversationId || !conversationData) {
      navigation.goBack();
      return;
    }

    const senderId = chatService.getSender(conversationData, currentUser?._id);

    if (!senderId) {
      navigation.goBack();
      return;
    }

    const message = await chatService.createMessage({
      content: '',
      type: messageType,
      attachments: attachments,
      conversationId,
      sender: senderId,
      sharedKey: conversation?.sharedKey,
    });

    if (!message) return showPopup('Failed to send message.');

    dispatch(setNewMessage(message));
    dispatch(setLastMessage({ conversationId, message }));
    dispatch(
      updateLastTimeSeen({
        conversationId,
        userId: currentUser?._id,
        time: new Date(message.createdAt).toISOString(),
      }),
    );
    setText('');
    socket?.emit(ClientEmitMessages.SEND_MESSAGE, message);
  };

  const renderItem = useCallback(
    ({ item }: any) => <MessageItem message={item} />,
    [messages],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        onEndReached={loadMessages}
        onEndReachedThreshold={1}
        contentContainerStyle={styles.messageList}
        showsVerticalScrollIndicator={false}
        inverted={true}
      />
      <View style={styles.inputContainer}>
        <Icon
          name="album"
          size={30}
          onPress={pickImages}
          style={{
            marginRight: 8,
          }}
        />
        <Icon
          name="attachment"
          size={30}
          onPress={pickDocuments}
          style={{
            marginRight: 8,
          }}
        />
        <ChatInput
          placeholder="Write a message"
          style={styles.input}
          value={text}
          setValue={setText}
        />
        <Icon
          name="send"
          size={30}
          onPress={sendMessage}
          style={{
            margin: 4,
          }}
        />
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
