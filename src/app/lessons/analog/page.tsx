import PatchBay from '@/components/patching/PatchBay';
import GainStagingVis from '@/components/visualizers/GainStagingVis';
import SignalFlow from '@/components/visualizers/SignalFlow';
import Link from 'next/link';


import { ArrowLeft } from 'lucide-react';

export default function AnalogLessonPage() {
    return (
        <div className="min-h-screen p-8 flex flex-col gap-6 max-w-6xl mx-auto">
            <header className="flex items-center gap-4">
                <Link href="/" className="p-2 rounded-full hover:bg-slate-800 transition-colors">
                    <ArrowLeft className="text-slate-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-slate-100">Phase 1: アナログの基礎</h1>
                    <p className="text-slate-400">音の入り口から出口までを理解する</p>
                </div>
            </header>

            <section className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/60 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-amber-500 flex items-center gap-2">
                        Task 1: ハードパッチ（物理結線）
                    </h2>
                    <div className="px-3 py-1 bg-amber-500/10 text-amber-500 text-sm font-medium rounded-full border border-amber-500/20">
                        演習
                    </div>
                </div>

                <p className="mb-4 text-slate-300 max-w-2xl">
                    アナログの世界では、音の通り道は物理的なケーブルで作られます。<br />
                    <strong>「登壇者Aのマイク」</strong>を<strong>「CH 1 (Aさん)」</strong>に繋いでみましょう。
                </p>

                {/* The Patch Bay */}
                <PatchBay />

                <div className="mt-6 p-4 bg-slate-950/50 rounded-lg border border-slate-800 text-sm text-slate-400">
                    💡 <strong>Pro Tip:</strong> マイクのアウト（下）から、入力ジャック（上）に向かってドラッグします。これが「ハードパッチ」です。ケーブルを挿さないと音は出ません。
                </div>
            </section>

            {/* Task 1.5: DI Box */}
            <section className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/60 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-yellow-500 flex items-center gap-2">
                        Task 1.5: DI (ダイレクトボックス) とは？
                    </h2>
                    <div className="px-3 py-1 bg-yellow-500/10 text-yellow-500 text-sm font-medium rounded-full border border-yellow-500/20">
                        機材知識
                    </div>
                </div>

                <div className="space-y-4 text-slate-300">
                    <p>
                        <strong>「iPadやPCのイヤホンジャックから、直接ミキサーのマイク入力に挿してはいけないの？」</strong><br />
                        答えは <strong>No</strong> です。ノイズが乗ったり、音が歪んだりします。
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-2 text-slate-400">
                        <li><strong>インピーダンス (Impedance) とは:</strong> 「電気的な抵抗（通りにくさ）」のことです。</li>
                        <li className="ml-4 text-sm text-slate-500">
                            例：PCの出力は「太いホース(Low-Z)」、ギター等は「細いストロー(Hi-Z)」。<br />
                            ミキサーの入力端子に合わせて変換しないと、エネルギーがうまく伝わりません。
                        </li>
                        <li><strong>バランス接続:</strong> 長いケーブルを引き回すとノイズが乗ります。DIを通すことでノイズに強い「バランス信号」に変換できます。</li>
                    </ul>
                    <div className="flex gap-4 mt-4">
                        <div className="bg-slate-950 p-4 rounded border border-slate-700 w-1/2">
                            <h4 className="font-bold text-slate-200 mb-2">DI-1 (Active DI)</h4>
                            <p className="text-xs text-slate-500">電池やファンタム電源で動く。楽器やPCからの信号を綺麗に変換する標準機。</p>
                        </div>
                        <div className="bg-slate-950 p-4 rounded border border-slate-700 w-1/2">
                            <h4 className="font-bold text-slate-200 mb-2">USB DI</h4>
                            <p className="text-xs text-slate-500">PCとUSBで接続し、最高音質でXLR出力する。配信屋の必須アイテム（ノイズレス）。</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Task 2: Gain Staging */}
            <section className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/60 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-cyan-500 flex items-center gap-2">
                        Task 2: 水道管のメタファー (Gain Staging)
                    </h2>
                    <div className="px-3 py-1 bg-cyan-500/10 text-cyan-500 text-sm font-medium rounded-full border border-cyan-500/20">
                        重要概念
                    </div>
                </div>

                <p className="mb-6 text-slate-300 max-w-2xl leading-relaxed">
                    <strong>「小さい音を大きくして、十分な太さにして送り出す」</strong><br />
                    これが音響の基本原則です。<br /><br />
                    マイクで拾ったばかりの電気信号は、とても微弱（Mic Level）で、そのままでは使い物になりません。<br />
                    そこで <strong>HA（ヘッドアンプ）ゲイン</strong> で信号を増幅し、扱いやすいレベル（Line Level）まで持ち上げます。<br />
                    <span className="text-sm text-slate-400">※ 水道管で言えば、「チョロチョロの湧き水」を「高圧ポンプ」で太いパイプに流し込むイメージです。</span>
                    <br /><br />
                    <strong>実験:</strong> ゲインを適切に上げて、パイプを流れる水を「太く」してください。ただし、太くしすぎるとパイプが耐えきれず破裂（音割れ）します。
                </p>

                <GainStagingVis />
            </section>

            {/* Task 3: Signal Flow */}
            < section className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/60 backdrop-blur-sm" >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-violet-500 flex items-center gap-2">
                        Task 3: ゴールデン・スレッド (信号の流れ)
                    </h2>
                </div>

                <p className="mb-6 text-slate-300 max-w-2xl">
                    音が卓の中をどう流れるか見てみましょう。<br />
                    もし途中の <strong>MUTE</strong> ボタンを押すと、橋が落ちて信号が止まるのが分かります。
                </p>

                <SignalFlow />
            </section >

            {/* Next Phase Navigation (Kamishibai Style) */}
            <div className="flex justify-end mt-8 pb-12">
                <Link href="/lessons/digital-patch" className="group relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative px-8 py-6 bg-slate-900 ring-1 ring-slate-800 rounded-xl flex items-center gap-4 hover:bg-slate-800 transition-all">
                        <div className="flex flex-col text-right">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Next Lesson</span>
                            <span className="text-xl font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">Phase 2: デジタル卓の構造</span>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center group-hover:border-cyan-500 group-hover:bg-cyan-500/20 transition-all">
                            <ArrowLeft className="rotate-180 text-slate-400 group-hover:text-cyan-400" />
                        </div>
                    </div>
                </Link>
            </div >

        </div >
    );
}
