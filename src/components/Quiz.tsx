"use client";

import { useState } from 'react';
import { ChevronRight, ArrowLeft, Info, HelpCircle } from 'lucide-react';
import { calculateEstimate, CalculationInput } from '@/utils/calculator';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface QuizData extends CalculationInput {
    calculatedValue?: number;
}

interface QuizProps {
    onComplete: (data: QuizData) => void;
}

type QuizStep = 'type' | 'area' | 'roomType' | 'roomSize' | 'condition';

export default function Quiz({ onComplete }: QuizProps) {
    const [step, setStep] = useState<QuizStep>('type');
    const [data, setData] = useState<QuizData>({
        type: 'full_house',
        area_m2: 0,
        roomType: 'Sala',
        roomSize: 'Médio',
        condition: 'medium',
    });

    const stepsList: QuizStep[] = ['type', data.type === 'full_house' ? 'area' : 'roomType', data.type === 'single_room' ? 'roomSize' : null, 'condition'].filter(Boolean) as QuizStep[];
    const currentIndex = stepsList.indexOf(step);
    const totalSteps = stepsList.length;

    const handleSelect = (field: keyof QuizData, value: string | number, next?: QuizStep) => {
        const newData = { ...data, [field]: value };
        setData(newData);

        if (next) {
            setStep(next);
        } else {
            const finalValue = calculateEstimate(newData);
            onComplete({ ...newData, calculatedValue: finalValue });
        }
    };

    const goBack = () => {
        const prevIndex = currentIndex - 1;
        if (prevIndex >= 0) setStep(stepsList[prevIndex]);
    };

    return (
        <div className="min-h-[100dvh] flex flex-col bg-white">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-3 md:px-8 md:py-6 flex items-center justify-between">
                <button
                    onClick={goBack}
                    disabled={currentIndex === 0}
                    className="p-2 rounded-full hover:bg-gray-50 disabled:opacity-0"
                >
                    <ArrowLeft size={20} className="md:w-6 md:h-6" />
                </button>

                <div className="flex flex-col items-center">
                    <div className="flex gap-1.5 md:gap-2">
                        {stepsList.map((_, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "h-1.5 w-6 md:w-16 rounded-full transition-all duration-500",
                                    i <= currentIndex ? "bg-[#D4AF37]" : "bg-gray-100"
                                )}
                            />
                        ))}
                    </div>
                    <span className="text-[10px] font-black uppercase mt-2 text-[#D4AF37] tracking-[0.2em]">ETAPA {currentIndex + 1} DE {totalSteps}</span>
                </div>

                <div className="p-2 opacity-0"><ArrowLeft size={20} /></div>
            </div>

            <div className="flex-1 w-full max-w-xl mx-auto px-6 py-8 md:py-16">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="space-y-10 md:space-y-14"
                    >
                        {step === 'type' && (
                            <div className="space-y-8">
                                <QuestionHeader
                                    title="O que pretendes transformar?"
                                    tip="A escala da obra determina se é necessária uma licença ou apenas comunicação prévia."
                                />
                                <div className="grid gap-4">
                                    <OptionButton
                                        label="Reabilitação Integral"
                                        sub="Toda a estrutura da casa"
                                        onClick={() => handleSelect('type', 'full_house', 'area')}
                                    />
                                    <OptionButton
                                        label="Intervenção Pontual"
                                        sub="Uma a duas divisões específicas"
                                        onClick={() => handleSelect('type', 'single_room', 'roomType')}
                                    />
                                </div>
                            </div>
                        )}

                        {step === 'area' && (
                            <div className="space-y-8">
                                <QuestionHeader
                                    title="Qual a área bruta?"
                                    tip="A área é o fator #1 que influencia o custo de materiais como pavimentos e pinturas."
                                />
                                <div className="grid gap-3">
                                    {[
                                        { label: "Pequeno (T0/T1)", range: "Até 75 m²", val: 62 },
                                        { label: "Médio (T2)", range: "75–100 m²", val: 87 },
                                        { label: "Grande (T3)", range: "100–150 m²", val: 125 },
                                        { label: "Master (T4+)", range: "150+ m²", val: 165 },
                                    ].map((item) => (
                                        <OptionButton
                                            key={item.val}
                                            label={item.label}
                                            sub={item.range}
                                            onClick={() => handleSelect('area_m2', item.val, 'condition')}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 'roomType' && (
                            <div className="space-y-8">
                                <QuestionHeader
                                    title="Qual a divisão?"
                                    tip="Cozinhas e WC são as zonas mais caras por m² devido à canalização e revestimentos."
                                />
                                <div className="grid gap-3">
                                    {['Cozinha', 'Casa de banho', 'Sala', 'Quarto'].map(r => (
                                        <OptionButton
                                            key={r}
                                            label={r}
                                            onClick={() => handleSelect('roomType', r, 'roomSize')}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 'roomSize' && (
                            <div className="space-y-8">
                                <QuestionHeader
                                    title="Tamanho do espaço?"
                                    tip="Estimamos estas áreas com base no padrão construtivo da zona de Aveiro."
                                />
                                <div className="grid gap-3">
                                    <OptionButton label="Compacto" sub="Ideal p/ apartamentos" onClick={() => handleSelect('roomSize', 'Pequeno', 'condition')} />
                                    <OptionButton label="Standard" sub="A mais comum em Aveiro" onClick={() => handleSelect('roomSize', 'Médio', 'condition')} />
                                    <OptionButton label="Espaçoso" sub="Áreas de vivendas" onClick={() => handleSelect('roomSize', 'Grande', 'condition')} />
                                </div>
                            </div>
                        )}

                        {step === 'condition' && (
                            <div className="space-y-8">
                                <QuestionHeader
                                    title="Estado de conservação?"
                                    tip="Imóveis com mais de 20 anos precisam quase sempre de renovar a rede de águas."
                                />
                                <div className="grid gap-3">
                                    <OptionButton label="Bom Estado" sub="Apenas pintura e pavimentação" onClick={() => handleSelect('condition', 'light')} />
                                    <OptionButton label="Necessita Atualização" sub="Canalização ou tetos falsos" onClick={() => handleSelect('condition', 'medium')} />
                                    <OptionButton label="Degradado / Total" sub="Demolição profunda necessária" onClick={() => handleSelect('condition', 'total')} />
                                </div>
                            </div>
                        )}

                        <div className="pt-6 flex flex-col gap-4">
                            <div className="flex items-center gap-3 p-5 bg-[#D4AF37]/10 rounded-3xl border border-[#D4AF37]/20">
                                <HelpCircle size={20} className="text-[#D4AF37]" />
                                <p className="text-xs font-bold text-[#4B5563] leading-relaxed italic">
                                    &quot;A precisão do cálculo depende da tua honestidade nestes dados. Usamos custos de mão-de-obra real de Aveiro.&quot;
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

function QuestionHeader({ title, tip }: { title: string, tip: string }) {
    return (
        <div className="space-y-4">
            <h2 className="text-[#111111] leading-tight">{title}</h2>
            <div className="flex items-center gap-2 text-sm text-[#4B5563] font-bold">
                <Info size={16} className="text-[#D4AF37]" />
                <span>{tip}</span>
            </div>
        </div>
    );
}

function OptionButton({ label, sub, onClick }: { label: string; sub?: string; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="group flex items-center justify-between w-full p-6 text-left bg-white rounded-2xl border-2 border-gray-50 transition-all hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 active:scale-98 shadow-sm"
        >
            <div className="space-y-0.5">
                <span className="text-lg md:text-xl font-black text-[#111111] tracking-tight">{label}</span>
                {sub && <p className="text-xs font-bold text-[#4B5563] opacity-60 uppercase tracking-widest">{sub}</p>}
            </div>
            <ChevronRight size={20} className="text-gray-300 group-hover:text-[#D4AF37] transition-colors" />
        </button>
    );
}
