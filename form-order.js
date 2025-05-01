document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
        document.querySelector('nav').classList.toggle('active');
        this.classList.toggle('active');
    });
    
    const packageCards = document.querySelectorAll('.package-card');
    const quantityInputs = document.querySelectorAll('.quantity-input');
    const increaseButtons = document.querySelectorAll('.increase');
    const decreaseButtons = document.querySelectorAll('.decrease');
    const servingsCounter = document.getElementById('servingsCounter');
    const submitBtn = document.getElementById('submitBtn');
    
    let selectedPackage = null;
    let maxServings = 0;
    

    quantityInputs.forEach(input => {
        input.addEventListener('input', function() {
            updateServingsCounter();
        });
    });


    // Package selection
    packageCards.forEach(card => {
        card.addEventListener('click', function() {
            packageCards.forEach(c => c.classList.remove('selected'));
            
            this.classList.add('selected');
            
            selectedPackage = this.dataset.package;
            maxServings = parseInt(this.dataset.servings);
            const packagePrice = this.dataset.price;
            
            document.getElementById('selectedPackage').value = selectedPackage;
            document.getElementById('totalServings').value = maxServings;
            document.getElementById('packagePrice').value = packagePrice;
            
            quantityInputs.forEach(input => {
                input.value = 0;
            });
            
            updateServingsCounter();
            
            enableFlavorSelection();
        });
    });
    
    increaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!selectedPackage) {
                alert('Please select a package first');
                return;
            }
            
            const input = this.parentElement.querySelector('.quantity-input');
            const currentValue = parseInt(input.value);
            const currentTotal = calculateTotalServings();
            
            if (currentTotal < maxServings) {
                input.value = currentValue + 1;
                updateServingsCounter();
            }
        });
    });
    
    decreaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('.quantity-input');
            const currentValue = parseInt(input.value);
            
            if (currentValue > 0) {
                input.value = currentValue - 1;
                updateServingsCounter();
            }
        });
    });
    
    function calculateTotalServings() {
        let total = 0;
        quantityInputs.forEach(input => {
            total += input.value ? parseInt(input.value) : 0;
        });
        return total;
    }

    function updateServingsCounter() {
        if (!selectedPackage) {
            servingsCounter.textContent = 'Please select a package first';
            servingsCounter.classList.remove('error');
            submitBtn.disabled = true;
            return;
        }
        
        const currentTotal = calculateTotalServings();
        const remaining = maxServings - currentTotal;
        
        if (remaining === 0) {
            servingsCounter.textContent = `Perfect! You've selected all ${maxServings} servings.`;
            servingsCounter.classList.remove('error');
            submitBtn.disabled = false;
        } else if (remaining > 0) {
            servingsCounter.textContent = `You need to select ${remaining} more servings to complete your order.`;
            servingsCounter.classList.remove('error');
            submitBtn.disabled = true;
        } else {
            servingsCounter.textContent = `You've selected ${Math.abs(remaining)} too many servings. Please adjust your selection.`;
            servingsCounter.classList.add('error');
            submitBtn.disabled = true;
        }
    }
    
    // pilih rasa
    function enableFlavorSelection() {
        quantityInputs.forEach(input => {
            input.readOnly = false;
        });
    }
    
    // Form submission
    document.getElementById('eventBookingForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!selectedPackage) {
            alert('Please select a package');
            return;
        }
        
        const currentTotal = calculateTotalServings();
        if (currentTotal !== maxServings) {
            alert(`Please select exactly ${maxServings} servings in total`);
            return;
        }

        alert('Thank you for your order! We will contact you shortly to confirm the details.');
        
    });
});

document.getElementById('eventBookingForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Biar ga reload page

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const eventAddress = document.getElementById('eventAddress').value;
    const eventDate = document.getElementById('eventDate').value;
    const eventTime = document.getElementById('eventTime').value;
    const selectedPackage = document.getElementById('selectedPackage').value;
    const totalServings = document.getElementById('totalServings').value;
    const packagePrice = document.getElementById('packagePrice').value;
    const specialRequests = document.getElementById('specialRequests').value;

    const flavorKleps = document.querySelector('input[name="flavor_kleps"]').value;
    const flavorMarkisa = document.querySelector('input[name="flavor_markisa"]').value;
    const flavorDelims = document.querySelector('input[name="flavor_delims"]').value;
    const flavorMilo = document.querySelector('input[name="flavor_milo"]').value;

    const message = `
Halo Seroet! 😁

Saya mau booking untuk acara:
- Nama: ${name}
- Nomor HP: ${phone}
- Email: ${email}
- Alamat Acara: ${eventAddress}
- Tanggal Acara: ${eventDate}
- Waktu Acara: ${eventTime}

Pesanan:
- Paket: ${selectedPackage}
- Total Porsi: ${totalServings}
- Harga Paket: Rp ${packagePrice}

Pilihan rasa:
- Es Kleps: ${flavorKleps} porsi
- Es Markisa: ${flavorMarkisa} porsi
- Es Delims: ${flavorDelims} porsi
- Es Milo: ${flavorMilo} porsi

Catatan Tambahan:
${specialRequests}

Terima kasih! 🎉
    `;

    const encodedMessage = encodeURIComponent(message);

    const whatsappNumber = "6281818220405";

    // window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
    window.open(`https://api.whatsapp.com/send/?phone=${whatsappNumber}&text=${encodedMessage}&type=phone_number&app_absent=0`, "_blank");

});