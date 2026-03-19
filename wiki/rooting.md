# Complete Guide to Rooting CMF Phone 2 Pro

> 📝 **Source:** Based on the official [Nothing Archive Rooting Guide](https://github.com/spike0en/nothing_archive?tab=readme-ov-file#rooting)

---

## ⚠️ Important Warnings

- **Warranty:** Rooting voids the OEM warranty
- **OTA Updates:** Rooting may break OTA updates (see recovery section below)
- **Bootloops:** Flashing an incorrect or mismatched boot image will cause bootloops
- **Boot vs Init_boot:** Always use `init_boot` over `boot` if available on your device
- **Unlocked Bootloader Required:** You MUST unlock your bootloader before rooting

---

## Prerequisites

### Hardware & Software Requirements

- **Unlocked bootloader** - Instructions in unlock guide
- **USB Debugging enabled** - Settings > Developer Options > USB Debugging
- **Computer with ADB & Fastboot** - [Download Platform Tools](https://developer.android.com/studio/releases/platform-tools)
- **USB cable** - High quality cable recommended
- **Stock firmware** matching your current build (for extracting boot images)

### Alternative Methods

- PC with ADB & Fastboot
- Another Android phone with USB-OTG + ADB app (e.g., Bugjaeger)
- Custom recovery (e.g., TWRP, OrangeFox, AOSP recoveries)

---

## Root Solutions Available

Choose ONE of the following:

### 1. Magisk (Recommended)
- **Website:** [GitHub - Magisk](https://github.com/topjohnwu/Magisk/releases)
- **Installation Guide:** [Magisk Documentation](https://topjohnwu.github.io/Magisk/install.html)
- **Best for:** Systemless modifications, module support
- **Note:** Works with any boot.img or init_boot.img

### 2. KernelSU (KSU)
- **Website:** [GitHub - KernelSU](https://github.com/tiann/KernelSU)
- **Installation Guide:** [KernelSU Installation](https://kernelsu.org/guide/installation.html)
- **Best for:** Direct kernel integration
- **Note:** For CMF Phone 2 Pro (Nothing Phone 2 and older): Works with stock `boot.img`

### 3. KernelSU Next (KSUN)
- **Website:** [GitHub - KernelSU-Next](https://github.com/KernelSU-Next/KernelSU-Next)
- **Installation Guide:** [KSUN Documentation](https://kernelsu-next.github.io/webpage/pages/installation.html)
- **Best for:** Newer Nothing OS versions (Android 13+)
- **Compatibility Note:** KSUN patches require custom kernel compilation for older devices

### Pre-patched Custom Kernels (Optional)

If you want to use KSU/KSUN without manual patching:

- **arter97 kernel** - KSU prepatched (doesn't support Nothing OS 4.0+)
- **Meteoric Kernel** - KSUN + SUSFS prepatched (EOL, doesn't support NOS 4.0+)
- **Wild Kernel fork** - KSU + SUSFS prepatched
- **Wild Kernel** - KSUN + SUSFS prepatched (supports Android 5.10-12)

---

## Step-by-Step Rooting Guide

### Step 1: Check Your Current Software Version

1. Go to **Settings > About phone**
2. Tap the **Nothing OS banner**
3. Note down the **Build Number**
   - Example: `Galaga_B2.0-260101-1500` (for CMF Phone 2 Pro)
   - **Important:** Ignore regional suffixes like `IND`, `EEA`, `TUR`, etc.

### Step 2: Download Stock Boot Image

1. Visit [Nothing Archive Releases](https://github.com/spike0en/nothing_archive/releases)
2. Find the release matching your **exact build number**
3. Look for **CMF Phone (2) Pro Galaga** (code name)
4. Download the file: `*-image-boot.img.7z`

### Step 3: Extract Boot Image Files

1. Install [7-Zip](https://www.7-zip.org/) if not already installed
2. Right-click the `.7z` file → **Extract to "*"**
3. Locate the extracted images:
   - **Preferred:** `init_boot.img` (use this if available)
   - **Alternative:** `boot.img` (only if `init_boot` doesn't exist)

### Step 4: Transfer Image to Your Device

Connect your phone via USB and run:

```
adb push init_boot.img /sdcard/Download/
```

Or if only boot.img exists:

```
adb push boot.img /sdcard/Download/
```

### Step 5: Patch the Image with Your Chosen Root Solution

#### Option A: Using Magisk

1. **Install Magisk APK:**
   - Download latest Magisk from [GitHub](https://github.com/topjohnwu/Magisk/releases)
   - Install the APK on your device

2. **Patch the Image:**
   - Open the **Magisk** app
   - Tap **Install**
   - Select **Select and Patch a File**
   - Choose the transferred `init_boot.img` (or `boot.img`) from `/sdcard/Download/`
   - Magisk will generate a patched image: `magisk_patched-XXXXX.img`

3. **Transfer Patched Image Back to PC:**
   - Find the patched file in your Downloads folder
   - Transfer it back to your PC via USB or ADB

#### Option B: Using KernelSU / KernelSU Next

1. **Install KSU/KSUN Manager:**
   - Download from [KSU GitHub](https://github.com/tiann/KernelSU) or [KSUN GitHub](https://github.com/KernelSU-Next/KernelSU-Next)
   - Install the manager APK

2. **Patch the Image:**
   - Open the **KSU/KSUN Manager** app
   - Tap **not installed** (status)
   - Select **Patch the init_boot.img**
   - Choose your transfer image from `/sdcard/Download/`
   - The manager will generate a patched image

3. **Transfer Patched Image Back to PC:**
   - Transfer the patched image from your device to your PC

---

### Step 6: Flash the Patched Image

#### Reboot to Bootloader

```
adb reboot bootloader
```

#### Flash the Patched Image

```
fastboot flash init_boot magisk_patched-XXXXX.img
```

Or for boot.img:

```
fastboot flash boot magisk_patched-XXXXX.img
```

#### Reboot to System

```
fastboot reboot
```

### Step 7: Verify Root Access

1. Device will boot into the patched system
2. Open your root solution app (Magisk/KSU)
3. Verify that root access is **granted**
4. **Congratulations!** Your device is now rooted!

---

## Handling OTA Updates After Rooting

⚠️ **Important:** OTA updates will fail or refuse to install if you're rooted

### Before Receiving an OTA Update

You MUST restore stock partitions before OTA updates will install:

1. **Check your current Nothing OS version:**
   - Go to `Settings > About phone > Tap device banner`
   - Note down the build number

2. **Download stock images** for your current build:
   - Visit [Nothing Archive](https://github.com/spike0en/nothing_archive/releases)
   - Download `-boot-image.7z` file

3. **Extract and identify partitions:**
   - For Qualcomm devices: `boot`, `init_boot`, `vendor_boot`, `recovery`, `vbmeta`
   - For MediaTek devices: `init_boot`, `vbmeta`, `lk`

4. **Flash stock partitions:**
   - Reboot to bootloader: `adb reboot bootloader`
   - Flash each partition:
     ```
     fastboot flash init_boot init_boot.img
     fastboot flash boot boot.img
     fastboot flash recovery recovery.img
     fastboot flash vendor_boot vendor_boot.img
     fastboot flash vbmeta vbmeta.img
     ```

5. **Reboot to system:**
   ```
   fastboot reboot
   ```

6. **Update via System Updater:**
   - Go to Settings > System > System Update
   - Check for updates and install

7. **Re-root after updating:**
   - After successful update, you can re-root with the new boot image
   - Your root modules will remain intact!

---

## Video Tutorials

For visual walkthroughs, check these YouTube guides:
- [orailnoor - Rooting Guide](https://www.youtube.com/watch?v=v0i4rftKNWs)
- [Droidwin - Rooting Guide](https://www.youtube.com/watch?v=4T1ZHDUCBsw)
- [EpicDroid - Rooting Guide](https://www.youtube.com/watch?v=vXIBfyX7s-k)

---

## Troubleshooting

### Bootloop After Flashing Patched Image

If your device boots into bootloop:
1. Reboot to bootloader: `fastboot reboot bootloader`
2. Flash the original stock image back:
   ```
   fastboot flash init_boot init_boot_stock.img
   ```
3. Device should boot normally

### "Magisk Patched" Image Generation Fails

- Make sure you have the **correct boot image** for your device
- Try extracting the `.7z` file again
- Ensure you're using the **latest version** of Magisk/KSU

### OTA Update Still Fails After Restoring Stock

- You may have other modified partitions
- Follow the full restoration process in the OTA section above
- Ensure **all** modified partitions are restored

### Cannot Find init_boot.img in Archive

- Your device may only use `boot.img`
- Use `boot.img` instead
- Some older builds don't include init_boot

---

## FAQ

**Q: Is rooting safe?**  
A: Yes, if you follow the instructions carefully and use the correct boot image for your device.

**Q: Will rooting break my device?**  
A: No, but flashing an incorrect boot image can cause bootloops. Always verify you have the correct image!

**Q: Can I unroot?**  
A: Yes, flash the original stock boot/init_boot image back.

**Q: Do I need a custom recovery?**  
A: No, you can root with just ADB/Fastboot.

**Q: Which root method should I use?**  
A: Magisk is generally recommended for beginners. KSU/KSUN offers more kernel integration.

**Q: What happens if I don't restore stock before OTA?**  
A: OTA updates will refuse to install or install incorrectly, potentially bricking your device.

**Q: Can I update Android after rooting?**  
A: Yes, but you must restore stock partitions first (see OTA section above).

---

## Resources

- [Nothing Archive - Official Rooting Guide](https://github.com/spike0en/nothing_archive?tab=readme-ov-file#rooting)
- [Stock Boot Images - Nothing Archive](https://github.com/spike0en/nothing_archive#downloads)
- [Magisk - GitHub](https://github.com/topjohnwu/Magisk)
- [KernelSU - GitHub](https://github.com/tiann/KernelSU)
- [KernelSU Next - GitHub](https://github.com/KernelSU-Next/KernelSU-Next)
- [ADB/Fastboot Documentation](https://developer.android.com/studio/command-line/adb)
