"use client";

import { useState } from 'react';
import { MessageSquare, ShieldCheck, Star, Users, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface WhatsAppCaptureProps {
    onComplete: (whatsapp: string) => void;
}

export default function WhatsAppCapture({ onComplete }: WhatsAppCaptureProps) {
    const [whatsapp, setWhatsapp] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (whatsapp.length < 9) return;
        setLoading(true);
        setTimeout(() => onComplete(whatsapp), 1500);
    };

    return (
        <div className="min-h-[100dvh] flex items-center justify-center p-6 md:p-12 bg-white">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="premium-card w-full max-w-xl space-y-8 md:space-y-12 shadow-2xl border-gray-100"
            >
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/10 text-[#10B981] font-bold text-[10px] uppercase tracking-widest mx-auto">
                        <Lock size={12} />
                        <span>Privacidade Total</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-[#111111] leading-tight pt-2">O teu cálculo está pronto!</h2>
                    <p className="text-lg text-[#4B5563] font-medium leading-relaxed">
                        Onde é que te podemos enviar a tua estimativa detalhada e as imagens para te ajudarem a sonhar com a tua nova casa?
                    </p>
                </div>

                {/* Real-time Social Proof */}
                <div className="flex justify-center gap-4 py-4 border-y border-gray-50 italic">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-0.5 text-[#D4AF37]">
                            {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                        </div>
                        <span className="text-xs font-bold text-[#4B5563]">"Muito preciso!"</span>
                    </div>
                    <div className="h-4 w-[1px] bg-gray-200" />
                    <div className="flex items-center gap-1">
                        <Users size={14} className="text-[#D4AF37]" />
                        <span className="text-xs font-bold text-[#4B5563]">42 pessoas hoje</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-4">
                        <label className="text-xs font-black uppercase tracking-[0.2em] text-[#4B5563] ml-2">Teu contacto WhatsApp</label>
                        <div className="relative group">
                            <input
                                type="tel"
                                required
                                placeholder="912 345 678"
                                value={whatsapp}
                                onChange={(e) => setWhatsapp(e.target.value.replace(/\D/g, '').slice(0, 9))}
                                className="input-premium text-center !text-2xl !py-6 shadow-sm group-hover:shadow-md transition-shadow"
                            />
                            <MessageSquare className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#25D366] transition-colors" size={24} />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={whatsapp.length < 9 || loading}
                        className="w-full btn-premium-gold shimmer-premium shadow-gold-glow !py-7 disabled:opacity-50"
                    >
                        <div className="flex flex-col items-center gap-0.5">
                            <span className="text-xl md:text-2xl flex items-center gap-3">
                                {loading ? 'A preparar tudo...' : 'Receber Estimativa Grátis'}
                                {!loading && <ArrowRight size={24} />}
                            </span>
                        </div>
                    </button>
                </form>

                <div className="space-y-4 pt-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-xs text-[#4B5563]/60 font-bold uppercase tracking-widest">
                        <ShieldCheck size={18} className="text-[#10B981]" />
                        <span>Dados protegidos pelo RGPD local</span>
                    </div>
                    <p className="text-[10px] text-gray-400 font-medium">
                        *Ao clicares, aceitas receber a tua estimativa no WhatsApp. Podes cancelar a qualquer momento.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
