// Theme Switcher
const themeSwitch = document.querySelector('.theme-switch');
if (themeSwitch) {
  themeSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('solarTheme', document.body.classList.contains('dark') ? 'dark' : '');
    themeSwitch.innerHTML = document.body.classList.contains('dark') ? '🌞' : '🌙';
  });
  window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('solarTheme') === 'dark') {
      document.body.classList.add('dark');
      themeSwitch.innerHTML = '🌞';
    } else {
      themeSwitch.innerHTML = '🌙';
    }
    document.body.classList.add('fade-in');
  });
}

// Page Transition on Nav Clicks
document.querySelectorAll('.navbar ul a').forEach(link => {
  link.addEventListener('click', function(e) {
    if (link.classList.contains('active') || link.href.startsWith('#')) return;
    e.preventDefault();
    document.body.classList.remove('fade-in');
    document.body.classList.add('fade-out');
    setTimeout(() => { window.location = link.href; }, 350);
  });
});

// Button ripple for all .button and .contact-form button
document.querySelectorAll('.button, .contact-form button').forEach(btn => {
  btn.addEventListener('click', function(e) {
    btn.classList.remove('ripple');
    void btn.offsetWidth;
    btn.classList.add('ripple');
    setTimeout(() => btn.classList.remove('ripple'), 410);
  });
});

// Modal System
function showModal(title, content) {
  const overlay = document.getElementById('modal-overlay');
  const modal = document.getElementById('modal');
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-content').innerHTML = content;
  overlay.style.display = 'block';
  setTimeout(() => overlay.style.opacity = 1, 0);
}
function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  overlay.style.opacity = 0;
  setTimeout(() => overlay.style.display = 'none', 400);
}
if (document.getElementById('modal-close')) {
  document.getElementById('modal-close').onclick = closeModal;
}
window.showAboutModal = () => {
  showModal("About Solar Purify", `
    <p>
      Solar Purify is dedicated to providing clean, safe water powered by the sun.<br>
      Our mission is to empower communities and protect the planet with sustainable innovation.<br>
      <strong>Email:</strong> nabeelabdulhamid16@gmail.com<br>
      <strong>Phone:</strong> 0720836861
    </p>
  `);
};

// Notification System
window.notify = function(msg, type="success") {
  const notif = document.createElement('div');
  notif.className = `notif ${type}`;
  notif.textContent = msg;
  document.getElementById('notifications').appendChild(notif);
  setTimeout(() => notif.style.opacity = 0, 2600);
  setTimeout(() => notif.remove(), 3100);
};

// AJAX Contact Form
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e){
    e.preventDefault();
    const data = {
      name: contactForm.name.value,
      email: contactForm.email.value,
      message: contactForm.message.value
    };
    contactForm.querySelector('button').disabled = true;
    // Simulate AJAX
    setTimeout(() => {
      contactForm.querySelector('button').disabled = false;
      contactForm.reset();
      notify("Message sent! We'll reply soon.", "success");
    }, 900);
  });
}

// Live Chat Widget (demo)
function chatScroll() {
  const chatMsgCont = document.getElementById('chat-messages');
  chatMsgCont.scrollTop = chatMsgCont.scrollHeight;
}
function chatBotReply(msg) {
  setTimeout(() => {
    const reply = document.createElement('div');
    reply.className = "chat-msg";
    reply.textContent = "Solar Purify Bot: " + (msg.toLowerCase().includes("hello") ? "Hello! How can I help you?" : "We'll get back to you with details soon.");
    document.getElementById('chat-messages').appendChild(reply);
    chatScroll();
  }, 800);
}
if (document.getElementById('chat-send')) {
  document.getElementById('chat-send').onclick = function() {
    const input = document.getElementById('chat-input');
    if (!input.value.trim()) return;
    const msg = document.createElement('div');
    msg.className = "chat-msg user";
    msg.textContent = input.value;
    document.getElementById('chat-messages').appendChild(msg);
    chatBotReply(input.value);
    input.value = "";
    chatScroll();
  };
  document.getElementById('chat-input').onkeydown = function(e) {
    if (e.key === "Enter") { document.getElementById('chat-send').click(); }
  };
  document.getElementById('chat-close').onclick = function() {
    document.getElementById('chat-widget').style.display = "none";
    document.getElementById('chat-btn').style.display = "block";
  };
  document.getElementById('chat-btn').onclick = function() {
    document.getElementById('chat-widget').style.display = "flex";
    document.getElementById('chat-btn').style.display = "none";
  };
}// Animate cards on scroll (intersection observer)
document.querySelectorAll('.feature-card, .about-card, .benefit-card').forEach((card, i) => {
  card.style.setProperty('--delay', `${i * 0.09}s`);
  card.classList.remove('animated');
});
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
    }
  });
}, { threshold: 0.18 });
document.querySelectorAll('.feature-card, .about-card, .benefit-card').forEach(card => observer.observe(card));