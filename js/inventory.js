/**
 * PACKERS & MOVERS — INVENTORY DATA & MANAGEMENT
 * Defines room categories, item catalog with volumetric estimations, and state helpers.
 */

window.INVENTORY_CATALOG = {
  rooms: {
    living: {
      id: 'living',
      name: 'Living Room',
      icon: 'sofa',
      description: 'Lounge seating, media center, and accent furniture',
      items: [
        { id: 'living_sofa_3s', name: 'Sofa (3-Seater)', cuft: 50, cartons: 0, defaultQty: 1 },
        { id: 'living_sofa_1s', name: 'Armchair / Recliner', cuft: 18, cartons: 0, defaultQty: 1 },
        { id: 'living_tv', name: 'Television (55"+ LED/OLED)', cuft: 12, cartons: 1, defaultQty: 1 },
        { id: 'living_tv_unit', name: 'TV Entertainment Console', cuft: 25, cartons: 0, defaultQty: 1 },
        { id: 'living_coffee_tbl', name: 'Coffee Table & Side Stools', cuft: 15, cartons: 0, defaultQty: 1 },
        { id: 'living_bookshelf', name: 'Bookshelf Unit', cuft: 28, cartons: 0, defaultQty: 0 },
        { id: 'living_cartons', name: 'Standard Moving Cartons (Decor & Books)', cuft: 4.5, cartons: 1, defaultQty: 4 }
      ]
    },
    master_bed: {
      id: 'master_bed',
      name: 'Master Bedroom',
      icon: 'bed',
      description: 'King/Queen bed setup, wardrobes, and personal storage',
      items: [
        { id: 'bed_king', name: 'King Bed Frame & Headboard', cuft: 60, cartons: 0, defaultQty: 1 },
        { id: 'bed_mattress', name: 'King Foam/Spring Mattress', cuft: 35, cartons: 0, defaultQty: 1 },
        { id: 'bed_wardrobe', name: 'Double Door Wardrobe / Almirah', cuft: 55, cartons: 0, defaultQty: 1 },
        { id: 'bed_dresser', name: 'Dressing Table with Mirror', cuft: 20, cartons: 0, defaultQty: 1 },
        { id: 'bed_side_tables', name: 'Bedside Nightstands (Pair)', cuft: 12, cartons: 0, defaultQty: 1 },
        { id: 'bed_wardrobe_cartons', name: 'Wardrobe Hanging Cartons (Clothes)', cuft: 10, cartons: 1, defaultQty: 3 },
        { id: 'bed_cartons', name: 'Standard Linen & Quilt Cartons', cuft: 4.5, cartons: 1, defaultQty: 3 }
      ]
    },
    bedroom_2: {
      id: 'bedroom_2',
      name: 'Bedroom 2',
      icon: 'bed',
      description: 'Guest or children bedroom arrangement',
      items: [
        { id: 'bed2_queen', name: 'Queen Bed & Mattress', cuft: 48, cartons: 0, defaultQty: 1 },
        { id: 'bed2_wardrobe', name: 'Single/Double Wardrobe', cuft: 40, cartons: 0, defaultQty: 1 },
        { id: 'bed2_study_desk', name: 'Study Desk & Chair', cuft: 16, cartons: 0, defaultQty: 1 },
        { id: 'bed2_cartons', name: 'Bedding & Storage Cartons', cuft: 4.5, cartons: 1, defaultQty: 3 }
      ]
    },
    bedroom_3: {
      id: 'bedroom_3',
      name: 'Bedroom 3 / Guest',
      icon: 'bed',
      description: 'Secondary guest or children bedroom setup',
      items: [
        { id: 'bed3_single', name: 'Single Bed & Mattress', cuft: 28, cartons: 0, defaultQty: 1 },
        { id: 'bed3_chest', name: 'Chest of Drawers', cuft: 22, cartons: 0, defaultQty: 1 },
        { id: 'bed3_cartons', name: 'Personal Belongings Cartons', cuft: 4.5, cartons: 1, defaultQty: 2 }
      ]
    },
    kitchen: {
      id: 'kitchen',
      name: 'Kitchen',
      icon: 'fridge',
      description: 'Major white goods, fragile dinnerware, and appliances',
      items: [
        { id: 'kitchen_fridge', name: 'Refrigerator (Double Door / Side-by-Side)', cuft: 45, cartons: 0, defaultQty: 1 },
        { id: 'kitchen_microwave', name: 'Microwave / OTG Oven', cuft: 6, cartons: 1, defaultQty: 1 },
        { id: 'kitchen_washing_machine', name: 'Washing Machine (Front/Top Load)', cuft: 26, cartons: 0, defaultQty: 1 },
        { id: 'kitchen_dishwasher', name: 'Dishwasher / RO Purifier', cuft: 18, cartons: 0, defaultQty: 0 },
        { id: 'kitchen_appliances', name: 'Small Countertop Appliances (Mixer, Airfryer)', cuft: 8, cartons: 2, defaultQty: 1 },
        { id: 'kitchen_crockery_cartons', name: 'Cushioned Fragile Crockery & Glassware Cartons', cuft: 4.5, cartons: 1, defaultQty: 4 },
        { id: 'kitchen_cookware_cartons', name: 'Heavy Cookware & Utensil Cartons', cuft: 4.5, cartons: 1, defaultQty: 3 }
      ]
    },
    dining: {
      id: 'dining',
      name: 'Dining Room',
      icon: 'utensils',
      description: 'Dining set, buffet sideboard, and glassware cabinets',
      items: [
        { id: 'dining_table_chairs', name: 'Dining Table + 6 Chairs Set', cuft: 50, cartons: 0, defaultQty: 1 },
        { id: 'dining_crockery_unit', name: 'Glass Crockery Display Cabinet', cuft: 35, cartons: 0, defaultQty: 0 },
        { id: 'dining_buffet', name: 'Sideboard / Buffet Server', cuft: 25, cartons: 0, defaultQty: 0 },
        { id: 'dining_cartons', name: 'Table Linens & Dining Ware Cartons', cuft: 4.5, cartons: 1, defaultQty: 2 }
      ]
    },
    study: {
      id: 'study',
      name: 'Study Room / Home Office',
      icon: 'briefcase',
      description: 'Workstation, ergonomic chair, IT gear, and documents',
      items: [
        { id: 'study_desk', name: 'Executive Workstation Desk', cuft: 24, cartons: 0, defaultQty: 1 },
        { id: 'study_chair', name: 'Ergonomic Office Swivel Chair', cuft: 14, cartons: 0, defaultQty: 1 },
        { id: 'study_pc', name: 'Desktop Computer, Dual Monitors & UPS', cuft: 10, cartons: 1, defaultQty: 1 },
        { id: 'study_filing', name: 'Filing Cabinet / Document Drawer', cuft: 16, cartons: 0, defaultQty: 0 },
        { id: 'study_doc_cartons', name: 'Secure Document & Book Cartons', cuft: 4.5, cartons: 1, defaultQty: 3 }
      ]
    },
    garage: {
      id: 'garage',
      name: 'Garage / Storage',
      icon: 'box',
      description: 'Sports equipment, tool storage, and utility items',
      items: [
        { id: 'garage_bicycle', name: 'Bicycle (Adult / Kids)', cuft: 15, cartons: 0, defaultQty: 1 },
        { id: 'garage_tool_rack', name: 'Tool Chest / Metal Utility Shelf', cuft: 22, cartons: 0, defaultQty: 1 },
        { id: 'garage_storage_totes', name: 'Heavy-Duty Storage Totes & Trunks', cuft: 8, cartons: 1, defaultQty: 3 },
        { id: 'garage_ladder', name: 'Foldable Ladder / Stepladder', cuft: 10, cartons: 0, defaultQty: 1 }
      ]
    }
  }
};

/**
 * State manager for user selected inventory
 */
window.InventoryState = {
  selectedRooms: ['living', 'master_bed', 'kitchen'], // defaults
  itemQuantities: {}, // key: itemId, value: qty

  init() {
    // initialize defaults
    Object.keys(window.INVENTORY_CATALOG.rooms).forEach(roomId => {
      const room = window.INVENTORY_CATALOG.rooms[roomId];
      room.items.forEach(item => {
        this.itemQuantities[item.id] = this.selectedRooms.includes(roomId) ? item.defaultQty : 0;
      });
    });
  },

  toggleRoom(roomId) {
    const idx = this.selectedRooms.indexOf(roomId);
    if (idx > -1) {
      this.selectedRooms.splice(idx, 1);
      // set room items to 0
      window.INVENTORY_CATALOG.rooms[roomId].items.forEach(item => {
        this.itemQuantities[item.id] = 0;
      });
    } else {
      this.selectedRooms.push(roomId);
      // restore default quantities
      window.INVENTORY_CATALOG.rooms[roomId].items.forEach(item => {
        this.itemQuantities[item.id] = item.defaultQty;
      });
    }
    this.notifyUpdate();
  },

  isRoomSelected(roomId) {
    return this.selectedRooms.includes(roomId);
  },

  setItemQty(itemId, qty) {
    const validQty = Math.max(0, parseInt(qty, 10) || 0);
    this.itemQuantities[itemId] = validQty;
    this.notifyUpdate();
  },

  getItemQty(itemId) {
    return this.itemQuantities[itemId] || 0;
  },

  getTotals() {
    let totalItems = 0;
    let totalCartons = 0;
    let totalCuFt = 0;

    Object.keys(window.INVENTORY_CATALOG.rooms).forEach(roomId => {
      if (!this.selectedRooms.includes(roomId)) return;
      const room = window.INVENTORY_CATALOG.rooms[roomId];
      room.items.forEach(item => {
        const qty = this.itemQuantities[item.id] || 0;
        if (qty > 0) {
          totalItems += qty;
          totalCuFt += (item.cuft * qty);
          if (item.cartons > 0) {
            totalCartons += (item.cartons * qty);
          } else if (item.cuft <= 6) {
            totalCartons += qty;
          }
        }
      });
    });

    // Provide a baseline estimate of packing carton requirement based on volume
    const calculatedCartonRecommendation = Math.max(totalCartons, Math.ceil(totalCuFt / 18));

    return {
      totalRooms: this.selectedRooms.length,
      totalItems,
      totalCartons: calculatedCartonRecommendation,
      totalCuFt: Math.round(totalCuFt)
    };
  },

  notifyUpdate() {
    window.dispatchEvent(new CustomEvent('inventoryUpdated', { detail: this.getTotals() }));
  }
};

window.InventoryState.init();
