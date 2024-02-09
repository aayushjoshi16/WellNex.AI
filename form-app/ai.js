/* Communication with GPT-4
*  - Applying CoT prompt engineering technique to optimize AI model's parsing efficiency
*  - Requesting for summarization of all the medical information and to provide follow-up
*    questions that wil assist towards the diagnosis
*/

const apiKey = 'api-key-goes-here';


const OpenAI = require("openai");
const openai = new OpenAI({ apiKey });


async function ai_communication(patientData) {
  const completion = await openai.chat.completions.create({
    messages: [
      // Categorically dividing the input information

      // Patient Demographics
      {
        role: "system",
        content: "Patient Demographics: Gender - " + patientData.gender + ", Race - " + patientData.race
      },

      // Symptoms
      {
        role: "system",
        content: "Symptoms: " + patientData.symptoms
      },

      // Medications
      {
        role: "system",
        content: "Current Medications: " + patientData.currentMedications
      },

      // Allergies
      {
        role: "system",
        content: "Allergies: " + patientData.allergies
      },

      // Lifestyle
      {
        role: "system",
        content: "Lifestyle: Smoker - " + patientData.smoker + ", Household Smoker - " + patientData.housesmoker + ", Alcohol Consumption per week - " + patientData.alcohol
      },

      // Family Disease History
      {
        role: "system",
        content: "Family Disease History: " + patientData.fh
      },

      // Tshi
      {
        role: "system",
        content: "Based on the above data, answer the following questions concisely: 1) Summarize this information in a concise way. 2) What additional questions could a doctor ask to gather more information? 3) Based on the patients symptoms and medical history, what are the most likely diagnoses? Based on the above data, answer the following questions concisely: 1) What additional questions could a doctor ask to gather more information? 2) Based on the patients symptoms and medical history, what are the most likely diagnoses?"
      }
    ],
    model: "gpt-4",
  });

  // Retrieving responce
  return completion.choices[0].message.content;
}

module.exports = { ai_communication };
