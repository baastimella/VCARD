/* ============================================
   VCARD - Digital Contact Card
   JavaScript Logic
   ============================================ */

// ─── Contact Data (Edit this object with your info) ───
const contactData = {
  // Personal
  firstName: 'Ingresar:',
  lastName: '',
  fullName: 'Ingresar:',
  title: 'Ingresar:',
  company: 'Ingresar:',
  bio: 'Ingresar:',

  // Contact
  phone: 'Ingresar:',
  phoneClean: '',
  email: 'Ingresar:',
  website: 'Ingresar:',
  address: 'Ingresar:',
  addressMap: '',

  // Social
  whatsapp: '',
  whatsappMessage: '',
  linkedin: '',
  instagram: '',
  facebook: '',
  twitter: '',
  tiktok: '',
  youtube: '',

  // Card
  cardUrl: window.location.href,
  avatarUrl: 'assets/fotorolando.png',
  bannerUrl: 'assets/banner.jpg',
};

// ─── Initialize ───
document.addEventListener('DOMContentLoaded', () => {
  renderCard();
  generateQRCode();
  bindEvents();
});

// ─── Render Card Content ───
function renderCard() {
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

  document.getElementById('qaMap')?.addEventListener('click', () => {
    if (contactData.addressMap) window.open(contactData.addressMap, '_blank');
  });

  document.getElementById('qaLinkedin')?.addEventListener('click', () => {
    if (contactData.linkedin) window.open(contactData.linkedin, '_blank');
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

  document.getElementById('detailWebsiteRow')?.addEventListener('click', () => {
    if (contactData.website && contactData.website !== 'Ingresar:') window.open(contactData.website, '_blank');
  });

  document.getElementById('detailAddressRow')?.addEventListener('click', () => {
    if (contactData.addressMap) window.open(contactData.addressMap, '_blank');
  });

  // Keyboard: Escape closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeShareModal();
  });
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
