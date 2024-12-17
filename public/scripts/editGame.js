// Get the form element for editing the game
const form = document.getElementById("editGame");

// Add an event listener to handle the form submission
form.addEventListener("submit", async function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Extract values from the input fields
    const id = document.getElementById("gameId").value;
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const releaseDate = document.getElementById("releaseDate").value;
    const editor = document.getElementById("editor").value;
    const genre = document.getElementById("genre").value;

    // Create a FormData object to hold the input values
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("releaseDate", releaseDate);
    formData.append("editor", editor);
    formData.append("genre", genre);

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
        // Send the updated game data to the server
        const response = await fetch("/submit-game-changes", {
            method: "POST",
            body: formData,
        });

        // Handle the server's response
        if (response.ok) {
            // Notify the user of success and redirect to the game's details page
            alert("Game successfully updated!");
            window.location.href = `/game/${id}`;
        } else {
            // Parse and display the error message from the server
            const error = await response.json();
            alert(`Error: ${error.message}`);
        }
    }
});
