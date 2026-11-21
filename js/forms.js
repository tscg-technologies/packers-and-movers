/**
 * PACKERS & MOVERS — FORM VALIDATION & DEMO SUBMISSION HANDLING
 * Client-side validation for quick widget and comprehensive moving enquiry.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Quick Move Widget Form (Redirects to Estimator with Query Params)
  const quickForm = document.getElementById('quick_move_form');
  if (quickForm) {
    quickForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fromVal = encodeURIComponent(document.getElementById('quick_from')?.value.trim() || '');
      const toVal = encodeURIComponent(document.getElementById('quick_to')?.value.trim() || '');
      const dateVal = encodeURIComponent(document.getElementById('quick_date')?.value || '');
      const propVal = encodeURIComponent(document.getElementById('quick_property')?.value || '2 BHK');

      window.location.href = `moving-estimator.html?from=${fromVal}&to=${toVal}&date=${dateVal}&property=${propVal}`;
    });
  }

  // 2. Comprehensive Contact Enquiry Form
  const contactForm = document.getElementById('contact_enquiry_form');
  const demoModal = document.getElementById('demo_success_modal');
  const closeModalBtn = document.getElementById('btn_close_modal');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let hasErrors = false;

      // Helper to validate field
      const validateField = (id, condition) => {
        const group = document.getElementById(id)?.closest('.form-group');
        if (!group) return true;
        if (!condition) {
          group.classList.add('has-error');
          hasErrors = true;
          return false;
        } else {
          group.classList.remove('has-error');
          return true;
        }
      };

      const fullName = document.getElementById('contact_name')?.value.trim();
      const phone = document.getElementById('contact_phone')?.value.trim();
      const email = document.getElementById('contact_email')?.value.trim();
      const fromCity = document.getElementById('contact_from')?.value.trim();
      const toCity = document.getElementById('contact_to')?.value.trim();
      const moveDate = document.getElementById('contact_date')?.value.trim();

      // Email regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // Phone basic check (at least 7 digits)
      const phoneRegex = /^[0-9+\-\s()]{7,15}$/;

      validateField('contact_name', fullName && fullName.length >= 2);
      validateField('contact_phone', phone && phoneRegex.test(phone));
      validateField('contact_email', email && emailRegex.test(email));
      validateField('contact_from', fromCity && fromCity.length >= 2);
      validateField('contact_to', toCity && toCity.length >= 2);
      validateField('contact_date', moveDate && moveDate.length > 0);

      // Add real-time removal of error on input
      ['contact_name', 'contact_phone', 'contact_email', 'contact_from', 'contact_to', 'contact_date'].forEach(id => {
        const input = document.getElementById(id);
        if (input) {
          input.addEventListener('input', () => {
            input.closest('.form-group')?.classList.remove('has-error');
          });
        }
      });

      if (!hasErrors) {
        // Show demo success modal
        if (demoModal) {
          demoModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
        contactForm.reset();
      }
    });
  }

  // Close modal interaction
  if (closeModalBtn && demoModal) {
    closeModalBtn.addEventListener('click', () => {
      demoModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    demoModal.addEventListener('click', (e) => {
      if (e.target === demoModal) {
        demoModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && demoModal.classList.contains('active')) {
        demoModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
});
