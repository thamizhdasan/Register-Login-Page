// Wait for the DOM to be loaded
$(document).ready(function() {
  // Get form element and add event listener for submit
  const form = $('#login-form');
  form.on('submit', function(event) {
    event.preventDefault(); // prevent form from submitting normally

    // Get input values
    const email = $('#email').val().trim();
    const password = $('#password').val();

    // Validate inputs
    if (!email || !password) {
      alert('Please fill in all required fields.');
      return;
    }

    // Send AJAX request
    $.ajax({
      type: 'POST',
      url: 'login.php',
      data: { email: email, password: password },
      success: function(response) {
        // Handle successful response from backend
        console.log(response);
        alert('Login successful!');
        form.trigger('reset');
      },
      error: function(xhr, status, error) {
        // Handle error response from backend
        console.error(xhr.responseText);
        alert('Login failed. Please try again.');
      }
    });
  });
});
