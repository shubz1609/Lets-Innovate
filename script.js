function recordWellness() {
  const waterIntake = document.getElementById('water-intake').value;
  const stepsCount = document.getElementById('steps-count').value;
  const sleepHours = document.getElementById('sleep-hours').value;

  
  document.getElementById('water-summary').innerText = `Water Intake: ${waterIntake} ml`;
  document.getElementById('steps-summary').innerText = `Steps Count: ${stepsCount}`;
  document.getElementById('sleep-summary').innerText = `Sleep Hours: ${sleepHours}`;
}


function setMedicineReminder() {
  const medicineName = document.getElementById('medicine-name').value;
  const reminderTime = document.getElementById('medicine-time').value;

  if (medicineName && reminderTime) {
      
      const medicineDetails = {
          name: medicineName,
          time: reminderTime
      };

      
      const medicineList = JSON.parse(localStorage.getItem('medicineList')) || [];

      
      medicineList.push(medicineDetails);

      
      localStorage.setItem('medicineList', JSON.stringify(medicineList));

      alert(`Reminder set for ${medicineName} at ${reminderTime}`);

      
      setDailyAlarm(medicineDetails);

  } else {
      alert('Please fill in all fields.');
  }
}


function setDailyAlarm(medicineDetails) {
  const now = new Date();
  const alarmTime = new Date(now.toDateString() + ' ' + medicineDetails.time);

  
  let timeUntilAlarm = alarmTime - now;
  if (timeUntilAlarm < 0) {
      
      timeUntilAlarm += 24 * 60 * 60 * 1000;
  }

  
  setTimeout(() => {
      alert(`Time to take your medicine: ${medicineDetails.name}`);
      playBeepSound();
      setDailyAlarm(medicineDetails);
  }, timeUntilAlarm);
}

function saveEmergencyContact() {
  const emergencyContact = document.getElementById('emergency-contact').value;

  if (emergencyContact) {
      
      localStorage.setItem('emergencyContact', emergencyContact);

      alert(`Emergency contact saved: ${emergencyContact}`);
  } else {
      alert('Please enter an emergency contact number.');
  }
}

function triggerEmergencyAlert() {
  
  const emergencyContact = localStorage.getItem('emergencyContact');

  if (emergencyContact) {
      alert(`Emergency alert triggered! Notifying emergency contact: ${emergencyContact}`);

      sendEmergencyMessage(emergencyContact);
  } else {
      alert('Please save an emergency contact number before triggering an emergency alert.');
  }
}


function sendEmergencyMessage(contact) {
  alert(`Emergency message sent to: ${contact}\nMessage: Sunita needs assistance.`);
}

window.onload = displayEmergencyContact;

function displayEmergencyContact() {
  const emergencyContact = localStorage.getItem('emergencyContact');
  if (emergencyContact) {
      document.getElementById('emergency-contact').value = emergencyContact;
  }
}

function playBeepSound() {
  const beep = new Audio('x.mp3'); 
  beep.play();
}


