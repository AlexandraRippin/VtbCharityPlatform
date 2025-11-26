document.addEventListener('DOMContentLoaded', function() {
    initializeAmountSelection();
    initializeFormStyling();
});

function initializeAmountSelection() {
    const amountOptions = document.querySelectorAll('.amount-option');
    const amountInput = document.querySelector('#id_amount');

    if (!amountOptions.length || !amountInput) return;

    amountOptions.forEach(option => {
        option.addEventListener('click', function() {
            amountOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            amountInput.value = this.getAttribute('data-amount');
            amountInput.focus();
        });
    });

    amountInput.addEventListener('input', function() {
        amountOptions.forEach(opt => opt.classList.remove('selected'));

        const inputValue = this.value;
        amountOptions.forEach(option => {
            if (option.getAttribute('data-amount') === inputValue) {
                option.classList.add('selected');
            }
        });
    });

    if (amountInput.value) {
        amountOptions.forEach(option => {
            if (option.getAttribute('data-amount') === amountInput.value) {
                option.classList.add('selected');
            }
        });
    }
}

function initializeFormStyling() {
    const donorNameInput = document.querySelector('#id_donor_name');
    const amountInput = document.querySelector('#id_amount');

    if (donorNameInput) {
        donorNameInput.className = 'form-input';
        if (!donorNameInput.placeholder) {
            donorNameInput.placeholder = 'Как к вам обращаться?';
        }
    }

    if (amountInput) {
        amountInput.className = 'form-input';
        if (!amountInput.placeholder) {
            amountInput.placeholder = 'Введите сумму';
        }
        if (!amountInput.min) {
            amountInput.min = '1';
        }
    }
}

function selectAmount(amount) {
    const amountInput = document.querySelector('#id_amount');
    const amountOptions = document.querySelectorAll('.amount-option');

    if (amountInput) {
        amountInput.value = amount;
    }

    amountOptions.forEach(option => {
        option.classList.remove('selected');
        if (option.getAttribute('data-amount') === amount.toString()) {
            option.classList.add('selected');
        }
    });
}