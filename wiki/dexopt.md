# Dexopt Optimization

## What is Dexopt?

Dexopt is a system optimization process that optimizes DEX (Dalvik Executable) files. Running dexopt commands can fix microlags and slow app opening speed, especially after dirty flashing ROMs or on stock OS.

## Useful Dexopt Commands

Run these commands in Termux/ADB and wait until it says "Success".

### Non-Rooted Users

```
adb shell cmd package compile -m speed -f -a
adb shell cmd package bg-dexopt-job
```

### Rooted Users

```
su -c cmd package compile -m speed -f -a
su -c "cmd package bg-dexopt-job"
```

**Note:** For rooted users in Termux, write the command with quotes (`" "`) as shown above.

## When to Use

- After dirty flashing ROMs
- On stock OS if experiencing performance issues
- When experiencing lag or slow app opening speeds
