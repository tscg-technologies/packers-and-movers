/**
 * PACKERS & MOVERS — SIGNATURE INTERACTIVE MOVING ESTIMATOR
 * Multi-step interactive wizard (Steps 1 to 6) with dynamic calculations and demo results.
 */

document.addEventListener('DOMContentLoaded', () => {
  const estimatorContainer = document.querySelector('.estimator-wizard-root');
  if (!estimatorContainer) return;

  let currentStep = 1;
  const maxSteps = 6;

  // Form State
  const moveDetails = {
    movingFrom: '',
    movingTo: '',
    movingDate: '',
    propertyType: '2 BHK',
    pickupFloor: '1',
    pickupLift: 'yes',
    destFloor: '2',
    destLift: 'yes'
  };

  const additionalServices = {
    fullPacking: true,
    partialPacking: false,
    unpacking: true,
    dismantling: true,
    reassembly: true,
    carTransport: false,
    bikeTransport: false,
    storage: false
  };

  const contactData = {
    name: '',
    phone: '',
    email: ''
  };

  // Check URL parameters for pre-fill from Home Hero Quick Widget
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('from')) moveDetails.movingFrom = urlParams.get('from');
  if (urlParams.get('to')) moveDetails.movingTo = urlParams.get('to');
  if (urlParams.get('date')) moveDetails.movingDate = urlParams.get('date');
  if (urlParams.get('property')) moveDetails.propertyType = urlParams.get('property');

  // Pre-fill inputs if existing
  const inputFrom = document.getElementById('est_from');
  const inputTo = document.getElementById('est_to');
  const inputDate = document.getElementById('est_date');
  const selectProperty = document.getElementById('est_property');

  if (inputFrom && moveDetails.movingFrom) inputFrom.value = moveDetails.movingFrom;
  if (inputTo && moveDetails.movingTo) inputTo.value = moveDetails.movingTo;
  if (inputDate && moveDetails.movingDate) inputDate.value = moveDetails.movingDate;
  if (selectProperty && moveDetails.propertyType) selectProperty.value = moveDetails.propertyType;

  // Cache Elements
  const stepIndicators = document.querySelectorAll('.step-indicator');
  const stepPanels = document.querySelectorAll('.estimator-step-panel');
  const btnPrev = document.getElementById('est_btn_prev');
  const btnNext = document.getElementById('est_btn_next');
  const btnGenerate = document.getElementById('est_btn_generate');

  // Sidebar metric elements
  const sidebarRoomsCount = document.getElementById('side_rooms_count');
  const sidebarItemsCount = document.getElementById('side_items_count');
  const sidebarCartonsCount = document.getElementById('side_cartons_count');
  const sidebarCuFt = document.getElementById('side_cuft');
  const sidebarItemsList = document.getElementById('side_items_preview');

  // 1. Navigation Between Steps
  const showStep = (stepNumber) => {
    currentStep = stepNumber;

    stepPanels.forEach(panel => {
      const panelStep = parseInt(panel.getAttribute('data-step'), 10);
      panel.style.display = panelStep === currentStep ? 'block' : 'none';
    });

    stepIndicators.forEach(ind => {
      const indStep = parseInt(ind.getAttribute('data-step'), 10);
      ind.classList.remove('active', 'completed');
      if (indStep === currentStep) {
        ind.classList.add('active');
      } else if (indStep < currentStep) {
        ind.classList.add('completed');
      }
    });

    // Control visibility of Prev/Next/Generate buttons
    if (btnPrev) btnPrev.style.display = currentStep > 1 ? 'inline-flex' : 'none';
    if (btnNext) btnNext.style.display = currentStep < maxSteps ? 'inline-flex' : 'none';
    if (btnGenerate) btnGenerate.style.display = currentStep === maxSteps ? 'inline-flex' : 'none';

    // Step-specific setup
    if (currentStep === 2) {
      renderRoomSelection();
    } else if (currentStep === 3) {
      renderInventoryBuilder();
    } else if (currentStep === 5) {
      renderSummaryReview();
    }

    // Scroll smoothly to top of estimator wizard
    estimatorContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Step Indicators Click
  stepIndicators.forEach(ind => {
    ind.addEventListener('click', () => {
      const targetStep = parseInt(ind.getAttribute('data-step'), 10);
      if (targetStep < currentStep || validateCurrentStep()) {
        showStep(targetStep);
      }
    });
  });

  // Next / Prev button events
  if (btnNext) {
    btnNext.addEventListener('click', () => {
      if (validateCurrentStep()) {
        if (currentStep < maxSteps) {
          showStep(currentStep + 1);
        }
      }
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      if (currentStep > 1) {
        showStep(currentStep - 1);
      }
    });
  }

  // Step Validation
  const validateCurrentStep = () => {
    let isValid = true;
    if (currentStep === 1) {
      const fromVal = document.getElementById('est_from')?.value.trim();
      const toVal = document.getElementById('est_to')?.value.trim();
      const dateVal = document.getElementById('est_date')?.value.trim();
      const propVal = document.getElementById('est_property')?.value;

      if (!fromVal || !toVal || !dateVal) {
        alert('Please fill in pickup city/location, destination, and target moving date.');
        return false;
      }

      moveDetails.movingFrom = fromVal;
      moveDetails.movingTo = toVal;
      moveDetails.movingDate = dateVal;
      moveDetails.propertyType = propVal || '2 BHK';
      moveDetails.pickupFloor = document.getElementById('est_pickup_floor')?.value || '1';
      moveDetails.pickupLift = document.getElementById('est_pickup_lift')?.value || 'yes';
      moveDetails.destFloor = document.getElementById('est_dest_floor')?.value || '1';
      moveDetails.destLift = document.getElementById('est_dest_lift')?.value || 'yes';
    } else if (currentStep === 2) {
      if (window.InventoryState.selectedRooms.length === 0) {
        alert('Please select at least one room to proceed.');
        return false;
      }
    } else if (currentStep === 4) {
      // Collect selected additional services
      const checkboxes = document.querySelectorAll('.service-checkbox');
      checkboxes.forEach(cb => {
        additionalServices[cb.value] = cb.checked;
      });
    }
    return isValid;
  };

  // 2. Render Room Selection (Step 2)
  const roomGrid = document.getElementById('room_selection_grid');
  const renderRoomSelection = () => {
    if (!roomGrid) return;
    roomGrid.innerHTML = '';

    const catalogRooms = window.INVENTORY_CATALOG.rooms;
    Object.keys(catalogRooms).forEach(roomId => {
      const room = catalogRooms[roomId];
      const isSelected = window.InventoryState.isRoomSelected(roomId);

      const card = document.createElement('div');
      card.className = `room-card-choice ${isSelected ? 'selected' : ''}`;
      card.setAttribute('data-room-id', roomId);
      card.innerHTML = `
        <div class="room-choice-icon">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="16" rx="2"></rect>
            <path d="M7 8h10M7 12h10M7 16h6"></path>
          </svg>
        </div>
        <div class="room-choice-name">${room.name}</div>
        <span style="font-size:0.75rem; color:var(--color-charcoal-muted);">${isSelected ? '✓ Included' : '+ Tap to Add'}</span>
      `;

      card.addEventListener('click', () => {
        window.InventoryState.toggleRoom(roomId);
        card.classList.toggle('selected');
        const span = card.querySelector('span');
        if (span) {
          span.textContent = card.classList.contains('selected') ? '✓ Included' : '+ Tap to Add';
        }
        updateSidebarTally();
      });

      roomGrid.appendChild(card);
    });
  };

  // 3. Render Inventory Builder (Step 3)
  let activeRoomTab = '';
  const renderInventoryBuilder = () => {
    const tabsContainer = document.getElementById('inventory_room_tabs');
    const itemsTable = document.getElementById('inventory_items_table');
    if (!tabsContainer || !itemsTable) return;

    tabsContainer.innerHTML = '';
    const selectedRooms = window.InventoryState.selectedRooms;

    if (selectedRooms.length === 0) {
      itemsTable.innerHTML = '<p style="grid-column: span 2; text-align:center; padding: 20px;">No rooms selected. Please go back to step 2.</p>';
      return;
    }

    if (!selectedRooms.includes(activeRoomTab)) {
      activeRoomTab = selectedRooms[0];
    }

    selectedRooms.forEach(roomId => {
      const room = window.INVENTORY_CATALOG.rooms[roomId];
      const tabBtn = document.createElement('button');
      tabBtn.type = 'button';
      tabBtn.className = `room-tab-pill ${roomId === activeRoomTab ? 'active' : ''}`;
      tabBtn.textContent = room.name;
      tabBtn.addEventListener('click', () => {
        activeRoomTab = roomId;
        renderInventoryBuilder();
      });
      tabsContainer.appendChild(tabBtn);
    });

    // Render items for active room
    itemsTable.innerHTML = '';
    const activeRoomData = window.INVENTORY_CATALOG.rooms[activeRoomTab];
    if (activeRoomData) {
      activeRoomData.items.forEach(item => {
        const currentQty = window.InventoryState.getItemQty(item.id);
        const row = document.createElement('div');
        row.className = 'inventory-item-row';
        row.innerHTML = `
          <div class="item-info-col">
            <h5>${item.name}</h5>
            <span>Est. ${item.cuft} cu.ft each</span>
          </div>
          <div class="item-counter-control">
            <button type="button" class="counter-btn btn-minus" aria-label="Decrease quantity">−</button>
            <span class="counter-value">${currentQty}</span>
            <button type="button" class="counter-btn btn-plus" aria-label="Increase quantity">+</button>
          </div>
        `;

        const valSpan = row.querySelector('.counter-value');
        row.querySelector('.btn-minus').addEventListener('click', () => {
          let q = window.InventoryState.getItemQty(item.id);
          if (q > 0) {
            q--;
            window.InventoryState.setItemQty(item.id, q);
            valSpan.textContent = q;
            updateSidebarTally();
          }
        });

        row.querySelector('.btn-plus').addEventListener('click', () => {
          let q = window.InventoryState.getItemQty(item.id);
          q++;
          window.InventoryState.setItemQty(item.id, q);
          valSpan.textContent = q;
          updateSidebarTally();
        });

        itemsTable.appendChild(row);
      });
    }
  };

  // 4. Update Sidebar Live Tally
  const updateSidebarTally = () => {
    const totals = window.InventoryState.getTotals();
    if (sidebarRoomsCount) sidebarRoomsCount.textContent = totals.totalRooms;
    if (sidebarItemsCount) sidebarItemsCount.textContent = totals.totalItems;
    if (sidebarCartonsCount) sidebarCartonsCount.textContent = totals.totalCartons;
    if (sidebarCuFt) sidebarCuFt.textContent = `${totals.totalCuFt} cu.ft`;

    // Render quick items preview
    if (sidebarItemsList) {
      sidebarItemsList.innerHTML = '';
      let addedAny = false;
      window.InventoryState.selectedRooms.forEach(rId => {
        const room = window.INVENTORY_CATALOG.rooms[rId];
        room.items.forEach(it => {
          const q = window.InventoryState.getItemQty(it.id);
          if (q > 0) {
            addedAny = true;
            const line = document.createElement('div');
            line.className = 'sidebar-item-line';
            line.innerHTML = `<span>${it.name}</span><strong>× ${q}</strong>`;
            sidebarItemsList.appendChild(line);
          }
        });
      });
      if (!addedAny) {
        sidebarItemsList.innerHTML = '<span style="font-size:0.8rem; color:var(--color-charcoal-muted);">No items selected yet.</span>';
      }
    }
  };

  window.addEventListener('inventoryUpdated', updateSidebarTally);
  updateSidebarTally();

  // 5. Render Summary Review (Step 5)
  const renderSummaryReview = () => {
    const summaryRoute = document.getElementById('summary_route');
    const summaryProperty = document.getElementById('summary_property');
    const summaryFloorLift = document.getElementById('summary_floor_lift');
    const summaryRoomsList = document.getElementById('summary_rooms_list');
    const summaryServicesList = document.getElementById('summary_services_list');
    const summaryTotals = document.getElementById('summary_totals');

    if (summaryRoute) {
      summaryRoute.textContent = `${moveDetails.movingFrom || 'Not specified'} → ${moveDetails.movingTo || 'Not specified'} (Date: ${moveDetails.movingDate || 'Flexible'})`;
    }
    if (summaryProperty) {
      summaryProperty.textContent = `${moveDetails.propertyType}`;
    }
    if (summaryFloorLift) {
      summaryFloorLift.textContent = `Pickup Floor ${moveDetails.pickupFloor} (Lift: ${moveDetails.pickupLift}) | Dest Floor ${moveDetails.destFloor} (Lift: ${moveDetails.destLift})`;
    }
    if (summaryRoomsList) {
      const roomNames = window.InventoryState.selectedRooms.map(r => window.INVENTORY_CATALOG.rooms[r].name);
      summaryRoomsList.textContent = roomNames.join(', ') || 'None selected';
    }
    if (summaryServicesList) {
      const activeServices = Object.keys(additionalServices)
        .filter(k => additionalServices[k])
        .map(k => {
          const names = {
            fullPacking: 'Full Professional Packing',
            partialPacking: 'Partial Packing',
            unpacking: 'Unpacking Assistance',
            dismantling: 'Furniture Dismantling',
            reassembly: 'Furniture Reassembly',
            carTransport: 'Car Carrier Transportation',
            bikeTransport: 'Two-Wheeler Transportation',
            storage: 'Temporary Warehousing'
          };
          return names[k] || k;
        });
      summaryServicesList.textContent = activeServices.length > 0 ? activeServices.join(', ') : 'Standard transport only';
    }
    if (summaryTotals) {
      const totals = window.InventoryState.getTotals();
      summaryTotals.textContent = `${totals.totalItems} Items across ${totals.totalRooms} Rooms | ~${totals.totalCartons} Cartons | ~${totals.totalCuFt} Volumetric Cu.Ft`;
    }
  };

  // Jump back buttons in review step
  const editButtons = document.querySelectorAll('[data-jump-step]');
  editButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const step = parseInt(btn.getAttribute('data-jump-step'), 10);
      showStep(step);
    });
  });

  // 6. Generate Demo Estimate (Step 6)
  if (btnGenerate) {
    btnGenerate.addEventListener('click', () => {
      const nameVal = document.getElementById('est_contact_name')?.value.trim();
      const phoneVal = document.getElementById('est_contact_phone')?.value.trim();
      const emailVal = document.getElementById('est_contact_email')?.value.trim();

      if (!nameVal || !phoneVal || !emailVal) {
        alert('Please provide your name, phone number, and email to view the demo estimate calculation.');
        return;
      }

      contactData.name = nameVal;
      contactData.phone = phoneVal;
      contactData.email = emailVal;

      // Transparent Illustrative Calculation Formula (DEMO ONLY)
      const totals = window.InventoryState.getTotals();
      const cuft = Math.max(totals.totalCuFt, 150);

      // Illustrative pricing model:
      // Base handling + volume factor + floor factor + optional services
      let baseHandling = 5000;
      let volumeCost = cuft * 22; // demo volumetric multiplier
      let liftPickupFactor = moveDetails.pickupLift === 'no' ? (parseInt(moveDetails.pickupFloor, 10) * 400) : 0;
      let liftDestFactor = moveDetails.destLift === 'no' ? (parseInt(moveDetails.destFloor, 10) * 400) : 0;
      let servicesAddon = 0;

      if (additionalServices.fullPacking) servicesAddon += (totals.totalCartons * 120) + 2500;
      if (additionalServices.unpacking) servicesAddon += 1800;
      if (additionalServices.dismantling) servicesAddon += 1500;
      if (additionalServices.carTransport) servicesAddon += 9000;
      if (additionalServices.bikeTransport) servicesAddon += 3200;
      if (additionalServices.storage) servicesAddon += 4500;

      const subtotal = baseHandling + volumeCost + liftPickupFactor + liftDestFactor + servicesAddon;
      const lowerRange = Math.round((subtotal * 0.92) / 100) * 100;
      const upperRange = Math.round((subtotal * 1.15) / 100) * 100;

      // Vehicle suggestion
      let suggestedVehicle = '14-Foot Dedicated Closed Container';
      let crewCount = '3 Relocation Specialists';
      if (cuft > 750) {
        suggestedVehicle = '22-Foot Heavy-Duty Container Truck';
        crewCount = '5-6 Relocation Specialists';
      } else if (cuft > 450) {
        suggestedVehicle = '17-Foot Multi-Axle Container';
        crewCount = '4 Relocation Specialists';
      }

      // Populate Result Screen
      const resultContainer = document.getElementById('demo_result_output');
      if (resultContainer) {
        resultContainer.innerHTML = `
          <div class="demo-result-card">
            <span class="widget-demo-tag">Illustrative Calculation Result</span>
            <h3 style="margin-top: 12px; margin-bottom: 8px;">Estimated Move Planning Range</h3>
            <div class="estimate-highlight-box">
              <div class="estimate-range">₹ ${lowerRange.toLocaleString('en-IN')} – ₹ ${upperRange.toLocaleString('en-IN')}</div>
              <div class="estimate-range-unit">Illustrative Demo Estimate (INR)</div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; text-align: left; margin: 20px 0;">
              <div style="background:var(--color-white); padding:14px; border-radius:8px; border:1px solid var(--color-border);">
                <span style="font-size:0.75rem; color:var(--color-charcoal-muted); text-transform:uppercase;">Volume</span>
                <div style="font-weight:700; font-size:1.1rem; color:var(--color-deep-forest);">${totals.totalCuFt} cu.ft</div>
                <small style="color:var(--color-charcoal-muted); font-size:0.75rem;">${totals.totalCartons} Est. Cartons</small>
              </div>
              <div style="background:var(--color-white); padding:14px; border-radius:8px; border:1px solid var(--color-border);">
                <span style="font-size:0.75rem; color:var(--color-charcoal-muted); text-transform:uppercase;">Suggested Carrier</span>
                <div style="font-weight:700; font-size:0.95rem; color:var(--color-deep-forest);">${suggestedVehicle}</div>
              </div>
              <div style="background:var(--color-white); padding:14px; border-radius:8px; border:1px solid var(--color-border);">
                <span style="font-size:0.75rem; color:var(--color-charcoal-muted); text-transform:uppercase;">Assigned Team</span>
                <div style="font-weight:700; font-size:0.95rem; color:var(--color-deep-forest);">${crewCount}</div>
              </div>
            </div>

            <div class="demo-estimate-disclaimer">
              <strong>MANDATORY DEMO NOTICE:</strong><br>
              Illustrative demo estimate only. This is not a commercial quotation or confirmed price. No information has been transmitted or stored. Real moving quotes require an in-person or virtual video survey to verify building access, parking distance, fragile items, and carrier route schedules.
            </div>

            <div style="margin-top: 24px; display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
              <button type="button" class="btn btn-secondary" onclick="window.print()">Print / Save Summary</button>
              <button type="button" class="btn btn-outline" id="btn_restart_estimator">Restart Estimator</button>
            </div>
          </div>
        `;

        document.getElementById('btn_restart_estimator')?.addEventListener('click', () => {
          window.location.reload();
        });

        // Hide Step 6 inputs and show output
        const step6Inputs = document.getElementById('step_6_inputs');
        if (step6Inputs) step6Inputs.style.display = 'none';
        btnGenerate.style.display = 'none';
        btnPrev.style.display = 'none';

        resultContainer.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Initial step setup
  showStep(1);
});
