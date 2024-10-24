import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { Button } from '../components/Button.component';
import { colors } from '../constants/colors.const';

interface PopupContextProps {
  showPopup: (message: string, onConfirm?: () => void) => void;
  hidePopup: () => void;
}

const PopupContext = createContext<PopupContextProps | undefined>(undefined);

export const usePopup = (): PopupContextProps => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error('usePopup must be used within a PopupProvider');
  }
  return context;
};

export const PopupProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [onConfirm, setOnConfirm] = useState<(() => void) | null>(null);

  const showPopup = (msg: string, confirmAction?: () => void) => {
    setMessage(msg);
    setVisible(true);
    setOnConfirm(() => confirmAction || null);
  };

  const hidePopup = () => {
    setVisible(false);
    setMessage(null);
    setOnConfirm(null);
  };

  return (
    <PopupContext.Provider value={{ showPopup, hidePopup }}>
      {children}
      <Modal
        visible={visible}
        transparent={true}
        animationType="slide"
        onRequestClose={hidePopup}
      >
        <View style={styles.popupContainer}>
          <View style={styles.popupContent}>
            <Text style={styles.popupText}>{message}</Text>
            <View style={styles.popupButtonWrapper}>
              <Button
                title={onConfirm ? 'Cancel' : 'OK'}
                onPress={hidePopup}
                containerStyle={styles.popupButton}
              />
              {onConfirm && (
                <Button
                  title="Confirm"
                  onPress={() => {
                    hidePopup();
                    onConfirm && onConfirm();
                  }}
                  containerStyle={styles.popupButton}
                />
              )}
            </View>
          </View>
        </View>
      </Modal>
    </PopupContext.Provider>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popupContent: {
    minWidth: 300,
    padding: 16,
    backgroundColor: colors.whiteColor,
    borderRadius: 8,
    alignItems: 'center',
  },
  popupText: {
    marginBottom: 24,
    fontSize: 16,
  },
  popupButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  popupButton: {
    backgroundColor: colors.primaryColor,
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 8,
  },
});
