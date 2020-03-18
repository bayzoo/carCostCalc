document.querySelectorAll(".event_one").forEach(item => {
    item.addEventListener("input", funA => {
        const x = item.valueAsNumber;
        if (isNaN(x) === true) {
            item.value = "";
        } else if (isNaN(x) === false && x < 0) {
            item.value = "";
        }
    });
});
document.getElementById("home_select").addEventListener("change", funB => mortgageOrRent());
document.getElementById("button_click").addEventListener("click", funC => getFinalCalc());

function mortgageOrRent() {
    const homeChoice = document.getElementById("home_select").value;

    if (homeChoice === "buy") {
        document.getElementById("rent").style.display = "none";
        document.getElementById("mortgage").style.display = "block";
        return;
    } else if (homeChoice === "rent") {
        document.getElementById("mortgage").style.display = "none";
        document.getElementById("rent").style.display = "block";
    }
}
function getFinalCalc() {
    const olForm = document.getElementById("calculation_form");
    let calcTotal = 0;
    const homeChoice = olForm.elements["home_select"].value;
    let inputs = {
    };

    if (homeChoice === "buy") {
        inputs.mortgageRate = olForm.elements["mortgage_rate"].valueAsNumber / 100 / 12;
        inputs.mortgageLoan = olForm.elements["mortgage_loan"].valueAsNumber;
        inputs.mortgageMonths = olForm.elements["mortgage_years"].valueAsNumber * 12;

        calcTotal += getMortgageTotal(inputs.mortgageMonths, inputs.mortgageRate, inputs.mortgageLoan);

    } else if (homeChoice === "rent") {
        inputs.rent = olForm.elements["rent_pm"].valueAsNumber;
        calcTotal += inputs.rent;
    }

    const counciltaxSelect = olForm.elements["counciltax_select"].value;
    const counciltaxFig = olForm.elements["counciltax_fig"].valueAsNumber;

    inputs.counciltax = counciltaxMhYr(counciltaxSelect, counciltaxFig);
    calcTotal += inputs.counciltax;

    if (checkInputs(inputs) > 0) {
        alert("Please ensure all fields have values");
        return;
    };

    document.getElementById("calc_output").innerHTML = calcTotal.toFixed(2);

    showMultipleIDs(["monthly_result", "calc_output"]);
}
function getMortgageTotal(n, r, P) {

    let morgageTotal = P * ((r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
    return morgageTotal;
}
function counciltaxMhYr(counciltaxSelect, counciltaxFig) {
    if (counciltaxSelect === "year") {
        return counciltaxFig / 12;
    }
    return counciltaxFig;
}
function showMultipleIDs(arrayOne) {
    for(i = 0; i < arrayOne.length; i++) {
        document.getElementById(arrayOne[i]).style.display = "block";
    }
}
function checkInputs(inputs) {
    const inputValues = Object.values(inputs);
    let y = 0;

    inputValues.forEach(item => {
        if (isNaN(item) === true) {
            y += 1;
        };
    });
    return y;
}
/*Test*/
