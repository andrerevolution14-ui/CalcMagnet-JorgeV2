"use client";

import { useState } from 'react';
import { MessageSquare, ShieldCheck, Star, Lock } from 'lucide-react';
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
                className="w-full max-w-lg text-center space-y-10 md:space-y-12"
            >
                <div className="space-y-4 md:space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37]"
                    >
                        <Lock size={12} strokeWidth={3} />
                        <span>Ligação Segura e Cifrada</span>
                    </motion.div>

                    <h2 className="text-3xl md:text-6xl font-black text-[#111111] leading-tight tracking-tighter">
                        O teu orçamento <br className="hidden md:block" /> está pronto.
                    </h2>

                    <p className="text-sm md:text-xl text-[#4B5563] font-medium leading-relaxed max-w-md mx-auto">
                        A clareza que precisas para remodelar com segurança em Aveiro. Onde queres receber os detalhes?
                    </p>
                </div>

                <div className="space-y-6 md:space-y-8">
                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                        <div className="relative group max-w-sm mx-auto">
                            <input
                                type="tel"
                                required
                                placeholder="9xx xxx xxx"
                                value={whatsapp}
                                onChange={(e) => setWhatsapp(e.target.value.replace(/\D/g, '').slice(0, 9))}
                                className="w-full text-2xl md:text-4xl font-black text-center py-4 md:py-6 px-4 bg-transparent border-b-2 md:border-b-4 border-gray-200 focus:border-[#D4AF37] outline-none transition-all placeholder:text-gray-200"
                            />
                            <div className="mt-4 text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center justify-center gap-2">
                                <div className="p-1 bg-[#25D366] rounded-full">
                                    <MessageSquare size={10} className="text-white fill-current" />
                                </div>
                                <span>Verificação Oficial WhatsApp</span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={whatsapp.length < 9 || loading}
                            className="w-full btn-premium-gold shimmer-premium shadow-gold-glow disabled:opacity-50"
                        >
                            <span className="text-sm md:text-lg">{loading ? 'A processar...' : 'Receber Estimativa no WhatsApp'}</span>
                        </button>
                    </form>

                    {/* Trust Proof */}
                    <div className="flex flex-col items-center gap-4 py-4 md:py-6 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#D4AF37" className="text-[#D4AF37]" />)}
                            </div>
                            <span className="text-[11px] font-black text-[#111111] uppercase tracking-widest">+1.200 Residentes em Aveiro</span>
                        </div>

                        <div className="flex items-center gap-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            <div className="flex items-center gap-1">
                                <ShieldCheck size={14} className="text-[#10B981]" />
                                <span>RGPD Ativo</span>
                            </div>
                            <div className="w-[1px] h-3 bg-gray-200" />
                            <div className="flex items-center gap-1">
                                <Lock size={12} />
                                <span>End-to-End Encryption</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
