'use client';

import Link from 'next/link';
import { ArrowLeft, Layers, Link2, Zap } from 'lucide-react';
import CustomLayerVis from '@/components/visualizers/CustomLayerVis';

export default function CustomLayerLessonPage() {
    return (
        <div className="min-h-screen p-8 flex flex-col gap-6 max-w-6xl mx-auto">
            <header className="flex items-center gap-4">
                <Link href="/" className="p-2 rounded-full hover:bg-slate-800 transition-colors">
                    <ArrowLeft className="text-slate-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-slate-100">Phase 7: Efficiency Tools</h1>
                    <p className="text-slate-400">"そのフェーダー、2本とも触る必要ありますか？"</p>
                </div>
            </header>

            <section className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/60 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-emerald-500 flex items-center gap-2">
                        Task: 散らかった操作盤を整理する
                    </h2>
                    <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-sm font-medium rounded-full border border-emerald-500/20">
                        Pro Workflow
                    </div>
                </div>

                <div className="space-y-4 mb-8">
                    <p className="text-slate-300 leading-relaxed">
                        デジタル卓には、操作を劇的に楽にする2つの機能があります。
                    </p>

                    <div className="bg-slate-950/50 p-5 rounded-lg border border-slate-700 grid md:grid-cols-2 gap-6">
                        <div className="flex gap-4">
                            <div className="p-3 bg-blue-500/20 rounded-lg h-fit text-blue-400 border border-blue-500/30">
                                <Link2 size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-200 mb-1">Stereo Link</h3>
                                <p className="text-sm text-slate-400">
                                    BGMやPC音声など、L/R（左右）で対になっているチャンネルを<strong>「1本のフェーダー」</strong>に統合します。<br />
                                    片方を動かせば、もう片方も勝手についてきます。両手を使う必要はありません。
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="p-3 bg-purple-500/20 rounded-lg h-fit text-purple-400 border border-purple-500/30">
                                <Layers size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-200 mb-1">Custom Fader Layer</h3>
                                <p className="text-sm text-slate-400">
                                    CH 1, CH 32, Aux Master... 散らばった重要なフェーダーだけを集めた<strong>「自分専用のページ」</strong>を作れます。<br />
                                    ページめくり（レイヤー切り替え）のミスを根絶し、ワンオペ配信を安全にします。
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="text-slate-300 mb-4 font-bold">
                    実験: BGM L/R をリンクさせ、カスタムレイヤーには「L」だけを置いて操作してみましょう。<br />
                    裏側（Internal Processing）でR側もちゃんと動いていることを確認してください。
                </p>

                <CustomLayerVis />

            </section>

            <div className="flex justify-end mt-8 pb-12">
                <Link href="/" className="group relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative px-8 py-6 bg-slate-900 ring-1 ring-slate-800 rounded-xl flex items-center gap-4 hover:bg-slate-800 transition-all">
                        <div className="flex flex-col text-right">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Curriculum Complete</span>
                            <span className="text-xl font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">Return to Home</span>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center group-hover:border-emerald-500 group-hover:bg-emerald-500/20 transition-all">
                            <Zap className="text-amber-500 group-hover:text-emerald-400" />
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
