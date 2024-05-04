function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
}

var bodycopyElements = document.querySelectorAll('.bodycopy');
window.addEventListener('scroll', function () {
  bodycopyElements.forEach(function (bodycopy) {
    if (isElementInViewport(bodycopy)) {
      bodycopy.classList.add('visible');
    }
  });
});

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
}

var aboutImgs = document.querySelectorAll('.about-img img');

window.addEventListener('scroll', function () {
  aboutImgs.forEach(function (img) {
    if (isElementInViewport(img)) {
      img.parentElement.classList.add('visible');
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    document.querySelector('.content h1').style.opacity = '1';
  }, 500);

  setTimeout(function () {
    document.querySelector('.content h2').style.opacity = '1';
  }, 1000);

  setTimeout(function () {
    document.querySelector('.content p').style.opacity = '1';
  }, 1500);

  setTimeout(function () {
    document.querySelector('.content .cta').style.opacity = '1';
  }, 2000);
});

document.addEventListener('DOMContentLoaded', function () {
  var galleryContainer = document.querySelector('.container-galleryy');
  var galleryOffset = galleryContainer.offsetTop - window.innerHeight + 100; // Menambahkan margin 100px

  function checkGallery() {
    if (window.scrollY > galleryOffset) {
      galleryContainer.classList.add('show');
    } else {
      galleryContainer.classList.remove('show'); // Menghapus kelas 'show' ketika scroll ke atas
    }
  }

  window.addEventListener('scroll', checkGallery);
});
