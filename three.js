function updateCosts() {
    const yealinkW79PQty = parseInt(document.getElementById('yealink-w79p').value) || 0;
    const yealinkT54Qty = parseInt(document.getElementById('yealink-t54').value) || 0;
    const yealinkT57Qty = parseInt(document.getElementById('yealink-t57').value) || 0;
    const grandstreamGVXQty = parseInt(document.getElementById('grandstream-gvx').value) || 0;
    let mobileConnectQty = parseInt(document.getElementById('mobile-connect').textContent) || 0; 
    const voiceChannels = parseInt(document.getElementById('voice-channels').value) || 0;

    const businessInternetValue = document.getElementById('business-internet').value;
    const businessInternetService = parseInt(document.getElementById('business-internet').selectedOptions[0].getAttribute('data-service')) || 0;

    const adjustSystemRental = parseFloat(document.getElementById('adjust-system-rental').value) || 0;
    const adjustRebate = parseFloat(document.getElementById('adjust-rebate').value) || 0;
    const adjustService = parseFloat(document.getElementById('adjust-rebate').value) || 0;

    const routerCost = parseInt(document.getElementById('router').value) || 0;
    const terminationAmount = parseFloat(document.getElementById('terminations').value) || 0; 

    const oldCallCharges = parseFloat(document.getElementById('old-call-charges').textContent) || 0;
    const oldEquipmentRental = parseFloat(document.getElementById('old-equipment-rental').textContent) || 0;
    const oldServiceCharges = parseFloat(document.getElementById('old-service-charges').textContent) || 0;
    const oldOtherCosts = parseFloat(document.getElementById('old-other-costs').textContent) || 0;
    const oldMobileCosts = parseFloat(document.getElementById('old-mobile-costs').textContent) || 0;
    const oldLeaselineCosts = parseFloat(document.getElementById('old-leaseline-costs').textContent) || 0;
    const webdev = parseFloat(document.getElementById('webdev').value) || 0;
    const contractTerm = parseInt(document.getElementById('contract-term').value); 

    //Monthly costs
    const webdevcharges60 = webdev * 84;
    const webdevcharges84 = webdev * 59;
    const laptop84 = 34;
    const laptop60 = 47;
    const desktop60 = 58;
    const desktop84 = 42;

    const desktopPc = parseFloat(document.getElementById('desktop').value) || 0;
    const laptop = parseFloat(document.getElementById('laptop').value) || 0;
    

    const totalPhones = yealinkW79PQty + yealinkT54Qty + yealinkT57Qty + grandstreamGVXQty;

    const phone60 = 21;
    const phone84 = 15;

    const totalOldCost = oldCallCharges + oldEquipmentRental + oldServiceCharges + oldOtherCosts + oldMobileCosts + oldLeaselineCosts;
    document.getElementById('total-old-cost').textContent = totalOldCost.toFixed(2);

    mobileConnectQty = totalPhones;
    document.getElementById('mobile-connect').textContent = mobileConnectQty;

    let phonesTotal = 0;

    if (totalPhones > 0 && (contractTerm == 60))
    {
        phonesTotal = totalPhones * phone60;
        
    }
    if (totalPhones > 0 && (contractTerm == 84))
    {
        phonesTotal = totalPhones * phone84;
    }

    if (totalPhones > 0) {
        document.getElementById('ohm').textContent = '1';
        document.getElementById('call-recording').textContent = '1';
        document.getElementById('auto-attendant').textContent = '1';
        document.getElementById('voicemail-license').textContent = '1';
    } else {
        document.getElementById('ohm').textContent = '0';
        document.getElementById('call-recording').textContent = '0';
        document.getElementById('auto-attendant').textContent = '0';
        document.getElementById('voicemail-license').textContent = '0';
    }

    const systemLicensesTotal = mobileConnectQty * 12; 
    const voiceChannelsTotal = voiceChannels * 0;

    console.log("voiceChannelsTotal:", voiceChannelsTotal);
    console.log("businessInternetService:", businessInternetService);


    let newServiceCharges = 0;
    let networkRebate = 0;
    console.log("Contract term =", contractTerm, " Webdev ", webdev);

    
    if (businessInternetValue.toLowerCase() !== 'no') {
        newServiceCharges = 75;
        networkRebate = -74 + adjustRebate;
    }
    else 
    {
        networkRebate = adjustRebate;
    }
    if (contractTerm == 60)
        {
            newServiceCharges += webdevcharges60;
        }
        else{
            newServiceCharges += webdevcharges84;
        }

    console.log("newServiceCharges:", newServiceCharges);
    console.log("networkRebate:", networkRebate);

    const newSystemRental = phonesTotal +  adjustSystemRental;

    

    document.getElementById('new-system-rental').textContent = `${newSystemRental.toFixed(2)}`;
    document.getElementById('new-service-charges').textContent = `${newServiceCharges.toFixed(2)}`;
    document.getElementById('network-rebate').textContent = `${networkRebate.toFixed(2)}`;

    const totalFutureCost = newSystemRental + newServiceCharges + networkRebate;
    document.getElementById('total-future-cost').textContent = `${totalFutureCost.toFixed(2)}`;
    
    
    let totalEarnings = (newSystemRental * contractTerm);

    totalEarnings -= terminationAmount;
    

    document.getElementById('company-earnings').textContent = `${totalEarnings.toFixed(2)}`;
    document.getElementById('system-user-licenses').textContent = `${totalPhones}`;
}

function updateOldCosts() {
    const oldCallCharges = parseFloat(document.getElementById('old-call-charges').textContent.replace(/[^0-9.-]+/g,"")) || 0;
    const oldEquipmentRental = parseFloat(document.getElementById('old-equipment-rental').textContent.replace(/[^0-9.-]+/g,"")) || 0;
    const oldServiceCharges = parseFloat(document.getElementById('old-service-charges').textContent.replace(/[^0-9.-]+/g,"")) || 0;
    const oldOtherCosts = parseFloat(document.getElementById('old-other-costs').textContent.replace(/[^0-9.-]+/g,"")) || 0;
    const oldMobileCosts = parseFloat(document.getElementById('old-mobile-costs').textContent.replace(/[^0-9.-]+/g,"")) || 0;
    const oldLeaselineCosts = parseFloat(document.getElementById('old-leaseline-costs').textContent.replace(/[^0-9.-]+/g,"")) || 0;

    const totalOldCost = oldCallCharges + oldEquipmentRental + oldServiceCharges + oldOtherCosts + oldMobileCosts + oldLeaselineCosts;
    document.getElementById('total-old-cost').textContent = totalOldCost.toFixed(2);
}

const editableElements = document.querySelectorAll('.cost-item .editable');
editableElements.forEach(element => {
    element.addEventListener('input', updateOldCosts);
});

document.querySelectorAll('input, select').forEach(element => {
    element.addEventListener('change', updateCosts);
});

updateCosts();