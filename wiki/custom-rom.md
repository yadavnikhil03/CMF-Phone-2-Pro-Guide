# Custom ROM

## AOSP Flashing Procedure

### Prerequisites

- Ensure the device's **bootloader is already unlocked**
- Latest Android Platform Tools (ADB & Fastboot tools) & USB drivers
- Download all necessary files:
  - `vendor_boot.img`
  - `super_empty.img`
  - ROM `.zip` file
  - Optional GApps `.zip` file

### Flashing Steps

**Connect your phone to PC via USB and open command prompt in the platform-tools folder:**

1. **Verify Device Connection**
   ```
   adb devices
   ```
   If prompted, allow USB debugging on the phone.

2. **Reboot to Bootloader**
   ```
   adb reboot bootloader
   ```

3. **Flash AOSP Recovery**
   ```
   fastboot flash vendor_boot vendor_boot.img
   ```

4. **Wipe the Super Partition**
   (This removes the system files from the previous ROM)
   ```
   fastboot wipe-super super_empty.img
   ```

5. **Reboot to Recovery**
   ```
   fastboot reboot recovery
   ```

6. **Do a Factory Reset**
   - On your phone Recovery: go to **Factory Reset > Format data / factory reset > format data**

7. **Sideload the ROM**
   - On your phone Recovery: go to **Apply Update > Apply from ADB**
   - In your PC terminal, execute:
   ```
   adb sideload lineage-packagename.zip
   ```
   - Wait patiently until successfully flashed. (If stuck at 47%, wait a bit more)

8. **Flash GApps (Optional)**
   - Reboot to recovery and repeat Step 7 with the GApps `.zip` file

9. **Reboot to System**
   - Enjoy your new ROM!

**Note:** If the device doesn't boot, flash to another slot.

