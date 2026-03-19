# Bootloader Unlock Guide for CMF Phone 2 Pro

> **Credit**: Guide compiled from [Nothing Archive - Bootloader Unlocking](https://github.com/spike0en/nothing_archive#unlocking-bootloader) by spike0en.

---

## ⚠️ Critical Warnings

**IMPORTANT**: Read this section carefully before proceeding.

1. **Warranty Void**: Unlocking the bootloader voids the OEM warranty. However, you can reflash the stock ROM and relock the bootloader to restore it.

2. **Widevine L1 / DRM Downgrade**: Regardless of other factors, you will lose **Widevine L1/DRM certification**, which will downgrade to L3. This may affect:
   - Streaming quality on Netflix, YouTube, Disney+
   - Protected content playback
   - Premium media services

3. **Device Integrity Loss**: You will lose [device integrity](https://developer.android.com/google/play/integrity/overview), which may cause apps relying on this to stop working. This affects banking apps, Google Play Protect, and other security-sensitive applications. [This guide](https://github.com/yashaswee-exe/AndroidGuides/wiki/Fix-integrity-and-root-detection) may help resolve this issue later with root access.

4. **Data Erasure**: Unlocking the bootloader will erase ALL data on your device. Back up everything before proceeding.

5. **FRP (Factory Reset Protection)**: Removing accounts helps prevent Google FRP lock during relocking.

---

## A. Prerequisites

### Requirements

- **Data Backup**: Back up all your data (photos, messages, contacts, apps, etc.) as unlocking erases everything
- **ADB & Fastboot Tools**: [Download Platform Tools](https://developer.android.com/studio/releases/platform-tools) for your OS
- **USB Drivers**: [Google USB Drivers](https://developer.android.com/studio/run/win-usb) (Windows only)
- **USB Cable**: Use a reliable, high-quality USB cable to avoid connection issues
- **PC or Linux Computer**: Required to run ADB/Fastboot commands
- **Battery**: Ensure device battery is above 50%

### Enable Developer Options

1. Open **Settings**
2. Navigate to **About phone**
3. Tap the **Build number** 7 times
4. A toast notification will appear: "You are now a developer"

### Enable USB Debugging & OEM Unlocking

1. Open **Settings**
2. Navigate to **System > Developer options** (should now be visible)
3. Enable:
   - **USB Debugging** (allows ADB communication)
   - **OEM Unlocking** (allows bootloader unlock)

### Remove Screen Lock & Google Accounts (Recommended)

- Remove any PIN, pattern, or password lock
- Remove all Google accounts to prevent FRP lock
  - Go to **Settings > Accounts > Google**
  - Remove each account
  - If you forget credentials, FRP will lock you out after bootloader relock

---

## B. Unlocking Process

### Step 1: Connect Phone to PC

1. Use a USB cable to connect your CMF Phone 2 Pro to your computer
2. If prompted on the phone, allow USB debugging

### Step 2: Verify ADB Connection

Open Command Prompt/PowerShell in the platform-tools folder:
- **Windows**: `Shift + Right Click` in the folder → "Open Command Prompt/PowerShell here"
- **macOS/Linux**: Open Terminal and navigate to platform-tools

Run:
```
adb devices
```

**Expected output**:
```
List of attached devices
ABC123DEFG456  device
```

If the device shows "unauthorized", check the phone and tap "Allow" when prompted for USB debugging.

If no devices appear:
- Reinstall USB drivers
- Try a different USB port
- Try a different USB cable

### Step 3: Reboot to Bootloader

```
adb reboot bootloader
```

Your phone will reboot into bootloader mode. The screen will show "Fastboot Mode" with a black background.

### Step 4: Verify Fastboot Connection

```
fastboot devices
```

**Expected output**:
```
ABC123DEFG456  fastboot
```

If no devices appear:
- Reinstall USB drivers from [Google USB Drivers](https://developer.android.com/studio/run/win-usb)
- Verify "Android Bootloader Interface" appears in Device Manager (Windows)
- Try a different USB port or cable

### Step 5: Unlock the Bootloader

```
fastboot flashing unlock
```

**On your phone**, you'll see a prompt:
- Use **Volume Up/Down** keys to navigate
- Use **Power** button to confirm
- Select "Unlock" and confirm

The device will:
- Erase all data
- Reboot automatically
- Show "Orange State" warning at boot (this is normal)

---

## C. Post-Unlock Verification

### After Reboot

The phone will boot into setup. Complete the initial setup:

1. Select language and region
2. Connect to Wi-Fi (recommended for downloading updates)
3. Sign in with your Google account (or skip if you prefer)

### Verify Bootloader Status

1. Go to **Settings > System > Developer options**
2. Check that **OEM Unlocking** is still enabled
3. The bootloader is now unlocked!

### Orange State Warning

Your device will display an "Orange State" warning during boot. This is **normal** and indicates:
- Bootloader is unlocked
- Custom ROMs/kernels can be flashed
- Android Verified Boot is not active

---

## D. Backing Up Essential Partitions (Recommended)

> **CRITICAL**: After unlocking, back up essential partitions containing IMEI, network settings, and fingerprint calibration. Loss of these can brick your device.

### Requirements

- Unlocked bootloader
- Root access (via Magisk/KSU)
- Termux app ([F-Droid](https://f-droid.org/) or Play Store)
- Sufficient internal storage (~2-3 GB)

### For QCom Devices (CMF Phone 2 Pro)

1. Install and open **Termux**
2. Grant root access:
   ```
   su
   ```
3. Create backup folder and dump all partitions:
   ```
   mkdir -p /sdcard/partitions_backup
   ls -1 /dev/block/bootdevice/by-name | grep -v userdata | grep -v super | \
   while read f; do dd if=/dev/block/bootdevice/by-name/$f of=/sdcard/partitions_backup/${f}.img; done
   ```

If the above fails, try:
```
mkdir -p /sdcard/partitions_backup
for partition in /dev/block/bootdevice/by-name/*; do \
[[ "$(basename "$partition")" != "userdata" && "$(basename "$partition")" != "super" ]] && \
cp -f "$partition" /sdcard/partitions_backup/; done
```

4. Move the `partitions_backup` folder to your PC or secure cloud storage
5. **IMPORTANT**: Do NOT share these backups—they contain unique device data like IMEI

### Restoring Backed Up Partitions

In bootloader mode:
```
fastboot flash persist persist.img
fastboot flash modemst1 modemst1.img
fastboot flash modemst2 modemst2.img
```

No factory reset is needed after restoration.

---

## E. Relocking Bootloader (Optional)

If you want to relock the bootloader and restore warranty:

### Prerequisites

- Have stock ROM flashed on your device
- Remove screen lock, PIN, and all Google accounts
- Backup all data (relocking erases everything)

### Steps

1. Reboot to bootloader:
   ```
   adb reboot bootloader
   ```

2. Verify fastboot connection:
   ```
   fastboot devices
   ```

3. Initiate bootloader relock:
   ```
   fastboot flashing lock
   ```

4. On your phone:
   - Use **Volume Up/Down** to navigate
   - Press **Power** to confirm
   - Select "Lock" and confirm

5. Device will reboot with locked bootloader

### Post-Relock

- Warranty is restored
- Orange State warning will no longer appear
- Cannot flash custom ROMs/kernels until unlocked again

---

## F. Troubleshooting

### Device Not Detected by ADB

**Problem**: `adb devices` shows no devices or "offline"  
**Solutions**:
1. Reinstall USB drivers: [Google USB Drivers](https://developer.android.com/studio/run/win-usb)
2. Try a different USB port (avoid USB hubs)
3. Try a different USB cable
4. On phone, go to **Settings > Developer options** and toggle **USB Debugging** off/on
5. Restart ADB server:
   ```
   adb kill-server
   adb start-server
   ```

### Device Not Detected by Fastboot

**Problem**: `fastboot devices` shows no devices  
**Solutions**:
1. Reinstall USB drivers
2. Ensure device is in bootloader mode (should show "Fastboot Mode")
3. In Device Manager (Windows), verify **Android Bootloader Interface** is visible
4. Try alternative fastboot: `fastboot -i 0x2a4e devices`

### "FAILED (remote: unlock not allowed)"

**Problem**: Fastboot unlock command fails  
**Solutions**:
1. Ensure **OEM Unlocking** is enabled in Developer Options (must do this while in Android)
2. Reboot device normally and re-enable OEM Unlocking
3. Try unlocking again from bootloader

### "Device is locked. Cannot flash partitions"

**Problem**: Cannot flash after unlocking  
**Solutions**:
1. Ensure bootloader is actually unlocked (should say "Bootloader is unlocked" in bootloader menu)
2. Reboot to bootloader and verify status
3. If still locked, repeat Step 5 of the unlocking process

### Orange State Warning Won't Go Away

**Problem**: Orange State persists even after relocking  
**Solutions**:
1. Relock bootloader again (follow Section E)
2. Flash stock ROM completely
3. Factory reset via settings

---

## G. FAQ

**Q: Can I restore warranty after unlocking?**  
A: Yes. Relock the bootloader (Section E) and reflash stock ROM using [Flashing Guide](stock-rom.md). However, Widevine L1 downgrade to L3 is permanent and cannot be restored.

**Q: Will my data be preserved?**  
A: No. Bootloader unlocking triggers a factory reset that erases all data. Always backup before unlocking.

**Q: Can I still receive OTA updates?**  
A: Yes, but with restrictions:
- Locked bootloader: OTA updates work normally
- Unlocked bootloader + rooted device: Must restore stock partitions before OTA
- See [OTA Sideload Guide](ota-sideload.md) for rooted users

**Q: What happens if the PC disconnects during unlock?**  
A: The process may fail but your device is generally safe. Reboot to bootloader and retry. However, never disconnect during ROM flashing.

**Q: Can I unlock bootloader without erasing data?**  
A: No. Bootloader unlocking requires factory reset—it's a design restriction, not a bug.

**Q: Is bootloader unlocking reversible?**  
A: Yes. Relock bootloader and reflash stock ROM (both performed via fastboot). However, Widevine L1 remains downgraded.

**Q: What if I forget my Google account after removing it?**  
A: If you relock the bootloader and don't remember the account credentials, FRP will lock you out after factory reset. Keep credentials safe or don't relock if you removed accounts.

**Q: Can I unlock bootloader without a PC?**  
A: No. ADB/Fastboot require a computer. However, some users have attempted alternative methods using:
- Another Android phone with OTG adapter + ADB app
- Custom recovery on another device
These are advanced techniques not recommended for beginners.

---

## H. Related Guides

- [Stock ROM Flashing](stock-rom.md) - Restore official Nothing OS
- [Custom ROM Flashing](custom-rom.md) - Install AOSP-based ROMs
- [Rooting Guide](rooting.md) - Install Magisk/KernelSU
- [OTA Sideload Guide](ota-sideload.md) - Install OTA updates on rooted devices
- [Partition Backup](unlock.md#d-backing-up-essential-partitions-recommended) - Preserve IMEI and calibration data

---

## Resources

- [Nothing Archive - Bootloader Unlocking](https://github.com/spike0en/nothing_archive#unlocking-bootloader)
- [Android Developers - USB Debugging](https://developer.android.com/studio/debug)
- [Android Developers - USB Drivers](https://developer.android.com/studio/run/win-usb)
- [Fix Device Integrity and Root Detection](https://github.com/yashaswee-exe/AndroidGuides/wiki/Fix-integrity-and-root-detection)
