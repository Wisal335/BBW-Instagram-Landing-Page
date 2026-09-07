/* ============================================================
   BIG BRAIN WAY
   LIVING LANDING PAGE INTERACTIONS
   ============================================================ */


/* ============================================================
   01. DOM READY
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    initScrollReveal();

    initMouseGlow();

    init3DTilt();

    initMaturityModel();

    initMagneticButtons();

    initBackToTop();

    initMobileStickyCTA();

    initForm();

    initSmoothAnchors();

});


/* ============================================================
   02. SCROLL REVEAL
   ============================================================ */

function initScrollReveal() {

    const elements =
        document.querySelectorAll(".reveal");

    if (!elements.length) {
        return;
    }


    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        elements.forEach((element) => {
            element.classList.add("revealed");
        });

        return;
    }


    const observer =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    entry.target.classList.add(
                        "revealed"
                    );


                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -45px 0px"
            }
        );


    elements.forEach((element) => {

        observer.observe(element);

    });

}


/* ============================================================
   03. MOUSE LIGHT TRACKING
   ============================================================ */

function initMouseGlow() {

    const cards =
        document.querySelectorAll(
            ".interactive-card"
        );


    if (!cards.length) {
        return;
    }


    cards.forEach((card) => {

        card.addEventListener(
            "pointermove",
            (event) => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    ((event.clientX - rect.left) /
                        rect.width) *
                    100;


                const y =
                    ((event.clientY - rect.top) /
                        rect.height) *
                    100;


                card.style.setProperty(
                    "--mouse-x",
                    `${x}%`
                );


                card.style.setProperty(
                    "--mouse-y",
                    `${y}%`
                );

            },
            {
                passive: true
            }
        );


        card.addEventListener(
            "pointerleave",
            () => {

                card.style.setProperty(
                    "--mouse-x",
                    "50%"
                );


                card.style.setProperty(
                    "--mouse-y",
                    "50%"
                );

            }
        );

    });

}


/* ============================================================
   04. 3D TILT
   ============================================================ */

function init3DTilt() {

    const cards =
        document.querySelectorAll(
            "[data-tilt]"
        );


    if (!cards.length) {
        return;
    }


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    const touchDevice =
        window.matchMedia(
            "(hover: none)"
        ).matches;


    if (reducedMotion || touchDevice) {
        return;
    }


    cards.forEach((card) => {

        let frame = null;


        card.addEventListener(
            "pointermove",
            (event) => {

                if (frame) {
                    cancelAnimationFrame(frame);
                }


                frame =
                    requestAnimationFrame(() => {

                        const rect =
                            card.getBoundingClientRect();


                        const x =
                            event.clientX -
                            rect.left;


                        const y =
                            event.clientY -
                            rect.top;


                        const centerX =
                            rect.width / 2;


                        const centerY =
                            rect.height / 2;


                        const rotateY =
                            ((x - centerX) /
                                centerX) *
                            5;


                        const rotateX =
                            ((centerY - y) /
                                centerY) *
                            5;


                        card.style.transform =
                            `perspective(900px)
                             rotateX(${rotateX}deg)
                             rotateY(${rotateY}deg)
                             translateZ(4px)`;

                    });

            },
            {
                passive: true
            }
        );


        card.addEventListener(
            "pointerleave",
            () => {

                if (frame) {
                    cancelAnimationFrame(frame);
                }


                card.style.transform =
                    "";

            }
        );

    });

}


/* ============================================================
   05. MATURITY MODEL
   ============================================================ */

function initMaturityModel() {

    const rows =
        document.querySelectorAll(
            ".maturity-row"
        );


    const progress =
        document.querySelector(
            ".progress-fill"
        );


    if (!rows.length || !progress) {
        return;
    }


    rows.forEach((row) => {

        row.addEventListener(
            "click",
            () => {

                const stage =
                    Number(
                        row.dataset.stage
                    );


                rows.forEach((item) => {

                    item.classList.remove(
                        "active"
                    );

                });


                row.classList.add("active");


                const percentage =
                    stage * 20;


                progress.style.width =
                    `${percentage}%`;


                rows.forEach((item) => {

                    const state =
                        item.querySelector(
                            ".stage-state"
                        );


                    if (state) {
                        state.remove();
                    }

                });


                const state =
                    document.createElement(
                        "span"
                    );


                state.className =
                    "stage-state";


                state.textContent =
                    "SELECTED";


                row.appendChild(state);

            }
        );

    });

}


/* ============================================================
   06. MAGNETIC BUTTONS
   ============================================================ */

function initMagneticButtons() {

    const buttons =
        document.querySelectorAll(
            ".magnetic"
        );


    const touchDevice =
        window.matchMedia(
            "(hover: none)"
        ).matches;


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        touchDevice ||
        reducedMotion
    ) {
        return;
    }


    buttons.forEach((button) => {

        button.addEventListener(
            "pointermove",
            (event) => {

                const rect =
                    button.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;


                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;


                const moveX =
                    x * 0.10;


                const moveY =
                    y * 0.18;


                button.style.transform =
                    `translate(${moveX}px,${moveY}px)`;

            },
            {
                passive: true
            }
        );


        button.addEventListener(
            "pointerleave",
            () => {

                button.style.transform =
                    "";

            }
        );

    });

}


/* ============================================================
   07. BACK TO TOP
   ============================================================ */

function initBackToTop() {

    const button =
        document.querySelector(
            "#backToTop"
        );


    if (!button) {
        return;
    }


    const updateButton =
        () => {

            if (window.scrollY > 650) {

                button.classList.add(
                    "visible"
                );

            } else {

                button.classList.remove(
                    "visible"
                );

            }

        };


    window.addEventListener(
        "scroll",
        updateButton,
        {
            passive: true
        }
    );


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    updateButton();

}


/* ============================================================
   08. MOBILE STICKY CTA
   ============================================================ */

function initMobileStickyCTA() {

    if (
        window.matchMedia(
            "(min-width: 769px)"
        ).matches
    ) {
        return;
    }


    const hero =
        document.querySelector(
            ".ig-hero"
        );


    const checklist =
        document.querySelector(
            "#checklist"
        );


    if (!hero || !checklist) {
        return;
    }


    const sticky =
        document.createElement(
            "div"
        );


    sticky.className =
        "mobile-sticky-cta";


    sticky.innerHTML = `

        <div class="mobile-sticky-cta-label">

            <strong>
                Find Your Digital Stage
            </strong>

            <small>
                FREE 5-STAGE CHECKLIST
            </small>

        </div>

        <a
            href="#checklist"
            class="mobile-sticky-cta-button"
        >
            GET IT FREE
        </a>

    `;


    document.body.appendChild(
        sticky
    );


    const observer =
        new IntersectionObserver(
            ([entry]) => {

                if (
                    entry.isIntersecting
                ) {

                    sticky.classList.remove(
                        "visible"
                    );

                } else {

                    const checklistRect =
                        checklist.getBoundingClientRect();


                    const checklistVisible =
                        checklistRect.top <
                        window.innerHeight &&
                        checklistRect.bottom >
                        0;


                    if (!checklistVisible) {

                        sticky.classList.add(
                            "visible"
                        );

                    } else {

                        sticky.classList.remove(
                            "visible"
                        );

                    }

                }

            },
            {
                threshold: 0.15
            }
        );


    observer.observe(hero);


    window.addEventListener(
        "scroll",
        () => {

            const rect =
                checklist.getBoundingClientRect();


            const checklistVisible =
                rect.top <
                window.innerHeight &&
                rect.bottom >
                0;


            if (checklistVisible) {

                sticky.classList.remove(
                    "visible"
                );

            }

        },
        {
            passive: true
        }
    );

}


/* ============================================================
   09. FORM VALIDATION
   ============================================================ */

function initForm() {

    const form =
        document.querySelector(
            "#leadForm"
        );


    const message =
        document.querySelector(
            "#formMessage"
        );


    if (!form || !message) {
        return;
    }


    const nameInput =
        document.querySelector(
            "#name"
        );


    const contactInput =
        document.querySelector(
            "#contact"
        );


    const nameGroup =
        nameInput?.closest(
            ".input-group"
        );


    const contactGroup =
        contactInput?.closest(
            ".input-group"
        );


    function setError(
        group,
        text
    ) {

        if (!group) {
            return;
        }


        group.classList.add(
            "invalid"
        );


        group.classList.remove(
            "valid"
        );


        const error =
            group.querySelector(
                ".field-error"
            );


        if (error) {
            error.textContent =
                text;
        }

    }


    function setValid(
        group
    ) {

        if (!group) {
            return;
        }


        group.classList.remove(
            "invalid"
        );


        group.classList.add(
            "valid"
        );


        const error =
            group.querySelector(
                ".field-error"
            );


        if (error) {
            error.textContent =
                "";
        }

    }


    function validateName() {

        const value =
            nameInput.value.trim();


        if (!value) {

            setError(
                nameGroup,
                "Please enter your first name."
            );

            return false;

        }


        if (value.length < 2) {

            setError(
                nameGroup,
                "Please enter at least 2 characters."
            );

            return false;

        }


        setValid(nameGroup);

        return true;

    }


    function validateContact() {

        const value =
            contactInput.value.trim();


        if (!value) {

            setError(
                contactGroup,
                "Please enter your email or WhatsApp number."
            );

            return false;

        }


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        const phonePattern =
            /^[+]?[0-9\s()-]{7,20}$/;


        const validEmail =
            emailPattern.test(
                value
            );


        const validPhone =
            phonePattern.test(
                value
            );


        if (
            !validEmail &&
            !validPhone
        ) {

            setError(
                contactGroup,
                "Please enter a valid email or WhatsApp number."
            );

            return false;

        }


        setValid(contactGroup);

        return true;

    }


    nameInput.addEventListener(
        "blur",
        validateName
    );


    contactInput.addEventListener(
        "blur",
        validateContact
    );


    nameInput.addEventListener(
        "input",
        () => {

            if (
                nameGroup.classList.contains(
                    "invalid"
                )
            ) {
                validateName();
            }

        }
    );


    contactInput.addEventListener(
        "input",
        () => {

            if (
                contactGroup.classList.contains(
                    "invalid"
                )
            ) {
                validateContact();
            }

        }
    );


    form.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            message.textContent =
                "";


            message.className =
                "form-message";


            const validName =
                validateName();


            const validContact =
                validateContact();


            if (
                !validName ||
                !validContact
            ) {

                message.textContent =
                    "Please check the highlighted fields.";


                message.classList.add(
                    "error"
                );


                const firstInvalid =
                    form.querySelector(
                        ".invalid input"
                    );


                firstInvalid?.focus();


                return;

            }


            const button =
                form.querySelector(
                    ".form-button"
                );


            const originalText =
                button.querySelector(
                    "span"
                )?.textContent;


            button.disabled = true;


            if (
                button.querySelector(
                    "span"
                )
            ) {

                button.querySelector(
                    "span"
                ).textContent =
                    "PREPARING YOUR CHECKLIST...";

            }


            /*
             * This is intentionally a front-end success state.
             *
             * Connect your real lead-capture endpoint,
             * CRM, Formspree, webhook, API, or backend here.
             */


            await new Promise(
                (resolve) =>
                    setTimeout(
                        resolve,
                        900
                    )
            );


            message.textContent =
                `Thanks, ${nameInput.value.trim()}! Your checklist request has been received.`;


            message.classList.add(
                "success"
            );


            form.reset();


            nameGroup.classList.remove(
                "valid"
            );


            contactGroup.classList.remove(
                "valid"
            );


            if (
                button.querySelector(
                    "span"
                )
            ) {

                button.querySelector(
                    "span"
                ).textContent =
                    "CHECKLIST REQUESTED";

            }


            setTimeout(
                () => {

                    button.disabled =
                        false;


                    if (
                        button.querySelector(
                            "span"
                        )
                    ) {

                        button.querySelector(
                            "span"
                        ).textContent =
                            originalText ||
                            "GET MY FREE CHECKLIST";

                    }

                },
                2500
            );

        }
    );

}


/* ============================================================
   10. SMOOTH ANCHORS
   ============================================================ */

function initSmoothAnchors() {

    const anchors =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    anchors.forEach((anchor) => {

        anchor.addEventListener(
            "click",
            (event) => {

                const id =
                    anchor.getAttribute(
                        "href"
                    );


                if (
                    !id ||
                    id === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        id
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });

}


/* ============================================================
   11. SUBTLE HERO POINTER ATMOSPHERE
   ============================================================ */

(() => {

    const hero =
        document.querySelector(
            ".ig-hero"
        );


    if (!hero) {
        return;
    }


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    const touchDevice =
        window.matchMedia(
            "(hover: none)"
        ).matches;


    if (
        reducedMotion ||
        touchDevice
    ) {
        return;
    }


    let animationFrame;


    hero.addEventListener(
        "pointermove",
        (event) => {

            if (animationFrame) {
                cancelAnimationFrame(
                    animationFrame
                );
            }


            animationFrame =
                requestAnimationFrame(
                    () => {

                        const rect =
                            hero.getBoundingClientRect();


                        const x =
                            (event.clientX -
                                rect.left) /
                            rect.width;


                        const y =
                            (event.clientY -
                                rect.top) /
                            rect.height;


                        const moveX =
                            (x - .5) * 30;


                        const moveY =
                            (y - .5) * 20;


                        hero.style.setProperty(
                            "--hero-mouse-x",
                            `${moveX}px`
                        );


                        hero.style.setProperty(
                            "--hero-mouse-y",
                            `${moveY}px`
                        );


                        const glowOne =
                            hero.querySelector(
                                ".hero-glow-one"
                            );


                        const glowTwo =
                            hero.querySelector(
                                ".hero-glow-two"
                            );


                        if (glowOne) {

                            glowOne.style.marginLeft =
                                `${moveX * .35}px`;

                            glowOne.style.marginTop =
                                `${moveY * .35}px`;

                        }


                        if (glowTwo) {

                            glowTwo.style.marginLeft =
                                `${moveX * -.25}px`;

                            glowTwo.style.marginTop =
                                `${moveY * -.25}px`;

                        }

                    }
                );

        },
        {
            passive: true
        }
    );


})();