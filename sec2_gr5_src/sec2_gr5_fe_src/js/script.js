let toggleMenu = () => {
  document.getElementById("sidebar").classList.toggle("active");
}
const translatableElements = document.querySelectorAll("[data-en]");

const rooturl = "http://localhost:3031/"

let DisplayUser = () => {
  const Usernamep = document.getElementById("username-placeholder");
  const username = localStorage.getItem("Username");

  if (!username) {
    console.warn("⚠️ No username in localStorage.");
    Usernamep.innerHTML = "👋 User";
    return;
  }

  fetch(`${rooturl}admin?username=${encodeURIComponent(username)}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("Fetched admin data:", data); // optional debug
      if (data.data && data.data.Username) {
        Usernamep.innerHTML = `👋 ${data.data.Username}`;
      } else {
        Usernamep.innerHTML = `👋 User`;
      }
    })
    .catch((err) => {
      console.error("Error fetching user data:", err);
      Usernamep.innerHTML = "👋 User";
    });
};
if (window.location.pathname.includes("welcome")) {
  document.addEventListener('DOMContentLoaded', function () {
    DisplayUser();
  });
}


document.querySelectorAll('.lang-option').forEach(option => {
  option.addEventListener('click', function (e) {
    e.preventDefault();
    const selectedLang = this.getAttribute('data-lang');
    const langBtn = document.getElementById('langDropdown');
    langBtn.textContent = selectedLang.toUpperCase();

    document.querySelectorAll('[data-en]').forEach(el => {
      const en = el.getAttribute('data-en');
      const th = el.getAttribute('data-th');
      el.textContent = (selectedLang === 'en') ? en : th;
    });
    // Handle elements with line1/line2 attributes
    document.querySelectorAll(`[data-${selectedLang}-line1]`).forEach(el => {
      const line1 = el.getAttribute(`data-${selectedLang}-line1`);
      const line2 = el.getAttribute(`data-${selectedLang}-line2`);
      el.innerHTML = line1 + '<br>' + line2;
    });
  });
});


async function callArtistWS(url, method, sentData = {}) {
  console.log("Calling web service")
  let data;
  if (method == "select") {
    console.log("select")
    let response = await fetch(url,
      {
        method: 'GET'
      });
    data = await response.json();
  }
  else if (method == "insert") {
    console.log("insert")
    let response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sentData)
    });
    data = await response.json();
  }
  else if (method == "update") {
    console.log("update")
    let response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sentData)
    });
    data = await response.json();
  }
  else if (method == "delete") {
    console.log("delete")
    let response = await fetch(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sentData)
    });
    data = await response.json();
  }
  return data;
}

async function Getlogin() {
  const AdminUser = document.querySelector("#username").value;
  const AdminPassword = document.querySelector("#password").value;
  const data = {
    Username: AdminUser,
    Password: AdminPassword
  };
  const response = await callArtistWS(rooturl + "login", "insert", data)
  if (response.status === 200) {
    localStorage.setItem("Username", response.Username);
    console.log("Successfully Login");
    alert("Successfully Login");
    window.location.href = "/welcome";
  }
  else if (response.status === 401) {
    console.log(response.message);
    alert("Error occurs T T")
  }
  else {
    alert('Please enter Username and Password');
  }
}

let DisplayArtist = () => {
  const artistNameElement = document.getElementById("artistName");
  const artistAboutMeElement = document.getElementById("artistAboutMe");
  const artistLanguageElement = document.getElementById("artistLanguage");
  const artistCountryElement = document.getElementById("artistCountry");
  const artistCategoryElement = document.getElementById("artistCategory");
  const artiststatusElement = document.getElementById("artistStatus");
  const artistIDElement = document.getElementById("artistID");
  const artistBasepriceElement = document.getElementById("artistBaseprice")
  const artistPhotoElement = document.getElementById("artist-photo");
  const urlParams = new URLSearchParams(window.location.search);
  const artistId = urlParams.get('id');

  if (artistId) {
    fetch(`${rooturl}artist/artists/${artistId}`)
      .then(response => response.json())
      .then(data => {
        if (!data.error && data.data) {
          const artist = data.data;
          if (artistPhotoElement) {
            artistPhotoElement.src = artist.PhotoPath;
          }
          if (artistNameElement) {
            artistNameElement.textContent = artist.ArtistName;
          }
          if (artistAboutMeElement) {
            artistAboutMeElement.textContent = artist.AboutMe;
          }
          if (artistLanguageElement) {
            artistLanguageElement.textContent = artist.ArtistLanguage;
          }
          if (artistCountryElement) {
            artistCountryElement.textContent = artist.ArtistCountry;
          }
          if (artistCategoryElement) {
            artistCategoryElement.textContent = artist.ArtistCategoryName;
          }
          if (artiststatusElement) {
            artiststatusElement.textContent = artist.Status;
          }
          if (artistBasepriceElement) {
            artistBasepriceElement.textContent = artist.BasePrice;
          }
          if (artistIDElement) {
            artistIDElement.textContent = artist.ArtistID;
          }

        } else {
          alert("Error: Could not retrieve artist details.");
        }
      })
      .catch(error => {
        console.error("Error fetching artist details:", error);
        alert("Failed to fetch artist details.");
      });
  } else {
    alert("Error: Artist ID not provided in the URL.");
  }
};

let getArtists = () => {
  const category = document.getElementById("category").value;
  const name = document.getElementById("name").value.trim();
  const availableRadio = document.getElementById("available");
  const allRadio = document.getElementById("all");
  const basePriceInput = document.getElementById("baseprice");
  const basePrice = basePriceInput ? basePriceInput.value.trim() : "";
  let status = "";

  if (availableRadio && availableRadio.checked) {
    status = "Available";
  } else if (allRadio && allRadio.checked) {
    status = "all"; // "Show all" means no status filter
  }
  const rooturl = "http://localhost:3031/";
  let apiUrl = rooturl + "artist/artists"; // Default URL to get all artists

  const categoryMapReverse = {
    "Anime Style": "CAT000000001", "Realism": "CAT000000002", "Cartoon": "CAT000000003", "Pixel Art": "CAT000000004", "Chibi": "CAT000000005"
  };

  const categoryId = categoryMapReverse[category];
  if (status && basePrice && categoryId && name) { // Status + BasePrice + Category + Name
    apiUrl = `${rooturl}artist/statusbasecategoryname/${encodeURIComponent(status)}/${encodeURIComponent(basePrice)}/${encodeURIComponent(categoryId)}/${encodeURIComponent(name)}`;
  }
  else if (status !== "" && !categoryId && !basePrice && !name) { // Status 
    apiUrl = `${rooturl}artist/status/${encodeURIComponent(status)}`;
  }
  else if (basePrice && categoryId && status !== "") { // Status + BasePrice + Category
    apiUrl = `${rooturl}artist/statusbasecategory/${encodeURIComponent(status)}/${encodeURIComponent(basePrice)}/${encodeURIComponent(categoryId)}`;
  }
  else if (name && basePrice && status !== "") { // Status + Name + BasePrice
    apiUrl = `${rooturl}artist/statusnamebaseprice/${encodeURIComponent(status)}/${encodeURIComponent(name)}/${encodeURIComponent(basePrice)}`;
  }
  else if (name && categoryId && status !== "") { // Status + Category + Name
    apiUrl = `${rooturl}artist/statuscategoryname/${encodeURIComponent(status)}/${encodeURIComponent(categoryId)}/${encodeURIComponent(name)}`;
  }
  else if (basePrice && status) { // Status + BasePrice
    apiUrl = `${rooturl}artist/statusbaseprice/${encodeURIComponent(status)}/${encodeURIComponent(basePrice)}`;
  }
  else if (name && status !== "") { //  Status + Name
    apiUrl = `${rooturl}artist/namestatus/${encodeURIComponent(name)}/${status}`;
  }
  else if (categoryId && status !== "") { // Status + Category
    apiUrl = `${rooturl}artist/statuscategory/${encodeURIComponent(status)}/${encodeURIComponent(categoryId)}`;
  }


  fetch(apiUrl)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
    })
    .then((data) => {
      const artists = data.data;
      localStorage.setItem('searchResults', JSON.stringify(artists || []));
      window.location.href = `/search_artist`;
    })
    .catch((error) => {
      console.error("Error fetching artists:", error);
      localStorage.setItem('searchResultsError', "Failed to load artists.");
      window.location.href = '/search_artist';
    });
};

function displaySearchResults() {
  if (!window.location.pathname.includes("search_artist")) {
    return;
  }
  const resultsContainer = document.getElementById('container');
  if (!resultsContainer) {
    console.error("Results container not found on page");
    return;
  }
  const searchResultsJSON = localStorage.getItem('searchResults');
  const searchResultsError = localStorage.getItem('searchResultsError');


  // Clear storage after reading
  localStorage.removeItem('searchResultsError');

  if (searchResultsError) {
    resultsContainer.innerHTML = `<p class="error-message">${searchResultsError}</p>`;
    return;
  }


  if (searchResultsJSON) {
    const artists = JSON.parse(searchResultsJSON);
    // Check if any artists show
    if (artists && artists.length > 0) {
      let output = '';
      // Loop through each artist 
      artists.forEach(artist => {
        // Create artist card HTML
        output += `
        <div class="artist-card">
          <div class="artist-image">
            <img src="${artist.PhotoPath || '/image/User.png'}" 
                alt="${artist.ArtistName}" 
                style="width: 300px; height: 200px; object-fit: cover; border-radius: 25px"

            
                 onerror="this.src='/image/User.png'">
          </div>
          <div class="artist-info">
            <h3>${artist.ArtistName}</h3>
            <p class="artist-description">${artist.AboutMe || 'No description available.'}</p>
            <p class="artist-price">From US$${artist.BasePrice}</p>
            <button><a href="/artist_details?id=${artist.ArtistID}" class="view-button" data-en="View Details" data-th="ดูรายละเอียด">View Details</a></button>
          </div>
        </div>`;
      });
      // display outpit
      resultsContainer.innerHTML = output;
    } else {
      resultsContainer.innerHTML = '<p>No artists found matching your search criteria.</p>';
    }
  } else {
    resultsContainer.innerHTML = '<p>No search results available.</p>';
  }
}

async function convertToTHB() {
  const priceElement = document.getElementById("artistBaseprice");
  const thbPriceElement = document.getElementById("thb-price");

  if (!priceElement || !priceElement.textContent) {
    alert("Price not available");
    return;
  }
  // Get the base price 
  const basePrice = parseFloat(priceElement.textContent.replace(/[^\d.]/g, ''));
  if (isNaN(basePrice)) {
    alert("Invalid price format");
    return;
  }
  // Show loading state
  thbPriceElement.textContent = "Converting...";
  try {
    const apiKey = "fca_live_cFTahnh8IMlUAfTUAEDqqk2JdkayhxWSy1FcPPN8";
    const response = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_cFTahnh8IMlUAfTUAEDqqk2JdkayhxWSy1FcPPN8&currencies=THB`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data && data.data && data.data.THB) {
      const exchangeRate = data.data.THB;
      const thbPrice = basePrice * exchangeRate;
      thbPriceElement.textContent = `฿${thbPrice.toFixed(2)} THB`;
    } else {
      throw new Error("Could not get THB exchange rate");
    }
  } catch (error) {
    console.error("Currency conversion failed:", error);
    thbPriceElement.textContent = "Conversion failed";
  }
}

function populateEditForm(artist) {
  document.getElementById('edit-name').value = artist.ArtistName;
  document.getElementById('edit-language').value = artist.ArtistLanguage;
  document.getElementById('edit-country').value = artist.ArtistCountry;
  document.getElementById('edit-about-me').value = artist.AboutMe;
  document.getElementById('edit-category').value = artist.ACID;
  document.getElementById('edit-baseprice').value = artist.BasePrice;
  document.getElementById('edit-photo-url').value = artist.PhotoPath;
  document.getElementById('edit-status').checked = artist.Status === 'Available';
}

//click edit to show edit form
function showEditForm() {
  const urlParams = new URLSearchParams(window.location.search);
  const artistId = urlParams.get('id');

  if (!artistId) {
    alert("Error: No artist ID found");
    return;
  }
  // Fetch the current artist data to populate the form
  fetch(`${rooturl}artist/artists/${artistId}`)
    .then(response => response.json())
    .then(data => {
      if (!data.error && data.data) {
        const artist = data.data;
        populateEditForm(artist);
        document.getElementById('edit-form-container').style.display = 'block';
      } else {
        alert("Error: Could not retrieve artist details for editing.");
      }
    })
    .catch(error => {
      console.error("Error fetching artist details:", error);
      alert("Failed to fetch artist details for editing.");
    });
}
// after change the info click save to update information 
async function updateArtist(e) {
  e.preventDefault();

  const urlParams = new URLSearchParams(window.location.search);
  const artistId = urlParams.get('id');

  if (!artistId) {
    alert("Error: No artist ID found");
    return;
  }

  // Create a category map to convert between names and IDs
  const categoryMap = {
    "Anime Style": "CAT000000001",
    "Realism": "CAT000000002",
    "Cartoon": "CAT000000003",
    "Pixel Art": "CAT000000004",
    "Chibi": "CAT000000005"
  };

  // Get form values
  const name = document.getElementById('edit-name').value;
  const language = document.getElementById('edit-language').value;
  const country = document.getElementById('edit-country').value;
  const aboutMe = document.getElementById('edit-about-me').value;
  const category = document.getElementById('edit-category').value;
  const basePrice = document.getElementById('edit-baseprice').value;
  const photoURL = document.getElementById('edit-photo-url').value;
  const status = document.getElementById('edit-status').checked ? "Available" : "Unavailable";

  // Create the artist data object
  const artistData = {
    ArtistID: artistId,
    ArtistName: name,
    ArtistLanguage: language,
    ArtistCountry: country,
    ACID: category,
    BasePrice: basePrice,
    Status: status,
    AboutMe: aboutMe,
    PhotoPath: photoURL
  };

  try {
    const response = await fetch(`${rooturl}artist/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(artistData)
    });

    const result = await response.json();
    if (result.error) {
      alert("Error: " + result.message);
    } else {
      alert("✅ " + result.message);
      // Hide the edit form
      document.getElementById('edit-form-container').style.display = 'none';
      // Refresh the artist details
      DisplayArtist();
    }
  } catch (error) {
    console.error("Update request failed:", error);
    alert("❌ Failed to update artist. Please check your connection.");
  }
}
function closeEditForm() {
  document.getElementById('edit-form-container').style.display = 'none';
}

function loadLatestArtists() {
  if (window.location.pathname.includes("product")) {
    const artistsContainer = document.getElementById("latest-artists-container");
    if (!artistsContainer) return;

    fetch(`${rooturl}artist/latest/3`)
      .then(response => response.json())
      .then(data => {
        if (!data.error && data.data && data.data.length > 0) {
          const artists = data.data;
          let output = '';

          artists.forEach(artist => {
            output += `
            <div class="col-md-4" >
              <div class="card-h-100" >
                <img src="${artist.PhotoPath || '/image/User.png'}" class="card-image-fixed" 
                     onerror="this.src='/image/User.png'">
                <div class="card-text-container" >
                  <p class="preahvihear" style="margin-top: 15px;">${artist.ArtistName}</p>
                  <p class="preahvihear" style="margin-top: 15px;">${artist.AboutMe || 'No description available.'}<br><br>
                  From US$${artist.BasePrice}</p>
                  <div class="mt-auto d-flex justify-content-end gap-2">
                    <a href="/artist_details?id=${artist.ArtistID}" class="btn edit-btn fw-bold" data-en="Edit" data-th="แก้ไข">Edit</a>
                    <button class="btn delete-btn fw-bold" data-artist-id="${artist.ArtistID}" data-en="Delete" data-th="ลบ">Delete</button>
                  </div>
                </div>
              </div>
            </div>`;
          });

          artistsContainer.innerHTML = output;

          // Add event listeners to the newly created delete buttons
          document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function () {
              const artistId = this.getAttribute('data-artist-id');
              deleteLatestArtist(artistId); // Call the new function
            });
          });
        } else {
          artistsContainer.innerHTML = '<div class="col-12"><p class="text-center">No artists found.</p></div>';
        }
      })
      .catch(error => {
        console.error("Error loading latest artists:", error);
        artistsContainer.innerHTML = '<div class="col-12"><p class="text-center">Failed to load artists.</p></div>';
      });
  }
}


document.addEventListener("DOMContentLoaded", function () {

  const togglePasswordIcon = document.querySelector(".toggle-password");
  if (togglePasswordIcon) {
    togglePasswordIcon.addEventListener("click", function() {
      togglePassword(this);
    });
  }

  function togglePassword(img) {
    const pwd = document.getElementById("password");
    const isHidden = pwd.type === "password";

    pwd.type = isHidden ? "text" : "password";
    img.src = isHidden ? "/image/Login_Page/eye-fill.png" : "/image/Login_Page/eye-slash.png"; // swap image based on state
  }

  const textarea = document.getElementById('Aboutme');
  if (textarea) {
    textarea.addEventListener('input', function () {
      // Check if the textarea is empty (ignoring leading/trailing spaces)
      if (textarea.value.trim() === '') {
        // If empty, clear the textarea
        textarea.value = '';
      }
    });
  }
  const adminbutton = document.getElementById("adminbutton");
  if (adminbutton) {
    adminbutton.addEventListener("click", function () {
      window.location.href = "/admin_login";
    });
  }

  const form = document.getElementById("artistForm");

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const nameInput = document.getElementById("name");
      const languageInput = document.getElementById("language");
      const countryInput = document.getElementById("country");
      const categoryInput = document.getElementById("category");
      const basePriceInput = document.getElementById("baseprice");
      const photoURLInput = document.getElementById("photoURL");

      let isValid = true;
      const requiredFields = [
        { input: nameInput, message: "Artist Name is required." },
        { input: languageInput, message: "Language is required." },
        { input: countryInput, message: "Country is required." },
        { input: categoryInput, message: "Category is required." },
        { input: basePriceInput, message: "Base Price is required." },
        { input: photoURLInput, message: "Photo URL is required." }
      ];

      // Clear previous error messages
      requiredFields.forEach(field => {
        removeErrorMessage(field.input);
      });

      requiredFields.forEach(field => {
        if (!field.input.value.trim()) {
          displayErrorMessage(field.input, field.message);
          isValid = false;
        }
      });

      if (!isValid) {
        alert("Please fill in all the required fields.");
        return; // Stop submission
      }

      const name = document.getElementById("name").value;
      const language = document.getElementById("language").value;
      const country = document.getElementById("country").value;
      const aboutMe = document.getElementById("Aboutme").value;
      const status = document.getElementById("status").checked ? "Available" : "Unavailable";
      const categoryText = document.getElementById("category").value;
      const BasePrice = document.getElementById("baseprice").value;
      const photoURL = document.getElementById("photoURL").value;



      const categoryMap = {
        "Anime Style": "CAT000000001",
        "Realism": "CAT000000002",
        "Cartoon": "CAT000000003",
        "Pixel Art": "CAT000000004",
        "Chibi": "CAT000000005"
      };


      const ACID = categoryMap[categoryText] || "CAT000000001";

      const artistData = {
        ArtistName: name,
        ArtistLanguage: language,
        ArtistCountry: country,
        ACID: ACID,
        BasePrice: BasePrice,
        Status: status,
        AboutMe: aboutMe,
        photoURL: photoURL
      };

      try {
        const response = await fetch("http://localhost:3031/artist/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(artistData)
        });

        const result = await response.json();
        if (result.error) {
          alert("Error: " + result.message);
        } else {
          alert("✅ " + result.message);
          form.reset();
          const newArtistId = result.data.ArtistID;
          window.location.href = `/artist_details?id=${newArtistId}`;
        }
      } catch (error) {
        console.error("Request failed:", error);
        alert("❌ Failed to add artist. Please check your connection.");
      }
    });
  }
  function displayErrorMessage(inputElement, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    inputElement.parentNode.insertBefore(errorDiv, inputElement.nextSibling);
    inputElement.classList.add('error-input'); // Add class for  styling 
  }

  function removeErrorMessage(inputElement) {
    const errorDiv = inputElement.parentNode.querySelector('.error-message');
    if (errorDiv) {
      errorDiv.remove();
    }
    inputElement.classList.remove('error-input');
  }
});

if (window.location.pathname.includes("search")) {
  const btnSearch = document.getElementById("btnSearch");
  if (btnSearch) {
    btnSearch.addEventListener("click", getArtists);
  }

  // Clear button 
  const btnClear = document.getElementById("btnClear");
  if (btnClear) {
    btnClear.addEventListener("click", () => {
      document.getElementById("category").value = "";
      document.getElementById("name").value = "";
      document.getElementById("baseprice").value = "";
      document.getElementById("output").innerHTML = "";
    });
  }

}

if (window.location.pathname.includes("search_artist")) {
  displaySearchResults();
}



// Function to delete artist
async function deleteArtist() {
  const urlParams = new URLSearchParams(window.location.search);
  const artistId = urlParams.get('id');

  if (!artistId) {
    alert("Error: No artist ID found");
    return;
  }

  if (confirm("Are you sure you want to delete this artist?")) {
    try {
      const response = await fetch(`${rooturl}artist/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ArtistID: artistId })
      });

      const result = await response.json();
      if (!result.error) {
        alert("Artist deleted successfully!");
        // Redirect to the product page
        window.location.href = "/product";
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Delete request failed:", error);
      alert("Failed to delete artist. Please try again.");
    }
  }
}


async function deleteLatestArtist(artistId) {
  if (!artistId) {
    alert("Error: No artist ID provided");
    return;
  }

  if (confirm("Are you sure you want to delete this artist?")) {
    try {
      const response = await fetch(`${rooturl}artist/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ArtistID: artistId })
      });

      const result = await response.json();
      if (!result.error) {
        alert("Artist deleted successfully!");
        // Refresh the latest artists list
        loadLatestArtists();
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Delete request failed:", error);
      alert("Failed to delete artist. Please try again.");
    }
  }
}


if (window.location.pathname.includes("artist_details")) {
  DisplayArtist(); // Call DisplayArtist on the details page

  const deleteButton = document.getElementById("delete-button");
  if (deleteButton) {
    deleteButton.addEventListener("click", deleteArtist);
  }
  const convertButton = document.getElementById("convert-to-thb");
  if (convertButton) {
    convertButton.addEventListener("click", convertToTHB);
  }
  const editButton = document.getElementById("edit-button");
  if (editButton) {
    editButton.addEventListener("click", showEditForm);
  }
  const editForm = document.getElementById("edit-artist-form");
  if (editForm) {
    editForm.addEventListener("submit", updateArtist);
  }
  const cancelButton = document.getElementById("cancel-edit");
  if (cancelButton) {
    cancelButton.addEventListener("click", closeEditForm);
  }

}
loadLatestArtists();
if (window.location.pathname.includes("admin_login")) {
  document.getElementById("btnLogin").addEventListener("click", function () {
    Getlogin()
  })
}






