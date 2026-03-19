# Troubleshooting Guide

This page is the quick-fix index for the most common CMF Phone 2 Pro modding issues.

Use it together with the main operation guides.

---

## 1. Device Not Detected in ADB

Symptoms:
- `adb devices` shows no device
- device appears as `unauthorized`

Fixes:
1. Reconnect cable and change USB port
2. Re-enable USB debugging in Developer options
3. Accept USB debugging RSA prompt on phone
4. Restart ADB server:

```bash
adb kill-server
adb start-server
adb devices
```

5. Reinstall USB driver if on Windows

---

## 2. Device Not Detected in Fastboot

Symptoms:
- `fastboot devices` shows nothing

Fixes:
1. Confirm phone is in bootloader mode
2. Reinstall USB bootloader driver
3. Try another cable/port
4. Verify Device Manager shows Android Bootloader Interface

---

## 3. Unlock Command Fails

Error pattern:
- `FAILED (remote: unlock not allowed)`

Fixes:
1. Reboot to Android
2. Enable OEM unlocking again
3. Reboot bootloader and retry

Reference:
- [Bootloader Unlock](unlock.md)

---

## 4. Bootloop After Root Flash

Likely causes:
- Wrong image for build
- Wrong partition target (boot vs init_boot)

Fix path:
1. Boot to bootloader
2. Flash original stock image from exact build
3. Reboot and confirm normal boot

Reference:
- [Rooting](rooting.md)
- [Root with Magisk](root-magisk.md)

---

## 5. OTA Update Fails on Rooted Device

Error pattern:
- update refuses to install
- error 20 or similar partition mismatch failures

Fix path:
1. Restore stock partitions for current build
2. Retry updater or sideload path
3. Re-root only after update completes

Reference:
- [OTA Sideloading](ota-sideload.md)

---

## 6. Flashing Script Stops or Fails Mid-way

Fixes:
1. Keep phone in bootloader
2. Re-check extracted firmware files
3. Re-run flash script from clean folder
4. Verify hash file if available

Reference:
- [Stock ROM Flashing](stock-rom.md)

---

## 7. Essential Button Remap Not Working

Fixes:
1. Confirm both Essential packages are disabled before remap
2. Re-open remapper app and rebind actions
3. Prefer double-press or long-press mappings

Reference:
- [Essential Button Remap](essential-button-remap.md)

---

## 8. Private Space Reset Did Not Apply

Fixes:
1. Confirm correct user ID from `pm list users`
2. Retry `pm remove-user` with exact Private Space ID
3. Reboot phone

Reference:
- [Private Space Reset](private-space-reset.md)

---

## Recovery Ladder (When Unsure)

Use this order:

1. Reboot and re-check build/device state
2. Restore only affected stock partitions
3. If still broken, full stock ROM flash
4. Reconfigure from known-good state

---

## Related Pages

- [Drivers and Tools](tools.md)
- [Stock ROM Flashing](stock-rom.md)
- [OTA Sideloading](ota-sideload.md)
- [FAQ](faq.md)

