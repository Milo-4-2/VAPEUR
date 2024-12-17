// Get the form element for editing the editor
const form = document.getElementById("editEditor");

// Add an event listener to handle the form submission
form.addEventListener("submit", async function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Extract values from the input fields
    const id = document.getElementById("editorId").value;
    const name = document.getElementById("name").value;

    // Create a FormData object to hold the input values
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);

    // Send the updated editor data to the server via a POST request
    const response = await fetch("/submit-editor-changes", {
        method: "POST",
        body: formData, // Attach the form data as the request body
    });

    // Handle the server's response
    if (response.ok) {
        // If the response is successful, notify the user and redirect to the editor's page
        alert("Editor successfully updated!");
        window.location.href = `/editor/${id}`;
    } else {
        // If the response is not successful, parse and display the error message
        const error = await response.json();
        alert(`Error: ${error.message}`);
    }
});
