"use client";

import { useState } from 'react';
import { MessageSquare, ShieldCheck, Star, Lock, Wallet, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { trackLead } from '@/lib/pixel';
import { formatCurrency } from '@/utils/calculator';

interface WhatsAppCaptureProps {
    calculatedValue: number;
    onComplete: (whatsapp: string) => void;
}

export default function WhatsAppCapture({ calculatedValue, onComplete }: WhatsAppCaptureProps) {
    const [whatsapp, setWhatsapp] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (whatsapp.length < 9) return;
        setLoading(true);

        // Track Facebook Lead Event (Value 2 as requested)
        trackLead(2);

        setTimeout(() => onComplete(whatsapp), 1500);
    };

    return (
        <div className="min-h-[100dvh] flex items-center justify-center p-6 md:p-12 bg-[#FCFCFA]">
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-lg text-center space-y-10 md:space-y-12"
            >
                {/* Visual Preview / Demand Generator */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="premium-card !p-6 md:!p-8 bg-white shadow-xl border-t-4 border-t-[#D4AF37] relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Wallet size={80} className="-rotate-12" />
                    </div>

                    <div className="space-y-4">
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Estimativa Gerada</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl md:text-5xl font-black text-[#111111] blur-[8px] select-none">
                                    {formatCurrency(calculatedValue)}
                                </span>
                                <span className="text-xs font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-1 rounded-md">Calculado</span>
                            </div>
                        </div>

                        <div className="h-[1px] w-full bg-gray-100" />

                        <div className="flex items-start gap-3 text-left">
                            <div className="p-2 bg-green-50 rounded-lg shrink-0">
                                <ArrowUpRight size={16} className="text-green-600" />
                            </div>
                            <p className="text-sm md:text-base font-bold text-[#111111] leading-tight">
                                Mais de €4.000 de poupança possível <br />
                                <span className="text-[11px] font-medium text-[#4B5563]">Descobre como evitar os 2 erros fatais no teu WhatsApp</span>
                            </p>
                        </div>
                    </div>
                </motion.div>

                <div className="space-y-4 md:space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37]"
                    >
                        <Lock size={12} strokeWidth={3} />
                        <span>Ligação Segura e Cifrada</span>
                    </motion.div>

                    <h2 className="text-3xl md:text-5xl font-black text-[#111111] leading-tight tracking-tighter">
                        O teu orçamento <br className="hidden md:block" /> está pronto.
                    </h2>

                    <p className="text-sm md:text-lg text-[#4B5563] font-black leading-relaxed max-w-sm mx-auto">
                        Conferimos que podes <span className="text-[#D4AF37]">poupar até €3.800</span> em materiais com estas 2 dicas profissionais. Onde queres receber?
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
                            <span className="text-sm md:text-lg">{loading ? 'A processar...' : 'Revelar Orçamento no WhatsApp'}</span>
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
