"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/common/container";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Slide = {
    id: string;
    image?: string;
    video?: { src: string; type?: string; poster?: string };
    eyebrow: { ka: string; en: string };
    title: { ka: string; en: string };
    subtitle: { ka: string; en: string };
    primaryCta: { label: { ka: string; en: string }; href: string };
    secondaryCta?: { label: {ka: string; en: string}; href: string };
};