import React from 'react';
import { View, Image, StyleSheet, FlatList, Dimensions } from 'react-native';
import { Attachment } from '../api/getMessages.api';

export interface MessageImagesProps {
  attachments: Attachment[];
  isYourMessage: boolean;
}

const { width } = Dimensions.get('window');
export default function MessageImages({
  attachments,
  isYourMessage,
}: MessageImagesProps) {
  return (
    <View
      style={[
        styles.container,
        isYourMessage ? styles.userMessage : styles.receivedMessage,
      ]}
    >
      <FlatList
        style={{
          alignItems: isYourMessage ? 'flex-end' : 'flex-start',
        }}
        data={attachments}
        numColumns={2}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.path }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        keyExtractor={(item, index) => `${item.path}-${index}`}
      />
    </View>
  );
}

const IMAGE_SIZE = (width * 0.7) / 2;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 12,
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 8,
    marginRight: 2,
    marginBottom: 2,
  },
});
