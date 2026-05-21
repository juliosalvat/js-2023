const checkbox = document.getElementById('navi-toggle');
const link = document.getElementById('myLink');

if (link) {
    link.addEventListener('click', function(event) {
        if (checkbox) checkbox.checked = false;
    });
}

const thumbModal = document.getElementById('thumb-modal');
if (thumbModal) {
    const modalImage = thumbModal.querySelector('.thumb-modal__image');
    const modalClose = thumbModal.querySelector('.thumb-modal__close');

    const openModal = (src, alt) => {
        modalImage.src = src;
        modalImage.alt = alt || '';
        thumbModal.classList.add('thumb-modal--open');
        thumbModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        thumbModal.classList.remove('thumb-modal--open');
        thumbModal.setAttribute('aria-hidden', 'true');
        modalImage.src = '';
        document.body.style.overflow = '';
    };

    document.querySelectorAll('.thumb-grid__item').forEach(btn => {
        btn.addEventListener('click', () => {
            const src = btn.dataset.full;
            const img = btn.querySelector('img');
            openModal(src, img ? img.alt : '');
        });
    });

    modalClose.addEventListener('click', closeModal);

    thumbModal.addEventListener('click', (event) => {
        if (event.target === thumbModal) closeModal();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && thumbModal.classList.contains('thumb-modal--open')) {
            closeModal();
        }
    });
}