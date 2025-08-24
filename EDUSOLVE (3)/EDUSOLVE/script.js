function selectSubject(subjectName, isPremium) {
  if (isPremium) {
    document.getElementById('premium-popup').style.display = 'flex';
  } else {
    alert(`You selected ${subjectName}`);
    // Redirect to subject page or load content here
  }
}

function closePopup() {
  document.getElementById('premium-popup').style.display = 'none';
}

document.getElementById('premium-btn').addEventListener('click', () => {
  alert('Upgrade page coming soon!');
});
