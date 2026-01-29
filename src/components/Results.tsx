"use client";

import { MessageSquare, MapPin, Zap, Check, ChevronDown, AlertTriangle, ShieldCheck, Target } from 'lucide-react';
import { formatCurrency } from '@/utils/calculator';
import { motion } from 'framer-motion';

interface ResultsProps {
    data: {
        calculatedValue: number;
        type: string;
        area_m2: number;
        roomType?: string;
        roomSize?: string;
        condition: string;
    };
}

export default function Results({ data }: ResultsProps) {
    const { calculatedValue } = data;

    // Direct WhatsApp Link (Removed name Jorge as requested)
    const whatsappLink = `https://api.whatsapp.com/send?phone=351912050979&text=Ol%C3%A1!%20%F0%9F%91%8B%20Acabei%20de%20usar%20o%20vosso%20simulador%20e%20fiquei%20impressionado%20com%20o%20resultado.%20Gostava%20de%20saber%20a%20vossa%20opini%C3%A3o%20profissional%3A%20Como%20podemos%20fazer%20para%20avan%C3%A7ar%20para%20um%20or%C3%A7amento%3F%20Obrigado!`;

    const handleWhatsApp = () => {
        window.open(whatsappLink, '_blank');
    };

    return (
        <div className="min-h-screen bg-[#FCFCFA] pb-32">
            {/* HERO RESULTS */}
            <section className="relative bg-white border-b border-gray-100 px-6 pt-12 pb-24 md:pt-24 md:pb-32 overflow-hidden">
                <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-8 md:space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-2"
                    >
                        <div className="trust-label mb-4">
                            <ShieldCheck size={14} className="text-[#10B981]" />
                            <span>Cálculo Regional para Aveiro</span>
                        </div>
                        <h1 className="text-[#111111]">
                            O investimento médio <br /> para a tua casa:
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative"
                    >
                        <div className="text-7xl md:text-[130px] font-black text-[#111111] leading-none tracking-tighter">
                            {formatCurrency(calculatedValue)}
                        </div>
                        <p className="text-[10px] md:text-sm text-[#4B5563] font-black uppercase tracking-[0.3em] mt-6 opacity-40">
                            *Valor sujeito a confirmação técnica local
                        </p>
                    </motion.div>

                    {/* SCROLL INCENTIVE */}
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute bottom-6 flex flex-col items-center gap-1 opacity-60"
                    >
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37]">Faz scroll e descobre como poupar</span>
                        <ChevronDown size={20} className="text-[#D4AF37]" />
                    </motion.div>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-6 space-y-20 md:space-y-32 -mt-10">

                {/* 1. O QUE CALCULÁMOS SECTION */}
                <div className="premium-card !p-0 shadow-2xl relative z-10">
                    <div className="bg-[#111111] p-6 md:p-8 flex items-center justify-between text-white">
                        <div className="flex items-center gap-4">
                            <Zap className="text-[#D4AF37]" size={24} />
                            <h3 className="text-lg md:text-xl font-black italic">O que calculámos neste valor</h3>
                        </div>
                    </div>
                    <div className="p-6 md:p-14 grid md:grid-cols-2 gap-8 md:gap-16">
                        <div className="space-y-6">
                            <IncludedItem title="Mão-de-Obra Regional" desc="Equipas de Aveiro que conhecem as técnicas e materiais ideais para as nossas casas." />
                            <IncludedItem title="Materiais de Elevada Durabilidade" desc="Seleção criteriosa para garantir que a tua casa se mantém impecável por décadas." />
                        </div>
                        <div className="space-y-6">
                            <IncludedItem title="Apoio Logístico Total" desc="Tratamos de tudo, desde as licenças na Câmara de Aveiro até à limpeza final." />
                            <IncludedItem title="Transparência no Orçamento" desc="Sabes exatamente onde cada cêntimo é investido, sem surpresas a meio do caminho." />
                        </div>
                    </div>
                </div>

                {/* 2. THE ERROR BLOCK (VALUE FIRST) */}
                <section className="space-y-8 md:space-y-10">
                    <div className="text-center space-y-4 max-w-2xl mx-auto px-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                            <AlertTriangle size={14} />
                            <span>Alerta de Planeamento</span>
                        </div>
                        <h2 className="text-2xl md:text-5xl text-[#111111]">90% das remodelações em Aveiro cometem estes erros</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                        <ErrorCard
                            error="Ignorar a Saúde das Paredes"
                            cost="€1.800+"
                            reason="Tapar humidade com pladur sem tratar a origem. Em 2 anos, vais ter de refazer tudo."
                        />
                        <ErrorCard
                            error="Má Divisão da Iluminação"
                            cost="€950+"
                            reason="Casas antigas são muitas vezes escuras. Uma má escolha de pontos de luz mata o conforto."
                        />
                        <ErrorCard
                            error="Falta de Visão Antecipada"
                            cost="€1.250+"
                            reason="Começar a obra sem ver o resultado. As mudanças de opinião a meio custam fortunas."
                        />
                    </div>

                    <div className="bg-[#D4AF37]/5 p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-[#D4AF37]/10 text-center mx-4">
                        <p className="text-lg md:text-xl text-[#111111] font-bold">
                            &quot;Em média, estas falhas custam <span className="text-red-600">€4.000 extra</span> a quem não planeia antes de começar.&quot;
                        </p>
                    </div>
                </section>

                {/* 3. ESPECIALISTA LOCAL SECTION (REWORKED COPY) */}
                <section className="premium-card grid md:grid-cols-2 gap-8 md:gap-12 items-center !bg-white">
                    <div className="space-y-6 md:space-y-8">
                        <div className="space-y-4">
                            <div className="trust-label !bg-gray-50 max-w-fit">
                                <MapPin size={12} className="text-[#D4AF37]" />
                                <span>Expertise Local</span>
                            </div>
                            <h2 className="text-2xl md:text-5xl text-[#111111]">Clareza absoluta para a tua obra.</h2>
                            <p className="text-sm md:text-lg text-[#4B5563] font-medium leading-relaxed">
                                Sabemos que o setor da construção pode ser intimidante. Orçamentos incertos e prazos que nunca acabam. A nossa missão é dar-te <b>segurança absoluta</b> antes de mexeres na primeira parede da tua casa.
                            </p>
                        </div>
                        <div className="space-y-3 md:space-y-4">
                            <AuthorityPoint text="Segurança técnica em cada decisão" />
                            <AuthorityPoint text="Controle total sobre o investimento" />
                            <AuthorityPoint text="Uma conversa honesta e profissional" />
                        </div>
                    </div>
                    <div className="relative">
                        <div className="relative bg-white border border-gray-100 p-6 md:p-12 rounded-[32px] md:rounded-[40px] shadow-xl space-y-6 md:space-y-8">
                            <h3 className="text-lg md:text-2xl text-[#111111] text-center">Como avançamos juntos:</h3>
                            <div className="space-y-4 md:space-y-6">
                                <StepItem num="1" title="Análise Técnica" desc="Validamos os teus desejos com a viabilidade real da casa." />
                                <StepItem num="2" title="Escolha Consciente" desc="Ajudamos-te a escolher materiais que valorizam o teu imóvel." />
                                <StepItem num="3" title="Gestão de Obra" desc="Prazos cumpridos e equipas impecáveis no terreno." />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. FINAL CTA REDESIGNED */}
                <section className="max-w-3xl mx-auto text-center space-y-8 md:space-y-12 pb-12">
                    <div className="space-y-4 px-4">
                        <h2 className="text-2xl md:text-5xl text-[#111111]">Pronto para a clareza total?</h2>
                        <p className="text-sm md:text-xl text-[#4B5563] font-medium">
                            Validamos este orçamento com o nosso conhecimento técnico regional.
                        </p>
                    </div>

                    <div className="flex flex-col items-center px-4">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleWhatsApp}
                            className="btn-whatsapp-premium w-full md:w-auto min-w-0 md:min-w-[400px] shimmer-premium"
                        >
                            <div className="flex items-center gap-3">
                                <MessageSquare size={24} className="shrink-0" />
                                <div className="flex flex-col items-center leading-tight">
                                    <span className="text-sm md:text-lg font-black italic">Validar Orçamento com Especialista</span>
                                    <span className="text-[9px] md:text-[10px] font-bold opacity-80 mt-0.5">SEM COMPROMISSO E 100% GRÁTIS</span>
                                </div>
                            </div>
                        </motion.button>

                        <div className="mt-6 flex items-center gap-3 opacity-60">
                            <div className="p-1 bg-[#25D366] rounded-full">
                                <MessageSquare size={10} className="text-white fill-current" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#111111]">Resposta em menos de 2h</span>
                        </div>
                    </div>
                </section>
            </div>

            {/* STICKY CTA MOBILE */}
            <div className="md:hidden fixed bottom-6 left-6 right-6 z-[100] flex flex-col items-center gap-3">
                <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-[#D4AF37]/20 shadow-md text-[9px] font-black text-[#D4AF37] uppercase tracking-[0.1em]"
                >
                    Ferramenta de Orçamentação Digital
                </motion.div>
                <button
                    onClick={handleWhatsApp}
                    className="btn-whatsapp-premium w-full !py-4 shadow-2xl !rounded-2xl"
                >
                    <div className="flex items-center gap-2">
                        <MessageSquare size={18} />
                        <span className="text-sm">Validar Orçamento Agora</span>
                    </div>
                </button>
            </div>
        </div>
    );
}

function IncludedItem({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="flex gap-5">
            <div className="shrink-0 w-10 h-10 rounded-full bg-[#10B981]/10 flex items-center justify-center text-[#10B981]">
                <Check size={20} strokeWidth={3} />
            </div>
            <div className="space-y-1">
                <h4 className="text-lg md:text-xl font-black text-[#111111] leading-tight">{title}</h4>
                <p className="text-sm md:text-base text-[#4B5563] font-medium leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}

function ErrorCard({ error, cost, reason }: { error: string, cost: string, reason: string }) {
    return (
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-4 hover:shadow-xl transition-all">
            <div className="text-red-600 font-black text-2xl tracking-tight">{cost}</div>
            <h4 className="text-lg font-black text-[#111111] uppercase tracking-tight">{error}</h4>
            <p className="text-sm text-[#4B5563] font-medium leading-relaxed">{reason}</p>
        </div>
    );
}

function AuthorityPoint({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-3 font-black text-[#111111] text-sm md:text-base">
            <Target size={20} className="text-[#D4AF37]" />
            <span>{text}</span>
        </div>
    );
}

function StepItem({ num, title, desc }: { num: string, title: string, desc: string }) {
    return (
        <div className="flex gap-6 items-start">
            <div className="w-8 h-8 rounded-lg bg-[#111111] text-[#D4AF37] flex items-center justify-center text-sm font-black shrink-0">
                {num}
            </div>
            <div className="space-y-1">
                <h4 className="font-black text-[#111111] uppercase tracking-tighter">{title}</h4>
                <p className="text-sm text-[#4B5563] font-medium">{desc}</p>
            </div>
        </div>
    );
}
