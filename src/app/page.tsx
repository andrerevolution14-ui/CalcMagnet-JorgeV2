"use client";
// Force rebuild to resolve 404 deployment issue

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '@/components/Hero';
import Quiz, { QuizData } from '@/components/Quiz';
import EducationalStep from '@/components/EducationalStep';
import WhatsAppCapture from '@/components/WhatsAppCapture';
import Results from '@/components/Results';
import { saveLeadAction } from '@/app/actions';

export type FunnelStep = 'hero' | 'quiz' | 'educational' | 'whatsapp' | 'results';

export interface FullLeadData extends QuizData {
  whatsapp: string;
  area_m2: number;
  calculatedValue: number;
}

export default function Home() {
  const [step, setStep] = useState<FunnelStep>('hero');
  const [formData, setFormData] = useState<FullLeadData>({
    type: 'full_house',
    area_m2: 0,
    roomType: 'Sala',
    roomSize: 'Médio',
    condition: 'medium',
    whatsapp: '',
    calculatedValue: 0,
  });

  const nextStep = () => {
    if (step === 'hero') setStep('quiz');
    else if (step === 'quiz') setStep('educational');
    else if (step === 'educational') setStep('whatsapp');
  };

  const handleCompleteLead = async (whatsapp: string) => {
    // This runs on the server through the Action, bypassing browser Mixed Content blocks
    await saveLeadAction({
      Whatsapp: whatsapp,
      type: formData.type,
      area_m2: formData.area_m2,
      roomType: formData.roomType,
      roomSize: formData.roomSize,
      condition: formData.condition,
      estimate: formData.calculatedValue || 0
    });

    setFormData(prev => ({
      ...prev,
      whatsapp,
      calculatedValue: prev.calculatedValue || 0,
      area_m2: prev.area_m2 || 0
    }));

    setStep('results');
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FCFCFA]">
      {/* Global Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-[100] bg-gray-100/50">
        <motion.div
          className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F5E1A4]"
          animate={{
            width: step === 'hero' ? '0%' :
              step === 'quiz' ? '25%' :
                step === 'educational' ? '50%' :
                  step === 'whatsapp' ? '75%' : '100%'
          }}
          transition={{ type: "spring", damping: 20, stiffness: 50 }}
        />
      </div>

      <AnimatePresence mode="wait">
        {step === 'hero' && (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
          >
            <Hero onStart={nextStep} />
          </motion.div>
        )}

        {step === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 10, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.98 }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
          >
            <Quiz
              onComplete={(data: QuizData) => {
                setFormData(prev => ({
                  ...prev,
                  ...data,
                  area_m2: data.area_m2 ?? prev.area_m2,
                  calculatedValue: data.calculatedValue || 0
                }));
                nextStep();
              }}
            />
          </motion.div>
        )}

        {step === 'educational' && (
          <motion.div
            key="educational"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 80 }}
          >
            <EducationalStep onContinue={nextStep} />
          </motion.div>
        )}

        {step === 'whatsapp' && (
          <motion.div
            key="whatsapp"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
          >
            <WhatsAppCapture
              calculatedValue={formData.calculatedValue}
              onComplete={handleCompleteLead}
            />
          </motion.div>
        )}

        {step === 'results' && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Results data={formData} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
