"use client";

import { motion, MotionProps } from "framer-motion";
import { PropsWithChildren } from "react";

type FadeInProps = PropsWithChildren<{
  delay?: number;
  className?: string;
}> & MotionProps;

export const FadeIn = ({ children, delay = 0, className, ...rest }: FadeInProps) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5, ease: "easeOut", delay }}
    className={className}
    {...rest}
  >
    {children}
  </motion.div>
);

type StaggerProps = PropsWithChildren<{
  delayChildren?: number;
  className?: string;
}> & MotionProps;

export const Stagger = ({ children, delayChildren = 0.05, className, ...rest }: StaggerProps) => (
  <motion.div
    variants={{
      show: { transition: { staggerChildren: delayChildren } },
    }}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
    className={className}
    {...rest}
  >
    {children}
  </motion.div>
);

export const itemVariant = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

