import React from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Attachment } from '../api/getMessages.api';
import Icon from './Icon';
import { getFileExtension } from '../helpers';
import { colors } from '../constants';

export const MessageDocuments = ({
  documents,
  isYourMessage,
}: {
  documents: Attachment[];
  isYourMessage: boolean;
}) => {
  const renderItem = ({ item }: { item: Attachment }) => {
    const documentType = getFileExtension(item.name);
    return (
      <TouchableOpacity
        style={[
          styles.itemContainer,
          isYourMessage
            ? { backgroundColor: colors.primaryColor }
            : { backgroundColor: colors.lightWhiteColor },
        ]}
        onPress={() => {
          Linking.openURL(item.path);
        }}
      >
        <Icon name={documentType} size={26} />
        <Text numberOfLines={1} style={[styles.documentName]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={documents}
      keyExtractor={(item, index) => `${item.name}-${index}`}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
  },
  documentName: {
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
