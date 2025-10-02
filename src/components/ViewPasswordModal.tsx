import * as Clipboard from "expo-clipboard";
import React, { memo, useCallback } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";
import { useDynamicIcon } from "../hooks/useDynamicIcon";
import { Button } from "./Button";

interface ViewPasswordModalProps {
  visible: boolean;
  password: any;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export const ViewPasswordModal = memo<ViewPasswordModalProps>(
  ({ visible, onDelete, password, onClose }) => {
    const { RenderIcon } = useDynamicIcon();

    const handleCopy = useCallback(async () => {
      if (password) {
        await Clipboard.setStringAsync(password.password);
        ToastAndroid.show("Password copied to clipboard!", ToastAndroid.SHORT);
      }
    }, [password]);

    const handleDelete = useCallback(() => {
      if (password) {
        onDelete(password?._id);
      }
    }, [password]);

    if (!password) return null;

    return (
      <Modal
        visible={visible}
        animationType="slide"
        transparent
        onRequestClose={onClose}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.container}>
                <View
                  style={[styles.header, { backgroundColor: COLORS.darkBg }]}
                >
                  <View
                    style={[
                      styles.modalIcon,
                      { backgroundColor: password?.icon?.bgColor },
                    ]}
                  >
                    <RenderIcon
                      npm={password?.icon?.npm}
                      name={password?.icon?.icon}
                      color={password?.icon?.color}
                      size={32}
                    />
                  </View>
                  <View style={styles.headerText}>
                    <Text style={styles.headerTitle}>{password.site}</Text>
                    <Text style={styles.headerSubtitle}>
                      {password.username}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={onClose}
                  >
                    <RenderIcon
                      npm="MaterialCommunityIcons"
                      name="close"
                      size={24}
                      color="#fff"
                    />
                  </TouchableOpacity>
                </View>

                <ScrollView style={styles.body}>
                  <View style={styles.passwordDisplay}>
                    <Text style={styles.passwordLabel}>PASSWORD</Text>
                    <Text style={styles.passwordValue}>
                      {atob(password.password)}
                    </Text>
                  </View>

                  <InfoRow label="URL" value={password.url || "N/A"} />
                  <InfoRow label="USERNAME" value={password.username} />
                  {password?.note && (
                    <InfoRow label="NOTE" value={password.note} />
                  )}
                  <View style={styles.actions}>
                    <Button
                      title=""
                      onPress={handleCopy}
                      variant="primary"
                      icon={
                        <RenderIcon
                          npm="MaterialCommunityIcons"
                          name="content-copy"
                          size={18}
                          color="#fff"
                        />
                      }
                      style={{ flex: 1 }}
                    />
                    <Button
                      title=""
                      onPress={handleDelete}
                      variant="danger"
                      icon={
                        <RenderIcon
                          npm="Feather"
                          name="trash"
                          size={18}
                          color="#fff"
                        />
                      }
                      style={{ flex: 1 }}
                    />
                  </View>
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
);

ViewPasswordModal.displayName = "ViewPasswordModal";

const InfoRow = memo<{ label: string; value: string }>(({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
));

InfoRow.displayName = "InfoRow";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: COLORS.cardBg,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "90%",
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 16,
  },
  modalIcon: {
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.darkBg,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    color: COLORS.cardBg,
    fontFamily: FONTS.PoppinsBold,
  },
  headerSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontFamily: FONTS.PoppinsRegular,
  },
  closeButton: {
    padding: 8,
  },
  body: {
    padding: 16,
  },
  passwordDisplay: {
    backgroundColor: COLORS.inputBg,
    borderRadius: 10,
    padding: 16,
    marginBottom: 14,
  },
  passwordLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontFamily: FONTS.PoppinsSemiBold,
  },
  passwordValue: {
    fontFamily: FONTS.RobotoMedium,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  infoRow: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  infoLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textSecondary,
    width: 100,
    letterSpacing: 0.3,
    fontFamily: FONTS.PoppinsSemiBold,
  },
  infoValue: {
    fontSize: 12,
    color: COLORS.textPrimary,
    flex: 1,
    fontFamily: FONTS.PoppinsRegular,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
});
