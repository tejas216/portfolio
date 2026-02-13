const adminBtn = document.getElementById("adminBtn");
const adminPanel = document.getElementById("adminPanel");
const addProjectBtn = document.getElementById("addProjectBtn");
const projectList = document.getElementById("projectList");

let isAdmin = false;

// Load projects from localStorage when page loads
window.onload = function () {
  loadProjects();
};

// Admin Login
adminBtn.addEventListener("click", function () {
  const password = prompt("Enter Admin Password:");

  if (password === "admin123") {
    isAdmin = true;
    adminPanel.style.display = "block";
    adminBtn.style.display = "none";
    alert("Admin Mode Enabled!");
    showDeleteButtons();
  } else {
    alert("Wrong Password!");
  }
});

// Add Project
addProjectBtn.addEventListener("click", function () {
  const projectName = document.getElementById("projectName").value.trim();
  const projectDesc = document.getElementById("projectDesc").value.trim();

  if (projectName === "" || projectDesc === "") {
    alert("Please enter project name and description!");
    return;
  }

  const projects = JSON.parse(localStorage.getItem("projects")) || [];

  projects.push({ name: projectName, desc: projectDesc });

  localStorage.setItem("projects", JSON.stringify(projects));

  document.getElementById("projectName").value = "";
  document.getElementById("projectDesc").value = "";

  loadProjects();
  if (isAdmin) showDeleteButtons();
});

// Load Projects
function loadProjects() {
  projectList.innerHTML = "";

  const projects = JSON.parse(localStorage.getItem("projects")) || [];

  projects.forEach((project, index) => {
    const projectCard = document.createElement("div");
    projectCard.classList.add("project-card");

    projectCard.innerHTML = `
      <h3>${project.name}</h3>
      <p>${project.desc}</p>
      <button class="deleteBtn" style="display:none;">Delete</button>
    `;

    projectList.appendChild(projectCard);

    const deleteBtn = projectCard.querySelector(".deleteBtn");
    deleteBtn.addEventListener("click", function () {
      deleteProject(index);
    });
  });
}

// Delete Project
function deleteProject(index) {
  const projects = JSON.parse(localStorage.getItem("projects")) || [];

  projects.splice(index, 1);

  localStorage.setItem("projects", JSON.stringify(projects));

  loadProjects();
  showDeleteButtons();
}

// Show delete buttons only for admin
function showDeleteButtons() {
  const deleteButtons = document.querySelectorAll(".deleteBtn");
  deleteButtons.forEach(btn => {
    btn.style.display = "inline-block";
  });
}
