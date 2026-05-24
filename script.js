// ============= NAVBAR SCROLL =============
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// ============= TYPEWRITER =============
const words = ['Data Analyst', 'Python Developer', 'BI Dashboard Creator', 'SQL Expert', 'Data Storyteller'];
let wi = 0, ci = 0, deleting = false;
const tw = document.getElementById('typewriter');

function type() {
  const word = words[wi];
  if (!deleting) {
    tw.textContent = word.slice(0, ci + 1);
    ci++;
    if (ci === word.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    tw.textContent = word.slice(0, ci - 1);
    ci--;
    if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
  }
  setTimeout(type, deleting ? 60 : 110);
}
type();

// ============= PARTICLES =============
const pc = document.getElementById('particles');
const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981'];
for (let i = 0; i < 30; i++) {
  const p = document.createElement('div');
  p.classList.add('particle');
  const size = Math.random() * 4 + 1;
  const x = Math.random() * 100;
  const dur = Math.random() * 20 + 15;
  const delay = Math.random() * 20;
  const color = colors[Math.floor(Math.random() * colors.length)];
  p.style.cssText = `
    width:${size}px; height:${size}px;
    left:${x}%; bottom:-10px;
    background:${color};
    animation-duration:${dur}s;
    animation-delay:-${delay}s;
    opacity:0.4;
  `;
  pc.appendChild(p);
}

// ============= SCROLL ANIMATIONS =============
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-cat, .project-card, .edu-card, .cert-card, .contact-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);
});

// ============= CONTACT FORM (EmailJS) =============
// ⚠️ Replace these three values with your real EmailJS credentials:
const EMAILJS_PUBLIC_KEY = 's9DkIwQfpS5d-mRWV';      // Account → General → Public Key
const EMAILJS_SERVICE_ID = 'service_hpi3to7';      // Email Services → your service ID
const EMAILJS_TEMPLATE_ID = 'template_d75jki8';     // Email Templates → your template ID

emailjs.init(EMAILJS_PUBLIC_KEY);

document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const btn = this.querySelector('button[type=submit]');
  const name = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const msg = document.getElementById('fmsg').value.trim();

  if (!name || !email || !msg) {
    alert('Please fill in all fields before sending.');
    return;
  }

  btn.textContent = '⏳ Sending...';
  btn.disabled = true;

  const now = new Date();
  const datetime = now.toLocaleString('en-IN', {
    day: '2-digit', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: true, timeZone: 'Asia/Kolkata'
  });

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    name: name,
    email: email,
    message: msg,
    time: datetime
  }).then(() => {
    btn.textContent = '✅ Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    this.reset();
    setTimeout(() => {
      btn.textContent = 'Send Message ➤';
      btn.style.background = '';
      btn.disabled = false;
    }, 4000);
  }).catch((err) => {
    console.error('EmailJS error:', err);
    btn.textContent = '❌ Failed — Try Again';
    btn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
    btn.disabled = false;
    setTimeout(() => {
      btn.textContent = 'Send Message ➤';
      btn.style.background = '';
    }, 4000);
  });
});

// ============= SMOOTH ACTIVE NAV =============
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'white' : '';
  });
});

// ============= HAMBURGER =============
document.getElementById('hamburger').addEventListener('click', () => {
  const links = document.querySelector('.nav-links');
  links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
  links.style.flexDirection = 'column';
  links.style.position = 'absolute';
  links.style.top = '70px';
  links.style.right = '24px';
  links.style.background = 'rgba(5,8,22,0.95)';
  links.style.padding = '16px 24px';
  links.style.borderRadius = '12px';
  links.style.border = '1px solid rgba(255,255,255,0.1)';
  links.style.backdropFilter = 'blur(20px)';
});
