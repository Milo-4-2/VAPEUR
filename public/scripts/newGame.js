const form = document.getElementById("newGame");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const releaseDate = document.getElementById("releaseDate").value;
    const editor = document.getElementById("editor").value;
    const genre = document.getElementById("genre").value;
    const cover = document.getElementById("cover").files[0];

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("releaseDate", releaseDate);
    formData.append("editor", editor);
    formData.append("genre", genre);
    if (cover) {
        formData.append("cover", cover); // Only append if a file is selected
    }

    if (editor == 0)
    {
        alert("Please select an editor.\nIf the editor isn't in the list, you will need to add it manually on the dedicated page.")
    }

    if (genre == 0)
        {
            alert("Please select an genre.")
        }

    if (editor != 0 && genre != 0) {
        try {
            const response = await fetch("/submit-game", {
                method: "POST",
                body: formData, // Send form data
            });

            if (response.ok) {
                alert("Game added successfully!");
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
    }
});
