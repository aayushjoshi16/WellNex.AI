/* AWS DynamoDB
*  Responsible for managing patient information on the database
*/


const AWS = require("aws-sdk");

AWS.config.update({
  region: "region-goes-here",
  accessKeyId: "access-key-goes-here",
  secretAccessKey: "secret-key-goes-here",
});

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = "PatientDB";

// Creating Data Table 
const createTable = async () => {
  const params = {
    TableName: tableName,
    KeySchema: [
      { AttributeName: "hipaa-consent", KeyType: "HASH"  },
      { AttributeName: "timestamp", KeyType: "RANGE" },
    ],
    AttributeDefinitions: [
      { AttributeName: "hipaa-consent", AttributeType: "S" }, 
      { AttributeName: "timestamp", AttributeType: "N" }, // timestamp is a string
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  };
  try {
    await dynamodb.createTable(params).promise();
    console.log("Table created successfully");
  } catch (error) {
    console.error("Error creating table:", error);
  }
};


// This function is used to save the patient information to DynamoDB
const savePatientData = async (patientKey, patientData) => {
  const params = {
    TableName: tableName,
    Item: {
      patientKey: patientKey,
      ...patientData,
    },
  };
  try {
    await dynamodb.put(params).promise();
    console.log("Patient data saved successfully:", patientData);
  } catch (error) {
    console.error("Error saving patient data:", error);
    throw error; // Propagate the error up for better error handling
  }
};

module.exports = {
  createTable,
  savePatientData,
};
