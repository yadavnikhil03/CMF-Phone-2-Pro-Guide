# Guide to Sideload OTA Updates for Nothing & CMF Phones

## Requirements

**Choose ONE of the following:**

- **Inbuilt Nothing Offline Updater Tool** - Access using dialer method (`*#*#682#*#*`)
- **Nothing Beta Updater Hub** - Available in Settings > Beta Updater (for Open Beta Test updates)

## ⚠️ Disclaimer

**Please read carefully before proceeding:**

- All firmware files are **unaltered and unmodified**, sourced directly from Nothing's official OEM servers
- Sideloading official incremental or full OTA updates is **safe** when downloaded from Nothing Archive
- **Do NOT use third-party sources** - Only download from [Nothing Archive](https://github.com/spike0en/nothing_archive)
- The built-in Nothing OS offline updater **only accepts OEM-signed update packages**
- The updater verifies firmware hash before installation and **will fail if an incorrect or mismatched OTA zip is used**
- It is **not possible to brick your device** by sideloading an official OTA zip on a locked bootloader
- All files have been verified for integrity directly from official servers

## ✍️ Important Notes

- **Bootloader unlocking is NOT mandatory** to sideload official updates (skip Step A if your bootloader is locked)
- **For rooted/unlocked bootloader users:** OTA updates won't install unless all partitions are stock (error 20) - follow Point A first
- After rooting, always restore stock partitions before OTA updates
- For Open Beta Test updates, use **Nothing Beta Updater Hub** if the dialer method doesn't work
- Download the OTA files and script for **your specific device model only**
- Visual reference guides available [here](https://github.com/spike0en/nothing_archive/blob/main/assets/sideloading)

---

## Point A: Restoring Stock Partitions (For Rooted Users Only)

⚠️ **If your bootloader is locked, skip directly to Point B**

### Step 1: Check Current Nothing OS Version

1. Go to `Settings > About phone`
2. Tap the device banner
3. Note down the **build number**
   - Example: `Galaga_B2.0-260101-1500`

### Step 2: Fetch Stock Boot Images

1. Navigate to [Nothing Archive Releases](https://github.com/spike0en/nothing_archive/releases)
2. Select your device model (CMF Phone 2 Pro = Galaga)
3. Find the release matching your current firmware build
4. Download the `-boot-image.7z` file
5. Extract the archive to get `.img` files

### Step 3: Identify Required Partitions

**For Qualcomm (QCom) Devices:**
- `boot`
- `init_boot`
- `vendor_boot`
- `recovery`
- `vbmeta`

**For MediaTek (MTK) Devices:**
- `init_boot`
- `vbmeta`
- `lk`

### Step 4: Flash Stock Partitions in Bootloader Mode

Connect phone via USB and reboot to bootloader:
```
adb reboot bootloader
```

Flash only the required partitions (skip any missing ones based on your device):

```
fastboot flash boot boot.img
fastboot flash recovery recovery.img
fastboot flash vendor_boot vendor_boot.img
fastboot flash vbmeta vbmeta.img
fastboot flash init_boot init_boot.img
fastboot flash --slot=all lk lk.img
```

### Step 5: Reboot and Update

1. Reboot to system:
   ```
   fastboot reboot
   ```
2. Try updating via **System Updater**
3. If the update fails, proceed with manual sideloading in Point B

### Step 6: Re-root (Optional)

After updating to the latest Nothing OS, you can re-root by flashing a patched boot image for the updated version. Your Magisk/KernelSU modules will remain intact.

---

## Point B: Proceed with Sideloading OTA Updates

### Step 1: Determine Your Current Build Number

1. Go to `Settings > System > About Phone`
2. Tap the device banner
3. Note down the **Build Number**
   - Example: `Galaga_B2.0-260101-1500`

### Step 2: Download the Correct OTA Firmware File

1. Visit [Nothing Archive - CMF Phone 2 Pro](https://github.com/spike0en/nothing_archive/releases)
2. Look for the **Incremental OTA** column
3. Find the update pathway from your current build to the latest build
4. Example pathway: `Galaga_B2.0-260101-1500 → Galaga_B2.1-260210-1800`
5. Download the corresponding `.zip` file

**Note:** Full OTA files can be used if incremental fails, but full OTA **cannot downgrade** - only upgrade to same or higher builds.

### Step 3: Move OTA File to Device

1. Create a folder named `ota` in your device's internal storage:
   ```
   /sdcard/ota/
   ```
2. Connect your phone to PC via USB
3. Transfer the downloaded `<firmware>.zip` file to the `ota` folder

### Step 4: Access Nothing Offline OTA Updater

**Method 1: Dialer (Primary)**
1. Open the **Phone app**
2. Dial: `*#*#682#*#*`
3. This launches the **Nothing Offline OTA Updater**
4. UI may show `NothingOfflineOtaUpdate` or `NOTHING BETA OTA UPDATE` - both work

**Method 2: Beta Updater Hub**
1. Go to **Settings > Beta Updater**
2. Useful for Open Beta Test updates
3. Use this if the dialer method doesn't work

### Step 5: Apply the OTA Update

1. The updater will **automatically detect** the OTA file in the `/sdcard/ota/` folder
2. If not detected, use **Browse** option to manually select the file
3. Tap `Directly Apply OTA` or `Update` (depending on UI)
4. **Wait patiently** until the update completes
5. Device will **reboot automatically** when done

### Step 6: Verify Update Success

1. After reboot, go to `Settings > System > About Phone`
2. Verify that you're now on the newer build number
3. Enjoy your updated Nothing OS!

---

## Troubleshooting

### "Unknown Error" in Updater

- Try using the **Browse** option instead of the default folder detection
- Verify the `.zip` file is in the correct `ota` folder path

### Stuck at a Percentage During Update

- Wait longer - sometimes OTA extraction takes time
- Don't force close the updater

### OTA File Not Detected

- Verify file path is exactly `/sdcard/ota/`
- Check that the `.zip` filename matches exactly (no duplicate copies)
- Try using the Browse option in the updater

### Error 20 (for Rooted Users)

- This means partitions are not stock
- Follow **Point A** to restore stock partitions
- After restoration, try sideloading again

### Update Fails After Partial Installation

- Try downloading and sideloading the **Full OTA** instead of incremental
- Ensure device has sufficient free storage (at least 2GB)

---

## What You Can Do with OTA Sideloading

✅ **Upgrade** to newer Nothing OS versions  
✅ **Downgrade** to older versions (using manual ROM flashing, not OTA)  
✅ **Install custom builds** (if available in Nothing Archive)  
✅ **Switch between regional builds** if needed  
✅ **Recover from failed OTA updates** using manual sideload  

---

## Additional Resources

- [Nothing Archive GitHub](https://github.com/spike0en/nothing_archive)
- [Visual Sideloading Guide Images](https://github.com/spike0en/nothing_archive/blob/main/assets/sideloading)
- [Nothing OS Changelogs](https://github.com/spike0en/nothing_archive/blob/main/assets/changelogs)
