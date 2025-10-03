import { StatusBar } from "expo-status-bar";
import React, { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AddPasswordModal } from "../components/AddPasswordModal";
import { CreateBtn } from "../components/CreateBtn";
import { DeletePasswordModal } from "../components/DeletePasswrodModel";
import Header from "../components/Home/Header";
import { PasswordItem } from "../components/PasswordItem";
import { ViewPasswordModal } from "../components/ViewPasswordModal";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";
import { useDynamicIcon } from "../hooks/useDynamicIcon";
import { apiGetPasswords } from "../services/password";
import { PasswordType } from "../types";

export const HomeScreen = () => {
  const { data: PasswordList, loading, refresh } = apiGetPasswords();
  const { RenderIcon } = useDynamicIcon();
  const [selectedPassword, setSelectedPassword] = useState<PasswordType | null>(
    null
  );
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [deletePasswordId, setDeletePasswordId] = useState<string | null>(null);

  const config = {
    npm: "MaterialCommunityIcons" as const,
    name: "lock-outline",
    size: 64,
    color: COLORS.textSecondary,
  };

  const handlePasswordPress = useCallback((password: PasswordType) => {
    setSelectedPassword(password);
    setViewModalVisible(true);
  }, []);

  const handleCloseViewModal = useCallback(() => {
    setViewModalVisible(false);
    setSelectedPassword(null);
  }, []);

  const handleOpenAddModal = useCallback(() => {
    setAddModalVisible(true);
  }, []);

  const handleCloseAddModal = useCallback(() => {
    setAddModalVisible(false);
  }, []);

  const handleDeleteModalClose = useCallback(
    () => setDeletePasswordId(null),
    []
  );

  const handleDeleteModelOpen = useCallback((id: string) => {
    handleCloseViewModal()
    setDeletePasswordId(id);
  }, []);

  const renderPasswordItem = useCallback(
    ({ item }: { item: PasswordType }) => (
      <PasswordItem password={item} onPress={handlePasswordPress} />
    ),
    [handlePasswordPress]
  );

  const keyExtractor = useCallback(
    (item: PasswordType) => item?._id?.toString(),
    []
  );

  const ListEmptyComponent = useMemo(() => {
    return (
      <View style={styles.emptyState}>
        <RenderIcon {...config} style={{ opacity: 0.5 }} />
        <Text style={styles.emptyText}>No passwords saved yet</Text>
        <Text style={styles.emptySubtext}>Click "Add" to get started</Text>
      </View>
    );
  }, [config]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <StatusBar style="light" backgroundColor="#1e293b" animated={true} />
        <Header />
        <View style={styles.emptyState}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar style="light" backgroundColor="#1e293b" animated={true} />

      <Header />

      <FlatList
        data={PasswordList}
        renderItem={renderPasswordItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={PasswordList?.length === 0 && styles.emptyList}
        showsVerticalScrollIndicator={false}
        refreshing={false}
        onRefresh={refresh}
      />

      <ViewPasswordModal
        visible={viewModalVisible}
        password={selectedPassword}
        onClose={handleCloseViewModal}
        onDelete={handleDeleteModelOpen}
      />

      <AddPasswordModal
        refresh={refresh}
        visible={addModalVisible}
        onClose={handleCloseAddModal}
      />

      <DeletePasswordModal
        onClose={handleDeleteModalClose}
        passwordIds={deletePasswordId!}
        refresh={refresh}
        visible={!!deletePasswordId}
      />

      <CreateBtn onPress={handleOpenAddModal} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  emptyList: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 30,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginTop: 16,
    marginBottom: 8,
    fontFamily: FONTS.PoppinsSemiBold,
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
    fontFamily: FONTS.PoppinsRegular,
  },
});
