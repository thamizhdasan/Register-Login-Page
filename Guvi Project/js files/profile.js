// Display user information on page load
$(document).ready(function() {
	getUserProfile();
});

// Handle click event on "Update Profile" button
$("#update-btn").click(function() {
	// Hide profile information and show update form
	$("#profile").hide();
	$("#update-form").show();
});

// Handle click event on "Cancel" button in update form
$("#cancel-btn").click(function() {
	// Hide update form and show profile information
	$("#update-form").hide();
	$("#profile").show();
});

// Handle click event on "Save Changes" button in update form
$("#save-btn").click(function() {
	// Get updated user information
	var name = $("#name-input").val();
	var email = $("#email-input").val();
	var password = $("#password-input").val();

	// Validate inputs
	if (!name || !email || !password) {
		alert("Please fill in all required fields.");
		return;
	}

	// Send updated user information to server using AJAX
	$.ajax({
		url: "update_profile.php",
		method: "POST",
		data: {
			name: name,
			email: email,
			password: password
		},
		success: function(response) {
			// Show success message and hide update form
			alert("Profile updated successfully!");
			$("#update-form").hide();
			$("#profile").show();
			// Reload user information on page
			getUserProfile();
		},
		error: function(xhr, status, error) {
			// Show error message
			alert("Error updating profile: " + error);
		}
	});
});

// Get user profile information from server using AJAX
function getUserProfile() {
	$.ajax({
		url: "get_profile.php",
		method: "GET",
		success: function(response) {
			// Display user information on page
			$("#profile").html(response);
		},
		error: function(xhr, status, error) {
			// Show error message
			alert("Error getting profile: " + error);
		}
	});
}
