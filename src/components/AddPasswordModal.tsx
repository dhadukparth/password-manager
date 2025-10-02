import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { memo, useCallback, useState } from "react";
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
import { apiPasswordActions } from "../services/password";
import { Button } from "./Button";
import { IconSelector } from "./IconSelector";
import { Input } from "./Input";

interface AddPasswordModalProps {
  visible: boolean;
  onClose: () => void;
  refresh: () => void;
}

export const AddPasswordModal = memo<AddPasswordModalProps>(
  ({ visible, refresh, onClose }) => {
    const { addPassword, loading } = apiPasswordActions();

    const [site, setSite] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [url, setUrl] = useState("");
    const [note, setNote] = useState("");
    const [selectedIcon, setSelectedIcon] = useState<any>("");

    const handleReset = useCallback(() => {
      setSite("");
      setUsername("");
      setPassword("");
      setUrl("");
      setNote("");
      setSelectedIcon("");
    }, []);

    const handleClose = useCallback(() => {
      handleReset();
      onClose();
    }, [handleReset, onClose]);

    const handleSave = useCallback(async () => {
      if (!site.trim() || !username.trim() || !password.trim()) {
        ToastAndroid.show(
          "Please fill in all required fields!",
          ToastAndroid.SHORT
        );
        return;
      }

      const apiData = {
        site: site.trim(),
        username: username.trim(),
        password: password.trim(),
        url: url.trim() || undefined,
        note: note.trim() || undefined,
        icon_id: selectedIcon?._id,
      };

      const res = await addPassword(apiData);
      if (res) {
        handleReset();
        handleClose();
        refresh();
      }
    }, [site, username, password, url, note, selectedIcon, handleReset]);

    const handleIconSelect = useCallback((icon: any) => {
      setSelectedIcon(icon);
    }, []);

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
                <View
                  style={[styles.header, { backgroundColor: COLORS.darkBg }]}
                >
                  <View style={styles.headerText}>
                    <Text style={styles.headerTitle}>Add New Password</Text>
                    <Text style={styles.headerSubtitle}>
                      Fill in the details below
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
                </View>

                <ScrollView style={styles.body}>
                  <Input
                    label="Site Name"
                    required
                    placeholder="e.g., Google, Facebook"
                    value={site}
                    onChangeText={setSite}
                  />
                  <Input
                    label="Username / Email"
                    required
                    placeholder="user@example.com"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                  <Input
                    label="Password"
                    required
                    placeholder="Enter strong password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                  <Input
                    label="URL"
                    placeholder="https://example.com"
                    value={url}
                    onChangeText={setUrl}
                    autoCapitalize="none"
                    keyboardType="url"
                  />
                  <Input
                    label="Notes"
                    placeholder="Additional information..."
                    value={note}
                    onChangeText={setNote}
                    multiline
                    numberOfLines={3}
                    style={{ height: 80, textAlignVertical: "top" }}
                  />

                  <View style={styles.iconSelectorContainer}>
                    <Text style={styles.iconLabel}>SELECT ICON</Text>
                    <IconSelector
                      selectedIcon={selectedIcon}
                      onSelectIcon={handleIconSelect}
                    />
                  </View>

                  <View style={styles.actions}>
                    <Button
                      title="Save Password"
                      onPress={handleSave}
                      variant="success"
                      loading={loading}
                      icon={
                        <MaterialCommunityIcons
                          name="check"
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

AddPasswordModal.displayName = "AddPasswordModal";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: COLORS.cardBg,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "60%",
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 16,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 4,
    fontFamily: FONTS.PoppinsBold,
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#94a3b8",
    fontFamily: FONTS.PoppinsRegular,
  },
  closeButton: {
    padding: 8,
  },
  body: {
    padding: 16,
  },
  iconSelectorContainer: {
    marginBottom: 20,
  },
  iconLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    fontFamily: FONTS.PoppinsSemiBold,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    padding: 28,
    paddingTop: 0,
  },
});
