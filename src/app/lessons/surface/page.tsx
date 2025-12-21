import Link from 'next/link';
import { ArrowLeft, Monitor, Hand } from 'lucide-react';
import SurfaceVis from '@/components/visualizers/SurfaceVis';

export default function SurfaceLessonPage() {
    return (
        <div className="min-h-screen p-8 flex flex-col gap-6 max-w-6xl mx-auto">
            <header className="flex items-center gap-4">
                <Link href="/" className="p-2 rounded-full hover:bg-slate-800 transition-colors">
                    <ArrowLeft className="text-slate-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-slate-100">Phase 3: デジタル卓の操作作法</h1>
                    <p className="text-slate-400">「画面はひとつ」の原則</p>
                </div>
            </header>

            <section className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/60 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-violet-500 flex items-center gap-2">
                        Task: 選択してから操作せよ (Select First)
                    </h2>
                    <div className="px-3 py-1 bg-violet-500/10 text-violet-500 text-sm font-medium rounded-full border border-violet-500/20">
                        UXの違い
                    </div>
                </div>

                <div className="space-y-4 mb-8">
                    <p className="text-slate-300 leading-relaxed">
                        アナログ卓には、全チャンネルにEQやコンプのつまみがズラリと並んでいました。<br />
                        しかしデジタル卓には、<strong>1つの画面</strong>しかありません。
                    </p>
                    <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-700">
                        <h3 className="font-bold text-violet-400 mb-2 flex items-center gap-2">
                            <Hand size={16} /> 魔法のボタン [SELECT]
                        </h3>
                        <p className="text-sm text-slate-400">
                            「これからCH 1をいじりますよ」と卓に伝えるのが、フェーダーの上にある <strong>[SEL] (Select)</strong> ボタンです。<br />
                            これを押して初めて、画面がそのチャンネルのパラメーター（EQなど）に切り替わります。
                        </p>
                    </div>
                    <p className="text-slate-300">
                        <strong>「見たいチャンネルのSELを押す」</strong>。これがデジタル卓で最も頻繁に行う動作です。<br />
                        無意識に手が動くようになるまで慣れる必要があります。
                    </p>
                </div>

                <div className="mb-4">
                    <p className="text-xs text-slate-500 mb-2">Simulation: DM3-style Interface</p>
                    <SurfaceVis />
                </div>
            </section>

            <div className="flex justify-end mt-8 pb-12">
                <Link href="/lessons/bus" className="group relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-sky-600 rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative px-8 py-6 bg-slate-900 ring-1 ring-slate-800 rounded-xl flex items-center gap-4 hover:bg-slate-800 transition-all">
                        <div className="flex flex-col text-right">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Next Lesson</span>
                            <span className="text-xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">Phase 4: Busses & Routing</span>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center group-hover:border-cyan-500 group-hover:bg-cyan-500/20 transition-all">
                            <ArrowLeft className="rotate-180 text-slate-400 group-hover:text-cyan-400" />
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
