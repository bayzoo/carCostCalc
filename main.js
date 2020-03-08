var x = document.querySelectorAll(".event_one");
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

    if (homeChoice === "buy") {

        function formObject() {
            this.mortgageRate = olForm.elements["mortgage_rate"].valueAsNumber / 100 / 12;
            this.mortgageLoan = olForm.elements["mortgage_loan"].valueAsNumber;
            this.mortgageMonths = olForm.elements["mortgage_years"].valueAsNumber * 12;
        }
        const a = new formObject();

        calcTotal += getMortgageTotal(a.mortgageMonths, a.mortgageRate, a.mortgageLoan);

    } else if (homeChoice === "rent") {
        calcTotal += olForm.elements["rent_pm"].valueAsNumber;
    }
    const counciltaxSelect = olForm.elements["counciltax_select"].value;
    const counciltaxFig = olForm.elements["counciltax_fig"].valueAsNumber;

    calcTotal += counciltaxMhYr(counciltaxSelect, counciltaxFig);

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