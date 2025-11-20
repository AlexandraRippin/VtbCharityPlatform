document.addEventListener('DOMContentLoaded', function() {
    animateElements();
    setupButtonInteractions();
    showAdditionalInfo();
});

function animateElements() {
    const elements = document.querySelectorAll('.success-card, .donation-details, .action-buttons');

    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';

        setTimeout(() => {
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 200 * index);
    });
}

function setupButtonInteractions() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 15px rgba(0,0,0,0.1)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
        button.style.transition = 'all 0.3s ease';
    });
}
