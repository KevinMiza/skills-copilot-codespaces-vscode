function skillsMember() {
	// Load the skills from the server
	$.ajax({
		url: '/api/skills',
		type: 'GET',
		success: function(data) {
			// Clear the old skills
			$('#skills').empty();
			// Add the new skills
			for (var i=0; i<data.length; i++) {
				$('#skills').append('<div class="skill"><h3>' + data[i].name + '</h3><p>' + data[i].description + '</p></div>');
			}
		}
	});
}