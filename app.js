const drivers = [
    { name: 'Sainz', skill: 38 },
    { name: 'Leclerc', skill: 39 },
    { name: 'Alonso', skill: 41 },
    { name: 'Hamilton', skill: 40 },
    // Add more drivers here
];

const numStints = 4;
let currentStint = 1;

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calculateTotalScore(driver, currentStint) {
    let totalScore = 0;
    for (let i = 1; i <= currentStint; i++) {
        const stintCell = document.getElementById(`driver-${drivers.indexOf(driver) + 1}-stint-${i}`);
        totalScore += parseInt(stintCell.textContent, 10);
    }
    return totalScore;
}

function updateTotalScores() {
    for (const driver of drivers) {
        const totalCell = document.getElementById(`driver-${drivers.indexOf(driver) + 1}-total`);
        totalCell.textContent = calculateTotalScore(driver, currentStint);
    }
}

function sortTableByTotalScore() {
    const resultTable = document.getElementById("result-table");
    const rows = Array.from(resultTable.rows).slice(1); // Skip the header row

    rows.sort((a, b) => {
        const totalScoreA = parseInt(a.cells[5].textContent, 10);
        const totalScoreB = parseInt(b.cells[5].textContent, 10);
        return totalScoreB - totalScoreA;
    });

    // Reorder the table rows based on the sorted order
    for (let i = 0; i < rows.length; i++) {
        resultTable.appendChild(rows[i]);
    }
}

function resetTable() {
    const resultTable = document.getElementById("result-table");
    for (let i = 1; i < resultTable.rows.length; i++) {
        for (let j = 1; j <= numStints; j++) {
            const stintCell = document.getElementById(`driver-${i}-stint-${j}`);
            stintCell.textContent = '';
        }
        const totalCell = document.getElementById(`driver-${i}-total`);
        totalCell.textContent = '';
    }
}

function simulateStint() {
    if (currentStint <= numStints) {
        for (const driver of drivers) {
            const driverScore = driver.skill + getRandomNumber(10, 40);
            const stintCell = document.getElementById(`driver-${drivers.indexOf(driver) + 1}-stint-${currentStint}`);
            stintCell.textContent = driverScore;
        }
        updateTotalScores(); // Update total scores in the table
        sortTableByTotalScore(); // Sort the table by total scores
        currentStint++;
    } else {
        resetTable(); // Reset the table for the next race
        currentStint = 1; // Reset to 1 for the next simulation
    }
}









