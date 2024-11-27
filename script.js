const API_URL = "https://sample3-kaveesha0701.vercel.app/api/keywords"; // Correct API base URL

const keywordForm = document.getElementById("keywordForm");
const keywordInput = document.getElementById("keywordInput");
const keywordList = document.getElementById("keywordList");
const themeToggle = document.getElementById("themeToggle");

// Toggle Dark Theme
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// Fetch and display keywords
async function fetchKeywords() {
  try {
    const response = await fetch(API_URL); // Use correct endpoint
    if (!response.ok) throw new Error(`Failed to fetch keywords: ${response.statusText}`);
    const keywords = await response.json(); // Parse response as JSON

    keywordList.innerHTML = ""; // Clear the list before appending
    keywords.forEach((keyword) => {
      const li = document.createElement("li");
      li.innerHTML = `${keyword.text}&nbsp;&nbsp;&nbsp;&nbsp;${keyword.alertCount}`;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "DELETE";
      deleteButton.classList.add("remove-btn");
      deleteButton.onclick = () => deleteKeyword(keyword._id); // Pass keyword ID to delete

      li.appendChild(deleteButton);
      keywordList.appendChild(li);
    });
  } catch (err) {
    console.error("Error fetching keywords:", err);
    alert("Failed to load keywords. Please try again.");
  }
}

// Add a new keyword
async function addKeyword(event) {
  event.preventDefault();

  const text = keywordInput.value.trim();
  if (!text) return alert("Please enter a keyword!");

  const submitButton = keywordForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }), // Send the keyword text
    });

    if (response.status === 201) {
      keywordInput.value = ""; // Clear the input field
      fetchKeywords(); // Refresh the list
    } else {
      const error = await response.text();
      alert(`Error: ${error}`);
    }
  } catch (err) {
    console.error("Error adding keyword:", err);
    alert("Failed to add keyword. Please try again.");
  } finally {
    submitButton.disabled = false; // Re-enable the submit button
  }
}

// Delete a keyword
async function deleteKeyword(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" }); // Use the correct DELETE endpoint
    if (!response.ok) throw new Error(`Failed to delete keyword: ${response.statusText}`);
    fetchKeywords(); // Refresh the list
  } catch (err) {
    console.error("Error deleting keyword:", err);
    alert("Failed to delete keyword. Please try again.");
  }
}

// Initial fetch
fetchKeywords();

// Event listener for adding a keyword
keywordForm.addEventListener("submit", addKeyword);
