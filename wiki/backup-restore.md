# Backup and Restore Guide

This page focuses on safe backup and restore planning for CMF Phone 2 Pro before unlock, root, or flashing work.

---

## Why Backup Matters

Modding workflows can erase data or break critical partitions. A backup strategy lowers risk and gives you a clear recovery path.

You should keep two backup types:
- Personal data backup (photos, files, app data where possible)
- Partition backup (advanced, root required)

---

## A. Personal Data Backup (All Users)

Before any unlock or flash operation:

1. Copy photos/videos/documents to PC or cloud
2. Sync contacts and notes
3. Export important app data where app supports export
4. Save 2FA recovery codes and account credentials

Recommended minimum:
- Internal storage copy to PC
- Cloud sync for contacts and media

---

## B. Partition Backup (Advanced Users)

Partition backup is strongly recommended after bootloader unlock and root setup.

For CMF Phone 2 Pro (QCom), critical partitions include items like:
- persist
- modemst1
- modemst2
- fsg

These hold calibration/network data. Corruption may cause cellular or fingerprint issues.

Detailed commands and restore notes are already documented in:
- [Bootloader Unlock](unlock.md)

Use Section D in that page for partition backup and restore commands.

---

## C. Restore Scenarios

### Scenario 1: Return to full stock state

Use:
- [Stock ROM Flashing](stock-rom.md)

This is the primary path if you need a known-good base.

### Scenario 2: OTA failing on rooted device

Use:
- [OTA Sideloading](ota-sideload.md)

Follow Point A to restore stock partitions first.

### Scenario 3: Bootloop after root patch

Use:
- [Rooting](rooting.md)

Flash the original stock init_boot or boot image for your exact build.

---

## D. Safety Checks Before Any Restore

- Confirm exact device: CMF Phone 2 Pro (Galaga)
- Confirm exact build match for images
- Verify file integrity where hash is available
- Keep battery above 60%
- Use stable USB cable and port
- Do not disconnect while flashing

---

## E. Suggested Backup Routine

Use this repeatable routine before major changes:

1. Export/copy personal data
2. Save current build number
3. Download matching stock images
4. Keep platform-tools ready
5. Keep links to stock flash and OTA guides handy

---

## Related Pages

- [Bootloader Unlock](unlock.md)
- [Stock ROM Flashing](stock-rom.md)
- [OTA Sideloading](ota-sideload.md)
- [Troubleshooting](troubleshooting.md)

