'use client';


import React, { useCallback } from 'react';
import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    Edge,
    Handle,
    Position,
    NodeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// --- Custom Nodes ---

// Input Jack (Source) - e.g. Mic output
const SourceNode = ({ data }: NodeProps) => {
    return (
        <div className="flex flex-col items-center gap-2">
            <div className="jack-input group relative bg-slate-900 border-4 border-slate-700 w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all hover:border-slate-500">
                <div className="w-8 h-8 rounded-full bg-black/60 shadow-inner" />
                {/* Source acts as a "Source" so it has a Handle on the bottom or acts as an Output in RF terms */}
                <Handle type="source" position={Position.Bottom} className="!bg-transparent !w-full !h-full !border-0 !top-0 !left-0 !transform-none !rounded-full opacity-0 hover:opacity-100" />
            </div>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">{data.label as string}</span>
        </div>
    );
};

// Destination Jack (Sink) - e.g. Channel Input
const DestinationNode = ({ data }: NodeProps) => {
    return (
        <div className="flex flex-col items-center gap-2">
            <div className="jack-input group relative bg-slate-900 border-4 border-slate-700 w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all hover:border-slate-500">
                <div className="w-8 h-8 rounded-full bg-black/60 shadow-inner" />
                {/* Destination accepts input */}
                <Handle type="target" position={Position.Top} className="!bg-transparent !w-full !h-full !border-0 !top-0 !left-0 !transform-none !rounded-full opacity-0 hover:opacity-100" />
            </div>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">{data.label as string}</span>
        </div>
    );
};

const nodeTypes = {
    sourceNode: SourceNode,
    destinationNode: DestinationNode,
};

// --- Initial Data ---
const initialNodes = [
    { id: 'mic-1', type: 'sourceNode', position: { x: 50, y: 50 }, data: { label: 'Mic 1 (登壇者A)' } },
    { id: 'mic-2', type: 'sourceNode', position: { x: 250, y: 50 }, data: { label: 'Mic 2 (登壇者B)' } },
    { id: 'di-1', type: 'sourceNode', position: { x: 450, y: 50 }, data: { label: 'PC (USB DI)' } },

    { id: 'ch-1', type: 'destinationNode', position: { x: 50, y: 350 }, data: { label: 'CH 1 (Aさん)' } },
    { id: 'ch-2', type: 'destinationNode', position: { x: 250, y: 350 }, data: { label: 'CH 2 (Bさん)' } },
    { id: 'ch-3', type: 'destinationNode', position: { x: 450, y: 350 }, data: { label: 'CH 3 (BGM)' } },
];

export default function PatchBay() {
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

    const [alert, setAlert] = React.useState<string | null>(null);

    const onConnect = useCallback((params: Connection) => {
        // Enforce 1-to-1 Physical Connection Rule
        setEdges((eds) => {
            // Check if TARGET or SOURCE is already connected
            const targetOccupied = eds.some(e => e.target === params.target);
            const sourceOccupied = eds.some(e => e.source === params.source);

            if (targetOccupied || sourceOccupied) {
                setAlert("⚠️ 既にケーブルが刺さっています！物理的に刺せません。");
                setTimeout(() => setAlert(null), 3000);
                return eds; // Do nothing
            }

            const newEdge = {
                ...params,
                animated: true,
                style: { stroke: '#06b6d4', strokeWidth: 12 }, // Thicker Cable (12px)
                type: 'default'
            };
            return addEdge(newEdge, eds);
        });
    }, [setEdges]);

    return (
        <div className="w-full h-[500px] panel-base overflow-hidden relative">
            <div className="absolute top-4 left-4 z-10 text-slate-500 text-xs font-bold font-mono tracking-widest border border-slate-700 px-2 py-1 rounded bg-slate-950/80">
                PATCHBAY SIMULATOR V1.1 (REALISM MODE)
            </div>

            {/* Alert Overlay */}
            {alert && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-red-500/90 text-white px-6 py-3 rounded-lg shadow-2xl font-bold backdrop-blur-sm border border-red-400 animate-in fade-in zoom-in duration-200">
                    {alert}
                </div>
            )}

            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
                className="bg-slate-950/50"
            >
                <Background color="#1e293b" gap={20} size={1} />
                {/* Controls removed to avoid UI clutter */}
            </ReactFlow>
        </div>
    );
}
