# 🔐 Vaultly – Mobile Password Manager

Vaultly is a secure and lightweight mobile application built with **React Native (Expo)** that helps you safely store, manage, and access your passwords.  
It provides a simple, organized vault where you can add, edit, and delete your credentials with ease.

---

## ✨ Features
- 🔒 **Secure Storage** – Store all your login details in one encrypted vault.
- 📂 **Organized Vault** – Save passwords with site name, username, and icons.
- 👆 **Quick Access** – View or copy credentials instantly.
- 🗑️ **Delete Confirmation** – Prevent accidental data loss with confirmation dialogs.
- ➕ **Add New Passwords** – Simple form to add credentials.
- 🎨 **Clean UI/UX** – Designed for a smooth and intuitive experience.

---

## ⚙️ Tech Stack
- **React Native (Expo)**
- **TypeScript**
- **Axios** (API communication)
- **React Navigation**
- **Secure Storage (AsyncStorage / Encrypted Storage)**
- **Metro Bundler**

---

## 🚀 Getting Started

Follow these steps to set up Vaultly locally:

### 1. Clone the repository
```bash
git clone https://github.com/your-username/vaultly.git
cd vaultly
````

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set environment variables

Create a **.env** file in the project root and add your API base URL:

```env
EXPO_PUBLIC_BASE_URL=https://your-api-url.com
```

### 4. Start the development server

```bash
npx expo start
```

### 5. Run on your device/emulator

* Press **`i`** to run on iOS simulator
* Press **`a`** to run on Android emulator
* Or scan the QR code with the **Expo Go app** on your phone

---

## 📲 How to Use Vaultly

1. **Launch the app** – Open Vaultly on your device.
2. **Add a new password** – Tap the add button and enter site, username, and password.
3. **View stored credentials** – Tap an item to see details.
4. **Multi-select & delete** – Long-press or select multiple items to delete.
5. **Stay organized & secure** – Use search and icons for easy navigation.

---

## 🛠️ Development Notes

* Clear Metro cache if you face bundler issues:

  ```bash
  expo start -c
  ```
* Make sure to use Node.js LTS version.
* Works on both **iOS and Android**.

---

## 📄 License

This project is licensed under the **MIT License**.