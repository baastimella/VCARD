/* ============================================
   VCARD - Digital Contact Card
   JavaScript Logic
   ============================================ */

// ─── Contact Data (Edit this object with your info) ───
const contactData = {
  // Personal
  firstName: 'Rolando',
  lastName: 'Silva',
  fullName: 'Rolando Silva',
  title: 'CEO Fundador',
  company: 'Gestio',
  bio: 'Entregamos soluciones a Pymes y Empresas para que puedan impulsar la transformación digital mediante tecnologia inteligente, automatización y analisis de datos, permitiendo a nuestros clientes controlar su negocio, optimizar sus procesos y tener información eficaz y oportuna.',

  // Contact
  phone: '+56 9 2878 6139',
  phoneClean: '56928786139',
  email: 'rsilva@gestio.pro',
  website: 'https://gestio.pro',
  address: 'Antonio Varas 854, Temuco, Chile',
  addressMap: 'https://www.google.com/maps/place/Antonio+Varas+854,+Temuco,+Araucan%C3%ADa/@-38.7406869,-72.5926986,726m/data=!3m2!1e3!4b1!4m6!3m5!1s0x9614d3de0b4af34d:0xb5c30f5cecf32a9d!8m2!3d-38.7406869!4d-72.5901183!16s%2Fg%2F11lg2krtvy?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D',
  calendarUrl: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1YZ6mgmklSUwVek7bLF1GsSGkHDFhnGw7btJe0vNFbQTA_MMQmL0j7nCjCJtE7tCdbj3LwXD4W',
  videoUrl: 'https://www.youtube.com/embed/VfkN70YAM2Y',

  // Social
  whatsapp: '56928786139',
  whatsappMessage: '¡Hola Rolando! Vi tu tarjeta de contacto y me gustaría conectar contigo.',
  linkedin: '',
  instagram: 'https://www.instagram.com/somos_gestio/?__pwa=1#',
  facebook: '',
  twitter: '',
  tiktok: 'https://www.tiktok.com/@somos_gestio',
  youtube: 'https://www.youtube.com/@Somos_Gestiopro',

  // Card
  cardUrl: window.location.href,
  avatarUrl: 'assets/fotorolando.png',
  bannerUrl: 'assets/fondogestio.jpeg',
};

// ─── Initialize ───
document.addEventListener('DOMContentLoaded', () => {
  renderCard();
  generateQRCode();
  bindEvents();
});

// ─── Render Card Content ───
function renderCard() {
  // Page title
  document.title = `${contactData.fullName} - Tarjeta de Contacto`;

  // Banner
  const bannerImg = document.getElementById('bannerImg');
  if (bannerImg) bannerImg.src = contactData.bannerUrl;

  // Avatar
  const avatarImg = document.getElementById('avatarImg');
  if (avatarImg) {
    avatarImg.src = contactData.avatarUrl;
    avatarImg.alt = contactData.fullName;
  }

  // Info
  setText('profileName', contactData.fullName);
  setText('profileTitle', contactData.title);
  setText('profileCompany', contactData.company);
  setText('profileBio', contactData.bio);

  // Contact Details
  setText('detailPhone', contactData.phone);
  setText('detailEmail', contactData.email);
  setText('detailCompany', contactData.company);
  setText('detailAddress', contactData.address);
  setText('detailWebsite', contactData.website.replace(/^https?:\/\/(www\.)?/, ''));

  // Social Links - hide section if empty
  const hasSocials = Boolean(
    contactData.linkedin ||
    contactData.instagram ||
    contactData.facebook ||
    contactData.twitter ||
    contactData.tiktok ||
    contactData.youtube
  );
  const socialsSection = document.querySelector('.vcard__socials');
  if (socialsSection) {
    socialsSection.style.display = hasSocials ? '' : 'none';
    const prevDivider = socialsSection.previousElementSibling;
    if (prevDivider && prevDivider.classList.contains('vcard__divider')) {
      prevDivider.style.display = hasSocials ? '' : 'none';
    }
  }

  setSocialLink('socialLinkedin', contactData.linkedin);
  setSocialLink('socialInstagram', contactData.instagram);
  setSocialLink('socialFacebook', contactData.facebook);
  setSocialLink('socialTwitter', contactData.twitter);
  setSocialLink('socialTiktok', contactData.tiktok);
  setSocialLink('socialYoutube', contactData.youtube);
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el && value) el.textContent = value;
}

function setSocialLink(id, url) {
  const el = document.getElementById(id);
  if (!el) return;
  if (url) {
    el.href = url;
    el.style.display = '';
  } else {
    el.style.display = 'none';
  }
}

// ─── Event Bindings ───
function bindEvents() {
  // Save Contact
  const saveBtn = document.getElementById('btnSaveContact');
  if (saveBtn) saveBtn.addEventListener('click', downloadVCard);

  // Share Button
  const shareBtn = document.getElementById('btnShare');
  if (shareBtn) shareBtn.addEventListener('click', openShareModal);

  // Quick Actions
  document.getElementById('qaPhone')?.addEventListener('click', () => {
    if (contactData.phoneClean) window.open(`tel:${contactData.phoneClean}`);
  });

  document.getElementById('qaEmail')?.addEventListener('click', () => {
    if (contactData.email && contactData.email !== 'Ingresar:') window.open(`mailto:${contactData.email}`);
  });

  document.getElementById('qaWhatsapp')?.addEventListener('click', () => {
    if (contactData.whatsapp) openWhatsApp();
  });

  document.getElementById('qaWebsite')?.addEventListener('click', () => {
    if (contactData.website && contactData.website !== 'Ingresar:') window.open(contactData.website, '_blank');
  });

  document.getElementById('qaCalendar')?.addEventListener('click', () => {
    if (contactData.calendarUrl) window.open(contactData.calendarUrl, '_blank');
  });

  // Share Modal
  document.getElementById('modalOverlay')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeShareModal();
  });

  document.getElementById('modalClose')?.addEventListener('click', closeShareModal);
  document.getElementById('shareWhatsapp')?.addEventListener('click', shareViaWhatsApp);
  document.getElementById('shareCopyLink')?.addEventListener('click', copyCardLink);
  document.getElementById('shareNative')?.addEventListener('click', shareNative);

  // Contact detail rows
  document.getElementById('detailPhoneRow')?.addEventListener('click', () => {
    if (contactData.phoneClean) window.open(`tel:${contactData.phoneClean}`);
  });

  document.getElementById('detailEmailRow')?.addEventListener('click', () => {
    if (contactData.email && contactData.email !== 'Ingresar:') window.open(`mailto:${contactData.email}`);
  });

  document.getElementById('detailCalendarRow')?.addEventListener('click', () => {
    if (contactData.calendarUrl) window.open(contactData.calendarUrl, '_blank');
  });

  document.getElementById('detailWebsiteRow')?.addEventListener('click', () => {
    if (contactData.website && contactData.website !== 'Ingresar:') window.open(contactData.website, '_blank');
  });

  // Lead Form Modal ("Déjanos tus datos y te contactamos")
  document.getElementById('btnOpenLeadModal')?.addEventListener('click', openLeadModal);
  document.getElementById('leadModalClose')?.addEventListener('click', closeLeadModal);
  document.getElementById('leadModalOverlay')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeLeadModal();
  });
  document.getElementById('leadForm')?.addEventListener('submit', handleLeadSubmit);

  // Keyboard: Escape closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeShareModal();
      closeLeadModal();
    }
  });
}

function openLeadModal() {
  const overlay = document.getElementById('leadModalOverlay');
  if (overlay) {
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

function closeLeadModal() {
  const overlay = document.getElementById('leadModalOverlay');
  if (overlay) {
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }
}

async function handleLeadSubmit(e) {
  e.preventDefault();

  const submitBtn = document.getElementById('btnSubmitLead');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Guardando...</span>';
  }

  const name = document.getElementById('leadName')?.value.trim();
  const company = document.getElementById('leadCompany')?.value.trim();
  const email = document.getElementById('leadEmail')?.value.trim();
  const phone = document.getElementById('leadPhone')?.value.trim();

  if (!name || !company || !email || !phone) {
    showToast('Por favor completa todos los campos obligatorios', 'fa-solid fa-circle-exclamation');
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> <span>Guardar</span>';
    }
    return;
  }

  const newLead = {
    name,
    company,
    email,
    phone,
    origen: 'Codigo promocional',
    timestamp: new Date().toISOString()
  };

  // 1. Save backup to localStorage
  try {
    const leads = JSON.parse(localStorage.getItem('gestio_leads') || '[]');
    leads.push(newLead);
    localStorage.setItem('gestio_leads', JSON.stringify(leads));
  } catch (err) {
    console.warn('LocalStorage unavailable', err);
  }

  // 2. Post lead to CRM gestiodemo.gestio.pro API with await
  try {
    const params = new URLSearchParams();
    params.append('nombre', name);
    params.append('empresa', company);
    params.append('email', email);
    params.append('telefono', phone);
    params.append('origen', 'Codigo promocional - Tarjeta Digital');

    const response = await fetch('https://gestiodemo.gestio.pro/api/crm/registrar_lead_publico.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: params.toString()
    });

    const resJson = await response.json();
    console.log('CRM Lead Registration Response:', resJson);
  } catch (err) {
    console.error('Error posting lead to CRM:', err);
  }

  // 3. Show confirmation message
  showToast('¡Datos enviados con éxito! Redirigiendo a Gestio...', 'fa-solid fa-circle-check');

  closeLeadModal();
  e.target.reset();

  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> <span>Guardar</span>';
  }

  // 4. Redirect to Gestio homepage after 2.5 seconds
  setTimeout(() => {
    window.location.href = 'https://gestio.pro';
  }, 2500);
}

// ─── vCard Generation & Download ───
function downloadVCard() {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${contactData.fullName}`,
    `N:${contactData.lastName};${contactData.firstName};;;`,
    `TITLE:${contactData.title}`,
    `ORG:${contactData.company}`,
    `TEL;TYPE=CELL:${contactData.phoneClean}`,
    `EMAIL;TYPE=INTERNET:${contactData.email}`,
    contactData.website ? `URL:${contactData.website}` : '',
    contactData.address ? `ADR;TYPE=WORK:;;${contactData.address};;;;` : '',
    contactData.linkedin ? `X-SOCIALPROFILE;TYPE=linkedin:${contactData.linkedin}` : '',
    contactData.instagram ? `X-SOCIALPROFILE;TYPE=instagram:${contactData.instagram}` : '',
    contactData.facebook ? `X-SOCIALPROFILE;TYPE=facebook:${contactData.facebook}` : '',
    `NOTE:${contactData.bio}`,
    'END:VCARD',
  ]
    .filter(Boolean)
    .join('\r\n');

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${contactData.fullName.replace(/\s+/g, '_')}.vcf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  showToast('Contacto descargado', 'fa-solid fa-check');
}

// ─── WhatsApp ───
function openWhatsApp() {
  const msg = encodeURIComponent(contactData.whatsappMessage);
  window.open(`https://wa.me/${contactData.whatsapp}?text=${msg}`, '_blank');
}

// ─── Share Functions ───
function openShareModal() {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) {
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  // Hide native share option if not supported
  const nativeBtn = document.getElementById('shareNative');
  if (nativeBtn) {
    nativeBtn.style.display = navigator.share ? '' : 'none';
  }
}

function closeShareModal() {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) {
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }
}

function shareViaWhatsApp() {
  const text = encodeURIComponent(
    `¡Mira la tarjeta de contacto de ${contactData.fullName}! ${contactData.cardUrl}`
  );
  window.open(`https://wa.me/?text=${text}`, '_blank');
  closeShareModal();
}

function copyCardLink() {
  navigator.clipboard
    .writeText(contactData.cardUrl)
    .then(() => {
      showToast('Enlace copiado al portapapeles', 'fa-solid fa-link');
      closeShareModal();
    })
    .catch(() => {
      // Fallback
      const input = document.createElement('input');
      input.value = contactData.cardUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      showToast('Enlace copiado', 'fa-solid fa-link');
      closeShareModal();
    });
}

async function shareNative() {
  try {
    await navigator.share({
      title: `${contactData.fullName} - Tarjeta de Contacto`,
      text: `Contacto de ${contactData.fullName} — ${contactData.title}`,
      url: contactData.cardUrl,
    });
    closeShareModal();
  } catch (err) {
    if (err.name !== 'AbortError') {
      copyCardLink(); // Fallback to copy
    }
  }
}

// ─── QR Code ───
function generateQRCode() {
  const container = document.getElementById('qrCode');
  if (!container) return;

  // Check if qrcode library is loaded
  if (typeof QRCode !== 'undefined') {
    new QRCode(container, {
      text: contactData.cardUrl,
      width: 144,
      height: 144,
      colorDark: '#0f172a',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.M,
    });
  } else {
    // Fallback: use external API
    const img = document.createElement('img');
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=144x144&data=${encodeURIComponent(contactData.cardUrl)}&color=0f172a`;
    img.alt = 'QR Code';
    img.style.width = '144px';
    img.style.height = '144px';
    container.appendChild(img);
  }
}

// ─── Toast Notification ───
function showToast(message, icon = 'fa-solid fa-circle-check') {
  // Remove existing toast
  const existing = document.querySelector('.vcard-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'vcard-toast';
  toast.innerHTML = `<i class="${icon}"></i> ${message}`;
  document.body.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });
  });

  // Auto-hide
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 2800);
}
