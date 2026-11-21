/**
 * PACKERS & MOVERS — MAIN APPLICATION COORDINATOR
 * Manages FAQ accordions, tab switchers, dynamic year, and global helpers.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Set current year in footer copyright
  const yearSpans = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  yearSpans.forEach(span => {
    span.textContent = currentYear;
  });

  // 2. FAQ Accordion functionality
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close siblings if single accordion behavior desired
        faqItems.forEach(other => other.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 3. Homepage Category Pill Filter (Interactive Inventory Preview)
  const categoryPills = document.querySelectorAll('.preview-category-tabs .category-pill');
  const previewItemsRow = document.getElementById('home_preview_items');

  const previewItemMap = {
    'all': [
      { name: 'Sofa & Lounge', detail: '3-Seater + Recliner', icon: '🛋️' },
      { name: 'King Bed & Mattress', detail: 'Protected packaging', icon: '🛏️' },
      { name: 'Double Refrigerator', detail: 'Foam corner buffers', icon: '🧊' },
      { name: 'Fragile Crockery Box', detail: 'Multi-layer bubble wrap', icon: '🍽️' }
    ],
    'living': [
      { name: 'Sectional Sofa', detail: 'Cushion stretch wrapping', icon: '🛋️' },
      { name: '65" 4K Smart TV', detail: 'Wooden flight casing', icon: '📺' },
      { name: 'Tempered Glass Table', detail: 'Heavy-duty corner guard', icon: '☕' },
      { name: 'Audio Soundbar & Sub', detail: 'Shock-absorbent cartons', icon: '🔊' }
    ],
    'bedroom': [
      { name: 'King Storage Bed', detail: 'Disassembled & hardware bagged', icon: '🛏️' },
      { name: 'Wardrobe Hanging Box', detail: 'Wrinkle-free apparel move', icon: '👔' },
      { name: 'Memory Foam Mattress', detail: 'Waterproof protective cover', icon: '🪶' },
      { name: 'Vanity Mirror Console', detail: 'Edge-protected crate', icon: '🪞' }
    ],
    'kitchen': [
      { name: 'Side-by-Side Fridge', detail: 'Clean upright transport', icon: '🧊' },
      { name: 'Microwave & Oven', detail: 'Anti-static shrink wrap', icon: '📻' },
      { name: 'Fine China Sets', detail: 'Cellular divider boxes', icon: '🍽️' },
      { name: 'Heavy Cookware Carts', detail: 'Reinforced bottom boxes', icon: '🍳' }
    ],
    'dining': [
      { name: '6-Seater Marble Table', detail: 'Specialty foam wrapped', icon: '🪑' },
      { name: 'Upholstered Chairs', detail: 'Fitted blanket jackets', icon: '🪑' },
      { name: 'Crystal Glassware', detail: 'Individual tissue wrapping', icon: '🍷' },
      { name: 'Buffet Credenza', detail: 'Scratch-shield quilted cover', icon: '🗄️' }
    ],
    'study': [
      { name: 'Executive Wooden Desk', detail: 'Surface edge bumpers', icon: '🖥️' },
      { name: 'Ergonomic Task Chair', detail: 'Castors & gas-lift locked', icon: '🪑' },
      { name: 'Desktop Workstation', detail: 'Anti-static bubble sleeve', icon: '💻' },
      { name: 'Archival Document Box', detail: 'Numbered security seals', icon: '📁' }
    ]
  };

  if (categoryPills.length > 0 && previewItemsRow) {
    categoryPills.forEach(pill => {
      pill.addEventListener('click', () => {
        categoryPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const cat = pill.getAttribute('data-cat') || 'all';
        const items = previewItemMap[cat] || previewItemMap['all'];

        previewItemsRow.innerHTML = '';
        items.forEach(item => {
          const chip = document.createElement('div');
          chip.className = 'preview-item-chip';
          chip.innerHTML = `
            <div class="chip-icon"><span style="font-size:1.4rem;">${item.icon}</span></div>
            <div class="chip-info">
              <h5>${item.name}</h5>
              <p>${item.detail}</p>
            </div>
          `;
          previewItemsRow.appendChild(chip);
        });
      });
    });
  }

  // 4. Smooth Anchor Link Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').substring(1);
      if (!targetId) return;
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
