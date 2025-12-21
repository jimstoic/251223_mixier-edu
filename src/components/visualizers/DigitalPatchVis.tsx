'use client';

import React, { useCallback, useState } from 'react';
import {
    ReactFlow,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    Edge,
    Handle,
    Position,
    NodeProps,
    MarkerType,
    Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// --- Custom Nodes ---

const OmniInNode = ({ data }: NodeProps) => (
    <div className="relative bg-slate-900 border-2 border-slate-600 w-44 h-24 rounded-lg flex flex-col items-center justify-center shadow-lg">
        <div className="absolute top-0 left-0 bg-slate-700 text-[10px] text-white px-2 py-0.5 rounded-tl rounded-br font-mono">
            PHYSICAL INPUT
        </div>
        <div className="text-sm font-bold text-slate-200 mt-2">{data.label as string}</div>
        <div className="text-[10px] text-slate-500">{data.desc as string}</div>
        <Handle type="source" position={Position.Right} id="out" className="!bg-emerald-500 !w-3 !h-3" />
    </div>
);

const ChannelStripNode = ({ data }: NodeProps) => (
    <div className="relative bg-slate-950 border-2 border-indigo-600 w-44 h-24 rounded-lg flex flex-col items-center justify-center shadow-lg">
        <Handle type="target" position={Position.Left} id="in" className="!bg-indigo-500 !w-3 !h-3" />
        <div className="absolute top-0 right-0 bg-indigo-700 text-[10px] text-white px-2 py-0.5 rounded-bl rounded-tr font-mono">
            CHANNEL STRIP
        </div>
        <div className="text-sm font-bold text-indigo-200 mt-2">{data.label as string}</div>
        <div className="text-[10px] text-slate-500">{data.desc as string}</div>
    </div>
);

const nodeTypes = {
    omniIn: OmniInNode,
    chStrip: ChannelStripNode,
};

const initialNodes = [
    // Physical Inputs (Left)
    { id: 'in-1', type: 'omniIn', position: { x: 50, y: 50 }, data: { label: 'Omni In 1', desc: 'Mic 1 connected here' } },
    { id: 'in-2', type: 'omniIn', position: { x: 50, y: 180 }, data: { label: 'Omni In 2', desc: 'Mic 2 connected here' } },
    { id: 'in-3', type: 'omniIn', position: { x: 50, y: 310 }, data: { label: 'Omni In 3', desc: 'Unused' } },

    // Channel Strips (Right)
    { id: 'ch-1', type: 'chStrip', position: { x: 500, y: 50 }, data: { label: 'CH 1', desc: 'Main Vocal' } },
    { id: 'ch-2', type: 'chStrip', position: { x: 500, y: 180 }, data: { label: 'CH 2', desc: 'Guest' } },
    { id: 'ch-3', type: 'chStrip', position: { x: 500, y: 310 }, data: { label: 'CH 3', desc: 'Spare' } },
    { id: 'ch-4', type: 'chStrip', position: { x: 500, y: 440 }, data: { label: 'CH 4', desc: 'Rec Vocal (Split)' } },
];

export default function DigitalPatchVis() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

    const onConnect = useCallback((params: Connection) => {
        setEdges((eds) => {
            // Logic: One Channel Strip (Target) can only accept ONE input.
            // If a connection to this target already exists, remove it (replace behavior).
            const filtered = eds.filter(e => e.target !== params.target);
            return addEdge({ ...params, animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } }, filtered);
        });
    }, [setEdges]);

    return (
        <div className="w-full h-[600px] panel-base overflow-hidden relative">
            <div className="absolute top-4 left-4 z-10 bg-slate-900/90 p-3 rounded-lg border border-slate-700 text-xs text-slate-300 max-w-sm">
                <h4 className="font-bold text-white mb-1">SOFT PATCHING</h4>
                <p>
                    左側の「物理入力端子」から、右側の「チャンネルストリップ」へ自由にケーブルを繋いでください。<br />
                    <strong>Try:</strong> Omni In 1 を CH 1 と CH 4 両方に繋ぐ (Splitting)。
                </p>
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
                <Background color="#1e293b" gap={20} size={1} />
            </ReactFlow>
        </div>
    );
}
