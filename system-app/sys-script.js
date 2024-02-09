async function fetchData() {
    try {
      console.log("poop");
      const response = await fetch('http://localhost:4000/api/data');
      const data = await response.json();
      console.log("poopppp");
      displayData(data);
    } catch (error) {
      console.error(error);
      displayData(data);
      alert('Error fetching data. Please try again.');
    }
}

function displayData(data) {
  // Get a reference to the container where you want to display the data
  const container = document.getElementById('container');

  // Iterate over the array of data
  data.forEach(item => {
    // Create a div for each item in the data
    const div = document.createElement('div');
    div.className = 'patient-card'; // Add a class for styling

    // Create elements for patient name, dob, and gender
    const name = document.createElement('p');
    name.textContent = `Name: ${item.firstname} ${item.lastname}`;
    div.appendChild(name);

    const dob = document.createElement('p');
    const birthYear = new Date(item.dob).getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    dob.textContent = `Age: ` + age;
    div.appendChild(dob);

    // Add a click event listener to the div
    div.addEventListener('click', function() {
      // Store the patient's data in the session storage
      sessionStorage.setItem('patient', JSON.stringify(item));

      // Redirect to the profile page
      window.location.href = 'profile.html';
    });

    // Append the div to the container
    container.appendChild(div);
  });
}

window.onload = fetchData;