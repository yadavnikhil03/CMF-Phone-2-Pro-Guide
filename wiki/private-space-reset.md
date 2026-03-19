# Guide for Resetting Private Space Password

> 📝 **Credit:** This guide is based on the solution by **r/JumpMore1875**  
> [Reddit Discussion](https://www.reddit.com/r/NothingTech/comments/1kr5wkf/comment/n21arzo/?sort=top)

---

## Overview

If you've forgotten your Private Space password or want to reset it, you can completely remove the Private Space without needing to enter the password. This guide walks you through the process using ADB commands.

---

## Prerequisites

- **ADB (Android Debug Bridge)** installed and configured
- **USB Debugging enabled** on your device
- **USB cable** to connect your device to a PC/Mac
- **Command Prompt** (Windows) or **Terminal** (Mac/Linux)

---

## Step-by-Step Guide

### Step 1: Connect Your Device

1. Connect your CMF Phone 2 Pro to your PC/Mac via USB cable
2. Enable USB Debugging on your device (Settings > Developer Options > USB Debugging)
3. Trust the connection when prompted on your device

### Step 2: List All Users on Your Device

Open Command Prompt/Terminal and run:

```
adb shell pm list users
```

### Step 3: Identify Your Private Space Profile ID

The output will look something like this:

```
Users:
  UserInfo{0:Owner:4c13} running
  UserInfo{10:Work profile:1030} running
  UserInfo{12:Private space:1010} running
```

**Look for the line with "Private space"** and note down the **ID number** (the first number in curly braces).

In this example, the Private Space ID is **12**.

### Step 4: Remove the Private Space

Run the following command, replacing `12` with your Private Space ID:

```
adb shell pm remove-user 12
```

### Step 5: Verify Success

You should see the following output:

```
Success: removed user
```

---

## That's It!

✅ Your Private Space has been successfully removed from your device without needing the password.

### What Happens Next

1. All data in Private Space is **permanently deleted**
2. Private Space is **completely removed** from your device
3. You can set up a **new Private Space** anytime from Settings with a new password

---

## Important Notes

⚠️ **Data Loss:** All data stored in Private Space will be permanently deleted. Make sure to back up any important data before proceeding.

⚠️ **Your ID Will Vary:** The ID for Private Space is different on each device. Make sure you identify the correct ID before running the remove command.

✅ **Reversible:** You can create a new Private Space anytime after removing it with a fresh password.

---

## Troubleshooting

### Command fails: "adb: command not found"

- Make sure ADB is installed and added to your system PATH
- Or navigate to your platform-tools folder and run the command from there

### "Device not found" error

- Ensure USB Debugging is enabled on your device
- Check that the USB cable is properly connected
- Try a different USB port
- Reinstall USB drivers if needed

### Cannot find "Private space" in the list

- Private Space might not be set up on your device yet
- Or it might be labeled differently in your Nothing OS version
- Look for any line mentioning "Private" in the output

### "Success: removed user" but Private Space still appears

- Restart your device
- The Private Space should be gone after reboot

---

## How to Set Up Private Space Again

After removing and restarting your device:

1. Go to **Settings > Personal info > Privacy**
2. Look for **Private Space** option
3. Tap **Create** or **Set up**
4. Create a new password
5. Set up your Private Space with fresh data

---

## FAQ

**Q: Will this affect other data on my phone?**  
A: No. Only Private Space data is deleted. All other files, apps, and settings remain untouched.

**Q: Can I recover the deleted data?**  
A: No. Once deleted, the data in Private Space cannot be recovered. This is permanent.

**Q: Does this void my warranty?**  
A: No. Using ADB commands is a standard Android feature and doesn't void your warranty.

**Q: What if I have multiple user profiles?**  
A: The process is the same. Identify the correct Private Space ID and remove only that user profile.

**Q: Can I keep Private Space and just reset the password?**  
A: Not with standard Android commands. Removing and recreating is the recommended method to reset the password.

---

## Alternative: If You Remember Your Password

If you remember your Private Space password, you can simply:

1. Go to **Settings > Personal info > Privacy > Private Space**
2. Tap **Settings** version (gear icon)
3. Change or reset your password from there

---

## Credits

**Original Solution:** r/JumpMore1875 on Reddit  
**Referenced:** [Nothing Tech Reddit Community](https://www.reddit.com/r/NothingTech/)
