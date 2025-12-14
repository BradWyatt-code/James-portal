// components/JamesHeroAnimations.tsx
"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";

export default function JamesHeroAnimations() {
  useLayoutEffect(() => {
    // HERO CARD: step into the light
    const heroTl = gsap.from(".hero-card", {
      y: 40,
      opacity: 0,
      duration: 1.2,
      ease: "power2.out",
    });

    // PORTRAIT: tiny idle breathing
    const breatheTl = gsap.to(".portrait-wrap img", {
      y: -4,
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    return () => {
      heroTl.kill();
      breatheTl.kill();
    };
  }, []);

  // No DOM output; this just wires animations
  return null;
}
