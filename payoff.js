$(document).ready(function() {
    
    // 1. Handle the Reset Form button click
    $("#btnReset").click(function() {
        $("#errorBox").hide().text("");
        $("#results-container").hide();
        $("#resultsBody").empty();
        $("#summary-text").empty();
    });

    // 2. Handle the form submission (Calculate button click or Enter key)
    $("#payoff-form").submit(function(event) {
        // Prevent the browser from reloading the page
        event.preventDefault();

        // Clear previous error messages and calculation results
        $("#errorBox").hide().text("");
        $("#results-container").hide();
        $("#resultsBody").empty();
        $("#summary-text").empty();

        // Retrieve input values and parse them as floating-point numbers
        let balance = parseFloat($("#balance").val());
        let apr = parseFloat($("#inputAPR").val());
        let payment = parseFloat($("#inputPayment").val());

        // Validation 1: Check for empty fields, zero, or negative numbers
        if (isNaN(balance) || isNaN(apr) || isNaN(payment) || balance <= 0 || apr < 0 || payment <= 0) {
            $("#errorBox").text("Input Error: Please enter valid positive numbers for all fields.").fadeIn();
            return;
        }

        // Calculate the monthly interest rate and the first month's interest (rounded to cents)
        let monthlyRate = (apr / 100) / 12;
        let firstMonthInterest = Math.round((balance * monthlyRate) * 100) / 100;

        // Validation 2: Check for an infinite loop condition
        if (payment <= firstMonthInterest) {
            $("#errorBox").text("Infinite Loop Error: Monthly payment ($" + payment.toFixed(2) + ") must be greater than the first month's interest ($" + firstMonthInterest.toFixed(2) + ").").fadeIn();
            return;
        }

        // 3. Run a while loop to compute the monthly payoff schedule
        let month = 0;
        let currentBalance = balance;
        let totalInterest = 0;
        let totalPaid = 0;

        while (currentBalance > 0) {
            month++;

            // Calculate the interest charge for the current month and round to 2 decimal places
            let interest = Math.round((currentBalance * monthlyRate) * 100) / 100;
            let actualPayment = 0;
            let endingBalance = 0;

            // Check if this is the final month and adjust the payment accordingly
            let totalOwedThisMonth = Math.round((currentBalance + interest) * 100) / 100;
            if (totalOwedThisMonth <= payment) {
                actualPayment = totalOwedThisMonth;
                endingBalance = 0;
            } else {
                actualPayment = payment;
                endingBalance = Math.round((currentBalance + interest - actualPayment) * 100) / 100;
            }

            // Accumulate total interest paid and total amount paid
            totalInterest = Math.round((totalInterest + interest) * 100) / 100;
            totalPaid = Math.round((totalPaid + actualPayment) * 100) / 100;

            // Build a 5-column table row and append it to the table body using jQuery
            let rowHTML = `
                <tr>
                    <td>${month}</td>
                    <td>$${currentBalance.toFixed(2)}</td>
                    <td>$${interest.toFixed(2)}</td>
                    <td>$${actualPayment.toFixed(2)}</td>
                    <td>$${endingBalance.toFixed(2)}</td>
                </tr>
            `;
            $("#resultsBody").append(rowHTML);

            // Update the beginning balance for the next month
            currentBalance = endingBalance;
        }

        // 4. Append a bold summary row at the bottom of the table
        let totalRowHTML = `
            <tr class="total-row">
                <td>${month}</td>
                <td></td>
                <td>$${totalInterest.toFixed(2)}</td>
                <td>$${totalPaid.toFixed(2)}</td>
                <td></td>
            </tr>
        `;
        $("#resultsBody").append(totalRowHTML);

        // Display the summary sentence below the table
        let line1 = `The payoff for $${balance.toFixed(2)} at ${apr.toFixed(2)}% paying $${payment.toFixed(2)} per month will take ${month} months.`;
        let line2 = `The total interest paid will be $${totalInterest.toFixed(2)} with a total amount paid of $${totalPaid.toFixed(2)}.`;
        
        $("#summary-text")
            .html(`${line1}<br><br>${line2}`)
            .css("text-align", "justify");

        // Reveal the results container
        $("#results-container").fadeIn("fast");
    });
});