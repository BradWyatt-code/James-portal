"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function JamesHeroAnimations() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Intro: card rises & fades in
      const tl = gsap.timeline();
      tl.from(".hero-card", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      })
        .from(
          ".hero h1",
          {
            opacity: 0,
            y: 12,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.7"
        )
        .from(
          ".hero p",
          {
            opacity: 0,
            y: 8,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.4"
        );

      // Background cavalry: slow drift, like a memory shifting
      gsap.to(".james-page", {
        backgroundPositionX: "-=40px",
        duration: 24,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Portrait: tiny idle float
      gsap.to(".portrait-wrap", {
        y: -6,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // This div just gives gsap.context a scope
  return <div ref={rootRef} />;
}
