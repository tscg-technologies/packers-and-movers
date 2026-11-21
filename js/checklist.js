/**
 * PACKERS & MOVERS — INTERACTIVE PRE-MOVE CHECKLIST
 * Handles interactive checklist items, dynamic progress calculations, and local persistence.
 */

document.addEventListener('DOMContentLoaded', () => {
  const checklistContainers = document.querySelectorAll('.checklist-wrapper');

  checklistContainers.forEach(wrapper => {
    const checklistId = wrapper.getAttribute('data-checklist-id') || 'household_checklist';
    const fillBar = wrapper.querySelector('.checklist-fill');
    const percentLabel = wrapper.querySelector('.checklist-percent-label');
    const countLabel = wrapper.querySelector('.checklist-count-label');
    const taskCards = wrapper.querySelectorAll('.checklist-task-card');
    const resetBtn = wrapper.querySelector('.btn-reset-checklist');

    // Retrieve saved state
    let savedState = {};
    try {
      savedState = JSON.parse(sessionStorage.getItem(checklistId)) || {};
    } catch (e) {
      savedState = {};
    }

    const updateProgress = () => {
      let checkedCount = 0;
      const totalCount = taskCards.length;

      taskCards.forEach(card => {
        const taskId = card.getAttribute('data-task-id');
        const isChecked = card.classList.contains('checked');
        if (isChecked) checkedCount++;
        savedState[taskId] = isChecked;
      });

      const percentage = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

      if (fillBar) fillBar.style.width = `${percentage}%`;
      if (percentLabel) percentLabel.textContent = `${percentage}% Complete`;
      if (countLabel) countLabel.textContent = `${checkedCount} of ${totalCount} tasks completed`;

      // Save to sessionStorage
      try {
        sessionStorage.setItem(checklistId, JSON.stringify(savedState));
      } catch (e) {
        // silent fail
      }
    };

    // Initialize initial states
    taskCards.forEach(card => {
      const taskId = card.getAttribute('data-task-id');
      if (savedState[taskId]) {
        card.classList.add('checked');
      }

      card.addEventListener('click', () => {
        card.classList.toggle('checked');
        updateProgress();
      });

      // Keyboard accessibility
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'checkbox');
      card.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          card.classList.toggle('checked');
          updateProgress();
        }
      });
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        taskCards.forEach(card => card.classList.remove('checked'));
        savedState = {};
        try {
          sessionStorage.removeItem(checklistId);
        } catch (e) {}
        updateProgress();
      });
    }

    updateProgress();
  });
});
