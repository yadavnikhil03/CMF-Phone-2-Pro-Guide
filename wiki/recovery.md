# Recovery Guide

This page explains recovery options for CMF Phone 2 Pro and how to use recovery mode safely during OTA and custom ROM workflows.

---

## Recovery Types You May Use

1. Stock recovery
	 - Best for factory reset and ADB sideload of official OTA/custom ROM packages
2. AOSP/ROM-provided recovery
	 - Common in custom ROM instructions
3. Custom recovery (if available for your build)
	 - Used by advanced users for extra utilities

---

## Enter Recovery Mode

From Android system:

```bash
adb reboot recovery
```

From bootloader (when supported by workflow):

```bash
fastboot reboot recovery
```

---

## Common Recovery Tasks

### 1. Factory Reset from Recovery

Used before clean custom ROM install.

General path in recovery UI:
- Factory Reset > Format data / factory reset

### 2. ADB Sideload from Recovery

Used for OTA zip or ROM zip install.

In recovery UI:
- Apply Update > Apply from ADB

On PC:

```bash
adb sideload your-package.zip
```

### 3. Reboot Between Recovery and System

Use recovery menu options:
- Reboot to system
- Reboot to bootloader

---

## Safety Rules

- Always verify package/build compatibility before sideload
- Do not interrupt sideload or flash process
- Keep battery above 60%
- If progress pauses at common percentages (for example around 47%), wait patiently
- Keep one known-good stock path ready via [Stock ROM Flashing](stock-rom.md)

---

## Recovery Usage by Workflow

- Custom ROM install:
	- [Custom ROM](custom-rom.md)
- OTA sideload:
	- [OTA Sideloading](ota-sideload.md)
- Post-failure recovery path:
	- [Troubleshooting](troubleshooting.md)

---

## When to Avoid Recovery Flashing Experiments

Avoid random recovery image flashing unless the image is verified for:
- CMF Phone 2 Pro
- Your current base build
- Current bootloader/partition layout

If unsure, use stock flashing and OTA methods documented in this repo.

