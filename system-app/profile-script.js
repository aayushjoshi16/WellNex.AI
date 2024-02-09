window.onload = function() {
    // Retrieve the patient's data from the session storage
    const patient = JSON.parse(sessionStorage.getItem('patient'));
  
    // Display the patient's data
    document.getElementById('patient-name').textContent = `Name: ${patient.firstname} ${patient.lastname}`;
    const birthYear = new Date(patient.dob).getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    document.getElementById('patient-age').textContent = `Age: ` + age;
    document.getElementById('patient-gender').textContent = `Gender: ${patient.gender}`;
    document.getElementById('ai-recommendation').textContent = `AI Recommendation: ${patient.AIresponse}`;
    // Add more fields as needed
  };