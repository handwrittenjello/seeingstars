// Global variables
let images = [];
const grid = document.getElementById('gallery-grid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxSubtitle = document.getElementById('lightbox-subtitle');

// Load gallery data from JSON
async function loadGallery() {
  try {
    const response = await fetch('/data/gallery.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    images = data.images || [];
    
    renderGallery();
  } catch (error) {
    console.error('Failed to load gallery:', error);
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-dim);">
        <p>?s??,? Failed to load gallery data</p>
        <p style="margin-top: 1rem; font-size: 0.9rem;">
          Error: ${error.message}
        </p>
        <p style="margin-top: 0.5rem; font-size: 0.85rem; color: var(--text-dim);">
          Expected location: /data/gallery.json
        </p>
      </div>
    `;
  }
}

// Render gallery cards
function renderGallery() {
  if (images.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-dim);">
        <p>No images available yet.</p>
        <p style="margin-top: 1rem;">Add images to <code>/src/assets/images/originals/</code> and run <code>npm run optimize</code></p>
      </div>
    `;
    return;
  }

  grid.innerHTML = images.map((img, index) => `
    <div class="card" onclick="openLightbox(${index})">
      <div class="card-image">
        <img src="${img.thumb}" alt="${img.title}" loading="lazy">
      </div>
      <div class="card-content">
        <h3 class="card-title">${img.title}</h3>
        <p style="color: var(--text-dim); font-size: 0.95rem;">
          ${img.subtitle}
        </p>
      </div>
    </div>
  `).join('');
}

// Lightbox functions
window.openLightbox = (index) => {
  const img = images[index];
  lightboxImg.src = img.full;
  lightboxImg.alt = img.title;
  lightboxTitle.textContent = img.title;
  lightboxSubtitle.textContent = img.subtitle;
  
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeLightbox = () => {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
};

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});

// Close on background click
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Initialize gallery on page load
loadGallery();
