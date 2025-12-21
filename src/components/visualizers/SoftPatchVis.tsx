'use client';

import React, { useCallback } from 'react';
import {
    ReactFlow,
    Background,
    BackgroundVariant,
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

// --- Custom Nodes ---

// HA Input (Head Amp / Stage Box)
const DigitalSourceNode = ({ data }: NodeProps) => {
    return (
        <div className="flex flex-col items-center gap-2">
            <div className="relative bg-slate-900 border-2 border-cyan-500/50 w-20 h-20 rounded-lg flex flex-col items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all hover:border-cyan-400">
                <div className="text-[10px] text-cyan-500 mb-1">Dante 入力</div>
                <div className="text-xl font-bold text-slate-200">{data.id as string}</div>

                <Handle
                    type="source"
                    position={Position.Bottom}
                    className="!bg-cyan-500 !w-4 !h-4 !bottom-[-8px] !border-2 !border-slate-900 transition-all hover:scale-125"
                />
            </div>
            <span className="text-xs font-mono text-cyan-200/70 uppercase tracking-widest">{data.label as string}</span>
        </div>
    );
};

// Console Channel Input
const DigitalDestNode = ({ data }: NodeProps) => {
    return (
        <div className="flex flex-col items-center gap-2">
            <div className="relative bg-slate-900 border-2 border-slate-700 w-20 h-20 rounded-lg flex flex-col items-center justify-center shadow-lg transition-all hover:border-slate-500">
                <Handle
                    type="target"
                    position={Position.Top}
                    className="!bg-slate-500 !w-4 !h-4 !top-[-8px] !border-2 !border-slate-900 transition-all hover:scale-125"
                />
                <div className="text-xl font-bold text-slate-200">{data.id as string}</div>
                <div className="text-[10px] text-slate-500 mt-1">チャンネル</div>
            </div>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">{data.label as string}</span>
        </div>
    );
};

const nodeTypes = {
    digitalSource: DigitalSourceNode,
    digitalDest: DigitalDestNode,
};

// --- Initial Data ---
const initialNodes = [
    // Inputs (Stage Box)
    { id: 'in-1', type: 'digitalSource', position: { x: 50, y: 50 }, data: { id: '01', label: 'Mic 1 (登壇者A)' } },
    { id: 'in-2', type: 'digitalSource', position: { x: 200, y: 50 }, data: { id: '02', label: 'Mic 2 (登壇者B)' } },
    { id: 'in-3', type: 'digitalSource', position: { x: 350, y: 50 }, data: { id: '03', label: 'Mic 3 (司会)' } },

    // Channels (Console)
    { id: 'ch-1', type: 'digitalDest', position: { x: 50, y: 400 }, data: { id: 'CH 1', label: '登壇者 A' } },
    { id: 'ch-2', type: 'digitalDest', position: { x: 200, y: 400 }, data: { id: 'CH 2', label: '登壇者 B' } },
    { id: 'ch-3', type: 'digitalDest', position: { x: 350, y: 400 }, data: { id: 'CH 3', label: '司会 (MC)' } },
    { id: 'ch-4', type: 'digitalDest', position: { x: 500, y: 400 }, data: { id: 'CH 4', label: 'Rec (Aさん)' } },
    { id: 'ch-5', type: 'digitalDest', position: { x: 650, y: 400 }, data: { id: 'CH 5', label: 'Rec (Bさん)' } },
];

export default function SoftPatchVis() {
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const [alert, setAlert] = React.useState<string | null>(null);

    const onConnect = useCallback((params: Connection) => {
        setEdges((eds) => {
            // Soft Patch Logic:
            // One Channel (Target) can only act as ONE input.
            // BUT One Source can go to MANY Channels.

            const targetOccupied = eds.some(e => e.target === params.target);

            if (targetOccupied) {
                setAlert("⚠️ チャンネルには1つのソースしか選べません（Input Select）");
                setTimeout(() => setAlert(null), 3000);
                return eds;
            }

            const newEdge = {
                ...params,
                animated: true,
                style: { stroke: '#06b6d4', strokeWidth: 2, strokeDasharray: '5,5' }, // Digital styling
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: '#06b6d4',
                },
            };
            return addEdge(newEdge, eds);
        });
    }, [setEdges]);

    return (
        <div className="w-full h-[600px] panel-base overflow-hidden relative">
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-1">
                <div className="text-cyan-500 text-xs font-bold font-mono tracking-widest border border-cyan-900/50 px-2 py-1 rounded bg-slate-950/80">
                    DANTE CONTROLLER / SOFT PATCH
                </div>
                <div className="text-[10px] text-slate-500">
                    Source (Top) → Destination (Bottom)
                </div>
            </div>

            {/* Alert Overlay */}
            {alert && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-slate-800 text-cyan-400 px-6 py-3 rounded-lg shadow-2xl font-bold border border-cyan-500/50 animate-in fade-in zoom-in duration-200">
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
                className="bg-slate-950/80"
            >
                <Background color="#0e7490" gap={30} size={1} variant={BackgroundVariant.Dots} className="opacity-20" />
            </ReactFlow>
        </div>
    );
}
