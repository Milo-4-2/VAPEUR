const form = document.getElementById("newEditor");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;

    const formData = new FormData();
    formData.append("name", name);

    try {
        const response = await fetch("/submit-editor", {
            method: "POST",
            body: formData, // Send form data
        });

        if (response.ok) {
            alert("Editor added successfully!");
            form.reset(); // Clear the form
        } else {
            const error = await response.json();
            alert(`Error: ${error.message}`);
        }
    } catch (error) {
        console.error("Error submitting the form:", error);
        alert("An error occurred. Please try again.");
    }

    form.reset();

});
