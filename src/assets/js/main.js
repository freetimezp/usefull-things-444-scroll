gsap.registerPlugin(ScrollTrigger, SplitText);

/* ------------------------------------------------ */
/* LENIS */
/* ------------------------------------------------ */

const lenis = new Lenis({
    lerp: 0.08,
    smoothWheel: true,
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

/* ------------------------------------------------ */
/* ELEMENTS */
/* ------------------------------------------------ */

const nav = document.querySelector(".nav");

const hero = document.querySelector(".hero");

const heroCopy = document.querySelector(".hero-copy");

const character = document.querySelector(".character");

const body = document.querySelector(".body-shape");

const eyes = document.querySelectorAll(".eye");

const mouth = document.querySelector(".mouth");

const arms = document.querySelectorAll(".arm");

const stickers = document.querySelectorAll(".sticker");

const heroTitle = document.querySelector(".hero-title");

const counter = document.querySelector(".counter-current");

/* ------------------------------------------------ */
/* SPLIT TEXT */
/* ------------------------------------------------ */

const heroWords = document.querySelectorAll(".hero-title span");

const heroSplit = new SplitText(".hero-title span", {
    type: "chars",
});

const sectionSplit = new SplitText(".section-title", {
    type: "words,chars",
});

const chaosSplit = new SplitText(".chaos-title span", {
    type: "chars",
});

const revealSplit = new SplitText(".reveal-title span", {
    type: "chars",
});

/* ------------------------------------------------ */
/* INITIAL STATES */
/* ------------------------------------------------ */

gsap.set(nav, {
    backgroundColor: "rgba(244, 240, 230, 0)",
    backdropFilter: "blur(0px)",
    borderBottomColor: "rgba(23, 23, 23, 0)",
});

gsap.set(heroSplit.chars, {
    yPercent: 120,
    opacity: 0,
    rotate: 8,
});

gsap.set(character, {
    scale: 0.4,
    rotation: -15,
    opacity: 0,
});

gsap.set(stickers, {
    scale: 0,
    rotation: 0,
});

gsap.set(arms, {
    scaleX: 0,
});

gsap.set(".speech-bubble", {
    scale: 0,
});

gsap.set(heroWords, {
    opacity: 0,
    y: 100,
    scale: 0.8,
});

gsap.set(heroSplit.chars, {
    opacity: 0,
    y: 80,
});

/* ------------------------------------------------ */
/* HERO INTRO */
/* ------------------------------------------------ */

const intro = gsap.timeline({
    defaults: {
        ease: "back.out(1.7)",
    },
});

const isMobile = window.innerWidth <= 768;

intro
    .to(heroWords, {
        opacity: 1,
        y: 0,
        scale: 1,

        duration: 0.6,

        stagger: 0.12,
    })

    .fromTo(
        heroSplit.chars,
        {
            y: 0,
            opacity: 0,
        },
        {
            y: isMobile ? -70 : -180,
            opacity: 1,

            duration: 0.5,

            stagger: 0.015,

            ease: "power3.out",
        },
        "-=0.4",
    )

    .to(
        character,
        {
            scale: 1,
            rotation: 0,
            opacity: 1,

            duration: 1,

            ease: "back.out(1.7)",
        },
        "-=0.2",
    )

    .to(
        arms,
        {
            scaleX: 1,

            duration: 0.5,

            stagger: 0.1,

            ease: "back.out(2)",
        },
        "-=0.5",
    )

    .to(
        stickers,
        {
            scale: 1,

            duration: 0.4,

            stagger: 0.12,

            ease: "back.out(2)",
        },
        "-=0.3",
    );

/* ------------------------------------------------ */
/* CHARACTER IDLE */
/* ------------------------------------------------ */

gsap.to(".body", {
    y: -8,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
});

gsap.to(body, {
    rotation: 2,

    duration: 1.8,

    repeat: -1,
    yoyo: true,

    ease: "sine.inOut",
});

/* ------------------------------------------------ */
/* EYES FOLLOW MOUSE */
/* ------------------------------------------------ */

if (window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("mousemove", (event) => {
        const x = (event.clientX / window.innerWidth - 0.5) * 2;

        const y = (event.clientY / window.innerHeight - 0.5) * 2;

        gsap.to(".eye span", {
            x: x * 8,
            y: y * 5,
            duration: 0.35,
            overwrite: true,
        });
    });
}

/* ------------------------------------------------ */
/* HERO SCROLL */
/* ------------------------------------------------ */

ScrollTrigger.create({
    start: 20,

    onUpdate: (self) => {
        const y = self.scroll();

        const progress = gsap.utils.clamp(0, 1, y / 100);

        gsap.set(nav, {
            backgroundColor: `rgba(244, 240, 230, ${progress * 0.72})`,
            backdropFilter: `blur(${progress * 18}px)`,
            borderBottomColor: `rgba(23, 23, 23, ${progress * 0.12})`,
            paddingTop: `${1.5 - progress * 0.7}rem`,
            paddingBottom: `${1.5 - progress * 0.7}rem`,
        });
    },
});

const mm = gsap.matchMedia();

mm.add(
    {
        desktop: "(min-width: 801px)",
        mobile: "(max-width: 800px)",
    },
    (context) => {
        const { desktop, mobile } = context.conditions;

        ScrollTrigger.create({
            trigger: hero,

            start: "top top",
            end: "bottom top",

            scrub: 1,

            onUpdate: (self) => {
                const p = self.progress;

                /* -------------------------------- */
                /* HERO TEXT */
                /* -------------------------------- */

                gsap.set(heroCopy, {
                    x: desktop ? -p * 180 : -p * 70,
                    opacity: 1 - p * 1.4,
                });

                /* -------------------------------- */
                /* TITLE */
                /* -------------------------------- */

                gsap.set(".title-black", {
                    x: desktop ? -p * 150 : -p * 70,
                    rotation: -p * (desktop ? 8 : 4),
                });

                gsap.set(".title-blue", {
                    x: desktop ? p * 220 : p * 80,
                    rotation: p * (desktop ? 10 : 5),
                });

                gsap.set(".title-yellow", {
                    x: desktop ? -p * 260 : -p * 90,
                    rotation: -p * (desktop ? 12 : 5),
                });

                gsap.set(".title-pink", {
                    x: desktop ? p * 320 : p * 110,
                    rotation: p * (desktop ? 15 : 6),
                });

                /* -------------------------------- */
                /* CHARACTER */
                /* -------------------------------- */

                gsap.set(character, {
                    x: desktop ? p * 500 : p * 150,
                    rotation: p * (desktop ? 35 : 18),
                    scale: desktop ? 1 - p * 0.35 : 1 - p * 0.18,
                });

                /* -------------------------------- */
                /* STICKERS */
                /* -------------------------------- */

                gsap.set(".sticker-wow", {
                    x: desktop ? p * 500 : p * 120,
                    y: desktop ? -p * 200 : -p * 80,
                    rotation: p * (desktop ? 90 : 35),
                });

                gsap.set(".sticker-nope", {
                    x: desktop ? -p * 400 : -p * 100,
                    rotation: -p * (desktop ? 120 : 50),
                });

                if (desktop) {
                    gsap.set(".sticker-ok", {
                        x: -p * 300,
                        y: p * 150,
                        rotation: p * 80,
                    });
                }

                /* -------------------------------- */
                /* ARMS */
                /* -------------------------------- */

                gsap.set(".arm-left", {
                    rotation: 25 + p * (desktop ? 100 : 55),
                });

                gsap.set(".arm-right", {
                    rotation: -25 - p * (desktop ? 100 : 55),
                });

                /* -------------------------------- */
                /* EYES */
                /* -------------------------------- */

                gsap.set(".eye span", {
                    y: -p * (desktop ? 10 : 5),
                });
            },
        });
    },
);

/* ------------------------------------------------ */
/* ABOUT SECTION */
/* ------------------------------------------------ */

ScrollTrigger.create({
    trigger: ".about",

    start: "top bottom",
    end: "bottom top",

    scrub: 1,

    onEnter: () => {
        counter.textContent = "02";
    },

    onUpdate: (self) => {
        const p = self.progress;

        gsap.set(sectionSplit.chars, {
            y: 100 - p * 100,
            opacity: p,
            rotation: (1 - p) * 10,
        });

        gsap.set(".bubble-one", {
            scale: p,
            rotation: p * 15,
        });

        gsap.set(".bubble-two", {
            scale: p,
            rotation: -p * 12,
        });
    },
});

/* ------------------------------------------------ */
/* CHAOS SECTION */
/* ------------------------------------------------ */

mm.add(
    {
        desktop: "(min-width: 801px)",
        mobile: "(max-width: 800px)",
    },
    (context) => {
        const { desktop } = context.conditions;

        ScrollTrigger.create({
            trigger: ".chaos",

            start: "top bottom",
            end: "bottom top",

            scrub: 1,

            onEnter: () => {
                counter.textContent = "03";
            },

            onUpdate: (self) => {
                const p = self.progress;

                const movement = desktop ? 100 : 35;
                const cardMovement = desktop ? 250 : 80;

                /* BIG TEXT */

                gsap.set(chaosSplit.chars, {
                    x: (index) => Math.sin(index * 0.7) * p * movement,

                    rotation: (index) =>
                        Math.sin(index) * p * (desktop ? 15 : 7),
                });

                /* CARDS */

                gsap.set(".card-one", {
                    x: p * cardMovement,
                    rotation: 8 + p * (desktop ? 40 : 18),
                });

                gsap.set(".card-two", {
                    x: -p * cardMovement,
                    rotation: -7 - p * (desktop ? 30 : 15),
                });

                gsap.set(".card-three", {
                    y: -p * (desktop ? 300 : 100),
                    rotation: 5 + p * (desktop ? 60 : 25),
                });

                /* CROSSES */

                gsap.set(".cross-one", {
                    rotation: p * (desktop ? 180 : 90),
                    scale: 1 + p * (desktop ? 1 : 0.5),
                });

                gsap.set(".cross-two", {
                    rotation: -p * (desktop ? 240 : 120),
                    scale: 1 + p * (desktop ? 0.5 : 0.25),
                });
            },
        });
    },
);

/* ------------------------------------------------ */
/* REVEAL IMAGE */
/* ------------------------------------------------ */

const imageStart = window.matchMedia("(max-width: 800px)").matches ? 90 : 65;

const imageRadius = window.matchMedia("(max-width: 800px)").matches ? 8 : 12;

ScrollTrigger.create({
    trigger: ".reveal",

    start: "top bottom",
    end: "bottom top",

    scrub: 1,

    onEnter: () => {
        counter.textContent = "04";
    },

    onUpdate: (self) => {
        const p = self.progress;

        /*
         * IMAGE GROWS
         */

        gsap.set(".image-wrapper", {
            width: `${imageStart + p * (100 - imageStart)}%`,
            borderRadius: `${imageRadius - p * imageRadius}px`,
        });

        /*
         * IMAGE ZOOM
         */

        gsap.set(".image-wrapper img", {
            scale: 1.2 - p * 0.2,
        });

        /*
         * TITLE SLIDES AWAY
         */

        gsap.set(revealSplit.chars, {
            y: p * (window.innerWidth <= 800 ? 80 : 150),
            opacity: 1 - p,
        });
    },
});

/* ------------------------------------------------ */
/* FINAL */
/* ------------------------------------------------ */

ScrollTrigger.create({
    trigger: ".final",

    start: "top bottom",
    end: "bottom top",

    scrub: 1,

    onEnter: () => {
        counter.textContent = "05";
    },

    onUpdate: (self) => {
        const p = self.progress;

        gsap.set(".final-card", {
            scale: 0.85 + p * 0.15,
            rotation: (1 - p) * -4,
        });

        gsap.set(".final-character", {
            rotation: p * 360,
        });
    },
});

/* ------------------------------------------------ */
/* AGAIN BUTTON */
/* ------------------------------------------------ */

document.querySelector(".final-card button").addEventListener("click", () => {
    lenis.scrollTo(0, {
        duration: 1.5,
    });
});

window.addEventListener("resize", () => {
    location.reload();

    ScrollTrigger.refresh();
});
