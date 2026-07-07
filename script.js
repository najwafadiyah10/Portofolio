/* =========================================================
   NAJWA DZAKIRAH FADIYAH — PORTFOLIO
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinksContainer = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-link");
  const revealElements = document.querySelectorAll(".reveal");
  const copyEmailButton = document.querySelector(".copy-email");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* =======================================================
     MOBILE NAVIGATION
     ======================================================= */

  const closeMenu = () => {
    if (!menuToggle || !navLinksContainer) return;

    navLinksContainer.classList.remove("open");
    document.body.classList.remove("menu-open");

    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  };

  const openMenu = () => {
    if (!menuToggle || !navLinksContainer) return;

    navLinksContainer.classList.add("open");
    document.body.classList.add("menu-open");

    menuToggle.classList.add("active");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");
  };

  if (menuToggle && navLinksContainer) {
    menuToggle.addEventListener("click", () => {
      const isMenuOpen = navLinksContainer.classList.contains("open");

      if (isMenuOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }


  /* =======================================================
     NAVIGATION & SMOOTH SCROLL
     ======================================================= */

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetSelector = link.getAttribute("href");

      if (!targetSelector || !targetSelector.startsWith("#")) {
        return;
      }

      const targetSection = document.querySelector(targetSelector);

      if (!targetSection) {
        return;
      }

      event.preventDefault();

      const headerHeight = header?.offsetHeight || 0;
      const targetPosition =
        targetSection.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });

      closeMenu();
    });
  });


  /* =======================================================
     ACTIVE NAVIGATION STATE
     ======================================================= */

  const sections = Array.from(navLinks)
    .map((link) => {
      const targetSelector = link.getAttribute("href");

      if (!targetSelector?.startsWith("#")) {
        return null;
      }

      return document.querySelector(targetSelector);
    })
    .filter(Boolean);

  const updateActiveNavigation = () => {
    const headerHeight = header?.offsetHeight || 0;
    const scrollMarker = window.scrollY + headerHeight + 180;

    let currentSectionId = sections[0]?.id || "home";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;

      if (scrollMarker >= sectionTop) {
        currentSectionId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const linkTarget = link.getAttribute("href");

      link.classList.toggle(
        "active",
        linkTarget === `#${currentSectionId}`
      );
    });
  };

  let scrollTicking = false;

  window.addEventListener(
    "scroll",
    () => {
      if (scrollTicking) {
        return;
      }

      window.requestAnimationFrame(() => {
        updateActiveNavigation();
        scrollTicking = false;
      });

      scrollTicking = true;
    },
    { passive: true }
  );

  updateActiveNavigation();


  /* =======================================================
     SCROLL REVEAL
     ======================================================= */

  if (prefersReducedMotion) {
    revealElements.forEach((element) => {
      element.classList.add("show");
    });
  } else if ("IntersectionObserver" in window) {
    revealElements.forEach((element) => {
      element.classList.add("hidden");
    });

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -70px 0px",
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("show");
    });
  }


  /* =======================================================
     COPY EMAIL
     ======================================================= */

  const copyText = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const temporaryInput = document.createElement("textarea");

    temporaryInput.value = text;
    temporaryInput.setAttribute("readonly", "");
    temporaryInput.style.position = "fixed";
    temporaryInput.style.opacity = "0";

    document.body.appendChild(temporaryInput);

    temporaryInput.select();
    document.execCommand("copy");

    temporaryInput.remove();
  };

  if (copyEmailButton) {
    copyEmailButton.addEventListener("click", async () => {
      const email = copyEmailButton.dataset.email;

      if (!email) {
        return;
      }

      const originalText = copyEmailButton.textContent;

      try {
        await copyText(email);

        copyEmailButton.textContent = "Email Copied!";
        copyEmailButton.classList.add("copied");

        window.setTimeout(() => {
          copyEmailButton.textContent = originalText;
          copyEmailButton.classList.remove("copied");
        }, 1800);
      } catch (error) {
        console.error("Failed to copy email:", error);

        copyEmailButton.textContent = "Copy Failed";

        window.setTimeout(() => {
          copyEmailButton.textContent = originalText;
        }, 1800);
      }
    });
  }


  /* =======================================================
     CLOSE MOBILE MENU WITH ESCAPE
     ======================================================= */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });


  /* =======================================================
     RESET MOBILE MENU ON RESIZE
     ======================================================= */

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }

    updateActiveNavigation();
  });
});