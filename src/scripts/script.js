/* ============================================================
   BIG BRAIN WAY
   DIGITAL MATURITY INSTAGRAM LANDING PAGE
   PRODUCTION JAVASCRIPT
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    initScrollReveal();

    initCardGlow();

    initMaturityExperience();

    initProblemExperience();

    initStageJourney();

    initMagneticButtons();

    initBackToTop();

    initForm();

    initSmoothAnchors();

});


/* ============================================================
   01. UTILITIES
   ============================================================ */

const prefersReducedMotion = () =>
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


const isTouchDevice = () =>
    window.matchMedia(
        "(hover: none)"
    ).matches;


/* ============================================================
   02. SCROLL REVEAL
   ============================================================ */

function initScrollReveal() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );


    if (!elements.length) {
        return;
    }


    if (
        prefersReducedMotion() ||
        !("IntersectionObserver" in window)
    ) {

        elements.forEach((element) => {
            element.classList.add("revealed");
        });

        return;
    }


    const observer =
        new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    entry.target.classList.add(
                        "revealed"
                    );


                    observerInstance.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.10,

                rootMargin:
                    "0px 0px -35px 0px"
            }
        );


    elements.forEach((element) => {
        observer.observe(element);
    });

}


/* ============================================================
   03. CARD LIGHT
   ============================================================ */

function initCardGlow() {

    if (
        prefersReducedMotion() ||
        isTouchDevice()
    ) {
        return;
    }


    const cards =
        document.querySelectorAll(
            ".interactive-card"
        );


    if (!cards.length) {
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


                        if (
                            !rect.width ||
                            !rect.height
                        ) {
                            return;
                        }


                        const x =
                            (
                                (event.clientX - rect.left) /
                                rect.width
                            ) * 100;


                        const y =
                            (
                                (event.clientY - rect.top) /
                                rect.height
                            ) * 100;


                        card.style.setProperty(
                            "--mouse-x",
                            `${x}%`
                        );


                        card.style.setProperty(
                            "--mouse-y",
                            `${y}%`
                        );

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


                card.style.setProperty(
                    "--mouse-x",
                    "50%"
                );


                card.style.setProperty(
                    "--mouse-y",
                    "15%"
                );

            }
        );

    });

}


/* ============================================================
   04. MATURITY EXPERIENCE
   ============================================================ */

function initMaturityExperience() {

    const experience =
        document.querySelector(
            "[data-maturity-experience]"
        );


    if (!experience) {
        return;
    }


    const rows =
        experience.querySelectorAll(
            ".maturity-row"
        );


    const progress =
        experience.querySelector(
            "[data-progress-fill]"
        );


    const status =
        experience.querySelector(
            "[data-stage-status]"
        );


    const detailNumber =
        experience.querySelector(
            "[data-detail-number]"
        );


    const detailLabel =
        experience.querySelector(
            "[data-detail-label]"
        );


    const detailTitle =
        experience.querySelector(
            "[data-detail-title]"
        );


    const detailDescription =
        experience.querySelector(
            "[data-detail-description]"
        );


    const detailSignal =
        experience.querySelector(
            "[data-detail-signal]"
        );


    const detailNext =
        experience.querySelector(
            "[data-detail-next]"
        );


    const selectedStageInput =
        document.querySelector(
            "#selectedStage"
        );


    if (
        !rows.length ||
        !progress
    ) {
        return;
    }


    const stages = {

        1: {

            label:
                "MANUAL",

            title:
                "People are the system.",

            description:
                "Repetitive work depends heavily on people, spreadsheets and manual handoffs.",

            signal:
                "\"Someone has to do this manually every time.\"",

            next:
                "Identify repetitive work worth digitizing."

        },


        2: {

            label:
                "DIGITIZED",

            title:
                "The tools exist — but they are isolated.",

            description:
                "Digital tools have replaced some manual work, but information still lives in separate systems.",

            signal:
                "\"We have software for everything, but nothing talks to each other.\"",

            next:
                "Find the systems and information that should connect."

        },


        3: {

            label:
                "CONNECTED",

            title:
                "Your systems start working together.",

            description:
                "Data can move between systems, reducing duplicate work and improving visibility.",

            signal:
                "\"Our systems finally share information.\"",

            next:
                "Identify workflows that can become automated."

        },


        4: {

            label:
                "AUTOMATED",

            title:
                "Workflows do more of the work.",

            description:
                "Automation removes repetitive human effort and makes important processes more consistent.",

            signal:
                "\"The process keeps moving without someone pushing it every time.\"",

            next:
                "Use reliable workflows as the foundation for intelligence."

        },


        5: {

            label:
                "AI-ENABLED",

            title:
                "Intelligence becomes part of the operation.",

            description:
                "AI can help your business predict, decide, personalize and scale what already works.",

            signal:
                "\"Our data and workflows help us make better decisions.\"",

            next:
                "Turn operational data into better decisions and measurable growth."

        }

    };


    function selectStage(stageNumber) {

        const stage =
            stages[stageNumber];


        if (!stage) {
            return;
        }


        rows.forEach((row) => {

            const active =
                Number(
                    row.dataset.stage
                ) === stageNumber;


            row.classList.toggle(
                "active",
                active
            );


            row.setAttribute(
                "aria-pressed",
                String(active)
            );


            const state =
                row.querySelector(
                    "[data-stage-state]"
                );


            if (state) {

                state.textContent =
                    active
                        ? "SELECTED"
                        : "";

            }

        });


        progress.style.width =
            `${stageNumber * 20}%`;


        if (status) {
            status.textContent =
                stage.label;
        }


        if (detailNumber) {
            detailNumber.textContent =
                String(stageNumber)
                    .padStart(2, "0");
        }


        if (detailLabel) {
            detailLabel.textContent =
                stage.label;
        }


        if (detailTitle) {
            detailTitle.textContent =
                stage.title;
        }


        if (detailDescription) {
            detailDescription.textContent =
                stage.description;
        }


        if (detailSignal) {
            detailSignal.textContent =
                stage.signal;
        }


        if (detailNext) {
            detailNext.textContent =
                stage.next;
        }


        if (selectedStageInput) {

            selectedStageInput.value =
                String(stageNumber);

        }


        /*
         * Keep the selection available if the visitor
         * refreshes the page during the experience.
         */

        try {

            sessionStorage.setItem(
                "bbw-selected-stage",
                String(stageNumber)
            );

        } catch {
            // Storage may be unavailable.
        }

    }


    rows.forEach((row) => {

        row.addEventListener(
            "click",
            () => {

                selectStage(
                    Number(
                        row.dataset.stage
                    )
                );

            }
        );

    });


    let initialStage = 1;


    try {

        const storedStage =
            Number(
                sessionStorage.getItem(
                    "bbw-selected-stage"
                )
            );


        if (
            storedStage >= 1 &&
            storedStage <= 5
        ) {

            initialStage =
                storedStage;

        }

    } catch {
        // Ignore unavailable storage.
    }


    selectStage(initialStage);

}


/* ============================================================
   05. PROBLEM EXPERIENCE
   ============================================================ */

function initProblemExperience() {

    const experience =
        document.querySelector(
            "[data-problem-experience]"
        );


    if (!experience) {
        return;
    }


    const tabs =
        experience.querySelectorAll(
            "[data-problem]"
        );


    const number =
        experience.querySelector(
            "[data-problem-number]"
        );


    const title =
        experience.querySelector(
            "[data-problem-title]"
        );


    const description =
        experience.querySelector(
            "[data-problem-description]"
        );


    const outcome =
        experience.querySelector(
            "[data-problem-outcome]"
        );


    const visual =
        experience.querySelector(
            "[data-problem-visual]"
        );


    if (!tabs.length) {
        return;
    }


    const problems = {

        manual: {

            number:
                "01",

            title:
                "Too Much Manual Work",

            description:
                "Repetitive tasks consume time your team should spend on customers, growth and higher-value work.",

            outcome:
                "Time gets trapped inside repetitive work.",

            nodes:
                [
                    "TASK",
                    "PERSON",
                    "REPEAT"
                ]

        },


        systems: {

            number:
                "02",

            title:
                "Disconnected Systems",

            description:
                "Your tools collect valuable data, but information stays trapped in separate systems.",

            outcome:
                "Important information cannot flow where it is needed.",

            nodes:
                [
                    "CRM",
                    "DATA",
                    "SILOS"
                ]

        },


        decisions: {

            number:
                "03",

            title:
                "Slow Decisions",

            description:
                "Important decisions depend on scattered information, delayed reports and too much guesswork.",

            outcome:
                "Delayed information creates slower decisions.",

            nodes:
                [
                    "DATA",
                    "REPORT",
                    "GUESS"
                ]

        }

    };


    function renderVisual(nodes) {

        if (!visual) {
            return;
        }


        visual.replaceChildren();


        nodes.forEach(
            (node, index) => {

                const nodeElement =
                    document.createElement(
                        "div"
                    );


                nodeElement.className =
                    "flow-node";


                if (
                    index ===
                    nodes.length - 1
                ) {

                    nodeElement.classList.add(
                        "warning-node"
                    );

                }


                nodeElement.textContent =
                    node;


                visual.appendChild(
                    nodeElement
                );


                if (
                    index <
                    nodes.length - 1
                ) {

                    const line =
                        document.createElement(
                            "div"
                        );


                    line.className =
                        "flow-line";


                    line.setAttribute(
                        "aria-hidden",
                        "true"
                    );


                    visual.appendChild(
                        line
                    );

                }

            }
        );

    }


    function selectProblem(key) {

        const problem =
            problems[key];


        if (!problem) {
            return;
        }


        tabs.forEach((tab) => {

            const active =
                tab.dataset.problem ===
                key;


            tab.classList.toggle(
                "active",
                active
            );


            tab.setAttribute(
                "aria-pressed",
                String(active)
            );

        });


        if (number) {
            number.textContent =
                problem.number;
        }


        if (title) {
            title.textContent =
                problem.title;
        }


        if (description) {
            description.textContent =
                problem.description;
        }


        if (outcome) {
            outcome.textContent =
                problem.outcome;
        }


        renderVisual(
            problem.nodes
        );

    }


    tabs.forEach((tab) => {

        tab.addEventListener(
            "click",
            () => {

                selectProblem(
                    tab.dataset.problem
                );

            }
        );

    });


    selectProblem("manual");

}


/* ============================================================
   06. FIVE-STAGE JOURNEY
   ============================================================ */

function initStageJourney() {

    const journey =
        document.querySelector(
            "[data-stage-journey]"
        );


    if (!journey) {
        return;
    }


    const cards =
        journey.querySelectorAll(
            "[data-journey-stage]"
        );


    const number =
        journey.querySelector(
            "[data-journey-number]"
        );


    const title =
        journey.querySelector(
            "[data-journey-title]"
        );


    const description =
        journey.querySelector(
            "[data-journey-description]"
        );


    if (!cards.length) {
        return;
    }


    const stages = {

        1: {

            title:
                "People are still holding the system together.",

            description:
                "Start by identifying repetitive work, manual handoffs and information trapped in spreadsheets."

        },


        2: {

            title:
                "Digital tools exist, but they operate in silos.",

            description:
                "The next opportunity is to understand where your systems overlap and where information gets stuck."

        },


        3: {

            title:
                "Your systems can finally share information.",

            description:
                "Once data flows between systems, you can reduce duplicate work and prepare workflows for automation."

        },


        4: {

            title:
                "Reliable workflows reduce repetitive effort.",

            description:
                "Automation creates consistency and gives your team more capacity for higher-value work."

        },


        5: {

            title:
                "Intelligence can help you predict, decide and scale.",

            description:
                "AI becomes most useful when it sits on top of reliable processes, connected systems and usable data."

        }

    };


    function selectStage(stageNumber) {

        const stage =
            stages[stageNumber];


        if (!stage) {
            return;
        }


        cards.forEach((card) => {

            const active =
                Number(
                    card.dataset.journeyStage
                ) === stageNumber;


            card.classList.toggle(
                "active",
                active
            );


            card.setAttribute(
                "aria-pressed",
                String(active)
            );

        });


        if (number) {

            number.textContent =
                String(stageNumber)
                    .padStart(2, "0");

        }


        if (title) {
            title.textContent =
                stage.title;
        }


        if (description) {
            description.textContent =
                stage.description;
        }

    }


    cards.forEach((card) => {

        card.addEventListener(
            "click",
            () => {

                selectStage(
                    Number(
                        card.dataset.journeyStage
                    )
                );

            }
        );

    });


    selectStage(1);

}


/* ============================================================
   07. MAGNETIC BUTTONS
   ============================================================ */

function initMagneticButtons() {

    const buttons =
        document.querySelectorAll(
            ".magnetic"
        );


    if (
        !buttons.length ||
        prefersReducedMotion() ||
        isTouchDevice()
    ) {
        return;
    }


    buttons.forEach((button) => {

        let frame = null;


        button.addEventListener(
            "pointermove",
            (event) => {

                if (frame) {
                    cancelAnimationFrame(frame);
                }


                frame =
                    requestAnimationFrame(() => {

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
                            x * .035;


                        const moveY =
                            y * .05;


                        button.style.transform =
                            `translate(${moveX}px, ${moveY}px)`;

                    });

            },
            {
                passive: true
            }
        );


        button.addEventListener(
            "pointerleave",
            () => {

                if (frame) {
                    cancelAnimationFrame(frame);
                }


                button.style.transform =
                    "";

            }
        );

    });

}


/* ============================================================
   08. BACK TO TOP
   ============================================================ */

function initBackToTop() {

    const button =
        document.querySelector(
            "#backToTop"
        );


    if (!button) {
        return;
    }


    let ticking = false;


    function updateButton() {

        button.classList.toggle(
            "visible",
            window.scrollY > 750
        );


        ticking = false;

    }


    window.addEventListener(
        "scroll",
        () => {

            if (ticking) {
                return;
            }


            ticking = true;


            requestAnimationFrame(
                updateButton
            );

        },
        {
            passive: true
        }
    );


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior:
                    prefersReducedMotion()
                        ? "auto"
                        : "smooth"

            });

        }
    );


    updateButton();

}


/* ============================================================
   09. FORM VALIDATION + NETLIFY
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


    if (
        !form ||
        !message
    ) {
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


    const button =
        form.querySelector(
            ".form-button"
        );


    const buttonText =
        button?.querySelector(
            "span"
        );


    const selectedStageInput =
        document.querySelector(
            "#selectedStage"
        );


    function setError(
        group,
        input,
        errorText
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


        input?.setAttribute(
            "aria-invalid",
            "true"
        );


        const error =
            group.querySelector(
                ".field-error"
            );


        if (error) {
            error.textContent =
                errorText;
        }

    }


    function setValid(
        group,
        input
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


        input?.setAttribute(
            "aria-invalid",
            "false"
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
            nameInput?.value.trim() ||
            "";


        if (!value) {

            setError(
                nameGroup,
                nameInput,
                "Please enter your first name."
            );

            return false;

        }


        if (value.length < 2) {

            setError(
                nameGroup,
                nameInput,
                "Please enter at least 2 characters."
            );

            return false;

        }


        if (value.length > 60) {

            setError(
                nameGroup,
                nameInput,
                "Please keep your name under 60 characters."
            );

            return false;

        }


        setValid(
            nameGroup,
            nameInput
        );


        return true;

    }


    function validateContact() {

        const value =
            contactInput?.value.trim() ||
            "";


        if (!value) {

            setError(
                contactGroup,
                contactInput,
                "Please enter your email or WhatsApp number."
            );

            return false;

        }


        /*
         * Email:
         * Standard practical browser-side check.
         */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


        /*
         * Phone:
         * Allows international formats such as:
         *
         * +92 300 1234567
         * +1 (555) 123-4567
         * 03001234567
         */

        const phonePattern =
            /^\+?[0-9\s().-]{7,20}$/;


        const validEmail =
            emailPattern.test(value);


        const validPhone =
            phonePattern.test(value);


        if (
            !validEmail &&
            !validPhone
        ) {

            setError(
                contactGroup,
                contactInput,
                "Please enter a valid email or WhatsApp number."
            );

            return false;

        }


        setValid(
            contactGroup,
            contactInput
        );


        return true;

    }


    nameInput?.addEventListener(
        "blur",
        validateName
    );


    contactInput?.addEventListener(
        "blur",
        validateContact
    );


    nameInput?.addEventListener(
        "input",
        () => {

            if (
                nameGroup?.classList.contains(
                    "invalid"
                )
            ) {

                validateName();

            }

        }
    );


    contactInput?.addEventListener(
        "input",
        () => {

            if (
                contactGroup?.classList.contains(
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


            /*
             * Make sure a stage is always sent.
             */

            if (
                selectedStageInput &&
                !selectedStageInput.value
            ) {

                selectedStageInput.value =
                    "1";

            }


            const originalButtonText =
                buttonText?.textContent ||
                "GET MY FREE CHECKLIST";


            if (button) {
                button.disabled = true;
            }


            if (buttonText) {

                buttonText.textContent =
                    "SENDING...";

            }


            message.textContent =
                "Sending your request...";


            try {

                const formData =
                    new FormData(form);


                /*
                 * Netlify expects URL-encoded form data
                 * for this submission approach.
                 */

                const encoded =
                    new URLSearchParams(
                        formData
                    ).toString();


                const response =
                    await fetch(
                        window.location.pathname,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/x-www-form-urlencoded"
                            },

                            body:
                                encoded
                        }
                    );


                if (!response.ok) {

                    throw new Error(
                        `Form submission failed: ${response.status}`
                    );

                }


                const firstName =
                    nameInput.value.trim();


                message.textContent =
                    `Thanks, ${firstName}. Your checklist request has been received.`;


                message.classList.add(
                    "success"
                );


                /*
                 * Clear visible fields after
                 * successful submission.
                 */

                form.reset();


                nameGroup?.classList.remove(
                    "valid",
                    "invalid"
                );


                contactGroup?.classList.remove(
                    "valid",
                    "invalid"
                );


                nameInput?.setAttribute(
                    "aria-invalid",
                    "false"
                );


                contactInput?.setAttribute(
                    "aria-invalid",
                    "false"
                );


                /*
                 * Keep the stage selected in the
                 * hidden field after reset.
                 */

                if (selectedStageInput) {

                    selectedStageInput.value =
                        selectedStageInput.value ||
                        "1";

                }


                if (buttonText) {

                    buttonText.textContent =
                        "CHECKLIST REQUESTED";

                }


                /*
                 * Analytics is optional.
                 * Nothing breaks if gtag isn't installed.
                 */

                if (
                    typeof window.gtag ===
                    "function"
                ) {

                    window.gtag(
                        "event",
                        "checklist_lead",
                        {
                            source:
                                "instagram",

                            selected_stage:
                                selectedStageInput?.value ||
                                "1"
                        }
                    );

                }

            } catch (error) {

                console.error(
                    "Checklist form error:",
                    error
                );


                message.textContent =
                    "We couldn't send your request right now. Please try again.";


                message.classList.add(
                    "error"
                );

            } finally {

                /*
                 * Do not permanently lock the form
                 * after an error.
                 */

                setTimeout(
                    () => {

                        if (button) {
                            button.disabled =
                                false;
                        }


                        if (
                            buttonText &&
                            !message.classList.contains(
                                "success"
                            )
                        ) {

                            buttonText.textContent =
                                originalButtonText;

                        }

                    },
                    2200
                );

            }

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

                    behavior:
                        prefersReducedMotion()
                            ? "auto"
                            : "smooth",

                    block:
                        "start"

                });

            }
        );

    });

}