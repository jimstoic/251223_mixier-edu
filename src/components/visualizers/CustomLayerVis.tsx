'use client';

import React, { useState } from 'react';
import { Link2, Layers, ArrowDown, X } from 'lucide-react';

// --- Types ---
type Channel = {
    id: number;
    label: string;
    level: number; // 0-100
    linkedWith: number | null; // ID of the partner channel
    color: string;
};

type CustomSlot = {
    id: number;
    assignedChId: number | null;
};

// --- Initial Data ---
const INITIAL_CHANNELS: Channel[] = [
    { id: 1, label: 'BGM L', level: 0, linkedWith: null, color: 'bg-purple-500' },
    { id: 2, label: 'BGM R', level: 0, linkedWith: null, color: 'bg-purple-500' },
    { id: 3, label: 'Zoom L', level: 0, linkedWith: null, color: 'bg-blue-500' },
    { id: 4, label: 'Zoom R', level: 0, linkedWith: null, color: 'bg-blue-500' },
    { id: 5, label: 'Mic 1', level: 0, linkedWith: null, color: 'bg-amber-500' },
    { id: 6, label: 'Mic 2', level: 0, linkedWith: null, color: 'bg-amber-500' },
    { id: 7, label: 'Mic 3', level: 0, linkedWith: null, color: 'bg-amber-500' },
    { id: 8, label: 'Mic 4', level: 0, linkedWith: null, color: 'bg-amber-500' },
];

const INITIAL_CUSTOM_LAYER: CustomSlot[] = [
    { id: 1, assignedChId: null },
    { id: 2, assignedChId: null },
    { id: 3, assignedChId: null },
    { id: 4, assignedChId: null },
];

// --- Helper Component ---
const VerticalFader = ({ level, onChange, color }: { level: number; onChange: (val: number) => void; color: string }) => {
    // Custom pointer handler to ensure consistent behavior across devices
    const handlePointer = (e: React.PointerEvent) => {
        // Prevent default browser behaviors (scrolling, etc)
        e.preventDefault();
        e.stopPropagation();

        const rect = e.currentTarget.getBoundingClientRect();
        // Calculate internal specific tap position
        // Top = 100%, Bottom = 0%
        // clientY is relative to viewport, so rect.top is 0-point of element top
        const y = e.clientY - rect.top;
        const height = rect.height;

        // Clamp 0-1
        // If y is 0 (top), val should be 1. If y is height (bottom), val should be 0.
        const normalized = 1 - (y / height);
        const clamped = Math.max(0, Math.min(1, normalized));

        onChange(Math.round(clamped * 100));
    };

    return (
        <div
            className="relative w-16 h-36 flex items-center justify-center cursor-pointer touch-none"
            style={{ touchAction: 'none' }} // Excessive safety
            onPointerDown={(e) => {
                e.currentTarget.setPointerCapture(e.pointerId);
                handlePointer(e);
            }}
            onPointerMove={(e) => {
                // Only process move if button is pressed
                if (e.buttons === 1) {
                    handlePointer(e);
                }
            }}
            onPointerUp={(e) => {
                e.currentTarget.releasePointerCapture(e.pointerId);
                e.stopPropagation();
            }}
        >
            {/* The Hit Area - Invisible but large */}
            <div className="absolute inset-0 z-50 bg-transparent hover:bg-white/5 transition-colors rounded-lg" />

            {/* Visual Track (Background) */}
            <div className="w-2 h-32 bg-slate-950 rounded-full relative pointer-events-none z-10">
                {/* Visual Level Fill */}
                <div
                    className={`absolute bottom-0 w-full rounded-b-full opacity-50 transition-all duration-75 ${color}`}
                    style={{ height: `${level}%` }}
                />

                {/* Visual Handle */}
                <div
                    className="absolute w-10 h-16 -left-4 rounded shadow-xl flex items-center justify-center transition-all duration-75 ease-out bg-gradient-to-b from-slate-700 to-slate-800 border border-t-slate-600 border-b-slate-900"
                    style={{ bottom: `${level}%`, transform: 'translateY(50%)' }}
                >
                    <div className="w-8 h-0.5 bg-slate-950/50" />
                </div>
            </div>
        </div>
    );
};

export default function CustomLayerVis() {
    const [channels, setChannels] = useState<Channel[]>(INITIAL_CHANNELS);
    const [customLayer, setCustomLayer] = useState<CustomSlot[]>(INITIAL_CUSTOM_LAYER);
    const [draggedChId, setDraggedChId] = useState<number | null>(null);

    // --- Actions ---

    const toggleLink = (chId: number) => {
        // Only allow linking 1-2, 3-4 for simplicity
        const pairId = chId % 2 !== 0 ? chId + 1 : chId - 1;

        setChannels(prev => prev.map(ch => {
            if (ch.id === chId || ch.id === pairId) {
                // Determine who to link to (my partner)
                const targetLink = ch.id === chId ? pairId : chId;

                return {
                    ...ch,
                    linkedWith: ch.linkedWith === null ? targetLink : null,
                    // reset levels when linking to avoid jumps
                    level: 0
                };
            }
            return ch;
        }));
    };

    const handleAssign = (slotId: number, chId: number) => {
        setCustomLayer(prev => prev.map(slot =>
            slot.id === slotId ? { ...slot, assignedChId: chId } : slot
        ));
    };

    const handleRemove = (slotId: number) => {
        setCustomLayer(prev => prev.map(slot =>
            slot.id === slotId ? { ...slot, assignedChId: null } : slot
        ));
    };

    const handleFaderMove = (chId: number, newLevel: number) => {
        const sourceCh = channels.find(c => c.id === chId);
        if (!sourceCh) return;

        setChannels(prev => prev.map(ch => {
            // Update self
            if (ch.id === chId) return { ...ch, level: newLevel };
            // Update linked partner
            if (ch.linkedWith === chId) return { ...ch, level: newLevel };
            return ch;
        }));
    };

    return (
        <div className="w-full bg-slate-950 rounded-xl border border-slate-800 p-6 flex flex-col gap-8 select-none">

            {/* --- TOP: ENGINE ROOM (Actual Channels) --- */}
            <div className="relative p-6 bg-slate-900 rounded-lg border border-slate-800 border-dashed">
                <div className="absolute -top-3 left-4 px-2 bg-slate-950 text-xs font-bold text-slate-500 uppercase tracking-widest border border-slate-800 rounded">
                    Internal Processing (裏側の実体)
                </div>

                <div className="flex justify-between items-start">
                    {channels.map((ch) => {
                        const isOdd = ch.id % 2 !== 0;
                        const partner = channels.find(c => c.id === ch.linkedWith);
                        const isLinked = ch.linkedWith !== null;

                        return (
                            <div key={ch.id} className="relative flex flex-col items-center gap-2 group">
                                {/* Link Indicator for Pair (Only show on odd channels) */}
                                {isOdd && (
                                    <button
                                        onClick={() => toggleLink(ch.id)}
                                        className={`absolute -top-4 w-12 h-6 rounded-full border flex items-center justify-center transition-all z-10
                                            ${isLinked
                                                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                                                : 'bg-slate-800 border-slate-700 text-slate-600 hover:border-slate-500'
                                            }`}
                                        title="Stereo Link Toggle"
                                    >
                                        <Link2 size={12} />
                                    </button>
                                )}

                                {/* Draggable Handle */}
                                <div
                                    className={`w-14 h-10 mt-4 rounded border flex items-center justify-center cursor-grab active:cursor-grabbing hover:bg-slate-800 transition-colors
                                        ${isLinked ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-slate-700 bg-slate-950'}
                                    `}
                                    draggable
                                    onDragStart={() => setDraggedChId(ch.id)}
                                    onDragEnd={() => setDraggedChId(null)}
                                >
                                    <span className={`text-[10px] font-bold ${ch.color.replace('bg-', 'text-')}`}>
                                        {ch.label}
                                    </span>
                                </div>

                                {/* Mini Fader (Read Only) */}
                                <div className="w-2 h-20 bg-slate-950 rounded-full relative overflow-hidden border border-slate-800">
                                    <div
                                        className={`absolute bottom-0 w-full transition-all duration-75 ${ch.color}`}
                                        style={{ height: `${ch.level}%` }}
                                    />
                                </div>

                                <span className="text-[9px] text-slate-600 font-mono">{ch.id}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* --- MIDDLE: Arrow --- */}
            <div className="flex justify-center text-slate-600">
                <div className="flex flex-col items-center gap-1 animate-bounce">
                    <span className="text-xs font-bold uppercase tracking-widest">Assign to Custom Layer</span>
                    <ArrowDown size={20} />
                </div>
            </div>

            {/* --- BOTTOM: CUSTOM LAYER (User Interface) --- */}
            <div className="relative p-6 bg-gradient-to-b from-slate-900 to-slate-950 rounded-lg border-2 border-slate-700 shadow-xl">
                <div className="absolute -top-3 left-4 px-2 bg-emerald-500 text-xs font-bold text-slate-900 uppercase tracking-widest rounded shadow">
                    Your Custom Layer (手元の操作盤)
                </div>

                <div className="flex justify-around items-end h-48">
                    {customLayer.map((slot) => {
                        const assignedCh = channels.find(c => c.id === slot.assignedChId);

                        return (
                            <div
                                key={slot.id}
                                className={`relative w-24 h-full bg-slate-900/50 rounded-lg border-2 border-dashed flex flex-col items-center justify-end pb-2 transition-all
                                    ${draggedChId ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-slate-800'}
                                    ${assignedCh ? 'border-solid border-slate-600 bg-slate-900' : ''}
                                `}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={() => draggedChId && handleAssign(slot.id, draggedChId)}
                            >
                                {assignedCh ? (
                                    <>
                                        {/* Remove Button */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent drag events
                                                handleRemove(slot.id);
                                            }}
                                            className="absolute -top-2 -right-2 bg-slate-800 border border-slate-600 text-slate-400 rounded-full p-1 hover:bg-red-900/50 hover:text-red-400 hover:border-red-500 transition-all z-30"
                                            title="Remove"
                                        >
                                            <X size={12} />
                                        </button>

                                        <VerticalFader
                                            level={assignedCh.level}
                                            onChange={(val) => handleFaderMove(assignedCh.id, val)}
                                            color={assignedCh.color}
                                        />

                                        {/* Scribble Strip */}
                                        <div className={`mt-2 w-20 py-1 rounded text-xs font-bold text-center text-slate-900 ${assignedCh.color}`}>
                                            {assignedCh.label}
                                        </div>

                                        {/* Stereo Link Indicator on Fader */}
                                        {assignedCh.linkedWith && (
                                            <div className="absolute top-2 right-2 text-emerald-500 pointer-events-none">
                                                <Link2 size={12} />
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="text-xs text-slate-600 font-bold uppercase tracking-widest text-center h-full flex items-center justify-center">
                                        Drop<br />Here
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="text-center text-xs text-slate-500">
                <span className="font-bold text-emerald-400">Try it:</span> チャンネル上部の <Link2 size={10} className="inline" /> ボタンでステレオリンクし、片方だけを下のレイヤーに置いて動かしてみてください。
            </div>
        </div>
    );
}
