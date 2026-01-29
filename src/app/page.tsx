"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '@/components/Hero';
import Quiz from '@/components/Quiz';
import EducationalStep from '@/components/EducationalStep';
import WhatsAppCapture from '@/components/WhatsAppCapture';
import Results from '@/components/Results';
import { saveLead } from '@/lib/pocketbase';

export type FunnelStep = 'hero' | 'quiz' | 'educational' | 'whatsapp' | 'results';

export default function Home() {
  const [step, setStep] = useState<FunnelStep>('hero');
  const [formData, setFormData] = useState<any>({
    type: '',
    area: 0,
    roomType: '',
    roomSize: '',
    condition: '',
    whatsapp: '',
    calculatedValue: 0,
  });

  const nextStep = () => {
    if (step === 'hero') setStep('quiz');
    else if (step === 'quiz') setStep('educational');
    else if (step === 'educational') setStep('whatsapp');
  };

  const handleCompleteLead = async (whatsapp: string) => {
    const finalData = {
      ...formData,
      whatsapp,
      timestamp: new Date().toISOString(),
      estimate: formData.calculatedValue
    };
    setFormData(finalData);
    await saveLead(finalData);
    setStep('results');
  };

  return (
    <main className="min-h-screen overflow-x-hidden">
      <AnimatePresence mode="wait">
        {step === 'hero' && (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Hero onStart={nextStep} />
          </motion.div>
        )}

        {step === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Quiz
              onComplete={(data: any) => {
                setFormData({ ...formData, ...data });
                nextStep();
              }}
            />
          </motion.div>
        )}

        {step === 'educational' && (
          <motion.div
            key="educational"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <EducationalStep onContinue={nextStep} />
          </motion.div>
        )}

        {step === 'whatsapp' && (
          <motion.div
            key="whatsapp"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <WhatsAppCapture
              onComplete={handleCompleteLead}
            />
          </motion.div>
        )}

        {step === 'results' && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Results data={formData} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
