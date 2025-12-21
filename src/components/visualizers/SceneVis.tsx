'use client';

import React, { useState } from 'react';
import { Save, FolderOpen, Check } from 'lucide-react';

type SceneData = {
    id: string;
    name: string;
    description: string;
    faders: { label: string; level: number; color: string }[];
};

const SCENES: SceneData[] = [
    {
        id: 'scene-a',
        name: '01: Regular Meeting',
        description: '定例会議用セットアップ',
        faders: [
            { label: 'Mic 1 (Chair)', level: 75, color: 'bg-amber-500' },
            { label: 'Mic 2 (Sec)', level: 70, color: 'bg-amber-500' },
            { label: 'Zoom In', level: 60, color: 'bg-blue-500' },
            { label: 'BGM (Low)', level: 30, color: 'bg-purple-500' },
        ]
    },
    {
        id: 'scene-b',
        name: '02: Xmas Party',
        description: 'イベント用バンドセット',
        faders: [
            { label: 'Vocal', level: 85, color: 'bg-green-500' },
            { label: 'Guitar', level: 80, color: 'bg-green-500' },
            { label: 'DJ (Main)', level: 90, color: 'bg-pink-500' },
            { label: 'MC', level: 85, color: 'bg-amber-500' },
        ]
    }
];

export default function SceneVis() {
    const [currentSceneId, setCurrentSceneId] = useState<string>('scene-a');
    const [isRecalling, setIsRecalling] = useState(false);

    const currentScene = SCENES.find(s => s.id === currentSceneId) || SCENES[0];

    const handleRecall = (id: string) => {
        if (id === currentSceneId) return;
        setIsRecalling(true);
        setTimeout(() => {
            setCurrentSceneId(id);
            setIsRecalling(false);
        }, 600); // Fake processing delay
    };

    return (
        <div className="w-full bg-slate-950 rounded-xl border border-slate-800 p-6 flex flex-col md:flex-row gap-8">

            {/* Left: Memory Bank */}
            <div className="w-full md:w-1/3 flex flex-col gap-4">
                <div className="flex items-center gap-2 text-slate-400 mb-2">
                    <FolderOpen size={18} />
                    <span className="font-bold text-sm tracking-wider uppercase">Scene Memory</span>
                </div>

                <div className="flex flex-col gap-2">
                    {SCENES.map((scene) => (
                        <button
                            key={scene.id}
                            onClick={() => handleRecall(scene.id)}
                            className={`group relative p-4 rounded-lg border text-left transition-all duration-200
                                ${currentSceneId === scene.id
                                    ? 'bg-slate-800/80 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                                    : 'bg-slate-900 border-slate-800 hover:border-slate-600 hover:bg-slate-800/50'}
                            `}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className={`font-mono text-sm font-bold ${currentSceneId === scene.id ? 'text-emerald-400' : 'text-slate-300'}`}>
                                    {scene.name}
                                </span>
                                {currentSceneId === scene.id && <Check size={16} className="text-emerald-500" />}
                            </div>
                            <div className="text-xs text-slate-500">{scene.description}</div>

                            {/* Recall Progress Bar (Fake) */}
                            {isRecalling && scene.id !== currentSceneId && ( // Only show on the target scene? No, usually loading bar is global, but let's just animate the transition
                                <div className="absolute bottom-0 left-0 h-0.5 bg-emerald-500 animate-pulse w-full rounded-b-lg" />
                            )}
                        </button>
                    ))}
                </div>

                <div className="mt-auto p-4 bg-slate-900/50 rounded border border-slate-800 text-xs text-slate-500">
                    <div className="flex items-center gap-2 mb-2">
                        <Save size={14} />
                        <span className="font-bold">Pro Tip:</span>
                    </div>
                    現場が終わるたびに「Save」しておけば、半年後の「あの時と同じ設定で」というリクエストに指一本で応えられます。
                </div>
            </div>

            {/* Right: Console State */}
            <div className="w-full md:w-2/3 bg-slate-900 rounded-lg border border-slate-800 p-6 relative overflow-hidden">
                {/* Overlay for recall transition */}
                <div className={`absolute inset-0 bg-black/50 backdrop-blur-sm z-20 flex items-center justify-center transition-opacity duration-300 ${isRecalling ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                    <div className="text-emerald-500 font-mono font-bold animate-pulse text-xl">RECALLING...</div>
                </div>

                <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Current State</div>
                    <div className="px-3 py-1 bg-slate-950 rounded text-xs font-mono text-emerald-400 border border-emerald-500/30">
                        {currentScene.name}
                    </div>
                </div>

                <div className="flex justify-around gap-2 h-64 items-end pb-8">
                    {currentScene.faders.map((fader, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-3 w-16 group">
                            {/* Fader Track */}
                            <div className="relative w-2 h-48 bg-slate-950 rounded-full">
                                {/* Fader Handle */}
                                <div
                                    className="absolute w-8 h-12 -left-3 rounded shadow-xl flex items-center justify-center transition-all duration-500 ease-out z-10 cursor-not-allowed bg-slate-700 border-slate-600 border-t border-white/20"
                                    style={{ bottom: `${fader.level}%` }}
                                >
                                    <div className="w-full h-0.5 bg-slate-950/50" />
                                </div>
                                {/* Level Meter (Fake) */}
                                <div
                                    className={`absolute bottom-0 left-0 w-full rounded-full opacity-30 transition-all duration-300 ${fader.color}`}
                                    style={{ height: `${fader.level}%` }}
                                />
                            </div>

                            {/* Scribble Strip */}
                            <div className={`mt-2 w-full py-1 px-1 rounded text-[10px] font-bold text-center text-slate-900 truncate transition-colors duration-500 ${fader.color}`}>
                                {fader.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
