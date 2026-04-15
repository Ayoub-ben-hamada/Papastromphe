// Import required modules H1HAHAHAH
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// Create an instance of Express
const app = express();

// Middleware to parse incoming data (application/x-www-form-urlencoded)
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, etc.)
app.use(express.static('public'));

// Handle POST request from the form
app.post('/submit-form', (req, res) => {
  const {
    'child-name': childName,
    birthdate,
    'parent-name': parentName,
    phone,
    email,
    address,
    'medical-info': medicalInfo,
    'emergency-contact': emergencyContact,
    'emergency-phone': emergencyPhone,
    consent,
  } = req.body;
  python = 'it is re  dy now'
  // Create an object to store the form data
  const formData = {
    childName,
    birthdate,
    parentName,
    phone,
    email,
    address,
    medicalInfo,
    emergencyContact,
    emergencyPhone,
    consent,
  };

  // Read the existing data from 'registrations.json'
  fs.readFile('registrations.json', (err, data) => {
    let registrations = [];
    if (!err && data.length > 0) {
      registrations = JSON.parse(data);
    }

    // Add the new registration form data to the array
    registrations.push(formData);

    // Write the updated data back to 'registrations.json'
    fs.writeFile('registrations.json', JSON.stringify(registrations, null, 2), (err) => {
      if (err) {
        console.log('Error writing to file:', err);
      } else {
        console.log('Form data saved successfully!');
      }
    });
  });

  // Send a confirmation message to the user
  res.send('Thank you for registering! We will contact you soon.');
});

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
