import Link from 'next/link';
import { ArrowLeft, Grip } from 'lucide-react';
import PlaygroundVis from '@/components/visualizers/PlaygroundVis';

export default function PlaygroundPage() {
    return (
        <div className="h-screen flex flex-col">
            <header className="flex items-center justify-between px-8 py-4 bg-slate-950 border-b border-slate-900">
                <div className="flex items-center gap-4">
                    <Link href="/" className="p-2 rounded-full hover:bg-slate-800 transition-colors">
                        <ArrowLeft className="text-slate-400" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                            <Grip className="text-purple-500" />
                            Free Playground
                        </h1>
                    </div>
                </div>
                <div className="text-sm text-slate-500">
                    Experimental Sandbox
                </div>
            </header>

            <main className="flex-1 bg-slate-950 relative">
                <PlaygroundVis />
            </main>
        </div>
    );
}
