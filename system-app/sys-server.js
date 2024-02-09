/* Clinic Server
*  Responsible for retrieving patient information from AWS DynamoDB and 
*  displaying on the clinic's portal 
*/

const express = require("express");
const AWS = require("aws-sdk");
const path = require("path");

const app = express();
const port = 4000;

// Configure AWS SDK with your credentials and region
AWS.config.update({
  region: "region-goes-here",
  accessKeyId: "access-key-goes-here",
  secretAccessKey: "secret-key-goes-here",
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Set up a static directory to serve HTML, CSS, and other files
app.use(express.static(path.join(__dirname, "..", "system-app")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "system-app", "sys.html"));
});

app.get('/api/data', (req, res) => {
  const params = {
    TableName: "PatientDB",
    KeyConditionExpression: "#hc = :hc",
    ExpressionAttributeNames: {
      "#hc": "hipaa-consent",
    },
    ExpressionAttributeValues: {
      ":hc": "on",
    },
    ScanIndexForward: false, // Sorting the timestamp in descending order
    Limit: 20,
  };

  dynamoDB.query(params, function (err, data) {
    if (err) {
      console.error('Error querying items:', err);
      res.status(500).send('Error querying items');
    } else {
      res.json(data.Items);
    }
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
