document.addEventListener("DOMContentLoaded", () => {
    // 1. Manejo del Header Transparente a Opaco en Scroll
    const header = document.getElementById("header");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // 2. Menú Móvil
    const mobileMenuBtn = document.querySelector(".mobile-menu");
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll("#navbar ul li a");

    mobileMenuBtn.addEventListener("click", () => {
        navbar.classList.toggle("active");
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
                navbar.classList.remove("active");
            }
        });
    });

    // 3. Scroll Reveal (Animaciones al hacer scroll)
    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Si el elemento revelado contiene contadores, iniciar la animación
                if (entry.target.classList.contains('stats-grid')) {
                    startCounters();
                }
                observer.unobserve(entry.target); // Dejar de observar una vez animado
            }
        });
    }, {
        threshold: 0.15, // Se activa cuando el 15% del elemento es visible
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 4. Animación de Contadores de Estadísticas
    let countersStarted = false;
    const counters = document.querySelectorAll('.counter');

    function startCounters() {
        if (countersStarted) return;
        countersStarted = true;

        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // 2 segundos
            const increment = target / (duration / 16); // asumiendo 60fps

            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current) + "+";
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target + "+";
                }
            };
            updateCounter();
        });
    }

    // 5. Manejo del Formulario
    const quoteForm = document.getElementById("quote-form");
    quoteForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const submitBtn = quoteForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

        // Simulación de carga
        setTimeout(() => {
            alert("¡Mensaje enviado con éxito! El equipo de Iron Nova se pondrá en contacto pronto.");
            submitBtn.innerHTML = originalText;
            quoteForm.reset();
        }, 1500);
    });
});