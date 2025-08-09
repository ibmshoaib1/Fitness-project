// Initialize from localStorage or default to day 1
let currentDay = parseInt(localStorage.getItem('currentDay')) || 1;
const totalDays = 30;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    updateProgress();
    
    // Initialize all days as hidden
    document.querySelectorAll('.day-container').forEach(day => {
        if (!day.id.startsWith('day-') && day.id !== 'congrats') {
            day.classList.add('hidden');
        }
    });
});

// Update progress bar and current day display
function updateProgress() {
    // Update day display
    document.getElementById('current-day').textContent = currentDay;
    
    // Calculate and update progress percentage
    const progressPercent = Math.round((currentDay / totalDays) * 100);
    document.getElementById('progress').style.width = `${progressPercent}%`;
    document.getElementById('percentage').textContent = `${progressPercent}%`;
    
    // Hide all days
    document.querySelectorAll('.day-container').forEach(day => {
        day.classList.add('hidden');
    });
    
    // Show current day or congratulations
    if (currentDay <= totalDays) {
        document.getElementById(`day-${currentDay}`).classList.remove('hidden');
    } else {
        document.getElementById('congrats').classList.remove('hidden');
    }
}

// Complete current day and move to next
function completeDay(day) {
    if (day === currentDay) {
        // Play completion sound
        const audio = new Audio('audio/success.mp3');
        audio.play().catch(e => console.log("Audio play failed:", e));
        
        // Update day
        currentDay++;
        localStorage.setItem('currentDay', currentDay);
        
        // Update progress
        updateProgress();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Reset the challenge
function resetChallenge() {
    if (confirm("Are you sure you want to reset your progress and start over?")) {
        currentDay = 1;
        localStorage.setItem('currentDay', currentDay);
        updateProgress();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' && currentDay < totalDays) {
        completeDay(currentDay);
    } else if (e.key === 'ArrowLeft' && currentDay > 1) {
        currentDay--;
        localStorage.setItem('currentDay', currentDay);
        updateProgress();
    }
});
