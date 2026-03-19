# Root with Magisk (Focused Guide)

This page is a Magisk-only path for CMF Phone 2 Pro.

If you want KSU/KSUN options too, use the full guide:
- [Complete Rooting Guide](rooting.md)

---

## Prerequisites

- Unlocked bootloader
- USB debugging enabled
- Platform tools installed
- Exact matching stock boot archive for your current build

Reference pages:
- [Bootloader Unlock](unlock.md)
- [Drivers and Tools](tools.md)

---

## Step 1: Confirm Current Build

On phone:
- Settings > About phone > tap device banner
- Note full build number

You must use image files from this exact build.

---

## Step 2: Download and Extract Boot Image

1. Open Nothing Archive releases
2. Find your exact build for CMF Phone 2 Pro (Galaga)
3. Download `*-image-boot.img.7z`
4. Extract and locate:
	- `init_boot.img` (preferred)
	- `boot.img` (use only if init_boot is unavailable)

---

## Step 3: Push Image to Device

If using init_boot:

```bash
adb push init_boot.img /sdcard/Download/
```

If using boot.img:

```bash
adb push boot.img /sdcard/Download/
```

---

## Step 4: Patch with Magisk App

1. Install latest Magisk APK
2. Open Magisk > Install > Select and Patch a File
3. Select transferred image from Downloads
4. Wait for patched image output:
	- Example: `magisk_patched-XXXXX.img`

Copy patched image back to PC.

---

## Step 5: Flash Patched Image

Reboot to bootloader:

```bash
adb reboot bootloader
```

Flash patched image:

```bash
fastboot flash init_boot magisk_patched-XXXXX.img
```

If you are using boot partition method:

```bash
fastboot flash boot magisk_patched-XXXXX.img
```

Reboot:

```bash
fastboot reboot
```

---

## Step 6: Verify Root

1. Open Magisk app
2. Confirm root state is active
3. Optionally test root using a trusted checker app

---

## Rollback (Unroot)

If needed, flash original stock image:

```bash
fastboot flash init_boot init_boot.img
fastboot reboot
```

Or use `boot.img` rollback if that was your root target.

---

## OTA Note

For rooted devices, OTA updates may fail until stock partitions are restored.

Use:
- [OTA Sideloading Guide](ota-sideload.md)

