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
        let mortgageYears = parseFloat(olForm.elements["mortgage_years"].value);
        let mortgageRate = (parseFloat(olForm.elements["mortgage_rate"].value) / 100) / 12;
        let mortgageLoan = parseFloat(olForm.elements["mortgage_loan"].value);
        let mortgageMonths = mortgageYears * 12;

        calcTotal += getMortgageTotal(mortgageMonths, mortgageRate, mortgageLoan);

    } else if (homeChoice == "rent") {
        calcTotal += parseFloat(olForm.elements["rent_pm"].value);
    }
    const counciltaxSelect = olForm.elements["counciltax_select"].value;
    const counciltaxFig = parseFloat(olForm.elements["counciltax_fig"].value);

    calcTotal += counciltaxMhYr(counciltaxSelect, counciltaxFig);

    alert("The monthly total is: " + parseFloat(calcTotal.toFixed(2)));
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