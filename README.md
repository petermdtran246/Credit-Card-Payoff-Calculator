# Credit Card Payoff Calculator

A responsive web application that calculates a complete, month-by-month repayment schedule for credit card debt based on the user's current balance, Annual Percentage Rate (APR), and planned monthly payment.

## Live Demo

- **Hosted Link:** `http://ucusername.ksshosting.com/project05/` *(Replace `ucusername` with your KSSHosting username)*

## Features

- **Month-by-Month Payoff Schedule:** Dynamically generates an itemized table displaying the Month, Beginning Balance, Interest Amount, Payment, and Ending Balance until the remaining balance reaches `$0.00`.
- **Automatic Final Payment Adjustment:** Detects when the remaining balance plus accrued interest is less than or equal to the regular monthly payment and adjusts the final payment accordingly to prevent overpayment.
- **Input Validation & Infinite Loop Prevention:**
  - Validates that all input fields contain valid numerical values (requiring positive values for balance and monthly payment, and non-negative values for APR).
  - Prevents infinite loops by verifying that the monthly payment exceeds the first month's interest charge so the principal decreases over time.
- **Comprehensive Summary Output:** Appends a bold summary row at the bottom of the schedule table alongside a two-line summary detailing the total months to payoff, total interest paid, and total amount paid.
- **Interactive Form Reset:** Clears all input fields, hides error notifications, and resets the results table to its initial state with a single click.

## Technologies Used

- **HTML5:** Semantic page structure (`<header>`, `<main>`, `<footer>`) and accessible form controls.
- **CSS3:** Modern card-based layout, zebra-striped table rows, and `tabular-nums` alignment for currency figures.
- **JavaScript (ES6):** Financial calculations, cent-level rounding (`Math.round`), and `while` loop iteration.
- **jQuery (v3.2.1):** Unobtrusive DOM manipulation, form submission handling (`event.preventDefault()`), dynamic table generation (`.append()`), and UI transitions (`.fadeIn()`).

## Project Structure

```text
project05/
├── index.html      # Main HTML structure for the input form and results table
├── payoff.js       # jQuery event handlers, validation logic, and payoff loop
├── style.css       # Styling for layout, form elements, and results table
└── README.md       # Project documentation
```

## Calculation Methodology

1. **Monthly Interest Rate:**
   $$\text{Monthly Rate} = \frac{\text{APR}}{100 \times 12}$$
2. **Monthly Interest Charge:**
   $$\text{Interest} = \text{Beginning Balance} \times \text{Monthly Rate}$$
3. **Ending Balance:**
   $$\text{Ending Balance} = \text{Beginning Balance} + \text{Interest} - \text{Actual Payment}$$

All currency figures are rounded to the nearest cent (`2` decimal places) at each monthly interval to reflect standard credit card statements.

## Getting Started

1. Clone or download this repository to your local machine:
   ```bash
   git clone [https://github.com/your-username/project05.git](https://github.com/your-username/project05.git)
   ```
2. Navigate into the `project05` directory.
3. Open `index.html` in any modern web browser (Chrome, Firefox, Safari, or Edge). No build tools or local server setup are required.

## Author

- **Peter Tran** — © 2026
