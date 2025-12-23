import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import MixBusVis from '@/components/visualizers/MixBusVis';
import PrePostVis from '@/components/visualizers/PrePostVis';
import MultiBusVis from '@/components/visualizers/MultiBusVis';
import MixMinusVis from '@/components/visualizers/MixMinusVis';

export default function BusLessonPage() {
    return (
        <div className="min-h-screen p-8 flex flex-col gap-6 max-w-6xl mx-auto">
            <header className="flex items-center gap-4">
                <Link href="/" className="p-2 rounded-full hover:bg-slate-800 transition-colors">
                    <ArrowLeft className="text-slate-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-slate-100">Phase 4: バスとルーティング</h1>
                    <p className="text-slate-400">信号を分岐・集合させる魔法</p>
                </div>
            </header>

            <section className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/60 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-emerald-500 flex items-center gap-2">
                        Task 1: Mix Bus（バス）とは？
                    </h2>
                    <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-sm font-medium rounded-full border border-emerald-500/20">
                        概念
                    </div>
                </div>
                <p className="mb-4 text-slate-300 max-w-2xl leading-relaxed">
                    「バス」とは、<strong>信号の送り先（Destination）</strong>のことです。<br />
                    各チャンネルのフェーダーの横に<strong>「行き先ボタン」</strong>がいくつも付いているのを想像してください。
                </p>

                <div className="mb-8 p-4 bg-slate-950/50 border border-slate-700 rounded-lg text-sm text-slate-400">
                    <ul className="space-y-4 list-none text-slate-300">
                        <li className="flex items-center gap-3">
                            <span className="font-bold text-red-500 bg-red-950/30 px-2 py-0.5 rounded border border-red-500/30">ST</span>
                            <span>ここに送ると、<strong>メインスピーカー (Master Out)</strong> から音が出ます。</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="font-bold text-emerald-500 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-500/30">1</span>
                            <span>ここに送ると、<strong>Mix 1 (モニター/Zoom)</strong> だけに音がコピーされます。</span>
                        </li>
                    </ul>
                    <p className="mt-4 text-white font-bold p-3 bg-slate-800 rounded border-l-4 border-emerald-500">
                        重要：これらは「同時」に押せます。<br />
                        <span className="font-normal text-slate-400">「ST」と「1」の両方を押せば、メインスピーカーとZoomの両方に音が行きます。</span>
                    </p>
                </div>

                <MixBusVis />

                <div className="mt-12 bg-slate-950/30 p-4 border-l-4 border-emerald-500 rounded-r">
                    <h3 className="font-bold text-emerald-400 text-lg mb-2">🤔 Master Out と Mix Bus の違いは？</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                        どちらも「バス（乗り場）」であることに変わりはありません。<br />
                        <strong>ST (Stereo)</strong> は「お客様用のメインバス」、<br />
                        <strong>1〜16 (Mix)</strong> は「それ以外（モニター、録音、配信）用の自由なバス」です。
                    </p>
                </div>
            </section>

            <section className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/60 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-indigo-500 flex items-center gap-2">
                        Task 1.5: Aux vs Group (送り方の違い)
                    </h2>
                    <div className="px-3 py-1 bg-indigo-500/10 text-indigo-500 text-sm font-medium rounded-full border border-indigo-500/20">
                        発展
                    </div>
                </div>
                <p className="mb-4 text-slate-300 max-w-2xl leading-relaxed">
                    バスへの送り方には2種類あります。<br />
                    デジタル卓では、チャンネルを<strong>Select</strong>してから、画面上でこれらを設定します。
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg">
                        <div className="text-emerald-500 font-bold mb-1">Variable (Aux) モード</div>
                        <div className="text-xs text-slate-400">
                            「ノブ」で送る量を調整します。<br />
                            「モニターは少し小さく」などバランスを作れます。
                        </div>
                    </div>
                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg">
                        <div className="text-pink-500 font-bold mb-1">Fixed (Group) モード</div>
                        <div className="text-xs text-slate-400">
                            「スイッチ」でON/OFFだけ決めます。<br />
                            「ドラム全部を録音バスに送る」などに使います。
                        </div>
                    </div>
                </div>

                <p className="text-sm text-slate-400 mb-4">
                    下の操作パネルで、<strong>左側のチャンネルを選んでから</strong>、右側のセンド（送り先）を操作してみてください。
                </p>

                <MultiBusVis />
            </section>

            <section className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/60 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-orange-500 flex items-center gap-2">
                        Task 1.8: Pre vs Post (タイミングの罠)
                    </h2>
                    <div className="px-3 py-1 bg-orange-500/10 text-orange-500 text-sm font-medium rounded-full border border-orange-500/20">
                        必須
                    </div>
                </div>
                <p className="mb-4 text-slate-300 max-w-2xl leading-relaxed">
                    バスに送る「タイミング」も重要です。<br />
                    <strong>Pre Fader</strong>（フェーダーの前）と <strong>Post Fader</strong>（フェーダーの後）。<br />
                    このスイッチ一つで、事故になるか、プロの仕事になるかが決まります。
                </p>

                <div className="mb-8 p-4 bg-slate-950/50 border border-orange-900/30 rounded-lg text-sm text-slate-400">
                    <ul className="space-y-4 list-none text-slate-300">
                        <li className="flex items-start gap-3">
                            <span className="font-bold text-emerald-500 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-500/30 shrink-0">PRE</span>
                            <span>
                                <strong>モニター用 (演者へ返す音)</strong><br />
                                本番中にメインフェーダーを動かしても、演者のモニター音量は変わりません。<br />
                                <span className="text-xs text-slate-500">※ これがPostだと、メインを下げた瞬間モニターも聞こえなくなり、演者が混乱します。</span>
                            </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="font-bold text-orange-500 bg-orange-950/30 px-2 py-0.5 rounded border border-orange-500/30 shrink-0">POST</span>
                            <span>
                                <strong>エフェクト / 配信 / 録音用</strong><br />
                                メインフェーダーを下げれば、リバーブや配信の音も一緒に消えます。<br />
                                <span className="text-xs text-slate-500">※ 自然なフェードアウトには必須です。</span>
                            </span>
                        </li>
                    </ul>
                </div>

                <p className="text-sm text-slate-400 mb-4">
                    下のシミュレーターで、<strong>Main Faderを動かした時</strong>に、Monitor Out（右のメーター）がどう反応するか、Pre/Postを切り替えて実験してください。
                </p>

                <PrePostVis />
            </section>

            <section className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/60 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-red-400 flex items-center gap-2">
                        Task 2: "Mix Minus" (マイナスワン) の謎
                    </h2>
                    <div className="px-3 py-1 bg-red-500/10 text-red-500 text-sm font-medium rounded-full border border-red-500/20">
                        重要
                    </div>
                </div>
                <p className="mb-4 text-slate-300 max-w-2xl leading-relaxed">
                    「会場では聞こえているのに、Zoomの相手だけハウリングする」<br />
                    この原因の9割は、<strong>「Zoomの音を、またZoomに送り返している」</strong>からです。
                </p>

                <div className="mb-8 p-4 bg-slate-950/50 border border-red-900/30 rounded-lg text-sm">
                    <h4 className="font-bold text-red-400 mb-2">🚫 ループの仕組み</h4>
                    <p className="text-slate-400 leading-relaxed mb-4">
                        1. Zoom相手がしゃべる (Zoom In)<br />
                        2. その音が、Mix 1 (Zoom Send) に入る<br />
                        3. そのまま Zoom相手に戻る (Zoom Out)<br />
                        <strong>結果：自分の声が遅れて聞こえたり、「キーン」というループ（ハウリング）が発生します。</strong>
                    </p>

                    <h4 className="font-bold text-emerald-400 mb-2">✅ 正しい設定 (マイナスワン)</h4>
                    <p className="text-slate-400 leading-relaxed">
                        「MCの声」や「BGM」は Zoomに送りますが、<br />
                        <strong>「Zoom自身の音」だけは、Zoomへのバス (Mix 1) に送ってはいけません。</strong><br />
                        （自分自身を除いたミックス = マイナスワン と呼びます）
                    </p>
                </div>

                <p className="text-sm text-slate-400 mb-4">
                    下のシミュレーターで、<strong>「Zoom Input」から緑色のバスに線を繋いでみて</strong>、何が起きるか確認してください。
                </p>

                <MixMinusVis />
            </section>



            <div className="flex justify-end mt-8 pb-12">
                <Link href="/lessons/automixer" className="group relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative px-8 py-6 bg-slate-900 ring-1 ring-slate-800 rounded-xl flex items-center gap-4 hover:bg-slate-800 transition-all">
                        <div className="flex flex-col text-right">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Next Lesson</span>
                            <span className="text-xl font-bold text-slate-100 group-hover:text-orange-400 transition-colors">Phase 5: Automixer</span>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center group-hover:border-orange-500 group-hover:bg-orange-500/20 transition-all">
                            <ArrowLeft className="rotate-180 text-slate-400 group-hover:text-orange-400" />
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
