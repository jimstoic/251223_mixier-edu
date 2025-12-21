'use client';

import React, { useCallback, useMemo } from 'react';
import {
    ReactFlow,
    Background,
    Controls,
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    Edge,
    Handle,
    Position,
    NodeProps,
    MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Mic2, Speaker, Server, Radio, Music2, Laptop, Cable, Gamepad2, Settings, Monitor, Camera } from 'lucide-react';

// --- Custom Nodes ---

const NodeShell = ({ title, children, color = "border-slate-700", icon: Icon }: any) => (
    <div className={`relative bg-slate-900 ${color} border w-auto min-w-[100px] rounded-md flex flex-col items-center justify-center shadow-lg transition-all hover:brightness-110`}>
        <div className="flex items-center gap-1.5 p-1.5 border-b border-slate-800/50 w-full justify-center bg-slate-950/30">
            {Icon && <Icon size={12} />}
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">{title}</span>
        </div>
        <div className="p-2 w-full">
            {children}
        </div>
    </div>
);

// Mic Node
const MicNode = ({ data }: NodeProps) => (
    <NodeShell title="Mic" color="border-amber-500/50" icon={Mic2}>
        <div className="text-xs font-bold text-center text-amber-500 mb-1 leading-tight">{data.label as string}</div>
        <div className="relative h-4 flex justify-end items-center">
            <span className="text-[8px] text-slate-500 mr-1.5 font-mono">XLR</span>
            <Handle type="source" position={Position.Right} className="!bg-amber-500 !w-2.5 !h-2.5 !right-[-10px]" />
        </div>
    </NodeShell>
);

// Instrument/DI Node
const InstrumentNode = ({ data }: NodeProps) => (
    <NodeShell title="Inst" color="border-purple-500/50" icon={Music2}>
        <div className="text-xs font-bold text-center text-purple-400 mb-1 leading-tight">{data.label as string}</div>
        <div className="relative h-4 flex justify-end items-center">
            <span className="text-[8px] text-slate-500 mr-1.5 font-mono">DI</span>
            <Handle type="source" position={Position.Right} className="!bg-purple-500 !w-2.5 !h-2.5 !right-[-10px]" />
        </div>
    </NodeShell>
);

// Stage Box Node
const StageBoxNode = ({ data }: NodeProps) => (
    <NodeShell title="Stage Box" color="border-slate-500" icon={Server}>
        <div className="flex gap-4">
            {/* Left: Analog Inputs */}
            <div className="flex flex-col gap-1">
                <span className="text-[8px] text-slate-500 font-bold uppercase text-center mb-0.5">In (XLR)</span>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                    <div key={i} className="relative w-16 h-5 flex items-center justify-between px-1.5 bg-slate-950 rounded border border-slate-700">
                        <Handle id={`in-${i}`} type="target" position={Position.Left} className="!bg-slate-400 !w-2 !h-2 !left-[-4px]" />
                        <span className="text-[8px] text-slate-400 font-mono">In {i}</span>
                    </div>
                ))}
            </div>

            <div className="w-[1px] bg-slate-800" />

            {/* Right: Outputs & Network */}
            <div className="flex flex-col gap-4">
                {/* Analog Outputs */}
                <div className="flex flex-col gap-1">
                    <span className="text-[8px] text-slate-500 font-bold uppercase text-center mb-0.5">Out (XLR)</span>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                        <div key={i} className="relative w-16 h-5 flex items-center justify-between px-1.5 bg-slate-950 rounded border border-slate-700">
                            <span className="text-[8px] text-slate-400 font-mono">Out {i}</span>
                            <Handle id={`out-${i}`} type="source" position={Position.Right} className="!bg-slate-400 !w-2 !h-2 !right-[-4px]" />
                        </div>
                    ))}
                </div>

                {/* Network (Moved below Outputs) */}
                <div className="flex flex-col gap-1 justify-center items-center pt-2 border-t border-slate-800">
                    <span className="text-[8px] text-emerald-500 font-bold uppercase text-center mb-0.5">Network</span>
                    <div className="relative w-16 h-8 flex items-center justify-center bg-emerald-950/20 rounded border border-emerald-500/50">
                        <Cable className="text-emerald-500 mb-0.5" size={14} />
                        <span className="absolute -bottom-2 text-[7px] text-emerald-400 font-bold whitespace-nowrap">Dante</span>
                        <Handle id="network-out" type="source" position={Position.Right} className="!bg-emerald-500 !w-2.5 !h-2.5 !right-[-4px]" />
                    </div>
                </div>
            </div>
        </div>
    </NodeShell>
);

// Console Node
const ConsoleNode = ({ data }: NodeProps) => (
    <NodeShell title="FOH Console" color="border-cyan-500/50" icon={Radio}>
        <div className="flex gap-4">
            {/* Left Column: Inputs */}
            <div className="flex flex-col gap-3">
                {/* Omni Inputs */}
                <div className="flex flex-col gap-1">
                    <span className="text-[8px] text-slate-500 font-bold uppercase text-center mb-0.5">Omni In</span>
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="relative w-16 h-5 flex items-center justify-between px-1.5 bg-slate-950 rounded border border-slate-700">
                            <Handle id={`omni-in-${i}`} type="target" position={Position.Left} className="!bg-slate-400 !w-2 !h-2 !left-[-4px]" />
                            <span className="text-[8px] text-slate-400 font-mono">In {i}</span>
                        </div>
                    ))}
                </div>

                {/* Net In */}
                <div className="flex flex-col gap-1 items-center">
                    <span className="text-[8px] text-emerald-500 font-bold uppercase text-center mb-0.5">Dante In</span>
                    <div className="relative w-16 h-6 flex items-center justify-center bg-emerald-950/20 rounded border border-emerald-500/50">
                        <Cable className="text-emerald-500" size={12} />
                        <Handle id="network-in" type="target" position={Position.Left} className="!bg-emerald-500 !w-2.5 !h-2.5 !left-[-4px]" />
                    </div>
                </div>
            </div>

            <div className="w-[1px] bg-slate-800" />

            {/* Right Column: Outputs */}
            <div className="flex flex-col gap-1.5 items-center">
                <span className="text-[8px] text-slate-500 uppercase font-bold mb-0.5">Outputs</span>

                {/* Main L/R (Vertical Stack) */}
                <div className="flex flex-col gap-1 mb-1">
                    <div className="relative w-16 h-6 bg-slate-950 rounded border border-slate-700 flex items-center justify-between px-1.5">
                        <span className="text-[8px] text-white font-bold">Main L</span>
                        <Handle id="main-l" type="source" position={Position.Right} className="!bg-red-500 !w-2 !h-2 !right-[-4px]" />
                    </div>
                    <div className="relative w-16 h-6 bg-slate-950 rounded border border-slate-700 flex items-center justify-between px-1.5">
                        <span className="text-[8px] text-white font-bold">Main R</span>
                        <Handle id="main-r" type="source" position={Position.Right} className="!bg-red-500 !w-2 !h-2 !right-[-4px]" />
                    </div>
                </div>

                {/* Mix Outputs */}
                <div className="relative w-28 h-6 bg-slate-950 rounded border border-slate-700 flex items-center justify-between px-1.5">
                    <span className="text-[8px] text-cyan-400 font-bold">Mix 1: Zoom</span>
                    <Handle id="mix-1" type="source" position={Position.Right} className="!bg-cyan-500 !w-2 !h-2 !right-[-4px]" />
                </div>
                <div className="relative w-28 h-6 bg-slate-950 rounded border border-slate-700 flex items-center justify-between px-1.5">
                    <span className="text-[8px] text-pink-400 font-bold">Mix 2: Rec</span>
                    <Handle id="mix-2" type="source" position={Position.Right} className="!bg-pink-500 !w-2 !h-2 !right-[-4px]" />
                </div>
                <div className="relative w-28 h-6 bg-slate-950 rounded border border-slate-700 flex items-center justify-between px-1.5">
                    <span className="text-[8px] text-purple-400 font-bold">Mix 3: Stream</span>
                    <Handle id="mix-3" type="source" position={Position.Right} className="!bg-purple-500 !w-2 !h-2 !right-[-4px]" />
                </div>
            </div>
        </div>
    </NodeShell>
);

// Audio Interface Node
const AudioInterfaceNode = ({ data }: NodeProps) => (
    <NodeShell title="Audio I/F" color="border-orange-500/50" icon={Settings}>
        <div className="flex gap-3 items-center">
            {/* Analog In (From Console) */}
            <div className="flex flex-col gap-1">
                <div className="relative w-16 h-5 flex items-center px-1.5 bg-slate-950 rounded border border-slate-700">
                    <Handle id="analog-in-1" type="target" position={Position.Left} className="!bg-cyan-500 !w-2 !h-2 !left-[-4px]" />
                    <span className="text-[8px] text-slate-400 ml-1">In 1</span>
                </div>
                <div className="relative w-16 h-5 flex items-center px-1.5 bg-slate-950 rounded border border-slate-700">
                    <Handle id="analog-in-2" type="target" position={Position.Left} className="!bg-cyan-500 !w-2 !h-2 !left-[-4px]" />
                    <span className="text-[8px] text-slate-400 ml-1">In 2</span>
                </div>
            </div>

            {/* USB Connection */}
            <div className="relative w-10 h-8 flex items-center justify-center bg-orange-950/20 rounded border border-orange-500/50">
                <Gamepad2 className="text-orange-500 mb-0.5" size={14} />
                <span className="absolute -bottom-2 text-[7px] text-orange-400 font-bold">USB</span>
                <Handle id="usb" type="source" position={Position.Right} className="!bg-orange-500 !w-2.5 !h-2.5 !right-[-4px] rounded-none rotate-45" />
            </div>
        </div>
    </NodeShell>
);

// Zoom PC Node
const ZoomPCNode = ({ data }: NodeProps) => (
    <NodeShell title="Zoom PC" color="border-blue-500/50" icon={Laptop}>
        <div className="flex flex-col items-center w-24">
            <div className="relative w-full h-8 bg-slate-950 rounded border border-slate-800 flex items-center gap-1.5 mb-1 px-1.5 justify-center">
                <Handle type="target" position={Position.Left} className="!bg-orange-500 !w-2.5 !h-2.5 !left-[-6px] rounded-none rotate-45" />
                <Gamepad2 size={12} className="text-orange-500" />
                <span className="text-[9px] text-blue-200 font-bold">USB Audio</span>
            </div>
            <div className="text-[8px] text-slate-500 text-center leading-tight">
                Receiving Mix 1
            </div>
        </div>
    </NodeShell>
);

// Video Switcher Node
const VideoSwitcherNode = ({ data }: NodeProps) => (
    <NodeShell title="Video Switcher" color="border-purple-500/50" icon={Monitor}>
        <div className="flex flex-col items-center w-24">
            <div className="relative w-full h-6 bg-slate-950 rounded border border-slate-800 flex items-center gap-1.5 mb-1 px-1.5 justify-center">
                <Handle type="target" position={Position.Left} className="!bg-purple-500 !w-2.5 !h-2.5 !left-[-6px]" />
                <span className="text-[9px] text-purple-400 font-bold">Audio In</span>
            </div>
            <div className="text-[8px] text-slate-500 text-center leading-tight">
                To Stream
            </div>
        </div>
    </NodeShell>
);

// Camera Node
const CameraNode = ({ data }: NodeProps) => (
    <NodeShell title="Camera" color="border-pink-500/50" icon={Camera}>
        <div className="flex flex-col items-center w-24">
            <div className="relative w-full h-6 bg-slate-950 rounded border border-slate-800 flex items-center gap-1.5 mb-1 px-1.5 justify-center">
                <Handle type="target" position={Position.Left} className="!bg-pink-500 !w-2.5 !h-2.5 !left-[-6px]" />
                <span className="text-[9px] text-pink-400 font-bold">Mic In</span>
            </div>
            <div className="text-[8px] text-slate-500 text-center leading-tight">
                Recording
            </div>
        </div>
    </NodeShell>
);


// Speaker Node
const SpeakerNode = ({ data }: NodeProps) => (
    <NodeShell title={`Main SP (${data.label || 'L'})`} color="border-red-500/50" icon={Speaker}>
        <div className="flex flex-col items-center w-24">
            <div className="relative w-full h-6 bg-slate-950 rounded border border-slate-800 flex items-center gap-1.5 mb-1 px-1.5 justify-center">
                <Handle type="target" position={Position.Left} className="!bg-red-500 !w-2.5 !h-2.5 !left-[-6px]" />
                <span className="text-[9px] text-red-400 font-bold">Input</span>
            </div>
            <div className="w-8 h-12 bg-slate-900 rounded border border-slate-800 flex flex-col items-center justify-center gap-0.5 shadow-inner">
                <div className="w-5 h-5 rounded-full border border-slate-800 bg-black" />
                <div className="w-1.5 h-1.5 rounded-full border border-slate-800 bg-black" />
            </div>
        </div>
    </NodeShell>
);

const nodeTypes = {
    mic: MicNode,
    instrument: InstrumentNode,
    stagebox: StageBoxNode,
    console: ConsoleNode,
    speaker: SpeakerNode,
    audioif: AudioInterfaceNode,
    zoompc: ZoomPCNode,
    switcher: VideoSwitcherNode,
    camera: CameraNode,
};

const initialNodes = [
    // --- COLUMN 1: SOURCES ---
    { id: 'mic-1', type: 'mic', position: { x: 50, y: 50 }, data: { label: 'Mic 1 (MC)' } },
    { id: 'mic-2', type: 'mic', position: { x: 50, y: 150 }, data: { label: 'Mic 2 (Guest A)' } },
    { id: 'mic-3', type: 'mic', position: { x: 50, y: 250 }, data: { label: 'Mic 3 (Guest B)' } },
    { id: 'inst-bgm', type: 'instrument', position: { x: 50, y: 350 }, data: { label: 'BGM (iPad)' } },
    // Extra sources for Omni In
    { id: 'extra-mic', type: 'mic', position: { x: 50, y: 450 }, data: { label: 'Talkback Mic' } },


    // --- COLUMN 2: STAGE BOX ---
    { id: 'stagebox', type: 'stagebox', position: { x: 250, y: 50 }, data: {} },

    // --- COLUMN 3: CONSOLE ---
    { id: 'console', type: 'console', position: { x: 600, y: 100 }, data: {} },

    // --- COLUMN 4: DESTINATIONS & PERIPHERALS ---

    // Speakers
    { id: 'sp-l', type: 'speaker', position: { x: 950, y: 50 }, data: { label: 'L' } },
    { id: 'sp-r', type: 'speaker', position: { x: 950, y: 200 }, data: { label: 'R' } },

    // Audio Interface -> Zoom
    { id: 'audio-if', type: 'audioif', position: { x: 900, y: 350 }, data: {} },
    { id: 'zoom-pc', type: 'zoompc', position: { x: 1080, y: 350 }, data: {} },

    // New Destinations
    { id: 'camera', type: 'camera', position: { x: 900, y: 460 }, data: {} },
    { id: 'switcher', type: 'switcher', position: { x: 900, y: 550 }, data: {} },
];

export default function PlaygroundVis() {
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

    const onConnect = useCallback((params: Connection) => {
        setEdges((eds) => addEdge({ ...params, animated: true, style: { strokeWidth: 2 } }, eds));
    }, [setEdges]);

    return (
        <div className="w-full h-[80vh] panel-base overflow-hidden relative">
            <div className="absolute top-4 left-4 z-10 text-xs font-bold font-mono tracking-widest border border-slate-700 px-2 py-1 rounded bg-slate-950/80 text-slate-400">
                SANDBOX MODE: Drag to Connect
            </div>

            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
                className="bg-slate-950/20"
            >
                <Background color="#334155" gap={40} size={1} />
                <Controls className="bg-slate-800 border-slate-700 fill-slate-200" />
            </ReactFlow>
        </div>
    );
}
