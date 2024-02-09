/* Form Server
*  Responsible for receiving form submissions through API
*/

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const { createTable, savePatientData} = require('./db.js');
const { ai_communication } = require('./ai.js');

const app = express();
const port = 3000;

// Comment
const test = 0;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up a static directory to serve HTML, CSS, and other files
app.use(express.static(path.join(__dirname, '..', 'form-app')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'form-app', 'form.html'));
});

// Handle form submission API endpoint

app.post('/api/submit', async (req, res) => {
  const timeStamp = new Date().getTime();
  
  const patientData = req.body;
  const patientKey = `${patientData.firstname}_${patientData.lastname}_${patientData.dob}`;

  res.sendFile(path.join(__dirname, '..', 'form-app', 'success.html'));

  patientData['timestamp'] = timeStamp;
  patientData['patientKey'] = patientKey;

  // Generating AI response
  patientData['AIresponse'] = await ai_communication(patientData);

  // Saving information to AWS DynamoDB
  savePatientData(patientKey, patientData).catch(error => {
    console.error("Error : unable to save patient data:", error);
  })
  
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
