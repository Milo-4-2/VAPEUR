// Get the "Delete Game" button element
const button = document.getElementById("deleteGameButton");

// Retrieve the game ID from the button's dataset
const id = button.dataset.gameId;

// Check if the game ID exists, and log an error if it's missing
if (!id) {
    console.error("Game ID is missing. Check the data-game-id attribute.");
}

// Add an event listener to handle the button click event
button.addEventListener("click", async function () {
    // Show a confirmation dialog to the user
    const proceed = confirm("Are you sure you want to delete this game?\nThis action cannot be undone.");

    if (proceed) {
        // Create a FormData object to send the game ID to the server
        const formData = new FormData();
        formData.append("id", id);

        // Send the delete request to the server
        const response = await fetch("/delete-game", {
            method: "POST",
            body: formData,
        });

        // Handle the server's response
        if (response.ok) {
            // Notify the user of success and redirect to the homepage
            alert("Game successfully deleted!");
            window.location.href = "/";
        } else {
            // Parse and display the error message from the server
            const error = await response.json();
            alert(`Error: ${error.message}`);
        }
    }
});
