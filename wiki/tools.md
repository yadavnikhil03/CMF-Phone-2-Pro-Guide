# Drivers and Tools Setup

This page helps you prepare a clean, reliable environment before flashing, rooting, or recovery work on CMF Phone 2 Pro.

---

## Quick Checklist

- Install Android Platform Tools (ADB and Fastboot)
- Install USB drivers (Windows users)
- Verify ADB detection in normal Android mode
- Verify Fastboot detection in bootloader mode
- Confirm cable and port stability before any flashing task

---

## 1. Install Android Platform Tools

Download and extract Platform Tools:
- [Android Platform Tools](https://developer.android.com/studio/releases/platform-tools)

Recommended folder location:
- `C:\platform-tools` on Windows

---

## 2. Install USB Drivers (Windows)

Download drivers:
- [Google USB Driver](https://developer.android.com/studio/run/win-usb)

After installation, when phone is in bootloader mode, Device Manager should show:
- Android Bootloader Interface

If you do not see it, reinstall the driver and reconnect the device.

---

## 3. Enable Required Phone Settings

On phone:

1. Enable Developer Options:
	- Settings > About phone > tap Build number 7 times
2. Enable USB Debugging:
	- Settings > System > Developer options > USB debugging
3. For unlock/root workflows, also enable OEM Unlocking:
	- Settings > System > Developer options > OEM unlocking

---

## 4. Verify ADB Connection

Connect phone to PC and run:

```bash
adb devices
```

Expected state:
- Device appears as `device` (not `unauthorized`)

If unauthorized:
- Accept the RSA prompt on phone
- Re-run `adb devices`

---

## 5. Verify Fastboot Connection

Reboot to bootloader:

```bash
adb reboot bootloader
```

Then verify:

```bash
fastboot devices
```

Expected state:
- Device appears as `fastboot`

---

## 6. Basic Environment Sanity Tests

Use these commands before critical operations:

```bash
adb version
fastboot --version
adb devices
fastboot devices
```

---

## Common Setup Problems

### Device not detected in ADB

- Change USB cable
- Try different USB port (prefer direct motherboard port)
- Re-enable USB debugging
- Run:

```bash
adb kill-server
adb start-server
```

### Device not detected in Fastboot

- Reinstall USB driver
- Confirm bootloader mode is active on phone
- Check Device Manager entry

---

## Next Steps

After this page is complete, continue with:

1. [Bootloader Unlock](unlock.md)
2. [Backup and Restore](backup-restore.md)
3. [Stock ROM Flashing](stock-rom.md)

