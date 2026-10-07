/* =========================================================
   LUXENEST INTERIORS
   FRONTEND INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. SMOOTH SCROLL
    ===================================================== */

    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       2. HEADER SCROLL EFFECT
    ===================================================== */

    const header = document.querySelector(".site-header");

    if (header) {

        const handleHeader = () => {

            if (window.scrollY > 60) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }

        };

        window.addEventListener("scroll", handleHeader);

        handleHeader();

    }


    /* =====================================================
       3. ACTIVE NAVIGATION
    ===================================================== */

    const sections = document.querySelectorAll("main section[id]");

    const desktopNavLinks = document.querySelectorAll(
        ".desktop-nav a[href^='#']"
    );

    if (sections.length && desktopNavLinks.length) {

        const updateActiveNav = () => {

            let currentSection = "";

            sections.forEach(section => {

                const sectionTop = section.offsetTop - 180;
                const sectionHeight = section.offsetHeight;

                if (
                    window.scrollY >= sectionTop &&
                    window.scrollY < sectionTop + sectionHeight
                ) {

                    currentSection = section.id;

                }

            });

            desktopNavLinks.forEach(link => {

                link.classList.remove("active");

                const href = link.getAttribute("href");

                if (href === `#${currentSection}`) {
                    link.classList.add("active");
                }

            });

        };

        window.addEventListener("scroll", updateActiveNav);

        updateActiveNav();

    }


    /* =====================================================
       4. FAQ ACCORDION
    ===================================================== */

    const faqItems = document.querySelectorAll(".faq-list details");

    faqItems.forEach(item => {

        item.addEventListener("toggle", () => {

            if (item.open) {

                faqItems.forEach(otherItem => {

                    if (otherItem !== item) {
                        otherItem.removeAttribute("open");
                    }

                });

            }

        });

    });


    /* =====================================================
       5. GALLERY LIGHTBOX
    ===================================================== */

    const galleryImages = document.querySelectorAll(
        ".gallery-grid img"
    );

    if (galleryImages.length) {

        let currentImageIndex = 0;

        const lightbox = document.createElement("div");

        lightbox.className = "luxenest-lightbox";

        lightbox.innerHTML = `
            <button class="lightbox-close" aria-label="Close">
                ×
            </button>

            <button class="lightbox-prev" aria-label="Previous">
                ‹
            </button>

            <div class="lightbox-content">

                <img src="" alt="">

                <p class="lightbox-caption"></p>

            </div>

            <button class="lightbox-next" aria-label="Next">
                ›
            </button>
        `;

        document.body.appendChild(lightbox);


        const lightboxImage =
            lightbox.querySelector(".lightbox-content img");

        const lightboxCaption =
            lightbox.querySelector(".lightbox-caption");

        const closeButton =
            lightbox.querySelector(".lightbox-close");

        const prevButton =
            lightbox.querySelector(".lightbox-prev");

        const nextButton =
            lightbox.querySelector(".lightbox-next");


        function showGalleryImage(index) {

            currentImageIndex = index;

            const image =
                galleryImages[currentImageIndex];

            lightboxImage.src = image.src;

            lightboxImage.alt =
                image.alt || "LuxeNest interior design";

            lightboxCaption.textContent =
                image.alt || "LuxeNest Interiors";

            lightbox.classList.add("active");

            document.body.style.overflow = "hidden";

        }


        function closeLightbox() {

            lightbox.classList.remove("active");

            document.body.style.overflow = "";

        }


        function showNextImage() {

            currentImageIndex =
                (currentImageIndex + 1) %
                galleryImages.length;

            showGalleryImage(currentImageIndex);

        }


        function showPreviousImage() {

            currentImageIndex =
                (currentImageIndex - 1 +
                    galleryImages.length) %
                galleryImages.length;

            showGalleryImage(currentImageIndex);

        }


        galleryImages.forEach((image, index) => {

            image.style.cursor = "zoom-in";

            image.addEventListener("click", () => {

                showGalleryImage(index);

            });

        });


        closeButton.addEventListener(
            "click",
            closeLightbox
        );


        nextButton.addEventListener(
            "click",
            showNextImage
        );


        prevButton.addEventListener(
            "click",
            showPreviousImage
        );


        lightbox.addEventListener("click", event => {

            if (event.target === lightbox) {
                closeLightbox();
            }

        });


        document.addEventListener("keydown", event => {

            if (!lightbox.classList.contains("active")) {
                return;
            }

            if (event.key === "Escape") {
                closeLightbox();
            }

            if (event.key === "ArrowRight") {
                showNextImage();
            }

            if (event.key === "ArrowLeft") {
                showPreviousImage();
            }

        });

    }


    /* =====================================================
       6. PROJECT IMAGE INTERACTION
    ===================================================== */

    const projectImages = document.querySelectorAll(
        ".project-image img"
    );

    projectImages.forEach(image => {

        image.style.cursor = "zoom-in";

        image.addEventListener("click", () => {

            image.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        });

    });


    /* =====================================================
       7. CONTACT FORM VALIDATION + BACKEND
    ===================================================== */

    const contactForm =
        document.querySelector(".contact-form");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            async event => {

                event.preventDefault();


                const name =
                    document.querySelector("#name");

                const email =
                    document.querySelector("#email");

                const phone =
                    document.querySelector("#phone");

                const project =
                    document.querySelector("#project");

                const message =
                    document.querySelector("#message");

                const submitButton =
                    contactForm.querySelector(".submit-btn");


                let isValid = true;


                /* Remove previous errors */

                contactForm
                    .querySelectorAll(".form-error")
                    .forEach(error => error.remove());


                contactForm
                    .querySelectorAll(".input-error")
                    .forEach(input =>
                        input.classList.remove("input-error")
                    );


                /* Error function */

                function showError(input, text) {

                    if (!input) {
                        return;
                    }

                    input.classList.add("input-error");

                    const error =
                        document.createElement("small");

                    error.className = "form-error";

                    error.textContent = text;

                    input.parentElement.appendChild(error);

                    isValid = false;

                }


                /* =================================================
                   NAME VALIDATION
                ================================================= */

                if (
                    !name ||
                    name.value.trim().length < 2
                ) {

                    showError(
                        name,
                        "Please enter your name."
                    );

                }


                /* =================================================
                   EMAIL VALIDATION
                ================================================= */

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (
                    !email ||
                    !emailPattern.test(
                        email.value.trim()
                    )
                ) {

                    showError(
                        email,
                        "Please enter a valid email address."
                    );

                }


                /* =================================================
                   PHONE VALIDATION
                ================================================= */

                if (
                    phone &&
                    phone.value.trim() !== ""
                ) {

                    const phonePattern =
                        /^[0-9+\-\s()]{7,20}$/;


                    if (
                        !phonePattern.test(
                            phone.value.trim()
                        )
                    ) {

                        showError(
                            phone,
                            "Please enter a valid phone number."
                        );

                    }

                }


                /* =================================================
                   PROJECT VALIDATION
                ================================================= */

                if (
                    !project ||
                    project.value.trim() === ""
                ) {

                    showError(
                        project,
                        "Please select a project type."
                    );

                }


                /* =================================================
                   MESSAGE VALIDATION
                ================================================= */

                if (
                    !message ||
                    message.value.trim().length < 10
                ) {

                    showError(
                        message,
                        "Please tell us a little about your project."
                    );

                }


                /* =================================================
                   IF VALIDATION FAILS
                ================================================= */

                if (!isValid) {

                    const firstError =
                        contactForm.querySelector(
                            ".input-error"
                        );


                    if (firstError) {

                        firstError.focus();

                        firstError.scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        });

                    }

                    return;

                }


                /* =================================================
                   SAVE ORIGINAL BUTTON TEXT
                ================================================= */

                const originalButtonText =
                    submitButton
                        ? submitButton.innerHTML
                        : "";


                /* =================================================
                   DISABLE BUTTON
                ================================================= */

                if (submitButton) {

                    submitButton.disabled = true;

                    submitButton.innerHTML =
                        "Sending...";

                }


                /* =================================================
                   COLLECT FORM DATA
                ================================================= */

                const enquiryData = {

                    name:
                        name.value.trim(),

                    email:
                        email.value.trim(),

                    phone:
                        phone
                            ? phone.value.trim()
                            : "",

                    project:
                        project.value.trim(),

                    message:
                        message.value.trim()

                };


                /* =================================================
                   SEND DATA TO EXPRESS BACKEND
                ================================================= */

                try {

                    const response =
                        await fetch(
                            "http://localhost:5000/api/enquiries",
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify(
                                        enquiryData
                                    )
                            }
                        );


                    const data =
                        await response.json();


                    /* =================================================
                       BACKEND ERROR
                    ================================================= */

                    if (!response.ok) {

                        throw new Error(
                            data.message ||
                            "Failed to submit enquiry."
                        );

                    }


                    /* =================================================
                       SUCCESS MESSAGE
                    ================================================= */

                    const successMessage =
                        document.createElement("div");


                    successMessage.className =
                        "form-success";


                    successMessage.innerHTML = `
                        <strong>Thank you.</strong>

                        <span>
                            Your enquiry has been submitted successfully.
                        </span>
                    `;


                    contactForm.prepend(
                        successMessage
                    );


                    /* Reset form */

                    contactForm.reset();


                    /* Restore button */

                    if (submitButton) {

                        submitButton.disabled = false;

                        submitButton.innerHTML =
                            originalButtonText;

                    }


                    /* Remove success message */

                    setTimeout(() => {

                        successMessage.remove();

                    }, 5000);


                } catch (error) {

                    console.error(
                        "Enquiry submission error:",
                        error
                    );


                    /* =================================================
                       ERROR MESSAGE
                    ================================================= */

                    const errorMessage =
                        document.createElement("div");


                    errorMessage.className =
                        "form-submit-error";


                    errorMessage.textContent =
                        "Something went wrong. Please try again.";


                    contactForm.prepend(
                        errorMessage
                    );


                    /* Restore button */

                    if (submitButton) {

                        submitButton.disabled = false;

                        submitButton.innerHTML =
                            originalButtonText;

                    }


                    /* Remove error after 5 seconds */

                    setTimeout(() => {

                        errorMessage.remove();

                    }, 5000);

                }

            }
        );

    }


    /* =====================================================
       8. REMOVE FORM ERROR WHEN USER TYPES
    ===================================================== */

    const formInputs =
        document.querySelectorAll(
            ".contact-form input, .contact-form select, .contact-form textarea"
        );


    formInputs.forEach(input => {

        input.addEventListener("input", () => {

            input.classList.remove("input-error");


            const error =
                input.parentElement.querySelector(
                    ".form-error"
                );


            if (error) {
                error.remove();
            }

        });


        input.addEventListener("change", () => {

            input.classList.remove("input-error");


            const error =
                input.parentElement.querySelector(
                    ".form-error"
                );


            if (error) {
                error.remove();
            }

        });

    });


    /* =====================================================
       9. REVEAL ANIMATION ON SCROLL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".section-label, .about-content, .service-card, .project-card, .process-card, .review-card, .faq-list details"
        );


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(

                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "is-visible"
                            );


                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },

                {
                    threshold: 0.12
                }

            );


        revealElements.forEach(element => {

            element.classList.add(
                "reveal-element"
            );

            revealObserver.observe(
                element
            );

        });

    }


    /* =====================================================
       10. BACK TO TOP
    ===================================================== */

    const footerTopLink =
        document.querySelector(
            '.footer-column a[href="#home"]'
        );


    if (footerTopLink) {

        footerTopLink.addEventListener(
            "click",
            event => {

                event.preventDefault();


                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }


    /* =====================================================
       11. IMAGE ERROR HANDLING
    ===================================================== */

    const allImages =
        document.querySelectorAll("img");


    allImages.forEach(image => {

        image.addEventListener("error", () => {

            console.warn(
                "Image could not be loaded:",
                image.src
            );

        });

    });


    /* =====================================================
       12. CURRENT YEAR IN FOOTER
    ===================================================== */

    const footerYear =
        document.querySelector(
            ".footer-bottom span"
        );


    if (footerYear) {

        footerYear.textContent =
            `© ${new Date().getFullYear()} LuxeNest Interiors. All rights reserved.`;

    }


    /* =====================================================
       13. PAGE LOADED
    ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );

});