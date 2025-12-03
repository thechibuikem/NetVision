> Part of Netvision -> Local Area Network Ping Simulator

# Network Utility Functions

NetVision provides utility functions to handle **ARP requests** and **switch MAC learning**. These update device tables and broadcast changes to the frontend.

---

## ARP Request

Simulates an ARP request by mapping a device’s IP to its MAC address in the source device’s ARP table.

### Function Overview

**Purpose:**

- Adds an ARP entry to the source device’s ARP table.
- Broadcasts updated devices to the frontend.
- Returns the source and destination devices.

**Parameters:**

| Parameter | Type | Description |
| --- | --- | --- |
| `sourceDevice` | object | Device sending the ARP request |
| `destinationIP` | string | IP address of the target device |

### Code

```jsx
export async function arpRequest(sourceDevice, destinationIP) {
  const destinationDevice = devices.find(
    (device) => device.ip === destinationIP
  );

  if (!destinationDevice) {
    return console.log(
      "Requested ARP recipient device not in sub-network. Please check IP address."
    );
  }

  // Update source device ARP table
  sourceDevice.arpTable.push({
    mac: destinationDevice.mac,
    ip: destinationDevice.ip,
  });

  // Broadcast changes to frontend
  broadcast({ type: "devices", devices: devices });

  return { sourceDevice, destinationDevice };
}

```

---

## Switch MAC Learning

Simulates **switch MAC learning**, updating the switch’s MAC table based on connected devices.

### Function Overview

**Purpose:**

- Finds the switch in the same LAN segment as the source device.
- Checks if the MAC address is already learned.
- If not, adds the MAC address to the switch’s MAC table.
- Broadcasts updated devices to the frontend.

**Parameters:**

| Parameter | Type | Description |
| --- | --- | --- |
| `sourceDevice` | object | Device whose MAC address the switch should learn |

### Code

```jsx
export async function learnMac(sourceDevice) {
  const homeSwitch = devices.find(
    (device) => device.type === "switch" && device.lanSegment === sourceDevice.lanSegment
  );

  const isMacEntry = homeSwitch.macTable.find(
    (entry) => entry.mac === sourceDevice.mac
  );

  if (isMacEntry) return; // MAC already learned

  // Update switch MAC table
  homeSwitch.macTable.push({
    mac: sourceDevice.mac,
    interface: sourceDevice.networkInterface,
  });

  // Broadcast changes to frontend
  broadcast({ type: "devices", devices: devices });
}

```

---

### Summary

- **`arpRequest`**: Updates the ARP table of a source device and notifies the frontend.
- **`learnMac`**: Updates the MAC table of a switch when a new device connects to its LAN segment.
- Both functions keep the frontend in sync with backend device state.