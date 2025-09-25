document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').replace('#', '');
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });

      targetSection.classList.add('glow');
      setTimeout(() => {
        targetSection.classList.remove('glow');
      }, 1000);
    }
  });
});

const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.style.color = '#00d4ff';
    link.style.backgroundColor = 'rgba(0, 212, 255, 0.1)';
    link.style.boxShadow = '0 0 15px #00d4ff';
    link.style.borderRadius = '40px';
    link.style.transition = 'all 0.3s ease';
  });

  link.addEventListener('mouseleave', () => {
    link.style.color = '#fff';
    link.style.backgroundColor = 'transparent';
    link.style.boxShadow = 'none';
  });
});

const avatar = document.querySelector('.avatar');
if (avatar) {
  avatar.addEventListener('mouseenter', () => {
    avatar.style.backgroundColor = '#00aacc';
    avatar.style.boxShadow = '0 0 20px #00d4ff';
  });
  avatar.addEventListener('mouseleave', () => {
    avatar.style.backgroundColor = '#00d4ff';
    avatar.style.boxShadow = 'none'
  });
}

const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, {
  threshold: 0.2
});

sections.forEach(section => {
  section.classList.add('hidden');
  observer.observe(section);
});

const sosmedImages = document.querySelectorAll('.sosmed img');

sosmedImages.forEach(img => {
  img.addEventListener('mouseenter', () => {
    img.style.transform = 'scale(1.3)';
    img.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    img.style.boxShadow = '0 0 20px #00d4ff';
  });

  img.addEventListener('mouseleave', () => {
    img.style.transform = 'scale(1)';
    img.style.boxShadow = 'none';
  });

  img.addEventListener('mousedown', () => {
    img.style.boxShadow = '0 0 30px #00d4ff';
  });

  img.addEventListener('mouseup', () => {
    img.style.boxShadow = '0 0 20px #00d4ff';
  });
});

