import Link from 'next/link';
import { Network, Mic2, Server, ArrowRight, Settings2, Video } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 gap-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="z-10 text-center space-y-4 max-w-2xl">
        <h1 className="text-5xl font-bold tracking-tighter bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">
          Mixer Architecture
        </h1>
        <p className="text-slate-400 text-lg">
          アナログの銅線から、デジタルのパケットへ。<br />
          配信・音響エンジニアのためのインタラクティブ教材
        </p>
      </div>

      <div className="z-10 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <ModuleCard
          href="/lessons/analog"
          title="Phase 1: アナログの基礎"
          desc="信号の流れ、ゲインステージング、そしてDIボックス。"
          icon={<Mic2 className="w-6 h-6 text-amber-500" />}
          color="border-amber-500/30 hover:border-amber-500/60"
        />
        <ModuleCard
          href="/lessons/digital-patch"
          title="Phase 2: デジタル卓の構造"
          desc="「入力端子」と「チャンネル」は別物。ソフトパッチの概念。"
          icon={<Network className="w-6 h-6 text-emerald-500" />}
          color="border-emerald-500/30 hover:border-emerald-500/60"
        />
        <ModuleCard
          href="/lessons/surface"
          title="Phase 3: サーフェイス"
          desc="「Select」ボタンの作法。画面は一つ、操作は無限。"
          icon={<Settings2 className="w-6 h-6 text-violet-500" />}
          color="border-violet-500/30 hover:border-violet-500/60"
        />
        <ModuleCard
          href="/lessons/bus"
          title="Phase 4: バスとルーティング"
          desc="Mix Bus, Aux Sends, そして必須科目「マイナスワン (N-1)」。"
          icon={<Server className="w-6 h-6 text-cyan-500" />}
          color="border-cyan-500/30 hover:border-cyan-500/60"
        />
        <ModuleCard
          href="/lessons/automixer"
          title="Phase 5: オートミキサー"
          desc="複数人トークを自動化。ワンマン配信の守護神。"
          icon={<Mic2 className="w-6 h-6 text-orange-500" />}
          color="border-orange-500/30 hover:border-orange-500/60"
        />
        <ModuleCard
          href="/lessons/scene"
          title="Phase 6: シーンメモリー"
          desc="設定を「保存」する力。イベント転換を一瞬で。"
          icon={<Server className="w-6 h-6 text-pink-500" />}
          color="border-pink-500/30 hover:border-pink-500/60"
        />
        <ModuleCard
          href="/lessons/custom-layer"
          title="Phase 7: 効率化ツール"
          desc="ステレオリンクとカスタムレイヤー。「手元」を作る技術。"
          icon={<Settings2 className="w-6 h-6 text-teal-500" />}
          color="border-teal-500/30 hover:border-teal-500/60"
        />
        <ModuleCard
          href="/playground"
          title="Free Playground"
          desc="全ての機能を自由にルーティングできる実験場。"
          icon={<Settings2 className="w-6 h-6 text-slate-400" />}
          color="border-slate-700 hover:border-slate-500"
        />
      </div>

      <div className="mt-8 text-slate-600 text-sm z-10">
        © 2025 Antigravity Audio Education
      </div>
    </main>
  );
}

function ModuleCard({ href, title, desc, icon, color }: { href: string; title: string; desc: string; icon: React.ReactNode; color: string }) {
  return (
    <Link href={href} className={`group relative p-6 bg-slate-900/40 backdrop-blur-sm border rounded-2xl transition-all duration-300 hover:bg-slate-800/60 hover:-translate-y-1 ${color}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 group-hover:border-slate-700 transition-colors">
          {icon}
        </div>
        <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-slate-200 transition-colors" />
      </div>
      <h3 className="text-xl font-semibold text-slate-100 mb-2">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    </Link>
  );
}
