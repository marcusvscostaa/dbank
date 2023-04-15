import { dbank } from "../../declarations/dbank";

window.addEventListener("load", async function(){
    update(); 
});

document.querySelector("form").addEventListener("submit", async function(event){
    event.preventDefault();
    console.log("clicked");

    if(document.getElementById("input-amount").value.length != 0){
        document.getElementById("withdrawal-amount").style.visibility = "hidden";
    };
    if(document.getElementById("withdrawal-amount").value.length != 0){
        document.getElementById("input-amount").style.visibility = "hidden";
    };

    const button = event.target.querySelector("#submit-btn");
    
    const inputAmount = parseFloat(document.getElementById("input-amount").value);
    const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value);
    button.setAttribute("disabled", true);

    if(document.getElementById("input-amount").value.length != 0){
        await dbank.topUp(inputAmount);
    }else if(document.getElementById("withdrawal-amount").value.length != 0){
        await dbank.withdraw(outputAmount);
    };

    update();

    document.getElementById("input-amount").value = "";
    document.getElementById("withdrawal-amount").value = "";
    document.getElementById("withdrawal-amount").style.visibility = "visible";
    document.getElementById("input-amount").style.visibility = "visible";
    button.removeAttribute("disabled");
});

async function update(){
    const currentAmount = await dbank.checkBalance();
    document.getElementById("value").innerText = currentAmount.toFixed(2);
}