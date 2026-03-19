# FAQ

Frequently asked questions for CMF Phone 2 Pro modding workflows.

---

## General

### Is this guide only for CMF Phone 2 Pro?

Yes. Steps are organized for CMF Phone 2 Pro workflows. Do not assume commands/files are safe for other models.

### What should I do before any modding step?

1. Back up personal data
2. Note current build number
3. Prepare ADB and Fastboot
4. Keep stock restore path ready

Use:
- [Tools](tools.md)
- [Backup and Restore](backup-restore.md)

---

## Bootloader and Warranty

### Does unlocking bootloader erase data?

Yes. Unlocking performs a factory reset.

### Does unlocking void warranty?

Yes. You can usually return to stock and relock, but Widevine and integrity behavior may still be affected.

Reference:
- [Bootloader Unlock](unlock.md)

---

## Root and OTA

### Can I take OTA after rooting?

Yes, but rooted devices usually need stock partitions restored first.

Reference:
- [OTA Sideloading](ota-sideload.md)
- [Rooting](rooting.md)

### Which root method is easiest for beginners?

Magisk is generally the easiest starting point.

Reference:
- [Root with Magisk](root-magisk.md)

---

## Flashing and Recovery

### What if device bootloops after flashing?

Most common fix is restoring exact stock images for your current build or full stock ROM flash.

Reference:
- [Stock ROM Flashing](stock-rom.md)
- [Troubleshooting](troubleshooting.md)

### Can I downgrade with OTA zip?

Not through normal OTA flow. Use stock flashing workflow for downgrade scenarios.

Reference:
- [Stock ROM Flashing](stock-rom.md)

---

## Safety and Best Practices

### Why is exact build matching important?

Mismatched boot/init_boot/vendor_boot files can cause bootloops or update failures.

### Can I skip backup if I am experienced?

You can, but it is still high risk. Backup is strongly recommended before unlock, root, or flash.

---

## Ecosystem Resources

### Where can I find trusted apps and projects for Nothing/CMF?

Use:
- [Resource Index](resource-index.md)

This page points to the curated Awesome Nothing ecosystem index.

---

## Still Stuck?

1. Check [Troubleshooting](troubleshooting.md)
2. Open discussion in project community channels
3. Share exact error message and current build number for accurate help

