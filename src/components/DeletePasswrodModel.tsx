import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { memo, useCallback } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";
import { apiPasswordActions } from "../services/password";
import { Button } from "./Button";

interface DeletePasswordModalProps {
  visible: boolean;
  onClose: () => void;
  passwordIds: string;
  refresh: () => void;
}

export const DeletePasswordModal = memo<DeletePasswordModalProps>(
  ({ visible, onClose, passwordIds, refresh }) => {
    const { deletePassword, loading } = apiPasswordActions();

    const handleClose = useCallback(() => onClose(), [onClose]);

    const handleDelete = useCallback(async () => {
      if (!passwordIds || passwordIds.length === 0) return;

      const res = await deletePassword([passwordIds]);
      if (res) {
        handleClose();
        refresh();
      }
    }, [passwordIds, deletePassword, handleClose, refresh]);

    return (
      <Modal
        visible={visible}
        animationType="slide"
        transparent
        onRequestClose={handleClose}
      >
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.container}>
                <View style={styles.body}>
                  <View style={styles.headerText}>
                    <Text style={styles.headerTitle}>Confirm Delete</Text>
                    <Text style={styles.headerSubtitle}>
                      Are you sure you want to delete? This action cannot be
                      undone.
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={handleClose}
                  >
                    <MaterialCommunityIcons
                      name="close"
                      size={24}
                      color="#fff"
                    />
                  </TouchableOpacity>

                  <View style={styles.buttons}>
                    <Button
                      title="Cancel"
                      onPress={handleClose}
                      variant="secondary"
                      style={{ flex: 1, marginRight: 8 }}
                    />
                    <Button
                      title="Delete"
                      onPress={handleDelete}
                      variant="danger"
                      loading={loading}
                      icon={
                        <MaterialCommunityIcons
                          name="delete"
                          size={18}
                          color="#fff"
                        />
                      }
                      style={{ flex: 1 }}
                    />
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
);

DeletePasswordModal.displayName = "DeletePasswordModal";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: COLORS.darkBg + 10,
  },
  container: {
    backgroundColor: COLORS.cardBg,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "35%",
    overflow: "hidden",
  },
  body: {
    padding: 28,
  },
  headerText: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    color: COLORS.danger,
    marginBottom: 4,
    fontFamily: FONTS.PoppinsBold,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: FONTS.PoppinsRegular,
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    padding: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
