document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const signupLink = document.getElementById('signup-link');
    const loginLink = document.getElementById('login-link');
    const loginPage = document.getElementById('login');
    const signupPage = document.getElementById('signup');
    const welcomePage = document.getElementById('welcome');
    const monthlyActivitiesPage = document.getElementById('monthly-activities');
    const monthlyChartBtn = document.getElementById('monthly-chart-btn');
    const subjectsSelect = document.getElementById('subjects');
    const activityTable = document.getElementById('activity-table');
    let currentUser = null; // Track the current logged-in user

    // Array to store user data
    let users = [];

    // Initially hide the signup page and other pages
    signupPage.style.display = 'none';
    welcomePage.style.display = 'none';
    monthlyActivitiesPage.style.display = 'none';

    // Event listener for login form submission
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = loginForm.loginUsername.value;
        const password = loginForm.loginPassword.value;
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            currentUser = user.username;
            showWelcomePage(user.username);
        } else {
            alert('Invalid username or password. Please try again.');
        }
    });

    // Event listener for signup form submission
    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = signupForm.signupUsername.value;
        const password = signupForm.signupPassword.value;
        if (users.some(user => user.username === username)) {
            alert('Username already exists. Please choose another username.');
        } else {
            users.push({ username, password });
            alert('Signup successful! You can now login.');
            // Clear signup form fields
            signupForm.reset();
            showLoginPage();
        }
    });

    // Event listener for signup link
    signupLink.addEventListener('click', function(event) {
        event.preventDefault();
        showSignupPage();
    });

    // Event listener for login link
    loginLink.addEventListener('click', function(event) {
        event.preventDefault();
        showLoginPage();
    });

    // Monthly Chart button click event
    monthlyChartBtn.addEventListener('click', function(event) {
        event.preventDefault();
        showMonthlyActivitiesPage();
        populateSubjectsDropdown();
    });

    // Function to show login page
    function showLoginPage() {
        loginPage.style.display = 'block';
        signupPage.style.display = 'none';
        welcomePage.style.display = 'none';
        monthlyActivitiesPage.style.display = 'none';
    }

    // Function to show signup page
    function showSignupPage() {
        loginPage.style.display = 'none';
        signupPage.style.display = 'block';
        welcomePage.style.display = 'none';
        monthlyActivitiesPage.style.display = 'none';
    }

    // Function to show welcome page
    function showWelcomePage(username) {
        loginPage.style.display = 'none';
        signupPage.style.display = 'none';
        welcomePage.style.display = 'block';
        monthlyActivitiesPage.style.display = 'none';
        welcomePage.querySelector('h2').textContent = `Welcome, ${username}`;
    }

    const monthlyActivities = [
        { id: 1, activity: "Create project file which contains tables between 12 to 19", subject: "Maths" },
        { id: 2, activity: "Perform science experiment on photosynthesis", subject: "Science" },
        { id: 3, activity: "Write an essay on Shakespearean sonnets", subject: "English" },
        { id: 4, activity: "Perform science experiment on photosynthesis", subject: "Science" },
        { id: 5, activity: "Write an essay on Shakespearean sonnets", subject: "English" },
        // Add more activities as needed
    ];

    // Function to show monthly activities page
    function showMonthlyActivitiesPage() {
        loginPage.style.display = 'none';
        signupPage.style.display = 'none';
        welcomePage.style.display = 'none';
        monthlyActivitiesPage.style.display = 'block';
    }

    // Populate subjects dropdown function
    function populateSubjectsDropdown() {
        const subjects = [...new Set(monthlyActivities.map(activity => activity.subject))];
        subjectsSelect.innerHTML = ''; // Clear previous options
        subjects.forEach(subject => {
            const option = document.createElement('option');
            option.text = subject;
            subjectsSelect.add(option);
        });
        // Trigger change event to display activities for the first subject by default
        subjectsSelect.dispatchEvent(new Event('change'));
    }

    // Function to display monthly activities
    // function displayMonthlyActivities(subject) {
    //     const filteredActivities = monthlyActivities.filter(activity => activity.subject === subject);

    //     // Clear previous activity table
    //     activityTable.innerHTML = '';

    //     // Create table header
    //     const tableHeader = document.createElement('tr');
    //     tableHeader.innerHTML = '<th>ID</th><th>Activity</th>';
    //     activityTable.appendChild(tableHeader);

    //     // Display filtered activities in table
    //     filteredActivities.forEach(activity => {
    //         const row = document.createElement('tr');
    //         row.innerHTML = `<td>${activity.id}</td><td>${activity.activity}</td>`;
    //         activityTable.appendChild(row);
    //     });
    // }


    function displayMonthlyActivities(subject) {
        const filteredActivities = monthlyActivities.filter(activity => activity.subject === subject);
    
        // Clear previous activity table
        activityTable.innerHTML = '';
    
        // Create table
        const table = document.createElement('table');
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
    
        // Create table header
        const tableHeader = document.createElement('tr');
        const idHeader = document.createElement('th');
        idHeader.textContent = 'ID';
        idHeader.style.border = '1px solid black';
        idHeader.style.padding = '8px';
        const activityHeader = document.createElement('th');
        activityHeader.textContent = 'Activity';
        activityHeader.style.border = '1px solid black';
        activityHeader.style.padding = '8px';
        tableHeader.appendChild(idHeader);
        tableHeader.appendChild(activityHeader);
        table.appendChild(tableHeader);
    
        // Display filtered activities in table
        filteredActivities.forEach(activity => {
            const row = document.createElement('tr');
            const idCell = document.createElement('td');
            idCell.textContent = activity.id;
            idCell.style.border = '1px solid black';
            idCell.style.padding = '8px';
            const activityCell = document.createElement('td');
            activityCell.textContent = activity.activity;
            activityCell.style.border = '1px solid black';
            activityCell.style.padding = '8px';
            row.appendChild(idCell);
            row.appendChild(activityCell);
            table.appendChild(row);
        });
    
        // Append table to activity table
        activityTable.appendChild(table);
    }

    // Event listener for subjects dropdown change
    subjectsSelect.addEventListener('change', function() {
        const selectedSubject = subjectsSelect.value;
        displayMonthlyActivities(selectedSubject);
    });
});
