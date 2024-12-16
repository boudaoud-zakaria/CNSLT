'use client'
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGetExclusive, useUpdateExclusive } from "@/hooks/useFatchExclusive";

export default function CnslLive() {
  const { data: exclusive, isLoading, error, getExclusive } = useGetExclusive();

  useEffect(() => {
    getExclusive();
  }, []);

  if (isLoading || error || !exclusive) return null;

  return (
    <div
      className="w-full h-0 overflow-hidden relative"
      style={{ 
        backgroundColor: exclusive.color,
        color: exclusive.colorText 
      }}
    >
      <motion.div
        className="absolute left-full text-xl font-bold whitespace-nowrap w-screen flex items-center"
        initial={{ x: '80%' }}
        animate={{ x: [ '0%' , '-150% ' ] }}
        transition={{
          duration: 20, 
          repeat: Infinity,
          repeatType: 'loop', 
          ease: "linear"
        }}
        key={exclusive.title} // Helps React/Framer reset animation if title changes
      >
        <p className='h-16 flex items-center  text-center w-full'>
          {exclusive.title}
        </p>
      </motion.div>
    </div>
  );
}