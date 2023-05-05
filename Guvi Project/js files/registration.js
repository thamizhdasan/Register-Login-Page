// Get form element and add event listener for submit
const form = document.querySelector('#registration-form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault(); // prevent form from submitting normally
  
  // Get input values
  const email = document.querySelector('#email').value.trim();
  const userID = document.querySelector('#user-id').value.trim();
  const password = document.querySelector('#password').value;
  const age = document.querySelector('#age').value.trim();
  const dob = document.querySelector('#dob').value.trim();
  const mobile = document.querySelector('#mobile').value.trim();
  
  // Validate inputs
  if (!email || !userID || !password || !age || !dob || !mobile) {
    alert('Please fill in all required fields.');
    return;
  }
  
  if (!validateEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }
  
  if (!validatePassword(password)) {
    alert('Please enter a valid password. Password should be at least 8 characters long.');
    return;
  }
  
  if (!validateAge(age)) {
    alert('Please enter a valid age.');
    return;
  }
  
  if (!validateMobile(mobile)) {
    alert('Please enter a valid mobile number.');
    return;
  }
  
  // Make AJAX request to server
  $.ajax({
    url: 'registration.php',
    type: 'POST',
    data: {
      email: email,
      userID: userID,
      password: password,
      age: age,
      dob: dob,
      mobile: mobile
    },
    success: function(response) {
      alert('Registration successful!');
      form.reset();
    },
    error: function(error) {
      alert('Registration failed. Please try again later.');
    }
  });
}

function validateEmail(email) {
  // Basic email validation using regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  // Password should be at least 8 characters long
  return password.length >= 8;
}

function validateAge(age) {
  // Age should be a positive integer
  const ageRegex = /^\d+$/;
  return ageRegex.test(age) && parseInt(age) > 0;
}

function validateMobile(mobile) {
  // Mobile number should be a 10-digit number
  const mobileRegex = /^\d{10}$/;
  return mobileRegex.test(mobile);
}
