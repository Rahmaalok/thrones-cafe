// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const nav = document.getElementById('nav');

if (mobileMenuToggle && nav) {
    mobileMenuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        // Toggle menu icon
        if (nav.classList.contains('active')) {
            mobileMenuToggle.innerHTML = '✕';
        } else {
            mobileMenuToggle.innerHTML = '☰';
        }
    });
}

// Header Scroll Effect
const header = document.getElementById('header');

if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Menu Tabs Functionality
const menuTabs = document.querySelectorAll('.menu-tab');
const menuCategories = document.querySelectorAll('.menu-categories');

if (menuTabs.length > 0) {
    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and categories
            menuTabs.forEach(t => t.classList.remove('active'));
            menuCategories.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding category
            const categoryId = tab.getAttribute('data-category');
            if (categoryId) {
                const target = document.getElementById(categoryId);
                if (target) target.classList.add('active');
            }
        });
    });
}

// Active navigation highlighting
const navLinks = document.querySelectorAll('nav a[href^="#"]');

const updateActiveNavLink = () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100; // Offset for header

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#' || !document.querySelector(targetId)) return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = header ? header.offsetHeight : 80;
            const targetPosition = targetElement.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (nav) {
                nav.classList.remove('active');
                mobileMenuToggle.innerHTML = '☰';
            }

            // Update active link immediately after click
            setTimeout(updateActiveNavLink, 100);
        }
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollToTopBtn);

// Show/Hide Scroll to Top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

// Scroll to Top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Fade-in animation for sections
const sections = document.querySelectorAll('section');
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '-50px'
};

const initAnimations = () => {
    if (sections.length > 0 && 'IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Add fade-in class and observe all sections
        sections.forEach(section => {
            section.classList.add('fade-in');
            sectionObserver.observe(section);
        });

        // Initial check for sections in view
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                section.classList.add('visible');
            }
        });
    } else if (sections.length > 0) {
        // Fallback for browsers without IntersectionObserver
        sections.forEach(section => {
            section.classList.add('fade-in', 'visible');
        });
    }
};

// Scroll down functionality for hero section
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.querySelector('#about');
        const header = document.querySelector('header');

        if (aboutSection && header) {
            const headerHeight = header.offsetHeight;
            const targetPosition = aboutSection.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
}

// Menu item hover effects
const initMenuHoverEffects = () => {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-8px)';
            item.style.boxShadow = '0 12px 25px rgba(100, 255, 218, 0.15)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
            item.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
        });
    });
};

// Gallery item interactions
const initGalleryInteractions = () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateZ(20px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateZ(0) scale(1)';
        });
    });
};

// Contact form validation (if you add a form later)
const initContactForm = () => {
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add form validation logic here
            alert('Pesan Anda telah dikirim! Terima kasih.');
            contactForm.reset();
        });
    }
};

// Keyboard navigation for accessibility
const initKeyboardNavigation = () => {
    document.addEventListener('keydown', (e) => {
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
            mobileMenuToggle.innerHTML = '☰';
        }
        
        // Scroll to top with Home key
        if (e.key === 'Home') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
};

// ===============================
// SEARCH FUNCTIONALITY
// ===============================

// Search Functionality
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const searchResults = document.getElementById('search-results');
const menuItems = document.querySelectorAll('.menu-item-elegant');

// Search data
const searchData = Array.from(menuItems).map(item => ({
    element: item,
    name: item.querySelector('.menu-item-name-elegant').textContent,
    price: item.querySelector('.menu-item-price-elegant').textContent,
    description: item.querySelector('.menu-item-description-elegant').textContent,
    category: item.closest('.menu-categories').querySelector('.menu-category-title').textContent,
    searchTerms: item.getAttribute('data-search') || ''
}));

// Perform search
const performSearch = (query) => {
    if (!query.trim()) {
        searchResults.classList.remove('active');
        return;
    }

    const searchTerm = query.toLowerCase().trim();
    const results = searchData.filter(item => {
        const searchableText = (
            item.name.toLowerCase() +
            ' ' +
            item.description.toLowerCase() +
            ' ' +
            item.searchTerms.toLowerCase()
        );
        return searchableText.includes(searchTerm);
    });

    displayResults(results, searchTerm);
};

// Display search results
const displayResults = (results, searchTerm) => {
    searchResults.innerHTML = '';

    if (results.length === 0) {
        searchResults.innerHTML = '<div class="no-results">Tidak ada hasil ditemukan untuk "' + searchTerm + '"</div>';
    } else {
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            
            // Highlight matching text
            const highlightedName = highlightText(result.name, searchTerm);
            const highlightedDescription = highlightText(result.description, searchTerm);
            
            resultItem.innerHTML = `
                <div class="search-result-name">${highlightedName}</div>
                <div class="search-result-price">${result.price}</div>
                <div class="search-result-category">${result.category}</div>
            `;
            
            resultItem.addEventListener('click', () => {
                // Navigate to menu section and show the item
                navigateToMenuItem(result);
            });
            
            searchResults.appendChild(resultItem);
        });
    }
    
    searchResults.classList.add('active');
};

// Highlight matching text
const highlightText = (text, searchTerm) => {
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
};

// Navigate to menu item
const navigateToMenuItem = (result) => {
    // Find which tab the item belongs to
    const categoryId = result.element.closest('.menu-categories').id;
    const tab = document.querySelector(`.menu-tab[data-category="${categoryId}"]`);
    
    if (tab) {
        // Activate the correct tab
        document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.menu-categories').forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        result.element.closest('.menu-categories').classList.add('active');
        
        // Scroll to menu section
        const menuSection = document.getElementById('menu');
        const headerHeight = document.getElementById('header').offsetHeight;
        const targetPosition = menuSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Highlight the item with pulse animation
        result.element.style.animation = 'pulse 1s';
        setTimeout(() => {
            result.element.style.animation = '';
        }, 1000);
    }
    
    // Close search results
    searchResults.classList.remove('active');
    searchInput.value = '';
};

// Event listeners for search
if (searchInput && searchBtn && searchResults) {
    searchInput.addEventListener('input', (e) => {
        performSearch(e.target.value);
    });

    searchBtn.addEventListener('click', () => {
        performSearch(searchInput.value);
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });

    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            searchResults.classList.remove('active');
        }
    });
}

// Add pulse animation for highlighting
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(26, 135, 208, 0.4); }
        70% { box-shadow: 0 0 0 10px rgba(26, 135, 208, 0); }
        100% { box-shadow: 0 0 0 0 rgba(26, 135, 208, 0); }
    }
`;
document.head.appendChild(style);

// ===============================
// INITIALIZE ALL FUNCTIONALITY
// ===============================

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    initMenuHoverEffects();
    initGalleryInteractions();
    initContactForm();
    initKeyboardNavigation();
    
    // Add loading class to body and remove after load
    document.body.classList.add('loaded');
    
    // Initialize scroll events
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initial call
});

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize if window is larger than mobile breakpoint
    if (window.innerWidth > 768 && nav) {
        nav.classList.remove('active');
        mobileMenuToggle.innerHTML = '☰';
    }
});

// Preload images function (if you add images later)
const preloadImages = () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const src = img.getAttribute('src');
        if (src) {
            const image = new Image();
            image.src = src;
        }
    });
};

// Performance optimization: Debounce scroll events
let scrollTimer;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
        // Scroll-based calculations here
        updateActiveNavLink();
    }, 10);
});

// Console greeting (optional)
console.log('🦄 Thrones Cafe - Premium Coffee Experience ☕');
console.log('Website loaded successfully!');