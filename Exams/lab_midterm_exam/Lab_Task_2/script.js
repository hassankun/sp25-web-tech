document.getElementById('checkoutForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;
    const form = e.target;
    const fields = ['fullname', 'email', 'phone', 'address', 'cardnumber', 'expiry', 'cvv'];
  
    fields.forEach(field => {
      const input = form[field];
      const errorDiv = document.getElementById(`${field}Error`);
      input.classList.remove('invalid');
      errorDiv.textContent = '';
  
      if (!input.checkValidity()) {
        input.classList.add('invalid');
        errorDiv.textContent = input.validationMessage;
        valid = false;
      }
  
      if (field === 'expiry') {
        const now = new Date();
        const inputDate = new Date(input.value);
        if (inputDate < now) {
          input.classList.add('invalid');
          errorDiv.textContent = 'Expiry date must be in the future';
          valid = false;
        }
      }
    });
  
    if (valid) {
      alert('Form submitted successfully!');
      form.reset();
    }
  });
  