// ==========================================================
// 1. KEY DATE DEFINITIONS (Using Date.UTC for global precision)
// NOTE: Months in JavaScript are 0 (January) to 11 (December)
// ==========================================================
// ==========================================================
// 1. KEY DATE DEFINITIONS (Using Date.UTC for global precision)
// ==========================================================
// ... (Tus otras fechas) ...

// FECHA DE RESERVA DEL PARCHE (MANUAL - Solo se usa si la API falla)
// Nota: Un parche ocurre aproximadamente cada dos semanas (14 días).
// Puedes establecer esta fecha a 14 días a partir de hoy (5 Nov 2025).
const FALLBACK_PATCH_DATE = Date.UTC(2025, 10, 19, 0, 0, 0); // Ejemplo: 1 Dic 2025 a las 10:00 UTC
// End of Current Split/Division (MANUAL - Update when Riot announces it!)
const END_OF_SPLIT = Date.UTC(2025, 10, 20, 0, 0, 0); 

// Start of the Split (Used for progress bar - MANUAL)
const START_OF_SPLIT = Date.UTC(2025, 7, 20, 0, 0, 0); 

// Estimated Start of Next Season (MANUAL - Update when Riot announces it!)
const NEXT_SEASON_START = Date.UTC(2026, 0, 15, 12, 0, 0); 

// API URL for next Patch (Automatic)
const PATCH_API_URL = 'https://lol-patch-dates.s3.eu-west-1.amazonaws.com/latest/patch_dates.json';
let nextPatchDate = undefined; // Variable to store the date from the API


// ==========================================================
// 2. HELPER FUNCTIONS (Formatting and Progress)
// ==========================================================

// Function to calculate and format time
function formatTime(distance) {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    const pad = (num) => num.toString().padStart(2, '0');

    return `${pad(days)}D ${pad(hours)}H ${pad(minutes)}M ${pad(seconds)}S`;
}

// Function to update the progress bar
function updateProgressBar(now) {
    const totalDuration = END_OF_SPLIT - START_OF_SPLIT;
    const elapsedDuration = now - START_OF_SPLIT;
    
    if (totalDuration <= 0) return;

    let progressPercent = (elapsedDuration / totalDuration) * 100;
    
    if (progressPercent > 100) progressPercent = 100;
    if (progressPercent < 0) progressPercent = 0;

    const roundedPercent = progressPercent.toFixed(2);
    document.getElementById("progress-bar").style.width = roundedPercent + '%';
    document.getElementById("progress-text").innerHTML = `Progress: ${roundedPercent}% completed`;
}

// ==========================================================
// 3. PATCH DATA FETCH FUNCTION (Automatic)
// ==========================================================

async function getNextPatchDate() {
    try {
        const response = await fetch(PATCH_API_URL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        
        const nowTimestamp = new Date().getTime();
        
        // Find the first patch date in the future
        for (const patch of Object.keys(data).sort()) {
            const patchTimestamp = new Date(data[patch]).getTime();
            if (patchTimestamp > nowTimestamp) {
                document.getElementById('reloaded-timer').parentElement.querySelector('h3').textContent = `Next LoL Patch (${patch})`;
                return patchTimestamp;
            }
        }
        return null;
} catch (error) {
        console.error("Error fetching patch API data:", error);
        
        // --- AQUÍ ESTÁ LA LÓGICA DE FALLBACK ---
        // Usamos la fecha de reserva y actualizamos el título para avisar al usuario.
        document.getElementById('reloaded-timer').parentElement.querySelector('h3').textContent = "Next Game Patch";
        
        return FALLBACK_PATCH_DATE;
    }
}


// ==========================================================
// 4. MAIN TIMER UPDATE FUNCTION
// ==========================================================

async function updateTimers() {
    const now = new Date().getTime();

    // --- A. Main Timer (End of Split - Manual Date) ---
    const distanceSplit = END_OF_SPLIT - now;
    if (distanceSplit > 0) {
        document.getElementById("countdown").innerHTML = formatTime(distanceSplit);
        updateProgressBar(now);
    } else {
        document.getElementById("countdown").innerHTML = "SPLIT ENDED! Awaiting next one.";
        document.getElementById("progress-bar").style.width = '100%';
        document.getElementById("progress-text").innerHTML = "100% completed";
    }

    // --- B. Patch Timer (Automatic via API) ---
    if (nextPatchDate === undefined) {
        nextPatchDate = await getNextPatchDate();
    }
    
    if (nextPatchDate) {
        const distancePatch = nextPatchDate - now;
        if (distancePatch > 0) {
            document.getElementById("reloaded-timer").innerHTML = formatTime(distancePatch);
        } else {
            document.getElementById("reloaded-timer").innerHTML = "PATCH ACTIVE!";
            nextPatchDate = undefined; 
        }
    } else {
        document.getElementById("reloaded-timer").innerHTML = "Next patch date..."; // Corregido: Mensaje claro en inglés.
    }
    
    // --- C. Next Season Reset Timer (Manual Date) ---
    const distanceNextSeason = NEXT_SEASON_START - now;
    if (distanceNextSeason > 0) {
        document.getElementById("next-cod-timer").innerHTML = formatTime(distanceNextSeason);
    } else {
        document.getElementById("next-cod-timer").innerHTML = "SEASON STARTED!";
    }
}


// ==========================================================
// 5. START THE TIMER
// ==========================================================

// Run the function immediately
updateTimers(); 

// Call the function every second (1000ms)

const timerInterval = setInterval(updateTimers, 1000);



