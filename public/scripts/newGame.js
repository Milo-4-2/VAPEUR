// Get the form element for adding a new game
const form = document.getElementById("newGame");

// Add an event listener to handle the form submission
form.addEventListener("submit", async function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Extract values from the input fields
    const name = document.getElementById("name").value; // Game name
    const description = document.getElementById("description").value; // Game description
    const releaseDate = document.getElementById("releaseDate").value; // Release date
    const editor = document.getElementById("editor").value; // Selected editor ID
    const genre = document.getElementById("genre").value; // Selected genre ID
    const cover = document.getElementById("cover").files[0]; // Uploaded cover image

    // Create a FormData object to hold the input values
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("releaseDate", releaseDate);
    formData.append("editor", editor);
    formData.append("genre", genre);
    formData.append("cover", cover);

    // Validate the form inputs
    if (editor == 0) {
        // Alert the user if no editor is selected
        alert("Please select an editor.\nIf the editor isn't in the list, you will need to add it manually on the dedicated page.");
    }

    if (genre == 0) {
        // Alert the user if no genre is selected
        alert("Please select a genre.");
    }

    // Proceed with the form submission if both editor and genre are selected
    if (editor != 0 && genre != 0) {
        // Send the new game data to the server via a POST request
        const response = await fetch("/submit-game", {
            method: "POST",
            body: formData,
        });

        // Handle the server's response
        if (response.ok) {
            // Notify the user of success and redirect to the home page
            alert("Game added successfully!");
            window.location.href = `/`;
        } else {
            // Parse and display the error message from the server
            const error = await response.json();
            alert(`Error: ${error.message}`);
        }
    }
});
