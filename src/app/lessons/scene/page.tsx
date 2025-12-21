'use client';

import Link from 'next/link';
import { ArrowLeft, Save, History, RotateCcw } from 'lucide-react';
import SceneVis from '@/components/visualizers/SceneVis';

export default function SceneLessonPage() {
    return (
        <div className="min-h-screen p-8 flex flex-col gap-6 max-w-6xl mx-auto">
            <header className="flex items-center gap-4">
                <Link href="/" className="p-2 rounded-full hover:bg-slate-800 transition-colors">
                    <ArrowLeft className="text-slate-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-slate-100">Phase 6: Scene Memory</h1>
                    <p className="text-slate-400">"その設定、保存しましたか？"</p>
                </div>
            </header>

            <section className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/60 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-emerald-500 flex items-center gap-2">
                        Task: 過去の時間を呼び戻す
                    </h2>
                    <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-sm font-medium rounded-full border border-emerald-500/20">
                        Total Recall
                    </div>
                </div>

                <div className="space-y-4 mb-8">
                    <p className="text-slate-300 leading-relaxed">
                        アナログ卓からデジタル卓に代わって最大の革命は、<strong>「ツマミの位置を全部保存できる (Store / Recall)」</strong>ことです。<br />
                        アナログ時代は、リハーサルが終わるたびに紙にフェーダーの位置をメモしたり、写真に撮ったり、あるいは「絶対に触るな」と張り紙をしていました。
                    </p>
                    <p className="text-slate-300 leading-relaxed">
                        デジタル卓では、これらの設定を<strong>「シーン (Scene)」</strong>として一瞬で保存・呼び出しができます。
                    </p>

                    <div className="bg-slate-950/50 p-5 rounded-lg border border-slate-700 grid md:grid-cols-2 gap-6">
                        <div className="flex gap-4">
                            <div className="p-3 bg-blue-500/20 rounded-lg h-fit text-blue-400 border border-blue-500/30">
                                <History size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-200 mb-1">イベント転換を一瞬で</h3>
                                <p className="text-sm text-slate-400">
                                    「第一部：講演会」から「第二部：バンド演奏」へ。<br />
                                    マイクの名前、EQ、コンプ、フェーダー位置... 数百のパラメータをボタン一つで書き換えます。
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="p-3 bg-amber-500/20 rounded-lg h-fit text-amber-400 border border-amber-500/30">
                                <RotateCcw size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-200 mb-1">定例案件のテンプレート化</h3>
                                <p className="text-sm text-slate-400">
                                    「いつもの定例会議」なら Scene 01 を呼ぶだけ。<br />
                                    毎回ゼロからゲインを取り直す必要はありません。前回のベストな状態からスタートできます。
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="text-slate-300 mb-4 font-bold">
                    実験: 全く異なる2つの現場（Scene）を切り替えてみましょう。<br />
                    フェーダーだけでなく、チャンネルの名前（Scribble Strip）そのものが変わることに注目してください。
                </p>

                <SceneVis />

            </section>

            <div className="flex justify-end mt-8 pb-12">
                <Link href="/lessons/custom-layer" className="group relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-fuchsia-600 rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative px-8 py-6 bg-slate-900 ring-1 ring-slate-800 rounded-xl flex items-center gap-4 hover:bg-slate-800 transition-all">
                        <div className="flex flex-col text-right">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Next Lesson</span>
                            <span className="text-xl font-bold text-slate-100 group-hover:text-violet-400 transition-colors">Phase 7: Custom Layer</span>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center group-hover:border-violet-500 group-hover:bg-violet-500/20 transition-all">
                            <ArrowLeft className="rotate-180 text-slate-400 group-hover:text-violet-400" />
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
