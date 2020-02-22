function mortgageOrRent() {
    const homeChoice = document.getElementById("home_select").value;

    if (homeChoice == "buy") {
        document.getElementById("rent").style.display = "none";
        document.getElementById("mortgage").style.display = "block";
        return;
    } else if (homeChoice == "rent") {
        document.getElementById("mortgage").style.display = "none";
        document.getElementById("rent").style.display = "block";
    }
}
function getFinalCalc() {
    const olForm = document.getElementById("calculation_form");
    let calcTotal = 0;
    const homeChoice = olForm.elements["home_select"].value;
    
    if (homeChoice == "buy") {
        let mortgageYears = olForm.elements["mortgage_years"].valueAsNumber;
        let mortgageRate = olForm.elements["mortgage_rate"].valueAsNumber / 100 / 12;
        let mortgageLoan = olForm.elements["mortgage_loan"].valueAsNumber;
        let mortgageMonths = mortgageYears * 12;

        calcTotal += getMortgageTotal(mortgageMonths, mortgageRate, mortgageLoan);

    } else if (homeChoice == "rent") {
        calcTotal += olForm.elements["rent_pm"].valueAsNumber;
    }
    const counciltaxSelect = olForm.elements["counciltax_select"].value;
    const counciltaxFig = olForm.elements["counciltax_fig"].valueAsNumber;

    calcTotal += counciltaxMhYr(counciltaxSelect, counciltaxFig);

    function testFunction() {
        this.A = "goose";
        this.B = "gander";
    }

    alert("The monthly total is: " + calcTotal.toFixed(2));
}
function getMortgageTotal(n, r, P) {
    
    let morgageTotal = P * ((r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
    return morgageTotal;
}
function counciltaxMhYr(counciltaxSelect, counciltaxFig) {
    if (counciltaxSelect == "year") {
        return counciltaxFig / 12;
    }
    return counciltaxFig;
}