import { useEffect, useState } from 'react';
import { ShieldCheck, BadgeCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EducationalStepProps {
    onContinue: () => void;
}

export default function EducationalStep({ onContinue }: EducationalStepProps) {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('Analisando custos de mão-de-obra...');

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onContinue, 600);
                    return 100;
                }

                // Update text based on progress
                if (prev > 30 && prev < 60) setStatus('Comparando materiais em Aveiro...');
                if (prev > 60 && prev < 90) setStatus('Calculando poupança potencial...');
                if (prev >= 90) setStatus('Quase pronto...');

                return prev + 1;
            });
        }, 35); // Approx 3.5 seconds total

        return () => clearInterval(timer);
    }, [onContinue]);

    return (
        <div className="min-h-[100dvh] flex items-center justify-center p-6 bg-[#FCFCFA]">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                className="w-full max-w-lg space-y-12 text-center"
            >
                <div className="space-y-6">
                    <div className="relative flex justify-center">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="p-3 md:p-4 bg-[#D4AF37]/5 text-[#D4AF37] rounded-full"
                        >
                            <ShieldCheck size={48} className="md:w-16 md:h-16" />
                        </motion.div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                animate={{ opacity: [0.3, 0.6, 0.3] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="w-24 h-24 md:w-32 md:h-32 border-2 border-dashed border-[#D4AF37]/20 rounded-full"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-2xl md:text-4xl font-black text-[#111111]">Análise em curso...</h2>
                        <p className="text-sm md:text-lg text-[#4B5563] font-medium min-h-[1.5em]">
                            {status}
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    {/* Progress Bar Container */}
                    <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner border border-gray-200">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className="h-full bg-gradient-to-r from-[#D4AF37] via-[#F5E1A4] to-[#D4AF37] relative"
                            transition={{ ease: "linear" }}
                        >
                            {/* Shimmer effect inside progress bar */}
                            <motion.div
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                className="absolute inset-0 bg-white/30 skew-x-12"
                            />
                        </motion.div>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                        <span>Seguro & Encriptado</span>
                        <span className="text-[#D4AF37]">{progress}%</span>
                    </div>
                </div>

                <div className="grid gap-3 pt-4">
                    <AnimatePresence mode="wait">
                        {progress > 15 && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm"
                            >
                                <div className="p-1.5 bg-green-50 rounded-full">
                                    <BadgeCheck size={16} className="text-green-600" />
                                </div>
                                <span className="text-xs md:text-sm font-bold text-[#111111] text-left">
                                    Mão-de-obra oficial Aveiro validada
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                        {progress > 55 && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm"
                            >
                                <div className="p-1.5 bg-green-50 rounded-full">
                                    <BadgeCheck size={16} className="text-green-600" />
                                </div>
                                <span className="text-xs md:text-sm font-bold text-[#111111] text-left">
                                    Algoritmo de poupança inteligente aplicado
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
