/**
 * The Child Compass — Vikarabad Branch
 * Interactive Functionality & Clinical Decision Tools
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     1. Navigation & Mobile Menu
     ========================================================================== */
  const menuToggle = document.querySelector('.menu-toggle');
  const primaryNav = document.querySelector('.primary-nav');

  if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = primaryNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });

    // Close menu when clicking on any navigation link
    primaryNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        primaryNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Auto-update footer current year
  const currentYearEl = document.getElementById('current-year');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  /* ==========================================================================
     2. Interactive Milestone Red Flags Checker (Nelson Pediatrics Data)
     ========================================================================== */
  const milestoneData = {
    '6m': {
      ageLabel: '6 Months',
      expectedTitle: 'What most babies do at 6 Months:',
      expected: [
        'Rolls over from stomach to back and back to stomach.',
        'Sits with brief support (propped on hands or tripod position).',
        'Passes toys from one hand to the other.',
        'Responds to sounds by making babbling sounds (ba-ba, ma-ma, da-da).',
        'Recognizes familiar faces and laughs out loud.',
        'Enjoys looking at self in a mirror and exploring hands.'
      ],
      redFlagsTitle: 'Red Flags: Consult Dr. Vishnuvardhan promptly:',
      redFlags: [
        'Does not roll over in either direction by 6 months.',
        'Body feels unusually stiff (hypertonia) or very floppy like a ragdoll.',
        'Does not reach for toys or grasp objects.',
        'Does not turn head toward sounds or voices.',
        'Does not make vowel sounds ("ah", "eh", "oh") or smile back.',
        'Difficulty bringing hands or objects to mouth.'
      ],
      advice: 'Around 6 months, complementary feeding (weaning) begins alongside breastmilk. Observe motor symmetry—both hands should reach equally. If muscle tone feels asymmetric or stiff, a neonatal developmental exam is recommended.'
    },
    '12m': {
      ageLabel: '12 Months (1 Year)',
      expectedTitle: 'What most toddlers do at 12 Months:',
      expected: [
        'Pulls up to stand and walks holding onto furniture ("cruising").',
        'Uses neat pincer grasp (picks up small pieces of food with thumb and forefinger).',
        'Says "mama" or "dada" with specific meaning, plus 1–2 other words.',
        'Waves "bye-bye" and plays interactive games like peek-a-boo.',
        'Responds consistently to own name when called.',
        'Points to objects with index finger to show interest or request.'
      ],
      redFlagsTitle: 'Red Flags: Consult Dr. Vishnuvardhan promptly:',
      redFlags: [
        'Does not crawl or drags one side of the body while crawling.',
        'Cannot stand even when supported.',
        'Does not point to objects or make communicative gestures (waving/shaking head).',
        'Does not search for hidden objects (lack of object permanence).',
        'Does not utter single meaningful words like "mama" or "dada".',
        'Does not turn or respond when their name is called.'
      ],
      advice: 'The 12-month milestone mark is ideal for developmental screening, checking hemoglobin for iron deficiency anemia, and scheduling the MMR and Varicella immunizations.'
    },
    '18m': {
      ageLabel: '18 Months',
      expectedTitle: 'What most toddlers do at 18 Months:',
      expected: [
        'Walks alone steadily without help; may begin to run.',
        'Drinks independently from an open cup and feeds self with a spoon.',
        'Speaks at least 10 to 20 meaningful single words.',
        'Points to show someone something interesting (joint attention).',
        'Scribbles spontaneously with a crayon.',
        'Imitates simple household chores and shows affection to familiar people.'
      ],
      redFlagsTitle: 'Red Flags: Consult Dr. Vishnuvardhan promptly:',
      redFlags: [
        'Cannot walk independently without support.',
        'Does not speak at least 6 meaningful words.',
        'Does not point to show things or make eye contact when communicating.',
        'Does not notice or show emotion when caregiver leaves or enters the room.',
        'Does not imitate actions (like clapping or sweeping).',
        'Loss of any previously acquired language or social interaction skills.'
      ],
      advice: 'At 18 months, routine screening for autism spectrum disorders (M-CHAT) and speech-language delays is strongly recommended by the Indian Academy of Pediatrics and AAP.'
    },
    '24m': {
      ageLabel: '24 Months (2 Years)',
      expectedTitle: 'What most toddlers do at 24 Months:',
      expected: [
        'Runs well, kicks a ball forward, and walks up and down stairs holding a rail.',
        'Builds a tower of 4 to 6 blocks and turns book pages one by one.',
        'Combines 2 words spontaneously (e.g., "more milk", "big truck", "go park").',
        'Follows simple 2-step instructions ("Pick up the ball and put it on the table").',
        'Points to objects or pictures when they are named.',
        'Engages in parallel play alongside other children.'
      ],
      redFlagsTitle: 'Red Flags: Consult Dr. Vishnuvardhan promptly:',
      redFlags: [
        'Does not use 2-word spontaneous phrases (not just repeating).',
        'Does not know the function of common objects (spoon, phone, cup, comb).',
        'Does not imitate actions or repeat words.',
        'Cannot follow simple 2-step instructions.',
        'Cannot walk steadily or has frequent, unexplained falls.',
        'Significant lack of eye contact or preference for solitary repetitive play.'
      ],
      advice: 'Two years marks an explosion in toddler vocabulary. Keep screen time to zero or near-zero, and prioritize shared reading. Any persistent delay in expressive speech is best evaluated now.'
    },
    '3y': {
      ageLabel: '3 Years',
      expectedTitle: 'What most children do at 3 Years:',
      expected: [
        'Climbs well, pedals a tricycle, and walks up stairs alternating feet.',
        'Copies a circle, uses child-safe scissors, and turns door handles.',
        'Speaks in sentences of 3 to 4 words; strangers understand 75% of speech.',
        'Asks "who", "what", "where", and "why" questions continuously.',
        'Shows affection for playmates and takes turns in games.',
        'Dresses and undresses self with minimal assistance; begins toilet training.'
      ],
      redFlagsTitle: 'Red Flags: Consult Dr. Vishnuvardhan promptly:',
      redFlags: [
        'Frequent falling or severe difficulty navigating stairs.',
        'Persistent drooling or very unclear, garbled speech.',
        'Cannot build a tower of more than 4 blocks or hold a pencil.',
        'Cannot speak in simple 3-word sentences.',
        'Does not understand simple instructions or engage in pretend play.',
        'Extreme difficulty separating from parents or severe social withdrawal.'
      ],
      advice: 'At 3 years, social communication, cooperative play, and gross motor coordination leap forward. Vision and hearing re-evaluations are helpful prior to preschool enrollment.'
    },
    '4-5y': {
      ageLabel: '4–5 Years (Preschool)',
      expectedTitle: 'What most children do at 4–5 Years:',
      expected: [
        'Hops and stands on one foot for up to 5 seconds; catches a bounced ball.',
        'Draws a person with 3 to 6 body parts; prints some capital letters.',
        'Speaks fluently in full sentences and tells simple stories.',
        'Counts 10 or more objects accurately and names 4 primary colors.',
        'Understands the concept of time (morning, afternoon, night, days).',
        'Cooperative play, adheres to rules of simple board games, toilet independent.'
      ],
      redFlagsTitle: 'Red Flags: Consult Dr. Vishnuvardhan promptly:',
      redFlags: [
        'Cannot jump in place or hop on one foot.',
        'Has trouble scribbling or holding a crayon with a proper grasp.',
        'Speech is unclear or not understood by non-family members.',
        'Cannot tell a simple story or use correct pronouns (me, you, they).',
        'Shows extreme aggression, passivity, or inability to focus on a single task for 5 minutes.',
        'Cannot dress, wash hands, or use the toilet independently.'
      ],
      advice: '4 to 5 years is the launchpad for school readiness. This visit includes preschool vision testing, blood pressure screening, motor fine-tuning, and pre-school booster vaccinations (DTP, IPV, MMR).'
    }
  };

  const ageTabs = document.querySelectorAll('.age-tab');
  const panelExpectedTitle = document.getElementById('panel-expected-title');
  const panelExpectedList = document.getElementById('panel-expected-list');
  const panelRedflagsTitle = document.getElementById('panel-redflags-title');
  const panelRedflagsList = document.getElementById('panel-redflags-list');
  const panelAdviceText = document.getElementById('panel-advice-text');
  const selectedAgeLabel = document.getElementById('selected-age-label');
  const consultAgeBtn = document.querySelector('.consult-age-btn');

  let currentSelectedAge = '6m';

  function updateMilestonePanel(ageKey) {
    const data = milestoneData[ageKey];
    if (!data) return;
    currentSelectedAge = ageKey;

    if (panelExpectedTitle) panelExpectedTitle.textContent = data.expectedTitle;
    if (panelRedflagsTitle) panelRedflagsTitle.textContent = data.redFlagsTitle;
    if (panelAdviceText) panelAdviceText.textContent = data.advice;
    if (selectedAgeLabel) selectedAgeLabel.textContent = data.ageLabel;

    // Render expected list
    if (panelExpectedList) {
      panelExpectedList.innerHTML = '';
      data.expected.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        panelExpectedList.appendChild(li);
      });
    }

    // Render red flags list
    if (panelRedflagsList) {
      panelRedflagsList.innerHTML = '';
      data.redFlags.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        panelRedflagsList.appendChild(li);
      });
    }
  }

  // Initial load
  updateMilestonePanel('6m');

  ageTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      ageTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const age = tab.dataset.age;
      updateMilestonePanel(age);
    });
  });

  // Consult button jumps to booking form with age preset
  if (consultAgeBtn) {
    consultAgeBtn.addEventListener('click', () => {
      const bookingSection = document.getElementById('booking');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
        const purposeSelect = document.getElementById('visit-purpose');
        const childInput = document.getElementById('child-name');
        if (purposeSelect) {
          purposeSelect.value = 'Milestones & Development Evaluation';
        }
        if (childInput && !childInput.value) {
          childInput.placeholder = `Child's name, ${milestoneData[currentSelectedAge].ageLabel}`;
          childInput.focus();
        }
      }
    });
  }

  /* ==========================================================================
     3. Six Core Care Pillars Modal Content & Protocol Explorer
     ========================================================================== */
  const pillarProtocols = {
    newborn: {
      category: 'PILLAR 1 · NEONATAL SPECIALTY',
      title: 'Newborn Care & Prematurity Follow-up',
      html: `
        <p class="modal-lead">
          The first 28 days of life (the neonatal period) represent the most rapid physiological adaptation human beings ever experience. Dr. Vishnuvardhan K specializes in smooth transitions from hospital to home.
        </p>
        <div class="pearl-highlight-box">
          <h4>Key Clinical Care Focus:</h4>
          <ul>
            <li><strong>Post-Discharge Schedule:</strong> Standard check-up at Day 3 to 5 (to assess neonatal jaundice, hydration, and weight loss nadir), followed by Day 14 and 6 weeks.</li>
            <li><strong>Lactation & Feeding:</strong> Assessment of latch, milk transfer, latch pain resolution, and safe formula supplementation guidelines when clinically indicated.</li>
            <li><strong>Neonatal Jaundice:</strong> Objective transcutaneous bilirubin screening without unnecessary blood pricks; evidence-based phototherapy threshold guidance.</li>
            <li><strong>Preterm & NICU Graduate Care:</strong> Specialized growth monitoring using Fenton/Intergrowth-21st preterm growth charts, thermal care, and Kangaroo Mother Care (KMC) coaching.</li>
          </ul>
        </div>
        <div class="iron-col">
          <h4>Home Care Essentials:</h4>
          <p>Cord stump care (keep clean and dry, avoid powders or oils), safe sleep practices (back to sleep, firm flat mattress, room-sharing without bed-sharing), and normal newborn skin peeling reassurance.</p>
        </div>
      `
    },
    screenings: {
      category: 'PILLAR 2 · UNIVERSAL SENSORY SCREENINGS',
      title: 'Newborn Screenings: Hearing (1-2-3 Rule) & Preterm ROP',
      html: `
        <p class="modal-lead">
          Sensory screenings protect a child's future speech, cognition, and visual development. Because newborns cannot tell us what they hear or see, non-invasive objective tests are vital.
        </p>
        <div class="rule-box-detailed">
          <div class="detailed-step">
            <span class="step-badge">1-2-3 HEARING</span>
            <div>
              <strong>The 1-2-3 Hearing Pathway</strong>
              <p>Screen by 1 Month (OAE/AABR) → Diagnose by 2 Months (BERA if needed) → Intervene by 3 Months. Universal for every newborn baby before or shortly after discharge.</p>
            </div>
          </div>
          <div class="detailed-step">
            <span class="step-badge">RBSK ROP</span>
            <div>
              <strong>Preterm Retinal Eye Examination</strong>
              <p>Required for all infants born ≤34 weeks gestational age or birth weight ≤2000g. Must occur at Day 28 (3–4 weeks of age) to prevent irreversible visual loss.</p>
            </div>
          </div>
          <div class="detailed-step">
            <span class="step-badge">METABOLIC</span>
            <div>
              <strong>Newborn Blood Spot Screening</strong>
              <p>Heel prick screening for Congenital Hypothyroidism, G6PD deficiency, and Congenital Adrenal Hyperplasia (CAH).</p>
            </div>
          </div>
        </div>
      `
    },
    vaccination: {
      category: 'PILLAR 3 · IMMUNIZATION & PREVENTION',
      title: 'Vaccination & Preventative Health (IAP Aligned)',
      html: `
        <p class="modal-lead">
          Vaccines are the most powerful preventative shield in modern medicine. Our Vikarabad clinic follows the latest Indian Academy of Pediatrics (IAP) immunization schedule.
        </p>
        <div class="pearl-highlight-box">
          <h4>Our Immunization Standards:</h4>
          <ul>
            <li><strong>Strict Cold-Chain Integrity:</strong> Monitored digital temperature logging (2°C to 8°C) to ensure peak vaccine potency.</li>
            <li><strong>Painless Techniques:</strong> Distraction techniques, topical cooling, oral sweet solutions for infants, and painless (acellular DTaP) options.</li>
            <li><strong>Complete Schedule Coverage:</strong> Birth (BCG, OPV, Hep B), 6-10-14 weeks (Hexavalent, Rotavirus, Pneumococcal), 6 months (Flu), 9 months (MMR), 12 months (Hep A, Typhoid conjugate), 15 months (MMR, Varicella), 18 months (DTP booster).</li>
            <li><strong>Digital Vaccine Records:</strong> Automated WhatsApp & SMS reminders so boosters are never missed.</li>
          </ul>
        </div>
      `
    },
    milestones: {
      category: 'PILLAR 4 · DEVELOPMENTAL SURVEILLANCE',
      title: 'Growth, Speech & Milestone Tracking',
      html: `
        <p class="modal-lead">
          Early detection transforms trajectories. Our clinic performs structured developmental surveillance at every well-child check-up.
        </p>
        <div class="iron-grid">
          <div class="iron-col">
            <h4>Physical Growth Assessment</h4>
            <p>Weight, height/length, and head circumference plotted on WHO growth charts. Identifies growth faltering or excessive gain early.</p>
          </div>
          <div class="iron-col">
            <h4>Neurodevelopmental Domains</h4>
            <p>Evaluation across 4 domains: Gross Motor, Fine Motor & Vision, Hearing & Language, and Social/Emotional interaction.</p>
          </div>
        </div>
        <div class="warning-box">
          <strong>When to Seek Early Support:</strong>
          <p>If you notice a loss of any acquired skill, lack of eye contact, failure to respond to voices, or asymmetry in hand use, schedule an early milestone consult.</p>
        </div>
      `
    },
    nutrition: {
      category: 'PILLAR 5 · PEDIATRIC NUTRITION & WEANING',
      title: 'Pediatric Nutrition, Weaning & Anemia Prevention',
      html: `
        <p class="modal-lead">
          Nutrition in the first 1000 days of life fuels brain architecture. We provide evidence-based, culturally harmonious food plans for Indian families.
        </p>
        <div class="pearl-highlight-box">
          <h4>Key Nutritional Guidance:</h4>
          <ul>
            <li><strong>Complementary Feeding at 6 Months:</strong> Introducing single-grain purees, ragi porridge, mashed vegetables, and lentils alongside breastfeeding.</li>
            <li><strong>Iron Deficiency Anemia:</strong> Routine screening at 9–12 months. Pairing plant-based iron (dal, ragi, moringa) with Vitamin C (lemon, orange, amla).</li>
            <li><strong>Self-Feeding & Texture Progression:</strong> Moving safely from smooth purees to mashed foods by 8 months and finger foods by 9–10 months.</li>
            <li><strong>Picky Eater Strategies:</strong> Responsive feeding without coercion, bribery, or digital screens at the dining table.</li>
          </ul>
        </div>
      `
    },
    illnesses: {
      category: 'PILLAR 6 · ACUTE INFECTIONS & EDUCATION',
      title: 'Common Illnesses & Rational Pediatric Home Care',
      html: `
        <p class="modal-lead">
          Childhood fevers, coughs, and tummy upsets are inevitable as the immune system matures. Our priority is avoiding unnecessary medications and empowering parents with confidence.
        </p>
        <div class="pearl-highlight-box">
          <h4>Rational Clinical Stewardship:</h4>
          <ul>
            <li><strong>Antibiotic Prudence:</strong> 85%+ of acute childhood colds, fevers, and diarrheas are viral. We do not prescribe antibiotics unless bacterial infection is clinically confirmed.</li>
            <li><strong>Fever Management:</strong> Weight-based paracetamol dosage, encouraging comfortable clothing and fluids. Fever is the body's natural defense mechanism, not an enemy.</li>
            <li><strong>Acute Diarrhea Protocol:</strong> Immediate Oral Rehydration Salts (WHO ORS) and 14-day zinc supplementation; avoiding harmful anti-motility drugs.</li>
            <li><strong>Croup & Wheeze Triage:</strong> Inhaled therapy when needed with age-appropriate spacers, avoiding oral steroid overuse.</li>
          </ul>
        </div>
      `
    }
  };

  const pillarModal = document.getElementById('pillar-modal');
  const pillarCategory = document.getElementById('pillar-modal-category');
  const pillarTitle = document.getElementById('pillar-modal-title');
  const pillarBody = document.getElementById('pillar-modal-body');

  document.querySelectorAll('[data-open-pillar]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.openPillar;
      const data = pillarProtocols[key];
      if (data && pillarModal) {
        pillarCategory.textContent = data.category;
        pillarTitle.textContent = data.title;
        pillarBody.innerHTML = data.html;
        pillarModal.showModal();
      }
    });
  });

  /* ==========================================================================
     4. Modals & Dialog System (Emergency, Parent Pearls, Screenings)
     ========================================================================== */
  // Generic modal triggers
  document.querySelectorAll('[data-open-modal]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const modalId = trigger.dataset.openModal;
      const modal = document.getElementById(modalId);
      if (modal) modal.showModal();
    });
  });

  // Guide triggers
  document.querySelectorAll('[data-open-guide]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const guideKey = trigger.dataset.openGuide;
      const modal = document.getElementById(`${guideKey}-guide`);
      if (modal) modal.showModal();
    });
  });

  // Entire Parent Pearl card clickable + keyboard accessible
  document.querySelectorAll('[data-guide]').forEach(card => {
    const openCardGuide = () => {
      const guideKey = card.dataset.guide;
      const modal = document.getElementById(`${guideKey}-guide`);
      if (modal) modal.showModal();
    };
    card.addEventListener('click', (e) => {
      if (e.target.closest('[data-open-guide]')) return;
      openCardGuide();
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCardGuide();
      }
    });
  });

  // Media frame keyboard support (Enter/Space to expand guide)
  document.querySelectorAll('.media-frame[data-open-guide]').forEach(frame => {
    frame.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const guideKey = frame.dataset.openGuide;
        const modal = document.getElementById(`${guideKey}-guide`);
        if (modal) modal.showModal();
      }
    });
  });

  // Handle dialog close buttons & background click dismissal
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.querySelectorAll('.modal-close-btn, .modal-close-action, .dialog-close').forEach(closeBtn => {
      closeBtn.addEventListener('click', () => dialog.close());
    });

    // Close when clicking outside the dialog content box
    dialog.addEventListener('click', event => {
      if (event.target === dialog) {
        dialog.close();
      }
    });

    // Close dialog when user clicks an anchor pointing to an on-page section (e.g. #booking)
    dialog.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', () => {
        dialog.close();
      });
    });
  });

  /* ==========================================================================
     5. Appointment Booking Request Form & WhatsApp Integration
     ========================================================================== */
  const bookingForm = document.getElementById('appointment-form');
  const preferredDateInput = document.getElementById('preferred-date');
  const preferredDateError = document.getElementById('preferred-date-error');
  const preferredDateHint = document.getElementById('preferred-date-hint');
  const bookingSuccessBox = document.getElementById('booking-success');
  const successSummary = document.getElementById('success-summary');
  const forwardWhatsAppBtn = document.getElementById('forward-whatsapp-btn');
  const bookAnotherBtn = document.getElementById('book-another-btn');

  // Helper to check if a date string (YYYY-MM-DD) falls on a Sunday
  function isSundayDate(dateString) {
    if (!dateString) return false;
    const parts = dateString.split('-');
    if (parts.length !== 3) return false;
    const dateObj = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    return !isNaN(dateObj.getTime()) && dateObj.getDay() === 0;
  }

  // Set minimum booking date to today and display upcoming Sunday hint
  if (preferredDateInput) {
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    preferredDateInput.min = todayStr;

    // Calculate nearest upcoming Sunday
    const daysUntilSunday = (7 - today.getDay()) % 7;
    const nextSunday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (daysUntilSunday === 0 ? 0 : daysUntilSunday));
    const formattedNextSunday = nextSunday.toLocaleDateString('en-IN', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    if (preferredDateHint) {
      preferredDateHint.textContent = `Consultations on Sundays only (10 AM – 6 PM). Next Sunday: ${formattedNextSunday}.`;
    }

    // Instant validation on date change
    preferredDateInput.addEventListener('change', () => {
      const chosenVal = preferredDateInput.value;
      if (chosenVal && !isSundayDate(chosenVal)) {
        validateField(preferredDateInput, false);
        if (preferredDateError) {
          preferredDateError.textContent = 'Appointments are held on Sundays only (10:00 AM – 06:00 PM). Please select a Sunday.';
        }
      } else if (chosenVal) {
        validateField(preferredDateInput, true);
        if (preferredDateError) {
          preferredDateError.textContent = 'Please choose an upcoming Sunday';
        }
      }
    });
  }

  function validateField(inputEl, condition) {
    const formGroup = inputEl.closest('.form-group');
    if (!condition) {
      formGroup?.classList.add('has-error');
      inputEl.classList.add('invalid');
      return false;
    } else {
      formGroup?.classList.remove('has-error');
      inputEl.classList.remove('invalid');
      return true;
    }
  }

  if (bookingForm) {
    // Clear errors on input
    bookingForm.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('input', () => {
        field.closest('.form-group')?.classList.remove('has-error');
        field.classList.remove('invalid');
      });
    });

    bookingForm.addEventListener('submit', event => {
      event.preventDefault();

      const nameInput = document.getElementById('parent-name');
      const phoneInput = document.getElementById('parent-phone');
      const childInput = document.getElementById('child-name');
      const purposeSelect = document.getElementById('visit-purpose');
      const dateInput = document.getElementById('preferred-date');
      const timeSelect = document.getElementById('preferred-time');
      const notesTextarea = document.getElementById('visit-notes');

      const isNameValid = validateField(nameInput, nameInput.value.trim().length >= 2);
      const isPhoneValid = validateField(phoneInput, /^[6-9]\d{9}$/.test(phoneInput.value.replace(/[\s-]/g, '')));
      const isChildValid = validateField(childInput, childInput.value.trim().length >= 2);
      const isPurposeValid = validateField(purposeSelect, purposeSelect.value !== '');
      
      // Validate that date is provided AND is specifically a Sunday
      const dateVal = dateInput.value;
      const isDateSunday = dateVal !== '' && isSundayDate(dateVal);
      if (dateVal && !isSundayDate(dateVal) && preferredDateError) {
        preferredDateError.textContent = 'Appointments are held on Sundays only (10:00 AM – 06:00 PM). Please select a Sunday.';
      } else if (preferredDateError) {
        preferredDateError.textContent = 'Please choose an upcoming Sunday';
      }
      const isDateValid = validateField(dateInput, isDateSunday);
      const isTimeValid = validateField(timeSelect, timeSelect.value !== '');

      if (!isNameValid || !isPhoneValid || !isChildValid || !isPurposeValid || !isDateValid || !isTimeValid) {
        // Focus first invalid element
        const firstError = bookingForm.querySelector('.has-error input, .has-error select');
        if (firstError) firstError.focus();
        return;
      }

      // Generate reference code
      const refCode = 'TCC-IND-' + Math.floor(1000 + Math.random() * 9000);
      const parentName = nameInput.value.trim();
      const phone = phoneInput.value.trim();
      const childInfo = childInput.value.trim();
      const purpose = purposeSelect.value;
      const date = dateInput.value;
      const slot = timeSelect.value;
      const notes = notesTextarea ? notesTextarea.value.trim() : '';

      // Update success message
      if (successSummary) {
        successSummary.innerHTML = `<strong>Reference: ${refCode}</strong><br />Thank you, ${parentName}. We have registered your Sunday appointment request for <strong>${childInfo}</strong> for <strong>${purpose}</strong> on <strong>Sunday (${date}) at ${slot}</strong>. Our Vikarabad clinic front desk will call you to confirm.`;
      }

      // Construct formatted WhatsApp message
      const rawWaMessage = `Hello The Child Compass Vikarabad, I have submitted an appointment request:\n\n` +
        `• Ref ID: ${refCode}\n` +
        `• Parent Name: ${parentName}\n` +
        `• Contact Phone: ${phone}\n` +
        `• Child: ${childInfo}\n` +
        `• Purpose of Visit: ${purpose}\n` +
        `• Preferred Sunday Date: ${date}\n` +
        `• Sunday Time Slot: ${slot}\n` +
        (notes ? `• Notes: ${notes}\n` : '') +
        `\nNote: Sunday clinic consultation hours (10:00 AM – 06:00 PM). Please confirm availability. Thank you!`;

      const encodedWaUrl = `https://wa.me/919876543210?text=${encodeURIComponent(rawWaMessage)}`;
      if (forwardWhatsAppBtn) {
        forwardWhatsAppBtn.href = encodedWaUrl;
      }

      // Show success container & scroll to it
      if (bookingSuccessBox) {
        bookingSuccessBox.style.display = 'flex';
        bookingSuccessBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Disable submission button to prevent duplicate clicks
      const submitBtn = document.getElementById('submit-booking-btn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.5';
      }
    });

    if (bookAnotherBtn) {
      bookAnotherBtn.addEventListener('click', () => {
        bookingForm.reset();
        bookingSuccessBox.style.display = 'none';
        const submitBtn = document.getElementById('submit-booking-btn');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';
        }
      });
    }
  }

  /* ==========================================================================
     6. Parent Guide Assistant (Chatbot Drawer & Educational FAQ)
     ========================================================================== */
  const chatLauncher = document.querySelector('.chat-launcher');
  const chatDialog = document.getElementById('parent-guide-chat');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-question');
  const chatMessages = document.getElementById('chat-messages');
  const chatEndpoint = document.body.dataset.chatEndpoint;

  function appendChatMessage(text, kind) {
    if (!chatMessages) return;
    const msg = document.createElement('div');
    msg.className = `chat-message ${kind}`;
    msg.textContent = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return msg;
  }

  if (chatLauncher && chatDialog) {
    chatLauncher.addEventListener('click', () => {
      chatDialog.showModal();
    });
  }

  // Pre-programmed educational responses for common parent queries
  const educationalFaqs = [
    {
      keywords: ['fever', 'temperature', 'crocin', 'paracetamol', 'hot'],
      reply: "For fever: Observe your child's activity level and hydration rather than just the number on the thermometer. Dress in light cotton clothes, encourage fluids, and never give aspirin. Paracetamol dosage depends on child weight, not age. If fever exceeds 100.4°F in an infant under 3 months or lasts >3 days, seek clinic evaluation immediately."
    },
    {
      keywords: ['hearing', 'screen', '1-2-3', 'oae', 'bera'],
      reply: "The 1-2-3 Rule for newborn hearing: Screen by 1 month of age (OAE/AABR), diagnose by 2 months if referred, and begin early intervention by 3 months. Hearing screen is completely safe, painless, and performed while baby sleeps."
    },
    {
      keywords: ['rop', 'preterm', 'premature', 'eye', 'retina'],
      reply: "Retinopathy of Prematurity (ROP) screening is required under RBSK guidelines for babies born ≤34 weeks gestational age or ≤2000g birth weight. The first eye exam should be done at 3 to 4 weeks of chronological life (Day 28) to prevent visual impairment."
    },
    {
      keywords: ['iron', 'anemia', 'pale', 'ragi', 'nutrition', 'food', 'weaning', 'solid'],
      reply: "Iron supports brain development and red blood cells. Start complementary feeding around 6 months with ragi, dal, pureed greens, or egg yolk. Boost absorption by pairing with Vitamin C (lemon, orange, amla) and avoid milk/tea with iron-rich meals."
    },
    {
      keywords: ['vaccine', 'vaccination', 'immunization', 'iap', 'painless'],
      reply: "We follow the Indian Academy of Pediatrics (IAP) schedule with strict cold-chain maintenance. Painless (acellular DTaP) options are available to minimize post-vaccine fever and swelling. Feel free to book a vaccination appointment online or via WhatsApp."
    },
    {
      keywords: ['speech', 'talking', 'words', 'milestone', 'talk'],
      reply: "Language guide: By 12 months, babies should babble and wave bye-bye. By 18 months, speak 6–10 single words. By 24 months, combine 2 words ('more milk'). If you notice loss of words or lack of response to name, schedule a developmental evaluation with Dr. Vishnuvardhan."
    },
    {
      keywords: ['timing', 'timings', 'hour', 'hours', 'open', 'sunday', 'schedule', 'when', 'visiting', 'appointment', 'slot', 'day'],
      reply: "Presently, in-person clinic visits and consultations are held exclusively on Sundays from 10:00 AM to 06:00 PM. Prior appointment booking is recommended. You can reserve your preferred Sunday slot directly on this page or message our care desk on WhatsApp at +91 98765 43210."
    }
  ];

  if (chatForm && chatInput) {
    chatForm.addEventListener('submit', async event => {
      event.preventDefault();
      const question = chatInput.value.trim();
      if (!question) return;

      appendChatMessage(question, 'user');
      chatInput.value = '';

      const sendBtn = chatForm.querySelector('.chat-send-btn');
      if (sendBtn) sendBtn.disabled = true;

      const thinkingMsg = appendChatMessage('Consulting clinical pearls…', 'status');

      // Check if backend worker is configured, otherwise provide smart offline fallback
      if (chatEndpoint && !chatEndpoint.includes('YOUR-WORKER')) {
        try {
          const response = await fetch(chatEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: question })
          });
          const data = await response.json();
          thinkingMsg?.remove();
          appendChatMessage(data.reply || 'Thank you for your question. For medical triage, please call our clinic directly.', 'bot');
        } catch {
          thinkingMsg?.remove();
          appendChatMessage('I am having trouble reaching the AI server. Please feel free to WhatsApp our care desk directly at +91 98765 43210.', 'bot');
        } finally {
          if (sendBtn) sendBtn.disabled = false;
        }
      } else {
        // Smart offline pediatric FAQ matcher
        setTimeout(() => {
          thinkingMsg?.remove();
          const lowerQ = question.toLowerCase();
          const matched = educationalFaqs.find(item => item.keywords.some(k => lowerQ.includes(k)));
          if (matched) {
            appendChatMessage(matched.reply, 'bot');
          } else {
            appendChatMessage(
              "Thank you for asking! For specific medical diagnosis, dosage, or tailored advice for your child, please chat with our front desk team on WhatsApp (+91 98765 43210) or book a consult with Dr. Vishnuvardhan K at our Vikarabad clinic (4-1-479, Opp. Raghavendra Swamy temple, APHB Colony Phase -II, MIG-80, Alampally Road).",
              'bot'
            );
          }
          if (sendBtn) sendBtn.disabled = false;
        }, 600);
      }
    });
  }
});
