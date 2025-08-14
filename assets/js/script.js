document.addEventListener("DOMContentLoaded", function () {
  const totalElement = document.getElementById("donation-total");
  const targetAmount = 1000; // current amount raised
  const progressBar = document.getElementById("progress-bar");
  const targetProgress = 25; // percent (%) current total miles run
  let hasAnimated = false;

  function formatMoney(amount) {
    return "$" + amount.toLocaleString();
  }

  // ----- Pulse animation -----
  function pulseEffect() {
    totalElement.classList.add("pulse");
    setTimeout(() => totalElement.classList.remove("pulse"), 400);
  }

  // ----- Odometer-style count up -----
  function countUp() {
    let current = 0;
    const duration = 3000; // total animation time in ms
    const startTime = performance.now();

    function updateOdometer(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      current = Math.floor(progress * targetAmount);
      totalElement.textContent = formatMoney(current);

      if (progress < 1) {
        requestAnimationFrame(updateOdometer);
      } else {
        totalElement.textContent = formatMoney(targetAmount);
        pulseEffect();
      }
    }
    requestAnimationFrame(updateOdometer);
  }

  // ----- Progress bar animation -----
function fillProgressBar() {
  let current = 0;
  const step = 1;
  const target = targetProgress;

  function stepFill() {
    if (current >= target) return;
    current += step;
    if (current > target) current = target;
    progressBar.style.width = current + "%";
    requestAnimationFrame(stepFill);
  }
  requestAnimationFrame(stepFill);
}


  // Intersection Observer to trigger BOTH animations together
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        countUp();
        fillProgressBar();
        hasAnimated = true;
      }
    });
  }, {
    threshold: 0.5, // triggers when at least half is visible
  });

  observer.observe(totalElement);
});
