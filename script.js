document.addEventListener("DOMContentLoaded", () => {
  // --------- Header Scroll Behavior ---------
  let lastScrollTop = 0;
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    header.style.top = scrollTop > lastScrollTop ? "-100px" : "0";
    lastScrollTop = scrollTop;
  });

  // --------- Blog Modal ---------
  const blogModal = document.getElementById("blog-modal");
  const readMoreModal = document.getElementById("read-more-modal");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const closeReadMoreBtn = document.getElementById("close-read-more-modal-btn");
  const blogForm = document.getElementById("blogForm");
  const blogContainer = document.querySelector(".blogs-slider");
  const readMoreTitle = document.getElementById("read-more-title");
  const readMoreContent = document.getElementById("read-more-content");

  // --------- Modal Event Listeners ---------
  document.getElementById("add-blog-btn").addEventListener("click", () => {
    blogModal.style.display = "flex";
  });

  closeModalBtn.addEventListener("click", () => {
    blogModal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === blogModal) {
      blogModal.style.display = "none";
    }
    if (e.target === readMoreModal) {
      readMoreModal.style.display = "none";
    }
  });

  closeReadMoreBtn.addEventListener("click", () => {
    readMoreModal.style.display = "none";
  });

  // --------- Load Blogs from Local Storage ---------
  loadBlogs();

  // --------- Add Blog Functionality ---------
  blogForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("blog-title").value.trim();
    const description = document
      .getElementById("blog-description")
      .value.trim();
    const imageFile = document.getElementById("blog-image").files[0];

    if (title && description && imageFile) {
      const newBlog = {
        title,
        description,
        image: URL.createObjectURL(imageFile), // Create a URL for the image
      };

      const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
      blogs.push(newBlog);
      localStorage.setItem("blogs", JSON.stringify(blogs));
      loadBlogs();
      blogModal.style.display = "none";
      blogForm.reset();
    } else {
      alert("Please fill all fields and upload an image.");
    }
  });

  // --------- Load Blogs and Display ---------
  function loadBlogs() {
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    blogContainer.innerHTML = ""; // Clear existing content

    blogs.forEach((blog, index) => {
      const blogBox = document.createElement("div");
      blogBox.classList.add("blog-box");
      blogBox.innerHTML = `
        <img src="${blog.image}" alt="${blog.title}" class="blog-image" />
        <h2>${blog.title}</h2>
        <p class="short-content">${blog.description.slice(0, 100)}...</p>
        <button class="read-more-btn" onclick="viewBlogDetails(${index})">Read More</button>
        <button class="delete-btn" onclick="deleteBlog(${index})">Delete</button>
      `;

      blogContainer.appendChild(blogBox);
    });
  }

  // --------- View Blog Details ---------
  window.viewBlogDetails = (index) => {
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const blog = blogs[index];
    readMoreTitle.textContent = blog.title;
    readMoreContent.textContent = blog.description;
    readMoreModal.style.display = "flex";
  };

  // --------- Delete Blog Functionality ---------
  window.deleteBlog = (index) => {
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    blogs.splice(index, 1);
    localStorage.setItem("blogs", JSON.stringify(blogs));
    loadBlogs();
  };

  // --------- Blog Slider ---------
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  let currentIndex = 0;

  function updateSlider() {
    const boxWidth = document.querySelector(".blog-box").offsetWidth + 20;
    const totalBoxes = document.querySelectorAll(".blog-box").length;
    nextBtn.disabled = currentIndex >= totalBoxes - 3;
    prevBtn.disabled = currentIndex <= 0;
    blogContainer.style.transform = `translateX(-${currentIndex * boxWidth}px)`;
  }

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  nextBtn.addEventListener("click", () => {
    const totalBoxes = document.querySelectorAll(".blog-box").length;
    if (currentIndex < totalBoxes - 3) {
      currentIndex++;
      updateSlider();
    }
  });

  // --------- Progress Bar Animation ---------
  window.addEventListener("scroll", () => {
    document.querySelectorAll(".progress-bar").forEach((skill) => {
      if (skill.getBoundingClientRect().top < window.innerHeight - 50) {
        skill.style.width = skill.getAttribute("aria-valuenow") + "%";
      }
    });
  });
});

// Additional functionality for Learn More About Me
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("myModal");
  const closeModal = document.getElementById("closeModal");
  const learnMoreBtn = document.getElementById("learnMoreBtn");

  learnMoreBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});

//achivementm partdocument.addEventListener("DOMContentLoaded", () => {
// Get the popup elements
const popupOverlay = document.getElementById("popup-overlay");
const popupImg = document.getElementById("popup-img");
const popupTitle = document.getElementById("popup-title");
const popupDescription = document.getElementById("popup-description");

// Function to show the popup
function showPopup(title, description, imgSrc) {
  popupTitle.textContent = title;
  popupDescription.textContent = description;
  popupImg.src = imgSrc;
  popupOverlay.style.display = "flex"; // Show the overlay
}

// Function to hide the popup
function hidePopup() {
  popupOverlay.style.display = "none"; // Hide the overlay
}

// Add event listeners to all "View More" buttons
document.querySelectorAll(".view-more-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const title = btn.dataset.title;
    const description = btn.dataset.description;
    const imgSrc = btn.dataset.img;
    showPopup(title, description, imgSrc);
  });
});

// Add event listener to the close button
document.querySelector(".popup-close").addEventListener("click", hidePopup);

// Hide the popup when the overlay is clicked
popupOverlay.addEventListener("click", (e) => {
  if (e.target === popupOverlay) {
    hidePopup();
  }
});

function toggleMenu() {
  const nav = document.querySelector(".navlinks");
  nav.classList.toggle("active");
}

// lst added

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const toast = document.getElementById("toast");
  const submitBtn = document.getElementById("submitBtn");

  const showToast = (message, isError = false) => {
    toast.textContent = message;
    toast.style.backgroundColor = isError ? "#f44336" : "#4caf50";
    toast.className = "toast show";
    setTimeout(() => (toast.className = "toast"), 3000);
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    const formData = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };

    try {
      const response = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        showToast("Message submitted successfully!");
        form.reset();
      } else {
        showToast(
          result.error || "Failed to submit the form. Please try again.",
          true
        );
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      showToast("An error occurred while submitting the form.", true);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Now";
    }
  });
});

function openPopup(id) {
  document.getElementById(id).style.display = "block";
}

function closePopup(id) {
  document.getElementById(id).style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  const blogForm = document.getElementById("blogForm");
  const blogModal = document.getElementById("blog-modal");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const addBlogBtn = document.getElementById("add-blog-btn");
  const blogsSlider = document.querySelector(".blogs-slider");
  const popupModal = document.getElementById("popup-modal");
  const closePopupBtn = document.getElementById("close-popup-btn");
  const popupContent = document.getElementById("popup-content");

  // Load blogs from localStorage
  function loadBlogs() {
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    blogs.forEach((blog) => {
      createBlogBox(blog.title, blog.description, blog.image, blog.fullContent);
    });
  }

  // Save blogs to localStorage
  function saveBlogs(blog) {
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    blogs.push(blog);
    localStorage.setItem("blogs", JSON.stringify(blogs));
  }

  // Create Blog Box
  function createBlogBox(title, description, imageSrc, fullContent) {
    const blogBox = document.createElement("div");
    blogBox.className = "blog-box";

    blogBox.innerHTML = `
      <img src="${imageSrc}" alt="${title}" />
      <h2>${title}</h2>
      <p>${description}</p>
      <button class="read-more-btn">Read More</button>
    `;

    const readMoreBtn = blogBox.querySelector(".read-more-btn");
    readMoreBtn.addEventListener("click", () => {
      showPopup(title, fullContent); // Show full content in the popup
    });

    blogsSlider.appendChild(blogBox);
  }

  // Show Popup with Full Content
  function showPopup(title, content) {
    popupContent.innerHTML = `
      <h2>${title}</h2>
      <p>${content}</p>
    `;
    popupModal.style.display = "block";
  }

  // Close Popup Modal
  closePopupBtn.addEventListener("click", () => {
    popupModal.style.display = "none";
  });

  // Open Modal for Adding Blog
  addBlogBtn.addEventListener("click", () => {
    blogModal.style.display = "block";
  });

  // Close Modal for Adding Blog
  closeModalBtn.addEventListener("click", () => {
    blogModal.style.display = "none";
  });

  // Close Modal on Outside Click
  window.addEventListener("click", (event) => {
    if (event.target === blogModal) {
      blogModal.style.display = "none";
    }
    if (event.target === popupModal) {
      popupModal.style.display = "none";
    }
  });

  // Add Blog Dynamically
  blogForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form submission

    const title = blogForm.elements["title"].value;
    const description = blogForm.elements["description"].value;
    const fullContent = blogForm.elements["fullContent"].value; // New field for full content
    const imageFile = blogForm.elements["image"].files[0];

    if (title && description && fullContent && imageFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const blogData = {
          title,
          description,
          fullContent,
          image: event.target.result,
        };
        createBlogBox(title, description, blogData.image, fullContent);
        saveBlogs(blogData); // Save to localStorage

        // Reset the form and close the modal
        blogForm.reset(); // Reset the form
        blogModal.style.display = "none";
      };
      reader.readAsDataURL(imageFile);
    } else {
      alert("Please fill in all fields and upload an image.");
    }
  });

  // Initialize the page
  loadBlogs();
});

//for the delete the row of the database after reading the message box// Function to add Delete buttons to each row
document.addEventListener('DOMContentLoaded', () => {
  // Function to add Delete buttons to each row
  function addDeleteButtons() {
    const tableRows = document.querySelectorAll('tbody tr'); // Select all rows in the table body

    tableRows.forEach((row) => {
      // Create a new cell for the Delete button
      const deleteCell = row.insertCell(-1); // Add a new cell at the end of the row

      // Create the Delete button
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('delete-button'); // Add a class for styling

      // Add a click event listener to the button
      deleteButton.addEventListener('click', () => {
        // Confirm before deleting the row
        const confirmDelete = confirm('Are you sure you want to delete this row?');
        if (confirmDelete) {
          row.remove(); // Remove the row from the table
          console.log('Row deleted:', row); // Log for debugging
        }
      });

      // Append the Delete button to the cell
      deleteCell.appendChild(deleteButton);
    });
  }

  // Call the function to add Delete buttons
  addDeleteButtons();
});

