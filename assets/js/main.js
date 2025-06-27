/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

/**
 * AJAX contact form submission 
 */
/**
 * CLEAN Contact Form - Remove any duplicate scripts first!
 */

// Remove any existing event listeners first
const contactForm = document.querySelector('.php-email-form');

if (contactForm) {
  // Clone the form to remove all existing event listeners
  const newForm = contactForm.cloneNode(true);
  contactForm.parentNode.replaceChild(newForm, contactForm);
  
  // Now add our clean event listener to the new form
  newForm.addEventListener('submit', function (e) {
    e.preventDefault();
    
    console.log('Form submitted - clean handler');

    const formData = new FormData(newForm);
    const action = newForm.getAttribute('action');

    const loadingEl = newForm.querySelector('.loading');
    const errorEl = newForm.querySelector('.error-message');
    const successEl = newForm.querySelector('.sent-message');

    console.log('Elements found:', {
      loading: !!loadingEl,
      error: !!errorEl,
      success: !!successEl
    });

    // FORCE HIDE ALL MESSAGES
    if (loadingEl) {
      loadingEl.style.display = 'block';
      loadingEl.style.visibility = 'visible';
    }
    if (errorEl) {
      errorEl.style.display = 'none';
      errorEl.style.visibility = 'hidden';
      errorEl.textContent = '';
      errorEl.innerHTML = '';
    }
    if (successEl) {
      successEl.style.display = 'none';
      successEl.style.visibility = 'hidden';
      successEl.textContent = '';
      successEl.innerHTML = '';
    }

    fetch(action, {
      method: 'POST',
      body: formData
    })
    .then(response => response.text())
    .then(text => {
      console.log('Raw response:', text);
      
      // Hide loading
      if (loadingEl) {
        loadingEl.style.display = 'none';
        loadingEl.style.visibility = 'hidden';
      }
      
      // Parse JSON
      let data;
      try {
        data = JSON.parse(text.trim());
        console.log('Parsed data:', data);
      } catch (e) {
        console.error('JSON parse failed:', e);
        if (errorEl) {
          errorEl.textContent = 'Invalid server response';
          errorEl.style.display = 'block';
          errorEl.style.visibility = 'visible';
        }
        return;
      }

      // Handle response
      if (data.status === 'success') {
        console.log('Success response received');
        if (successEl) {
          successEl.textContent = data.message;
          successEl.style.display = 'block';
          successEl.style.visibility = 'visible';
        }
        // ENSURE error is hidden
        if (errorEl) {
          errorEl.style.display = 'none';
          errorEl.style.visibility = 'hidden';
          errorEl.textContent = '';
        }
        newForm.reset();
      } else {
        console.log('Error response received');
        if (errorEl) {
          errorEl.textContent = data.message || 'Form submission failed.';
          errorEl.style.display = 'block';
          errorEl.style.visibility = 'visible';
        }
        // ENSURE success is hidden
        if (successEl) {
          successEl.style.display = 'none';
          successEl.style.visibility = 'hidden';
          successEl.textContent = '';
        }
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
      if (loadingEl) {
        loadingEl.style.display = 'none';
        loadingEl.style.visibility = 'hidden';
      }
      if (errorEl) {
        errorEl.textContent = 'Network error occurred. Please try again.';
        errorEl.style.display = 'block';
        errorEl.style.visibility = 'visible';
      }
      if (successEl) {
        successEl.style.display = 'none';
        successEl.style.visibility = 'hidden';
        successEl.textContent = '';
      }
    });
  });
}

})();