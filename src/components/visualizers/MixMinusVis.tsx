'use client';

import React, { useCallback, useEffect } from 'react';
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
    type Node as RFNode,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { clsx } from 'clsx';
import { Mic, Video, Volume2 } from 'lucide-react';

// --- Custom Nodes ---

// Source Node (Zoom In / Mic)
const SourceNode = ({ data }: NodeProps) => (
    <div className={clsx(
        "relative w-40 h-24 rounded-lg flex flex-col items-center justify-center border-2 transition-all shadow-lg bg-slate-900",
        data.type === 'zoom' ? "border-blue-500" : "border-amber-500"
    )}>
        <div className="mb-2">
            {data.type === 'zoom' ? <Video className="text-blue-400" /> : <Mic className="text-amber-400" />}
        </div>
        <div className="text-sm font-bold text-slate-200">{data.label as string}</div>
        <div className="text-[10px] text-slate-500">{data.subLabel as string}</div>
        <Handle type="source" position={Position.Bottom} className={clsx("!w-3 !h-3", data.type === 'zoom' ? "!bg-blue-500" : "!bg-amber-500")} />
    </div>
);

// Bus Node (Mix Bus)
const BusNode = ({ data }: NodeProps) => (
    <div className={clsx(
        "relative w-48 h-32 rounded-lg flex flex-col items-center justify-center border-2 transition-all shadow-xl",
        data.feedback ? "border-red-500 bg-red-950/20 shadow-[0_0_30px_rgba(239,68,68,0.3)]" : "border-emerald-500 bg-slate-900"
    )}>
        <Handle type="target" position={Position.Top} className="!w-24 !h-4 !rounded-sm !bg-slate-600" />

        <div className="text-lg font-bold text-emerald-400 mb-1">MIX 1 (Zoom Send)</div>
        <div className="text-xs text-slate-400 text-center px-4 mb-2">
            ここに集めた音が<br />Zoomの向こう側に送られます
        </div>

        {(data.feedback as boolean) && (
            <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded animate-pulse">
                ⚠️ LOOP DETECTED
            </div>
        )}

        {/* Output Wire Visualization */}
        <div className="absolute -bottom-12 w-1 h-12 bg-slate-600"></div>
    </div>
);

const nodeTypes = {
    source: SourceNode,
    bus: BusNode,
};

const initialNodes: RFNode[] = [
    {
        id: 'zoom',
        type: 'source',
        position: { x: 50, y: 0 },
        data: { label: 'Zoom Input', subLabel: '相手の声 (受信)', type: 'zoom' }
    },
    {
        id: 'mic',
        type: 'source',
        position: { x: 300, y: 0 },
        data: { label: 'Local Mic', subLabel: '自分の声', type: 'mic' }
    },
    {
        id: 'bus',
        type: 'bus',
        position: { x: 175, y: 200 },
        data: { label: 'Mix Bus', feedback: false }
    },
];

// Initial: Only Mic connected to Bus (Correct)
const initialEdges: Edge[] = [
    {
        id: 'e-mic-bus',
        source: 'mic',
        target: 'bus',
        animated: true,
        style: { stroke: '#10b981', strokeWidth: 2 },
        label: 'Send'
    },
];

export default function MixMinusVis() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [isLooping, setIsLooping] = React.useState(false);

    const onConnect = useCallback((params: Connection) => {
        setEdges((eds) => {
            // Check if Zoom is being connected
            const isZoom = params.source === 'zoom';

            const newEdge = {
                ...params,
                animated: true,
                style: {
                    stroke: isZoom ? '#ef4444' : '#10b981',
                    strokeWidth: isZoom ? 4 : 2
                },
                label: isZoom ? 'BAD LOOP' : 'Send'
            };
            return addEdge(newEdge, eds);
        });
    }, [setEdges]);

    // Check for loop (Zoom -> Bus)
    useEffect(() => {
        const hasZoomConnection = edges.some(e => e.source === 'zoom' && e.target === 'bus');
        setIsLooping(hasZoomConnection);

        setNodes(nds => nds.map(n => {
            if (n.id === 'bus') {
                return { ...n, data: { ...n.data, feedback: hasZoomConnection } };
            }
            return n;
        }));
    }, [edges, setNodes]);

    const reset = () => setEdges(initialEdges);

    return (
        <div className="w-full h-[500px] panel-base overflow-hidden relative bg-slate-950">
            {/* Header */}
            <div className="absolute top-4 left-4 z-10">
                <div className="text-emerald-500 text-xs font-bold font-mono tracking-widest border border-emerald-900/50 px-2 py-1 rounded bg-slate-900/90">
                    N-1 (MIX MINUS) SIMULATOR
                </div>
            </div>

            {/* Controls */}
            <div className="absolute top-4 right-4 z-10 flex gap-2">
                <button
                    onClick={reset}
                    className="px-3 py-1 bg-slate-800 text-slate-300 text-xs rounded hover:bg-slate-700 transition-colors border border-slate-700"
                >
                    Reset (Correct)
                </button>
            </div>

            {/* Status Message */}
            <div className="absolute bottom-4 left-4 right-4 z-10 bg-slate-900/95 p-4 rounded-lg border border-slate-700 text-sm shadow-xl">
                {!isLooping ? (
                    <div className="flex items-start gap-3">
                        <div className="bg-emerald-500/10 p-2 rounded-full">
                            <Volume2 className="text-emerald-500" size={24} />
                        </div>
                        <div>
                            <div className="text-emerald-400 font-bold mb-1">✅ 正常：マイナスワン (N-1)</div>
                            <div className="text-slate-400 text-xs leading-relaxed">
                                Zoom相手の声（青）は、Mix Bus（Zoomへの返し）には送られていません。<br />
                                相手には「自分の声」だけが届きます。これが正しい設定です。
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-start gap-3">
                        <div className="bg-red-500/10 p-2 rounded-full animate-pulse">
                            <Volume2 className="text-red-500" size={24} />
                        </div>
                        <div>
                            <div className="text-red-400 font-bold mb-1">⚠️ 危険：ループ発生中 (Loopback)</div>
                            <div className="text-slate-300 text-xs leading-relaxed">
                                <strong>「Zoom Input」から「Zoom Send」への線がつながってしまっています！</strong><br />
                                相手の声が、そのまま相手に跳ね返っています。相手側では自分の声が遅れて聞こえ、最悪の場合ハウリングします。<br />
                                <span className="text-yellow-400">直ちに Zoom Input からの線を切断（削除）してください。</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="absolute top-20 left-1/2 -translate-x-1/2 text-xs text-slate-500 bg-slate-900/80 px-2 py-1 rounded pointer-events-none z-0">
                ↓ ドラッグして線を繋いでみてください ↓
            </div>

            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
                className="bg-slate-950"
            >
                <Background color="#334155" gap={40} size={1} />
            </ReactFlow>
        </div>
    );
}
