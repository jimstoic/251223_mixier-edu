import Link from 'next/link';
import { ArrowLeft, Mic2, Users } from 'lucide-react';
import AutomixerVis from '@/components/visualizers/AutomixerVis';

export default function AutomixerLessonPage() {
    return (
        <div className="min-h-screen p-8 flex flex-col gap-6 max-w-6xl mx-auto">
            <header className="flex items-center gap-4">
                <Link href="/" className="p-2 rounded-full hover:bg-slate-800 transition-colors">
                    <ArrowLeft className="text-slate-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-slate-100">Phase 5: Automixer (オートミキサー)</h1>
                    <p className="text-slate-400">ワンマン配信の最強の味方</p>
                </div>
            </header>

            <section className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/60 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-emerald-500 flex items-center gap-2">
                        Task: 複数人トークを「自動」で綺麗にする
                    </h2>
                    <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-sm font-medium rounded-full border border-emerald-500/20">
                        プロの技
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-4">
                        <p className="text-slate-300 leading-relaxed">
                            4人のパネルディスカッションで、マイク4本を常に上げっぱなしにするとどうなるでしょうか？<br />
                            <strong>「フロアノイズが4倍」「ハウリングリスクが4倍」</strong>になり、音もボヤけます。
                        </p>
                        <p className="text-slate-300 leading-relaxed">
                            理想は<strong>「喋っている人のフェーダーだけ上げ、他は下げる」</strong>ことですが、速すぎて人間には不可能です。
                        </p>
                    </div>
                    <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-700">
                        <h3 className="text-slate-200 font-bold mb-2 flex items-center gap-2"><Users size={16} /> Dan Dugan Automixer</h3>
                        <p className="text-slate-400 text-sm">
                            入力音量をリアルタイムで監視し、<strong>「一番大きい声の人」にゲインを配分(Gain Sharing)</strong>します。<br />
                            結果として、まるで熟練のオペレーターが高速でフェーダー操作をしているようなクリアな音声が手に入ります。
                        </p>
                    </div>
                </div>

                <AutomixerVis />
            </section>

            <div className="flex justify-end mt-8 pb-12">
                <Link href="/lessons/scene" className="group relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-fuchsia-600 rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative px-8 py-6 bg-slate-900 ring-1 ring-slate-800 rounded-xl flex items-center gap-4 hover:bg-slate-800 transition-all">
                        <div className="flex flex-col text-right">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Next Lesson</span>
                            <span className="text-xl font-bold text-slate-100 group-hover:text-violet-400 transition-colors">Phase 6: Scene Memory</span>
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
