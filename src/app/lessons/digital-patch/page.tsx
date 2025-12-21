import Link from 'next/link';
import { ArrowLeft, Network, Settings2 } from 'lucide-react';
import DigitalPatchVis from '@/components/visualizers/DigitalPatchVis';

export default function DigitalPatchLessonPage() {
    return (
        <div className="min-h-screen p-8 flex flex-col gap-6 max-w-6xl mx-auto">
            <header className="flex items-center gap-4">
                <Link href="/" className="p-2 rounded-full hover:bg-slate-800 transition-colors">
                    <ArrowLeft className="text-slate-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-slate-100">Phase 2: デジタル卓の構造</h1>
                    <p className="text-slate-400">「Input」と「Channel」は別物である</p>
                </div>
            </header>

            <section className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/60 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-emerald-500 flex items-center gap-2">
                        Task: 1対多の接続 (Soft Patch)
                    </h2>
                    <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-sm font-medium rounded-full border border-emerald-500/20">
                        デジタル脳へ
                    </div>
                </div>

                <div className="space-y-4 mb-8">
                    <p className="text-slate-300 leading-relaxed">
                        アナログ卓では「入力1」に挿せば「CH 1」に音が来ます。<br />
                        しかしデジタル卓では、<strong>「物理的な入り口 (Omni Input)」</strong>と<strong>「操作するチャンネル (Channel Strip)」</strong>は完全に別物です。
                    </p>
                    <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-700 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-bold text-emerald-400 mb-2 flex items-center gap-2">
                                <Network size={16} /> Input Patch (Soft Patch)
                            </h3>
                            <p className="text-sm text-slate-400">
                                <strong>「信号のルーティング」</strong>です。<br />
                                「Mic 1の音を、CH 1とCH 4の両方に送る」ということが可能です。<br />
                                これにより、メイン用と録音用で全く別の処理ができます。
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold text-purple-400 mb-2 flex items-center gap-2">
                                <Settings2 size={16} /> Custom Fader Layer
                            </h3>
                            <p className="text-sm text-slate-400">
                                <strong>「手元の並び替え」</strong>です。<br />
                                「CH 1」と「CH 50」を隣同士に並べたい、という時に使います。<br />
                                これはパッチ（信号の流れ）とは関係ありません。あくまで操作性の話です。
                            </p>
                        </div>
                    </div>
                </div>

                <p className="text-slate-300 mb-4">
                    <strong>実験:</strong> 左の物理入力「Omni In」から、右の「Channel Strip」へ自由にパッチしてみましょう。<br />
                    1つの入力を複数のチャンネルに分岐（Splitting）できるのがデジタルの強みです。
                </p>

                <DigitalPatchVis />

            </section>

            <section className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/60 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-amber-500 flex items-center gap-2">
                        Wait, what is a "Stage Box"?
                    </h2>
                    <div className="px-3 py-1 bg-amber-500/10 text-amber-500 text-sm font-medium rounded-full border border-amber-500/20">
                        Historical Context
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h3 className="font-bold text-slate-200 mb-2">アナログ時代の「マルチケーブル」</h3>
                        <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                            かつては、ステージ上の何十本ものマイクケーブルを束ねて、太くて重い<strong>「マルチケーブル（Snake）」</strong>でPA席まで引っ張っていました。<br />
                            16chや32chともなると、腕の太さほどあり、数十〜数百kgの重量になります。設営も撤収も重労働でした。
                        </p>
                        <ul className="space-y-2 text-sm text-slate-400 list-disc list-inside bg-slate-950/50 p-3 rounded border border-slate-800">
                            <li>重い、太い、硬い</li>
                            <li>断線のリスクが高い</li>
                            <li>長距離伝送で音質が劣化する</li>
                        </ul>
                    </div>
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-amber-500/20 blur-lg rounded-lg group-hover:bg-amber-500/30 transition-all" />
                        <img
                            src="/analog_multi_box.webp"
                            alt="Analog Multi Box"
                            className="relative rounded-lg border border-slate-700 w-full shadow-2xl"
                        />
                        <p className="text-center text-xs text-slate-500 mt-2">▲ 通称「パラボックス」。ここから極太ケーブルが伸びる</p>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-800 grid md:grid-cols-2 gap-8 items-center">
                    <div className="order-2 md:order-1 relative group">
                        <div className="absolute -inset-1 bg-emerald-500/20 blur-lg rounded-lg group-hover:bg-emerald-500/30 transition-all" />
                        <img
                            src="/digital_stagebox_rio.webp"
                            alt="Digital Stagebox (Rio Style)"
                            className="relative rounded-lg border border-slate-700 w-full shadow-2xl"
                        />
                        <p className="text-center text-xs text-slate-500 mt-2">▲ Digital Stagebox (e.g. Yamaha Rio1608-D)</p>
                    </div>

                    <div className="order-1 md:order-2">
                        <h3 className="font-bold text-emerald-400 mb-2">デジタル時代の「ステージボックス (I/O Rack)」</h3>
                        <p className="text-slate-300 mb-4 leading-relaxed">
                            デジタル卓では、この重いケーブルが<strong>「たった1本のLANケーブル」</strong>に変わります。<br />
                            ステージ上に「ADコンバーター（アナログ→デジタル変換機）」が入った箱＝<strong>ステージボックス</strong>を置き、そこでデジタル信号に変えてしまいます。
                        </p>
                        <div className="flex items-center gap-4 bg-emerald-950/30 border border-emerald-500/30 p-4 rounded-lg">
                            <Network className="text-emerald-500 w-8 h-8 flex-shrink-0" />
                            <div>
                                <div className="text-emerald-400 font-bold mb-1">AoIP (Audio over IP) / Dante</div>
                                <div className="text-xs text-emerald-200/70">
                                    劣化のないデジタル信号として、LANケーブル1本で64ch以上を伝送できます。<br />
                                    これにより、パッチ（配線）の概念が「物理的な差し替え」から「画面上の設定」に変わりました。
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="flex justify-end mt-8 pb-12">
                <Link href="/lessons/surface" className="group relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-fuchsia-600 rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative px-8 py-6 bg-slate-900 ring-1 ring-slate-800 rounded-xl flex items-center gap-4 hover:bg-slate-800 transition-all">
                        <div className="flex flex-col text-right">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Next Lesson</span>
                            <span className="text-xl font-bold text-slate-100 group-hover:text-violet-400 transition-colors">Phase 3: The Surface</span>
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
