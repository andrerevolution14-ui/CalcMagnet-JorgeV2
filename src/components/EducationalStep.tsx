"use client";

import { AlertCircle, ArrowRight, ShieldCheck, BadgeCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface EducationalStepProps {
    onContinue: () => void;
}

export default function EducationalStep({ onContinue }: EducationalStepProps) {
    return (
        <div className="min-h-[100dvh] flex items-center justify-center p-6 bg-white">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="premium-card max-w-xl w-full space-y-6 md:space-y-12 !p-6 md:!p-12"
            >
                <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
                    <div className="p-3 md:p-4 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full shrink-0">
                        <ShieldCheck size={32} className="md:w-10 md:h-10" />
                    </div>
                    <h2 className="text-2xl md:text-5xl font-black text-[#111111] leading-tight">A clareza que a tua casa merece</h2>
                    <p className="text-sm md:text-lg text-[#4B5563] font-medium leading-relaxed">
                        Antes de pensares em derrubar a primeira parede, criámos esta ferramenta para te dar a segurança que precisas aqui na nossa região.
                    </p>
                </div>

                <div className="space-y-4 md:space-y-6">
                    <InsightItem text="A tua casa tem muito mais potencial (e valor de mercado) do que imaginas - basta saber onde mexer." />
                    <InsightItem text="Sabias que 60% do sucesso da tua obra em Aveiro depende da escolha da equipa certa?" />
                    <InsightItem text="Podes poupar até 2.000€ apenas com um bom planeamento inicial." />
                </div>

                <button
                    onClick={onContinue}
                    className="w-full btn-premium-gold shimmer-premium"
                >
                    <span className="text-sm md:text-base">Quero ver a minha estimativa</span>
                    <ArrowRight size={20} className="md:w-6 md:h-6" />
                </button>
            </motion.div>
        </div>
    );
}

function InsightItem({ text }: { text: string }) {
    return (
        <div className="flex gap-4 items-start">
            <div className="mt-1 shrink-0 p-1 bg-[#10B981]/10 rounded-full">
                <BadgeCheck size={16} className="text-[#10B981]" />
            </div>
            <p className="text-base md:text-lg text-[#111111] font-bold leading-snug">{text}</p>
        </div>
    );
}
