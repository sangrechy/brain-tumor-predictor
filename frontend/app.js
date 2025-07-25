document.addEventListener('DOMContentLoaded', function() {
  // Theme toggle functionality
  const themeSwitch = document.getElementById('theme-switch');
  const htmlElement = document.documentElement;
  
  themeSwitch.addEventListener('change', function() {
    if (this.checked) {
      htmlElement.setAttribute('data-theme', 'light');
      document.querySelector('.toggle-icon').textContent = '🌞';
    } else {
      htmlElement.setAttribute('data-theme', 'dark');
      document.querySelector('.toggle-icon').textContent = '🌘';
    }
  });

  // Live value display for sliders
  const ageSlider = document.getElementById('age');
  const ageValue = document.getElementById('age-value');
  const tumorSizeSlider = document.getElementById('tumor_size');
  const tumorSizeValue = document.getElementById('tumor-size-value');
  
  ageSlider.addEventListener('input', function() {
    ageValue.textContent = this.value;
  });
  
  tumorSizeSlider.addEventListener('input', function() {
    tumorSizeValue.textContent = this.value;
  });

  // Form submission
  const predictForm = document.getElementById('predictForm');
  const loadingDiv = document.getElementById('loading');
  const resultsDiv = document.getElementById('results');

  predictForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const age = parseInt(ageSlider.value);
    const tumor_size = parseFloat(tumorSizeSlider.value);
    const tumor_location = document.getElementById('tumor_location').value;
    const contrast_enhancement = document.getElementById('contrast_enhancement').value;
    const seizures = document.getElementById('seizures').checked;
    const headaches = document.getElementById('headaches').checked;
    const vision_problems = document.getElementById('vision_problems').checked;
    
    if (!age || !tumor_size || !tumor_location || !contrast_enhancement) {
      alert("Please fill in all required fields");
      return;
    }
    
    loadingDiv.style.display = "flex";
    resultsDiv.style.display = "none";
    
    try {
      // Simulate API call (replace with actual endpoint)
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          age,
          tumor_size,
          tumor_location,
          contrast_enhancement,
          seizures,
          headaches,
          vision_problems,
        })
      });
      
      const data = await response.json();
      
      // Enhanced results display
      resultsDiv.innerHTML = `
        <h3>Prediction Result</h3>
        <div class="result-item">
          <p><strong>Tumor Type:</strong> <span class="result-value">${data.tumor_type}</span></p>
        </div>
        <div class="result-item">
          <p><strong>WHO Grade:</strong> <span class="result-value">${data.grade}</span></p>
        </div>
        <div class="result-item">
          <p><strong>Urgency:</strong> <span class="result-value ${data.urgency.toLowerCase()}">${data.urgency}</span></p>
        </div>
      `;
      
      resultsDiv.style.display = "block";
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      loadingDiv.style.display = "none";
    }
  });
});
