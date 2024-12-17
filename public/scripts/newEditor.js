// Get the form element for adding a new editor
const form = document.getElementById("newEditor");

// Add an event listener to handle the form submission
form.addEventListener("submit", async function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Extract the editor name from the input field
    const name = document.getElementById("name").value;

    // Create a FormData object to hold the input values
    const formData = new FormData();
    formData.append("name", name);

    // Send the new editor data to the server via a POST request
    const response = await fetch("/submit-editor", {
        method: "POST",
        body: formData,
    });

    // Handle the server's response
    if (response.ok) {
        // Notify the user of success and redirect to the list of editors
        alert("Editor added successfully!");
        window.location.href = `/editors`;
    } else {
        // Parse and display the error message from the server
        const error = await response.json();
        alert(`Error: ${error.message}`);
    }
});
