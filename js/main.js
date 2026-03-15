/**
 * TINKUDEV - JavaScript Principal
 * Animaciones, interacciones y funcionalidades
 */

document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // LOADING SCREEN
    // ============================================
    const loading = document.querySelector('.loading');
    if (loading) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loading.classList.add('hidden');
            }, 500);
        });
    }

    // ============================================
    // CURSOR PERSONALIZADO
    // ============================================
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (cursor && cursorFollower) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Animación suave del cursor
        function animateCursor() {
            // El cursor principal sigue inmediatamente
            cursorX += (mouseX - cursorX) * 0.5;
            cursorY += (mouseY - cursorY) * 0.5;
            
            // El follower tiene un retraso
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Efecto hover en elementos interactivos
        const interactiveElements = document.querySelectorAll('a, button, .service-card, .platform-btn, input, textarea, select');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorFollower.classList.add('active');
                cursor.style.width = '12px';
                cursor.style.height = '12px';
            });
            
            el.addEventListener('mouseleave', () => {
                cursorFollower.classList.remove('active');
                cursor.style.width = '8px';
                cursor.style.height = '8px';
            });
        });
    }

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Efecto de navbar al hacer scroll
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // ============================================
    // MENU HAMBURGUESA (MÓVIL)
    // ============================================
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Cerrar menú al hacer click en un enlace
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ============================================
    // ACTIVE LINK EN NAVBAR
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNavLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // ============================================
    // ANIMACIÓN DE NÚMEROS (STATS)
    // ============================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;
        
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;
        
        const sectionTop = heroSection.offsetTop;
        const sectionHeight = heroSection.offsetHeight;
        const scrollY = window.pageYOffset;
        
        if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
            statsAnimated = true;
            
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        stat.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target;
                    }
                };
                
                updateCounter();
            });
        }
    }

    // ============================================
    // SCROLL REVEAL ANIMATION
    // ============================================
    const revealElements = document.querySelectorAll('.service-card, .benefit-card, .platform-item, .section-header, .contact-card');
    
    function revealOnScroll() {
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                el.classList.add('visible');
            }
        });
    }

    // Añadir clase fade-in a elementos
    revealElements.forEach(el => {
        el.classList.add('fade-in');
    });

    window.addEventListener('scroll', () => {
        highlightNavLink();
        animateStats();
        revealOnScroll();
    });

    // Llamar una vez al cargar
    revealOnScroll();

    // ============================================
    // PLATFORMS TABS
    // ============================================
    const platformBtns = document.querySelectorAll('.platform-btn');
    const platformItems = document.querySelectorAll('.platform-item');

    platformBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            
            // Remover clase active de todos
            platformBtns.forEach(b => b.classList.remove('active'));
            platformItems.forEach(item => item.classList.remove('active'));
            
            // Añadir clase active al seleccionado
            btn.classList.add('active');
            document.querySelector(`.platform-item[data-platform="${target}"]`).classList.add('active');
        });
    });

    // ============================================
    // CONTACT FORM
    // ============================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Obtener datos del formulario
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Validación básica
            if (!data.nombre || !data.email || !data.servicio || !data.mensaje) {
                showNotification('Por favor completa todos los campos requeridos', 'error');
                return;
            }
            
            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification('Por favor ingresa un email válido', 'error');
                return;
            }
            
            // Simular envío (aquí iría la lógica real de envío)
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span>Enviando...</span>';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.', 'success');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
            
            // Aquí podrías agregar la lógica para enviar a WhatsApp
            // enviarAWhatsApp(data);
        });
    }

    // ============================================
    // NOTIFICACIONES
    // ============================================
    function showNotification(message, type = 'info') {
        // Crear notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        // Estilos de la notificación
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            padding: '1rem 1.5rem',
            background: type === 'success' ? 'var(--color-green)' : type === 'error' ? '#ff4444' : 'var(--color-blue)',
            color: type === 'success' || type === 'error' ? '#000' : '#fff',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            zIndex: '10000',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
            animation: 'slideIn 0.3s ease',
            fontFamily: 'var(--font-body)',
            fontSize: '0.95rem'
        });
        
        // Estilo del botón de cerrar
        const closeBtn = notification.querySelector('.notification-close');
        Object.assign(closeBtn.style, {
            background: 'transparent',
            border: 'none',
            color: 'inherit',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '0',
            lineHeight: '1'
        });
        
        // Añadir estilos de animación
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Cerrar notificación
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto cerrar después de 5 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // ============================================
    // ENVIAR A WHATSAPP
    // ============================================
    function enviarAWhatsApp(data) {
        const telefono = '+59398805517';
        const mensaje = `
*🎯 Nuevo Mensaje desde TINKUDEV*

*Nombre:* ${data.nombre}
*Email:* ${data.email}
*Teléfono:* ${data.telefono || 'No especificado'}
*Servicio:* ${data.servicio}

*Mensaje:*
${data.mensaje}
        `.trim();
        
        const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank');
    }

    // ============================================
    // SMOOTH SCROLL PARA ENLACES INTERNOS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ============================================
    // EFECTO PARALLAX SUAVE
    // ============================================
    const parallaxElements = document.querySelectorAll('.hero-bg-animation, .floating-particles');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const speed = 0.5;
            el.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });

    // ============================================
    // EFECTO TILT EN CARDS
    // ============================================
    const tiltCards = document.querySelectorAll('.service-card, .benefit-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ============================================
    // TYPEWRITER EFFECT PARA HERO (OPCIONAL)
    // ============================================
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // ============================================
    // DETECTAR SI EL USUARIO PREFIERE MODO REDUCIDO
    // ============================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // Desactivar animaciones para usuarios que prefieren menos movimiento
        document.documentElement.style.setProperty('--transition-normal', '0s');
        document.documentElement.style.setProperty('--transition-slow', '0s');
    }

    // ============================================
    // CONSOLE BRANDING
    // ============================================
    console.log(`
%c
 ████████╗██╗  ██╗██╗███╗   ██╗ ██████╗██╗  ██╗███████╗██████╗ 
 ╚══██╔══╝██║  ██║██║████╗  ██║██╔════╝██║  ██║██╔════╝██╔══██╗
    ██║   ███████║██║██╔██╗ ██║██║     ███████║█████╗  ██████╔╝
    ██║   ██╔══██║██║██║╚██╗██║██║     ██╔══██║██╔══╝  ██╔══██╗
    ██║   ██║  ██║██║██║ ╚████║╚██████╗██║  ██║███████╗██║  ██║
    ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
                                                                
%c💻 Desarrollado por Isaac Esteban Haro Torres
🌐 https://ieharo1.github.io/portafolio-isaac.haro/
📧 zackharo1@gmail.com
    `, 
    'color: #00ff88; font-family: monospace; font-size: 12px;',
    'color: #ffffff; font-family: monospace; font-size: 10px;'
    );
});

// ============================================
// INTERSECTION OBSERVER PARA ANIMACIONES
// ============================================
if ('IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animar contadores si es un stat
                if (entry.target.classList.contains('stat-number')) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    animateCounter(entry.target, target);
                }
            }
        });
    }, observerOptions);
    
    // Observar elementos
    document.querySelectorAll('.fade-in, .stat-number').forEach(el => {
        observer.observe(el);
    });
}

function animateCounter(element, target) {
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}
