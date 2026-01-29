"use client";

import { ShieldCheck, Clock, Check, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
    onStart: () => void;
}

export default function Hero({ onStart }: HeroProps) {
    return (
        <section className="relative min-h-[100dvh] flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden">
            {/* Background Subtle Elements */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[120px] -z-10" />

            <div className="max-w-4xl w-full flex flex-col items-center text-center space-y-10 md:space-y-14">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="trust-label"
                >
                    <Clock size={14} className="text-[#D4AF37]" />
                    <span>Cálculo Rápido em 30 segundos</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-[#111111]"
                >
                    Descobre o custo <br />
                    <span className="relative inline-block text-[#D4AF37]">
                        real
                        <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#D4AF37]/30" />
                    </span>
                    <span> da tua renovação <br className="hidden md:block" /> em Aveiro</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                    className="text-lg md:text-2xl text-[#4B5563] max-w-2xl font-medium leading-relaxed"
                >
                    Sem estimativas vagas ou chamadas inesperadas. Obtém valores baseados na realidade atual das obras locais.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col items-center gap-8 w-full"
                >
                    <button
                        onClick={onStart}
                        className="btn-premium-gold shimmer-premium w-full md:w-auto min-w-[320px] text-lg md:text-xl py-6 group"
                    >
                        <span>Iniciar Simulador Grátis</span>
                        <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                        <TrustBadge label="Dados Regionais" />
                        <TrustBadge label="Sem Chamadas" />
                        <TrustBadge label="Suporte Local" />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 1 }}
                    className="flex items-center gap-2 text-[10px] md:text-xs text-[#4B5563] font-black uppercase tracking-[0.2em]"
                >
                    <ShieldCheck size={16} />
                    <span>Privacidade Garantida • 100% Seguro</span>
                </motion.div>
            </div>
        </section>
    );
}

function TrustBadge({ label }: { label: string }) {
    return (
        <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#10B981]/10 flex items-center justify-center">
                <Check size={12} className="text-[#10B981]" strokeWidth={4} />
            </div>
            <span className="text-xs md:text-sm font-black text-[#111111] uppercase tracking-wider">{label}</span>
        </div>
    );
}
