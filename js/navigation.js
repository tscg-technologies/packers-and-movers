/**
 * PACKERS & MOVERS — NAVIGATION & HEADER INTERACTION
 * Handles responsive navigation, dropdown menus, scroll state, active links, and mobile drawer.
 */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const headerNav = document.querySelector('.header-nav');
  const dropdownContainers = document.querySelectorAll('.nav-item-dropdown');

  // 1. Header scroll background transition
  const handleScroll = () => {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // 2. Dropdown Menu Handling (Desktop & Mobile)
  dropdownContainers.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');

    if (toggle) {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = dropdown.classList.contains('open');

        // Close any other open dropdowns first
        dropdownContainers.forEach(other => {
          if (other !== dropdown) {
            other.classList.remove('open');
            const otherToggle = other.querySelector('.dropdown-toggle');
            if (otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current dropdown
        dropdown.classList.toggle('open', !isOpen);
        toggle.setAttribute('aria-expanded', String(!isOpen));
      });
    }

    // Close mobile menu when clicking a dropdown item link
    const dropdownItems = dropdown.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
      item.addEventListener('click', () => {
        dropdown.classList.remove('open');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
        if (mobileToggle && headerNav) {
          mobileToggle.classList.remove('active');
          headerNav.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    });
  });

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    dropdownContainers.forEach(dropdown => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // 3. Mobile Menu Drawer Toggle
  if (mobileToggle && headerNav) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.classList.toggle('active', !isExpanded);
      headerNav.classList.toggle('active', !isExpanded);
      mobileToggle.setAttribute('aria-expanded', String(!isExpanded));
      document.body.style.overflow = isExpanded ? '' : 'hidden';
    });

    // Close menu when clicking standard navigation links (excluding the dropdown-toggle button)
    const directNavLinks = headerNav.querySelectorAll('.nav-link:not(.dropdown-toggle)');
    directNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        headerNav.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close menu on clicking outside of drawer & toggle
    document.addEventListener('click', (e) => {
      if (headerNav.classList.contains('active') &&
          !headerNav.contains(e.target) &&
          !mobileToggle.contains(e.target)) {
        mobileToggle.classList.remove('active');
        headerNav.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // Close menu & dropdowns on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        dropdownContainers.forEach(dropdown => {
          dropdown.classList.remove('open');
          const toggle = dropdown.querySelector('.dropdown-toggle');
          if (toggle) toggle.setAttribute('aria-expanded', 'false');
        });
        if (headerNav.classList.contains('active')) {
          mobileToggle.classList.remove('active');
          headerNav.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      }
    });
  }

  // 4. Active Link Highlighting based on pathname
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');
  const dropdownItems = document.querySelectorAll('.dropdown-item');
  const servicePages = ['services.html', 'household.html', 'commercial.html', 'moving-estimator.html'];

  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPath || (currentPath === '' && linkHref === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });

  // Dropdown items active state
  dropdownItems.forEach(item => {
    const itemHref = item.getAttribute('href');
    if (itemHref === currentPath) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Highlight parent dropdown toggle if current page is within the dropdown's subpages
  dropdownContainers.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    if (toggle && servicePages.includes(currentPath)) {
      toggle.classList.add('active');
      toggle.setAttribute('aria-current', 'true');
    }
  });
});
