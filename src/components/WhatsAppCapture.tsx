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
        <div className="min-h-[100dvh] flex items-center justify-center p-6 md:p-12 bg-[#FCFCFA]">
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-lg text-center space-y-12"
            >
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37]"
                    >
                        <Lock size={12} strokeWidth={3} />
                        <span>Acesso Reservado</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl font-black text-[#111111] leading-tight tracking-tighter">
                        O teu plano <br className="hidden md:block" /> está pronto.
                    </h2>

                    <p className="text-xl text-[#4B5563] font-medium leading-relaxed max-w-md mx-auto">
                        Onde queres receber a tua estimativa detalhada e as imagens exclusivas para a tua nova casa?
                    </p>
                </div>

                <div className="space-y-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative group max-w-sm mx-auto">
                            <input
                                type="tel"
                                required
                                placeholder="9xx xxx xxx"
                                value={whatsapp}
                                onChange={(e) => setWhatsapp(e.target.value.replace(/\D/g, '').slice(0, 9))}
                                className="w-full text-3xl md:text-4xl font-black text-center py-6 px-4 bg-transparent border-b-4 border-gray-200 focus:border-[#D4AF37] outline-none transition-all placeholder:text-gray-200"
                            />
                            <div className="mt-4 text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center justify-center gap-2">
                                <MessageSquare size={12} />
                                <span>Enviamos diretamente por WhatsApp</span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={whatsapp.length < 9 || loading}
                            className="w-full btn-premium-gold shimmer-premium !py-7 md:!py-8 !text-xl md:!text-2xl shadow-gold-glow disabled:opacity-50"
                        >
                            <span>{loading ? 'A preparar...' : 'Receber Estimativa Grátis'}</span>
                            {!loading && <ArrowRight size={24} />}
                        </button>
                    </form>

                    {/* Minimalist Proof */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 shadow-sm" />
                                ))}
                            </div>
                            <span className="text-xs font-bold text-[#4B5563]">Junta-te a +1.200 pessoas de Aveiro</span>
                        </div>

                        <div className="flex items-center gap-6 opacity-40">
                            <ShieldCheck size={20} />
                            <div className="h-4 w-[1px] bg-gray-300" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">RGPD Garantido</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
