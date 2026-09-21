/**
 * VINTAGE & LUXURY WEDDING CAR RENTAL — MASTER JAVASCRIPT
 * Phase 02: Global Functionality & Controls
 */

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initTheme();
  initRtl();
  initNavigation();
  initMobileMenu();
  initScrollTop();
  initReveal();
  initAccordion();
  initFleetFilter();
  initPhilosophyTabs();
  initDashboard();
});

/**
 * 1. BRANDED PAGE LOADER
 */
function initLoader() {
  const loader = document.getElementById('pageLoader');
  if (!loader) return;

  const hideLoader = () => {
    loader.classList.add('loader-hidden');
    setTimeout(() => {
      loader.remove();
    }, 550);
  };

  if (document.readyState === 'complete') {
    setTimeout(hideLoader, 400);
  } else {
    window.addEventListener('load', () => {
      setTimeout(hideLoader, 400);
    });
  }
}

/**
 * 2. DARK / LIGHT THEME TOGGLE (Strict #000000 Base Dark Mode)
 */
function initTheme() {
  const themeToggles = document.querySelectorAll('.theme-toggle-btn');
  const savedTheme = localStorage.getItem('luxury_theme') || 'dark';

  const applyTheme = (theme) => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('luxury_theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('luxury_theme', 'dark');
    }
    updateThemeButtons(theme);
  };

  const updateThemeButtons = (theme) => {
    themeToggles.forEach(btn => {
      const textSpan = btn.querySelector('.theme-text');
      const iconWrap = btn.querySelector('.theme-icon-wrap');
      if (theme === 'light') {
        if (textSpan) textSpan.textContent = 'Dark';
        btn.setAttribute('aria-label', 'Switch to Dark Mode');
        if (iconWrap) {
          iconWrap.innerHTML = `
            <svg class="control-icon" viewBox="0 0 24 24">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          `;
        }
      } else {
        if (textSpan) textSpan.textContent = 'Light';
        btn.setAttribute('aria-label', 'Switch to Light Mode');
        if (iconWrap) {
          iconWrap.innerHTML = `
            <svg class="control-icon" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          `;
        }
      }
    });
  };

  // Initial application
  applyTheme(savedTheme);

  // Bind click handlers
  themeToggles.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentTheme = localStorage.getItem('luxury_theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  });
}

/**
 * 3. RTL / LTR DIRECTION TOGGLE
 */
function initRtl() {
  const rtlToggles = document.querySelectorAll('.rtl-toggle-btn');
  const savedDir = localStorage.getItem('luxury_dir') || 'ltr';

  const applyDir = (dir) => {
    document.documentElement.dir = dir;
    localStorage.setItem('luxury_dir', dir);
    updateRtlButtons(dir);
  };

  const updateRtlButtons = (dir) => {
    rtlToggles.forEach(btn => {
      const textSpan = btn.querySelector('.rtl-text');
      if (dir === 'rtl') {
        if (textSpan) textSpan.textContent = 'LTR';
        btn.setAttribute('aria-label', 'Switch to Left to Right direction');
      } else {
        if (textSpan) textSpan.textContent = 'RTL';
        btn.setAttribute('aria-label', 'Switch to Right to Left direction');
      }
    });
  };

  // Initial application
  applyDir(savedDir);

  // Bind click handlers
  rtlToggles.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentDir = document.documentElement.dir || 'ltr';
      const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
      applyDir(newDir);
    });
  });
}

/**
 * 4. CLICK-ONLY DESKTOP DROPDOWN & ACTIVE NAVIGATION
 */
function initNavigation() {
  const dropdownToggle = document.getElementById('homeDropdownBtn');
  const navDropdown = document.getElementById('navDropdownHome');

  if (dropdownToggle && navDropdown) {
    dropdownToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = navDropdown.classList.contains('is-open');
      if (isOpen) {
        navDropdown.classList.remove('is-open');
        dropdownToggle.setAttribute('aria-expanded', 'false');
      } else {
        navDropdown.classList.add('is-open');
        dropdownToggle.setAttribute('aria-expanded', 'true');
      }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navDropdown.contains(e.target)) {
        navDropdown.classList.remove('is-open');
        dropdownToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navDropdown.classList.contains('is-open')) {
        navDropdown.classList.remove('is-open');
        dropdownToggle.setAttribute('aria-expanded', 'false');
        dropdownToggle.focus();
      }
    });
  }

  // Active Link Detection
  const rawPath = window.location.pathname.split('/').pop() || 'index.html';
  const currentPath = (rawPath === '' || rawPath === 'index.html') ? 'index.html' : rawPath;
  const navLinks = document.querySelectorAll('.nav-link, .dropdown-item, .mobile-nav-link, .mobile-sub-link');
  const homeAccordionBtn = document.getElementById('mobileHomeAccordionBtn');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPath || (currentPath === 'index.html' && (href === '' || href === 'index.html')))) {
      link.classList.add('active');
      if (link.classList.contains('dropdown-item')) {
        dropdownToggle?.classList.add('active');
      }
      if (link.classList.contains('mobile-sub-link')) {
        homeAccordionBtn?.classList.add('active');
      }
    }
  });

  // Explicitly activate Home indicators on Home 1 and Home 2
  if (currentPath === 'index.html' || currentPath === 'home-2.html') {
    dropdownToggle?.classList.add('active');
    homeAccordionBtn?.classList.add('active');
  }
}

/**
 * 5. MOBILE MENU & ACCORDION
 */
function initMobileMenu() {
  const openBtn = document.getElementById('mobileMenuBtn');
  const closeBtn = document.getElementById('mobileCloseBtn');
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('mobileDrawerOverlay');
  const homeAccordionBtn = document.getElementById('mobileHomeAccordionBtn');
  const homeAccordionItem = document.getElementById('mobileHomeAccordion');

  const openDrawer = () => {
    // Always reset Home accordion to collapsed before showing drawer
    if (homeAccordionItem) {
      homeAccordionItem.classList.remove('is-expanded');
    }
    if (homeAccordionBtn) {
      homeAccordionBtn.setAttribute('aria-expanded', 'false');
    }
    drawer?.classList.add('is-active');
    overlay?.classList.add('is-active');
    document.body.classList.add('drawer-is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer?.classList.remove('is-active');
    overlay?.classList.remove('is-active');
    document.body.classList.remove('drawer-is-open');
    document.body.style.overflow = '';
  };

  if (openBtn) openBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  // Auto-close mobile drawer whenever screen is resized to desktop (> 1150px)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1150 && drawer?.classList.contains('is-active')) {
      closeDrawer();
    }
  });

  // Ensure drawer is closed on desktop upon load
  if (window.innerWidth > 1150) {
    closeDrawer();
  }

  // Close drawer when any navigation link is clicked
  const mobileLinks = document.querySelectorAll('.mobile-drawer a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Mobile Click-Only Accordion for Home
  if (homeAccordionBtn && homeAccordionItem) {
    homeAccordionBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isExpanded = homeAccordionItem.classList.contains('is-expanded');
      if (isExpanded) {
        homeAccordionItem.classList.remove('is-expanded');
        homeAccordionBtn.setAttribute('aria-expanded', 'false');
      } else {
        homeAccordionItem.classList.add('is-expanded');
        homeAccordionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  }
}

/**
 * 6. SCROLL TO TOP
 */
function initScrollTop() {
  const scrollBtn = document.getElementById('scrollTopBtn');
  if (!scrollBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 280) {
      scrollBtn.classList.add('is-visible');
    } else {
      scrollBtn.classList.remove('is-visible');
    }
  }, { passive: true });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * 7. SCROLL REVEAL — Intersection Observer for reveal animations
 */
function initReveal() {
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -48px 0px'
  });

  revealEls.forEach(el => observer.observe(el));
}

/**
 * 8. ACCORDION (Services & FAQ)
 */
function initAccordion() {
  const triggers = document.querySelectorAll('.svc-accordion-trigger, .faq-accordion-trigger');
  if (!triggers.length) return;

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const parent = trigger.closest('.svc-accordion-item, .faq-accordion-item');
      const body = parent ? parent.querySelector('.svc-accordion-body, .faq-accordion-body') : null;

      // Close other open accordions in the same list
      const list = trigger.closest('.svc-accordion-list, .faq-accordion-list');
      if (list) {
        list.querySelectorAll('.svc-accordion-trigger, .faq-accordion-trigger').forEach(otherTrigger => {
          if (otherTrigger !== trigger) {
            otherTrigger.setAttribute('aria-expanded', 'false');
            const otherParent = otherTrigger.closest('.svc-accordion-item, .faq-accordion-item');
            const otherBody = otherParent ? otherParent.querySelector('.svc-accordion-body, .faq-accordion-body') : null;
            if (otherBody) otherBody.classList.remove('is-open');
          }
        });
      }

      // Toggle current accordion
      trigger.setAttribute('aria-expanded', !isExpanded);
      if (body) {
        if (isExpanded) {
          body.classList.remove('is-open');
        } else {
          body.classList.add('is-open');
        }
      }
    });
  });
}

/**
 * 9. FLEET CATEGORY FILTER
 */
function initFleetFilter() {
  const filterBtns = document.querySelectorAll('.fleet-filter-btn');
  const vehicleCards = document.querySelectorAll('.fleet-vehicle-card');
  if (!filterBtns.length || !vehicleCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter') || 'all';

      vehicleCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/**
 * 10. PHILOSOPHY INTERACTIVE PILLARS / TABS
 */
function initPhilosophyTabs() {
  const tabBtns = document.querySelectorAll('.philosophy-tab-btn');
  const tabPanes = document.querySelectorAll('.philosophy-tab-pane');
  if (!tabBtns.length || !tabPanes.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabPanes.forEach(p => {
        p.classList.remove('active');
        p.hidden = true;
      });

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const targetId = btn.getAttribute('data-target');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.hidden = false;
        setTimeout(() => {
          targetPane.classList.add('active');
        }, 10);
      }
    });
  });

  // Interactive Stat Cards hover/click highlight
  const statCards = document.querySelectorAll('.brand-stat-card');
  statCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      statCards.forEach(c => c.classList.remove('is-focused'));
      card.classList.add('is-focused');
    });
  });
}

/**
 * 11. VIP CLIENT DASHBOARD CONTROLS (Profile Dropdown & Logout)
 */
function initDashboard() {
  const profileTrigger = document.getElementById('dbProfileTriggerBtn');
  const profileMenu = document.getElementById('dbProfileMenu');
  const profileWrap = document.getElementById('dbProfileDropdownWrap');

  if (profileTrigger && profileMenu) {
    profileTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = profileMenu.classList.contains('show');
      if (isOpen) {
        profileMenu.classList.remove('show');
        profileTrigger.classList.remove('active');
        profileTrigger.setAttribute('aria-expanded', 'false');
      } else {
        profileMenu.classList.add('show');
        profileTrigger.classList.add('active');
        profileTrigger.setAttribute('aria-expanded', 'true');
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (profileWrap && !profileWrap.contains(e.target)) {
        profileMenu.classList.remove('show');
        profileTrigger.classList.remove('active');
        profileTrigger.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && profileMenu.classList.contains('show')) {
        profileMenu.classList.remove('show');
        profileTrigger.classList.remove('active');
        profileTrigger.setAttribute('aria-expanded', 'false');
        profileTrigger.focus();
      }
    });
  }

  // Working Logout functionality for both sidebar and profile menu
  const logoutButtons = document.querySelectorAll('#sidebarLogoutBtn, #headerLogoutLink');
  logoutButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      // Close profile menu if open
      if (profileMenu) {
        profileMenu.classList.remove('show');
        if (profileTrigger) profileTrigger.classList.remove('active');
      }

      // Visual feedback on button
      btn.style.opacity = '0.6';
      btn.style.pointerEvents = 'none';

      // Create luxury logout toast
      let toast = document.getElementById('dbLogoutToast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'dbLogoutToast';
        toast.className = 'db-logout-toast';
        toast.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          <span>Signing out of VIP Portal... Redirecting</span>
        `;
        document.body.appendChild(toast);
      }
      setTimeout(() => toast.classList.add('show'), 40);

      // Redirect to index.html
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 700);
    });
  });

  // In-Dashboard navigation: keep user 100% inside dashboard
  const dbLinks = document.querySelectorAll('.db-sidebar-nav a[href^="#"], .db-profile-menu a[href^="#"], .db-action-card-btn[href^="#"]');
  const mainArea = document.querySelector('.db-main-area');

  dbLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);

      if (targetEl) {
        e.preventDefault();

        // Update active class on sidebar navigation items
        document.querySelectorAll('.db-sidebar-nav .db-nav-link').forEach(navLink => {
          if (navLink.getAttribute('href') === `#${targetId}`) {
            navLink.classList.add('active');
          } else {
            navLink.classList.remove('active');
          }
        });

        // Close profile dropdown menu if open
        if (profileMenu) {
          profileMenu.classList.remove('show');
          if (profileTrigger) profileTrigger.classList.remove('active');
        }

        // Scroll smoothly: handle desktop container vs mobile window with sticky headers
        if (mainArea && window.innerWidth > 992) {
          const topPos = targetEl.offsetTop - 20;
          mainArea.scrollTo({ top: topPos, behavior: 'smooth' });
        } else {
          const headerEl = document.querySelector('.db-header');
          const sidebarEl = document.querySelector('.db-sidebar');
          const totalHeaderH = (headerEl ? headerEl.offsetHeight : 60) + (sidebarEl ? sidebarEl.offsetHeight : 50) + 12;
          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - totalHeaderH;
          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Save Profile Preferences Button feedback
  const saveProfileBtn = document.getElementById('dbSaveProfileBtn');
  if (saveProfileBtn) {
    saveProfileBtn.addEventListener('click', (e) => {
      e.preventDefault();
      saveProfileBtn.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>Preferences Saved!</span>
      `;
      saveProfileBtn.style.background = '#22c55e';
      saveProfileBtn.style.color = '#ffffff';

      let toast = document.getElementById('dbLogoutToast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'dbLogoutToast';
        toast.className = 'db-logout-toast';
        document.body.appendChild(toast);
      }
      toast.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>VIP Ceremonial Profile Saved Successfully</span>
      `;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3000);

      setTimeout(() => {
        saveProfileBtn.innerHTML = `
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>Save Profile Preferences</span>
        `;
        saveProfileBtn.style.background = '';
        saveProfileBtn.style.color = '';
      }, 2500);
    });
  }
}

