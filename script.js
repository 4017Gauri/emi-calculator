// shortcut
const $ = id => document.getElementById(id);

let emiChart;

// Calculate EMI
$('calc-emi').addEventListener('click', () => {
  const P = parseFloat($('loan').value);
  const annualRate = parseFloat($('rate').value);
  const N = parseInt($('months').value, 10);

  const resultsSec = $('results');
  const emiVal = $('emi-val');
  const totalVal = $('total-val');
  const interestVal = $('interest-val');

  if (Number.isNaN(P) || Number.isNaN(annualRate) || Number.isNaN(N) || N <= 0) {
    alert('⚠️ Please enter valid numbers!');
    return;
  }

  // monthly interest rate
  const R = annualRate / 12 / 100;

  // EMI formula
  const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
  const totalPayment = emi * N;
  const totalInterest = totalPayment - P;

  // Show results
  emiVal.textContent = `₹${emi.toFixed(2)}`;
  totalVal.textContent = `₹${totalPayment.toFixed(2)}`;
  interestVal.textContent = `₹${totalInterest.toFixed(2)}`;
  resultsSec.classList.remove('hidden');

  // Draw Chart
  const ctx = document.getElementById('emiChart');
  if (emiChart) emiChart.destroy(); // reset old chart

  emiChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Principal', 'Interest'],
      datasets: [{
        data: [P, totalInterest],
        backgroundColor: ['#4cafef', '#ff6384'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  });
});
