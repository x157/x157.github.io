document.addEventListener('DOMContentLoaded', function () {
  const searchForm = document.getElementById('search-form');
  const searchOverlay = document.getElementById('search-overlay');
  const closeBtn = document.getElementById('close-search');
  const searchFrame = document.getElementById('search-frame');

  if (searchForm) {
    searchForm.addEventListener('submit', function () {
      searchOverlay.style.display = 'flex';
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      searchOverlay.style.display = 'none';
      // Optional: reset frame
      // searchFrame.src = "about:blank"; 
    });
  }

  // Close on click outside content
  searchOverlay.addEventListener('click', function (e) {
    if (e.target === searchOverlay) {
      searchOverlay.style.display = 'none';
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && searchOverlay.style.display === 'flex') {
      searchOverlay.style.display = 'none';
    }
  });
});
