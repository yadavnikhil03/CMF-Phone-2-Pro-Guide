# Stock ROM Flashing Guide

## Overview

This is the recommended method for manually clean flashing to a newer version of stock firmware or downgrading on CMF Phone 2 Pro. The process uses the Nothing Fastboot Flasher Script, which automates the flashing process.

## Prerequisites

### Requirements

- **PC with working Fastboot** - Windows 10+, Linux, or macOS
- **Unlocked bootloader** - See Unlock guide for instructions
- **Data wipe/loss (mandatory)** - Clean flashing/downgrading will erase all data
- **Latest Android Platform Tools (ADB & Fastboot)** - Download from [Android Studio](https://developer.android.com/studio/releases/platform-tools)
- **Google USB Drivers** - Download from [Android USB Drivers](https://developer.android.com/studio/run/win-usb)
- **7-Zip** - Download from [7-Zip.org](https://www.7-zip.org/)
- **Working internet connection** (to download platform-tools)

### Important Notes

✍️ **What's Possible:**
- ➡️ Upgrade to newer Nothing OS versions
- ➡️ Downgrade to older Nothing OS versions
- ➡️ Clean flash (erases data)
- ➡️ Dirty flash (preserves data)
- ➡️ Restore stock Nothing OS from custom ROM

📌 **Before You Start:**
- Visual guides have been linked in the guide below for beginners
- Download the flashing script and OTA images for **your specific model only**
- Follow the on-screen instructions carefully
- Learn how to extract split 7z files correctly - The format should be `7z.001`, `7z.002`, etc., NOT `7z.001.7z`, `7z.002.7z`

## Step 1: Download Stock Firmware Files

Go to [Nothing Archive - CMF Phone 2 Pro Release Index](https://github.com/spike0en/nothing_archive/releases) and download the following files for your desired firmware build:

- `image-boot.7z`
- `image-firmware.7z`
- `image-logical.7z.001` through `image-logical.7z.00x` (all split files)
- `-hash.sha256` (optional but recommended for integrity verification)

## Step 2: Extract Firmware Files

1. **Create a dedicated flashing folder** - Create a new folder on your PC (e.g., `CMF_Stock_Flash`)

2. **Place downloaded files** - Put all `.7z` files and the hash file in this folder

3. **Extract files:**
   - **Windows:** Right-click on `image-boot.7z` → Select "Extract to *"
   - Repeat for `image-firmware.7z` and `image-logical.7z.001`
   - **Linux/Mac:** Run `7za -y x "*.7z*"`

**Note:** All extracted `*.img` files should be in the same folder.

## Step 3: Download Nothing Fastboot Flasher Script

Download the appropriate flashing script for CMF Phone 2 Pro:

- **Windows:** [flash_all.bat](https://github.com/spike0en/nothing_fastboot_flasher/blob/galaga-tetris/Windows/flash_all.bat)
- **Bash (Linux/Mac):** [flash_all.sh](https://github.com/spike0en/nothing_fastboot_flasher/blob/galaga-tetris/bash/flash_all.sh)

Place the script in the same folder as the extracted `.img` files.

## Step 4: Prepare Your Device

1. **Connect phone to PC** via USB cable
2. **Enable USB Debugging:**
   - Settings > Developer Options > Enable USB Debugging
3. **Boot to Bootloader:**
   ```
   adb reboot bootloader
   ```
4. **Verify device is detected:**
   ```
   fastboot devices
   ```
   You should see your device listed.

## Step 5: Run the Flashing Script

**Windows:**
- Double-click `flash_all.bat` in the flashing folder
- Or run from Command Prompt:
  ```
  cd path\to\flashing\folder
  flash_all.bat
  ```

**Linux/Mac:**
```
chmod +x flash_all.sh
bash flash_all.sh
```

## Step 6: Follow Script Prompts

The script will ask you several questions:

1. **Confirm flashing folder contents** - Verify files are correct
2. **Hash verification** - Choose to verify file integrity if you have the `.sha256` file
3. **Wipe data:** 
   - Type `Y` for clean flash or downgrade
   - Type `N` for dirty flash or upgrade
4. **Flash both slots:**
   - Type `Y` for standard procedure
   - Type `N` if you have specific reasons not to
5. **Disable Android Verified Boot:**
   - Type `N` (recommended)
   - **Warning:** Typing `Y` may prevent bootloader unlock in the future

## Step 7: Monitor Flashing Progress

- Wait for all partitions to flash successfully
- Do **NOT** disconnect the phone or close the script
- If stuck at a certain percentage, wait a bit longer

## Step 8: Verify Success and Reboot

- Confirm all partitions flashed successfully in the script output
- When prompted, choose to reboot to system: `Y`
- Device will reboot and boot into the stock ROM

## Important Notes

- **A working internet connection is required** - The script downloads platform-tools if not present
- **Ensure `Android Bootloader Interface` is visible in Device Manager** when device is in bootloader mode
- **Do NOT reboot before all partitions are flashed** - This may cause soft/hard bricks
- **For best results, use Windows 10+ with functional `curl`, `tar`, and `PowerShell`**

## Troubleshooting

### Script fails to download platform-tools:
- Manually download platform-tools latest version
- Unzip into a folder named `platform-tools-latest/platform-tools/` in the flashing directory
- Re-run the script

### Device not detected in fastboot:
- Reinstall Google USB drivers
- Try a different USB port (avoid USB 3.0 if possible)
- Try a different USB cable

### Flashing fails mid-process:
- Reboot to bootloader: `adb reboot bootloader`
- Re-run the script to resume flashing

### Device doesn't boot after flashing:
- Reboot to bootloader and reflash
- If still fails, check that firmware files are not corrupted
- Verify hash of downloaded files matches the `.sha256` file

## Post-Flash Steps

After successfully flashing stock ROM:

1. Device will boot into stock Nothing OS
2. Set up your device as new or restore from backup
3. (Optional) Update to latest Nothing OS version via System Updater

**Enjoy your stock Nothing OS!**
