> Part of Netvision -> Local Area Network Ping Simulator


# NetVision Device Components

In NetVision, each network device is represented as a **reusable React component**. Each component is wrapped inside a **React Flow node** and linked to a backend device object.

---

<br>

![netvision device](/public/image.png)


## Device Component

The `NetworkDevice` component represents a single network device in the UI.

### Props

| Prop | Type | Description |
| --- | --- | --- |
| `Logo` | `ReactElement` | Icon representing the type of device |
| `deviceId` | `number` | Identifier linking the component to a backend device object |

```tsx
export type NetworkDeviceProps = {
  Logo: ReactElement;
  deviceId: number;
};

```

### Full Component Code

```tsx
const NetworkDevice: FC<NetworkDeviceProps> = ({ Logo, deviceId }): ReactElement => {
  const context = useContext(AppContext);

  if (!context) console.log("Network Device must be inside app provider");

  const { devices } = context;
  const requiredDevice = devices[deviceId];

  return (
    <figure className="text-white flex flex-col items-center gap-y-2 border-dashed border-white relative">
      <TippyclassName="absolute top-1/2 left-1/2 -translate-x-1/2 shadow-xl shadow-[#1a4f265b]"
        content={<AdditionalInfo />}
      >
        <div className="hover:shadow-md flex justify-center items-center shadow-[#1a4f265b] border border-[#2dd11079] cursor-pointer w-24 aspect-square rounded-md">
          {Logo}
        </div>
      </Tippy>
      <h3>{requiredDevice ? requiredDevice.deviceName : "PC X"}</h3>
    </figure>
  );
};

export default NetworkDevice;

```

### Explanation

1. **Context Initialization** – The component uses `AppContext` to access the backend `devices` state.

```tsx
const context = useContext(AppContext);
const { devices } = context;

```

1. **Identify Device Object** – Determines which backend device object this component represents.

```tsx
const requiredDevice = devices[deviceId];

```

1. **Render Component** – Renders the device icon and device name. Uses `Tippy` to show hover info.

---

## React Flow Node Integration

Each device component can be used as a node in a **React Flow** diagram.

### Custom Node Component

```tsx
const DeviceNode: React.FC<NodeProps<NetworkDeviceProps>> = ({ data }) => {
  return (
    <div>
      <NetworkDevice Logo={data.Logo} deviceId={data.deviceId} />
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
};

```

### Register Node Type

```tsx
const nodeTypes = { deviceNode: DeviceNode };

```

### Initialize Nodes

```tsx
const initialNodes = [
  { id: "1", type: "deviceNode", position: { x: 0, y: 0 }, data: { Logo: <MdComputer size={48} />, deviceId: 0 } },
  { id: "2", type: "deviceNode", position: { x: 0, y: 400 }, data: { Logo: <MdComputer size={48} />, deviceId: 1 } },
];

```

### Initialize Edges

```tsx
const initialEdges = [{ id: "e1-2", source: "1", target: "2", type: "straight" }];

```

### Render React Flow Graph

```tsx
export default function NetworkFlow() {
  return (
    <div className="h-96 w-3xl flex justify-center items-center bg-black">
      <ReactFlow nodes={initialNodes} edges={initialEdges} nodeTypes={nodeTypes}>
        <Background />
      </ReactFlow>
    </div>
  );
}

```

### Summary

- `NetworkDevice` is a reusable React component representing a device.
- `DeviceNode` wraps `NetworkDevice` to integrate it into **React Flow** as a custom node.
- Nodes are initialized with position and device data.
- Edges define connections between devices in the flow graph.