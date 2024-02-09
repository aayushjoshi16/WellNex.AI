AWS.config.update({
  region: 'region-goes-here',
  accessKeyId: 'access-key-goes-here',
  secretAccessKey: 'secret-key-goes-here',
});

const translate = new AWS.Translate();

function translateText(text, sourceLanguageCode, targetLanguageCode) {
  var params = {
    Text: text,  // The text to translate
    SourceLanguageCode: sourceLanguageCode,  // The source language code (e.g., "en")
    TargetLanguageCode: targetLanguageCode  // The target language code (e.g., "es")
  };

  return new Promise((resolve, reject) => {
    translate.translateText(params, function(err, data) {
      if (err) {
        // console.log(err, err.stack); // an error occurred
        reject(err);
      } else {
        // console.log(data); // successful response
        resolve(data.TranslatedText); // resolve with translated text
      }
    });
  });

}


function translateAllClasses(translateFrom, translateTo) {

  // Translating the Hipaa agreement
  function recSearchChild(curNode) {

    const children = curNode.querySelectorAll('*');

    if (children.length == 0) {
      translateText(curNode.textContent, translateFrom, translateTo)
        .then(translatedText => {
          // USE THE TRANSLATED TEXT HERE (not async)
          // console.log(translatedText);
          curNode.textContent = translatedText
        })
        .catch(error => {
          console.error(error);
        });
      return 1;
    }

    else {
      // for each child, call the recursive function
      children.forEach (child => {
        return recSearchChild(child);
      });
    }
  }

  recSearchChild(document.querySelector(".modal-content"));
  // Translating Edge Cases
  const singleAttributes = document.querySelectorAll(".trans");
  singleAttributes.forEach(p => {
    translateText(p.textContent, translateFrom, translateTo)
      .then(translatedText => {
        // USE THE TRANSLATED TEXT HERE (not async)
        // console.log(translatedText);
        p.textContent = translatedText
      })
      .catch(error => {
        console.error(error);
      });
  });

  // Translating the Form
  const divisions = document.querySelectorAll(".input-field, .company-info");

  // textContent, placeholder input text, dropdowns (another loop for the for the <select>)
  divisions.forEach(p => {

    const children = p.querySelectorAll('*');
    children.forEach (child => {
      if (child.tagName == "INPUT") { // if there are stupid placeholders in the input form
        translateText(child.placeholder, translateFrom, translateTo)
          .then(translatedText => {
            // USE THE TRANSLATED TEXT HERE (not async)
            // console.log(translatedText);
            child.placeholder = translatedText
          })
          .catch(error => {
            console.error(error);
          });
      }

      else if (child.tagName == "SELECT" ) { // this will iterate through all of the children in a DROPDOWN

        if (child.id != "state") {
          const options = child.querySelectorAll('*');

          options.forEach (c => {
            if (c.placeholder != null) {
              translateText(c.placeholder, translateFrom, translateTo)
                .then(translatedText => {
                  
                  // USE THE TRANSLATED TEXT HERE (not async)
                  // console.log(translatedText);
                  c.placeholder = translatedText
                })
                .catch(error => {
                  console.error(error);
                });
            }
          });
        }
      }

      else { // this handles everything else, and only changes the .textContent with the corresponding class .trans
        translateText(child.textContent, translateFrom, translateTo)
        .then(translatedText => {
          // USE THE TRANSLATED TEXT HERE (not async)
          // console.log(translatedText);
          child.textContent = translatedText
        })
        .catch(error => {
          console.error(error);
        });
      }
    }); 
  });
}


// Get the modal
var modal = document.getElementById("hipaaModal");

// Get the link that opens the modal
var link = document.getElementById("hipaaLink");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the link, open the modal
link.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


// js
function toggleLanguage(language) {
    var formTitle = document.getElementById('formTitle');
    var personalInfoLabel = document.querySelector('label[for="personalinfo"]');
    var firstNameInput = document.getElementById('firstname');
    var middleNameInput = document.getElementById('middlename');
    var lastNameInput = document.getElementById('lastname');
    var msSelect = document.getElementById('ms');
    var genderSelect = document.getElementById('gender');
    var raceSelect = document.getElementById('race');
    var addressInput = document.getElementById('sa');
    var cityInput = document.getElementById('city');
    var stateSelect = document.getElementById('state');
    var zipInput = document.getElementById('zip');
    var hsSelect = document.getElementById('hsize');
    var contactInfoLabel = document.querySelector('label[for="contactinfo"]');
    var emailInput = document.getElementById('email');
    var phoneInput = document.getElementById('phone');

    var emergencyContactLabel = document.querySelector('label[for="rcontactinfo"]');
    var efirstNameInput = document.getElementById('rfirstname');
    var elastNameInput = document.getElementById('rlastname');
    var erelationshipInput = document.getElementById('rrelationship');
    var ephoneInput = document.getElementById('rphone');

    var responsibleContactLabel = document.querySelector('label[for="econtactinfo"]');
    var rfirstNameInput = document.getElementById('efirstname');
    var rlastNameInput = document.getElementById('elastname');
    var rrelationshipInput = document.getElementById('erelationship');
    var rphoneInput = document.getElementById('ephone');

    var employmentLabel = document.querySelector('label[for="Employment"]');
    var employSelect = document.getElementById('Employment Status');
    var incomeInput = document.getElementById('income');
    var AGSelect = document.getElementById('agw');

    var socialLabel = document.querySelector('label[for="social"]');
    var learnSelect = document.getElementById('learn');
    var transpSelect = document.getElementById('transp');
    var medicalSelect = document.getElementById('mc');
    var foodSelect = document.getElementById('food');
    var homelessSelect = document.getElementById('homel');

    var symptLabel = document.querySelector('label[for="symptom"]');
    var symInput = document.getElementById('symptoms');
    var womLabel = document.querySelector('label[for="wh"]');
    var mensInput = document.getElementById('mens');
    var pregInput = document.getElementById('preg');
    var birthsInput = document.getElementById('lb');
    var miscInput = document.getElementById('mis');
    var famhistLabel = document.querySelector('label[for="famhlth"]');
    var famhistInput = document.getElementById('fh');

    var currentMedicationsLabel = document.querySelector('label[for="currentMedications"]');
    var currentMedicationsInput = document.getElementById('currentMedications');
    var allergiesInput = document.getElementById('allergies');
    var hospitalizedSelect = document.getElementById('hospitalized');
    var smokeSelect = document.getElementById('smoker');
    var houseSmokeSelect = document.getElementById('housesmoker');
    var alcoholSelect = document.getElementById('alcohol');
    var insuranceLabel = document.querySelector('label[for="insuranceinfo"]');
    var insuranceProvider = document.getElementById('provider');
    var insurancePolicyNumber = document.getElementById('policyNumber');
    var insuranceGroupNumber = document.getElementById('groupNumber');
    var submitButton = document.getElementById('submitButton');
    var contactInfo = document.getElementById('contactInfo');
    var contactName = document.getElementById('contactName');
    var contactAddressSLO = document.getElementById('contactAddressSLO');
    var contactAddressPR = document.getElementById('contactAddressPR');
    var contactPhone = document.getElementById('contactPhone');

    if (language === 'English') {
        formTitle.textContent = "Welcome to the SLO Noor Foundation Check-In";

        personalInfoLabel.textContent = "Enter your personal information:";
        firstNameInput.placeholder = "First Name";
        middleNameInput.placeholder = "Middle Name";
        lastNameInput.placeholder = "Last Name";
        msSelect.options[0].text = "Marital status";
        msSelect.options[1].text = "Single";
        msSelect.options[2].text = "Married";
        msSelect.options[3].text = "Divorced";
        msSelect.options[4].text = "Other";

        genderSelect.options[0].text = "Gender";
        genderSelect.options[1].text = "Male";
        genderSelect.options[2].text = "Female";
        genderSelect.options[3].text = "Other";

        raceSelect.options[0].text = "Race";
        raceSelect.options[1].text = "African American";
        raceSelect.options[2].text = "American Indian/ Alaska Native";
        raceSelect.options[3].text = "Asian";
        raceSelect.options[4].text = "Caucasian";
        raceSelect.options[5].text = "Hawaiian/ Pacific Islander";
        raceSelect.options[6].text = "Hispanic";
        raceSelect.options[7].text = "Two or More Races";
        raceSelect.options[8].text = "Other";
        
        addressInput.placeholder = "Street address";
        cityInput.placeholder = "City";
        stateSelect.options[0].text = "State";
        zipInput.placeholder = "ZIP code";
        hsSelect.options[0].text = "Household size";

        contactInfoLabel.textContent = "What's your contact information?";
        emailInput.placeholder = "Email Address";
        phoneInput.placeholder = "Phone Number";
        
        emergencyContactLabel.textContent = "What's your emergency contact information?";
        efirstNameInput.placeholder = "First Name";
        elastNameInput.placeholder = "Last Name";
        erelationshipInput.placeholder = "Relationship";
        ephoneInput.placeholder = "Phone Number";

        responsibleContactLabel.textContent = "Responsible party information? (If other then the patient)";
        rfirstNameInput.placeholder = "First Name";
        rlastNameInput.placeholder = "Last Name";
        rrelationshipInput.placeholder = "Relationship";
        rphoneInput.placeholder = "Phone Number";

        employmentLabel.textContent = "What's your employment?";
        employSelect.options[0].text = "Employment status";
        employSelect.options[1].text = "Employed";
        employSelect.options[2].text = "Unemployed";
        employSelect.options[3].text = "Retired";
        employSelect.options[4].text = "Disabled";
        employSelect.options[5].text = "Student";
        employSelect.options[6].text = "Other";
        incomeInput.placeholder = "Household annual income";
        AGSelect.options[0].text = "Seasonal/ Ag worker?";
        AGSelect.options[1].text = "Yes";
        AGSelect.options[2].text = "No";

        socialLabel.textContent = "Social";
        learnSelect.options[0].text = "How did you learn about SLO Noor Clinic?";
        learnSelect.options[1].text = "TV";
        learnSelect.options[2].text = "Radio";
        learnSelect.options[3].text = "Social Media";
        learnSelect.options[4].text = "Friend/Family";
        learnSelect.options[5].text = "Referral";
        learnSelect.options[6].text = "Other";
        transpSelect.options[0].text = "Do you have transportation to and from appointments?";
        transpSelect.options[1].text = "Yes";
        transpSelect.options[2].text = "No";
        medicalSelect.options[0].text = "Have you been eligible for Medi-Cal in the last three months?";
        medicalSelect.options[1].text = "Yes";
        medicalSelect.options[2].text = "No";
        foodSelect.options[0].text = "Have you been able to purchase food for the last three months?";
        foodSelect.options[1].text = "Yes";
        foodSelect.options[2].text = "No";
        homelessSelect.options[0].text = "Have you been homeless or feared becoming homeless in the last three months?";
        homelessSelect.options[1].text = "Yes";
        homelessSelect.options[2].text = "No";

        symptLabel.textContent = "What are your current symptoms or reason for visit?";
        symInput.placeholder = "Enter current symptoms or reasons for visit";
        womLabel.textContent = "What's your health history? (Women)";
        mensInput.placeholder = "How many weeks since last menstrual cycle?";
        pregInput.placeholder = "Enter number of pregnancies";
        birthsInput.placeholder = "Enter number of live births";
        miscInput.placeholder = "Enter number of miscarriages";
        famhistLabel.textContent = "What's your family's health history?";
        famhistInput.placeholder = "Enter any history of disease in your family";


        currentMedicationsLabel.textContent = "What's your health history?";
        currentMedicationsInput.placeholder = "Enter any current medications";
        allergiesInput.placeholder = "Enter any allergies";
        hospitalizedSelect.options[0].text = "Have you been hospitalized in the past year?";
        hospitalizedSelect.options[1].text = "Yes";
        hospitalizedSelect.options[2].text = "No";
        smokeSelect.options[0].text = "Do you smoke?";
        smokeSelect.options[1].text = "Yes";
        smokeSelect.options[2].text = "No";
        houseSmokeSelect.options[0].text = "Does anyone in your household smoke?";
        houseSmokeSelect.options[1].text = "Yes";
        houseSmokeSelect.options[2].text = "No";
        alcoholSelect.options[0].text = "How many alcoholic drinks do you consume weekly?";
        alcoholSelect.options[1].text = "0";
        alcoholSelect.options[2].text = "1-3";
        alcoholSelect.options[3].text = "3-5";
        alcoholSelect.options[3].text = "6+";

        insuranceLabel.textContent = "What's your insurance information?";
        insuranceProvider.placeholder = "Insurance Provider (Ex: Aetna)";
        insurancePolicyNumber.placeholder = "Policy Number";
        insuranceGroupNumber.placeholder = "Group Number";

        submitButton.textContent = "Submit";

        contactInfo.textContent = "Contact Information";
        contactName.textContent = "SLO Noor Foundation Health Clinics:";
        contactAddressSLO.textContent = "San Luis Obispo Address: 1428 Phillip’s Lane, Suite 203, San Luis Obispo, CA 93401";
        contactAddressPR.textContent = "Paso Robles Address: 400 Oak Hill Road, Paso Robles, CA 93446";
        contactPhone.textContent = "Phone: (805) 439-1799";

    } else if (language === 'Español') {
        formTitle.textContent = "Bienvenido al registro de la Fundación SLO Noor";

        personalInfoLabel.textContent = "Ingresa tu información personal:";
        firstNameInput.placeholder = "Nombre de pila";
        middleNameInput.placeholder = "Segundo nombre";
        lastNameInput.placeholder = "Apellido";
        msSelect.options[0].text = "Estado civil";
        msSelect.options[1].text = "Soltero/Soltera";
        msSelect.options[2].text = "Casado/Cadada";
        msSelect.options[3].text = "Divorciado/Divorciada";
        msSelect.options[4].text = "Otro";

        genderSelect.options[0].text = "Género";
        genderSelect.options[1].text = "Hombre";
        genderSelect.options[2].text = "Mujer";
        genderSelect.options[3].text = "Otro";

        raceSelect.options[0].text = "Carrera";
        raceSelect.options[1].text = "Afroamericano/ Afroamericana";
        raceSelect.options[2].text = "Indio Americano/ Nativo de Alaska/ India Americana/ Nativa de Alaska";
        raceSelect.options[3].text = "Asiático/ Asiática";
        raceSelect.options[4].text = "Caucásico/ Caucásica";
        raceSelect.options[5].text = "Hawaiano / isleño del Pacífico/ Hawaiana / isleña del Pacífico";
        raceSelect.options[6].text = "Hispano/ Hispana";
        raceSelect.options[7].text = "Dos o mas carreras";
        raceSelect.options[8].text = "Otro";

        addressInput.placeholder = "Dirección";
        cityInput.placeholder = "Ciudad";
        stateSelect.options[0].text = "Estado";
        zipInput.placeholder = "Código postal";
        hsSelect.options[0].text = "Tamaño del hogar";

        contactInfoLabel.textContent = "¿Cuál es su información de contacto?";
        emailInput.placeholder = "Dirección de correo electrónico";
        phoneInput.placeholder = "Número de teléfono";

        emergencyContactLabel.textContent = "¿Cuál es su información de contacto de emergencia?";
        efirstNameInput.placeholder = "Nombre de pila";
        elastNameInput.placeholder = "Apellido";
        erelationshipInput.placeholder = "Relación";
        ephoneInput.placeholder = "Número de teléfono";

        responsibleContactLabel.textContent = "¿Información del responsable? (Si no es el paciente)";
        rfirstNameInput.placeholder = "Nombre de pila";
        rlastNameInput.placeholder = "Apellido";
        rrelationshipInput.placeholder = "Relación";
        rphoneInput.placeholder = "Número de teléfono";

        employmentLabel.textContent = "¿Cuál es tu empleo?";
        employSelect.options[0].text = "Estado de Empleo";
        employSelect.options[1].text = "Empleado/ Empleada";
        employSelect.options[2].text = "Desempleados/ Desempleadas";
        employSelect.options[3].text = "Jubilado/ Jubilada";
        employSelect.options[4].text = "Desactivado/ Desactivada";
        employSelect.options[5].text = "Estudiante";
        employSelect.options[6].text = "Otro";
        incomeInput.placeholder = "Ingreso anual del hogar";
        AGSelect.options[0].text = "¿Trabajador estacional / agrícola?/ ¿Trabajadora estacional / agrícola?";
        AGSelect.options[1].text = "Sí";
        AGSelect.options[2].text = "No";

        socialLabel.textContent = "Social";
        learnSelect.options[0].text = "¿Cómo se enteró de la Clínica SLO Noor?";
        learnSelect.options[1].text = "Televisión";
        learnSelect.options[2].text = "Radio";
        learnSelect.options[3].text = "Medios de comunicación social";
        learnSelect.options[4].text = "Amigo/ familia/ Amiga/ familia";
        learnSelect.options[5].text = "Remisión";
        learnSelect.options[6].text = "Otro";
        transpSelect.options[0].text = "¿Tiene transporte hacia y desde las citas?";
        transpSelect.options[1].text = "Sí";
        transpSelect.options[2].text = "No";
        medicalSelect.options[0].text = "¿Ha sido elegible para Medi-Cal en los últimos tres meses?";
        medicalSelect.options[1].text = "Sí";
        medicalSelect.options[2].text = "No";
        foodSelect.options[0].text = "¿Ha podido comprar alimentos durante los últimos tres meses?";
        foodSelect.options[1].text = "Sí";
        foodSelect.options[2].text = "No";
        homelessSelect.options[0].text = "¿Ha estado sin hogar o ha tenido miedo de quedarse sin hogar en los últimos tres meses?";
        homelessSelect.options[1].text = "Sí";
        homelessSelect.options[2].text = "No";

        currentMedicationsLabel.textContent = "¿Cuál es su historial de salud?";
        currentMedicationsInput.placeholder = "Ingrese cualquier medicamento actual";
        allergiesInput.placeholder = "Ingrese cualquier alergia";
        hospitalizedSelect.options[0].text = "¿Ha estado hospitalizado durante el último año?";
        hospitalizedSelect.options[1].text = "Sí";
        hospitalizedSelect.options[2].text = "No";
        smokeSelect.options[0].text = "¿Fuma usted?";
        smokeSelect.options[1].text = "Sí";
        smokeSelect.options[2].text = "No";
        houseSmokeSelect.options[0].text = "¿Alguien en su hogar fuma?";
        houseSmokeSelect.options[1].text = "Sí";
        houseSmokeSelect.options[2].text = "No";
        alcoholSelect.options[0].text = "¿Cuántas bebidas alcohólicas consumes semanalmente?";
        alcoholSelect.options[1].text = "0";
        alcoholSelect.options[2].text = "1-3";
        alcoholSelect.options[3].text = "3-5";
        alcoholSelect.options[3].text = "6+";

        symptLabel.textContent = "¿Cuáles son sus síntomas actuales o motivo de visita?";
        symInput.placeholder = "Enter current symptoms or reasons for visit";
        womLabel.textContent = "Ingrese los síntomas actuales o los motivos de la visita.";
        mensInput.placeholder = "¿Cuántas semanas desde el último ciclo menstrual?";
        pregInput.placeholder = "Ingrese el número de embarazos";
        birthsInput.placeholder = "Ingrese el número de nacidos vivos";
        miscInput.placeholder = "Ingrese el número de abortos espontáneos";
        famhistLabel.textContent = "¿Cuál es el historial de salud de su familia?";
        famhistInput.placeholder = "Ingrese cualquier historial de enfermedad en su familia.";

        insuranceLabel.textContent = "¿Cuál es la información de su seguro?";
        insuranceProvider.placeholder = "Proveedor de seguros (por ejemplo: Aetna)";
        insurancePolicyNumber.placeholder = "Número de póliza";
        insuranceGroupNumber.placeholder = "Número de grupo";

        submitButton.textContent = "Entregar";

        contactInfo.textContent = "Información del contacto";
        contactName.textContent = "Clínicas de salud de la Fundación SLO Noor:";
        contactAddressSLO.textContent = "Dirección de San Luis Obispo: 1428 Phillip’s Lane, Suite 203, San Luis Obispo, CA 93401";
        contactAddressPR.textContent = "Paso Robles Dirección: 400 Oak Hill Road, Paso Robles, CA 93446";
        contactPhone.textContent = "Teléfono: (805) 439-1799";
    }
}
