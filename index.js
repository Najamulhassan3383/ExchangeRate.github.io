'use strict;'
const currency_01 = document.querySelector('#currency-one');
const currency_02 = document.querySelector('#currency-two');

const input_for_cur_01 = document.querySelector('#amount-01');
const input_for_cur_02 = document.querySelector('#amount-02');
const swap_button = document.querySelector('#btn_swich');
const exchange_rate = document.querySelector('#exchange_rate');


//fectch the rate and updates the DOM
function cal() {

    // 1-we need to get the currency value of both the boxes
    const curr_one = currency_01.value;
    const curr_two = currency_02.value;

    //2- fetch the rate for first currency using fetch request
    const amount = fetch(`https://v6.exchangerate-api.com/v6/21c7713fd2e54c93bd4148f2/latest/${curr_one}`).then(res => res.json()).then(result => {
        const convert_rate = result.conversion_rates[curr_two];
        exchange_rate.innerHTML = `1 ${curr_one} = ${convert_rate}`;
        input_for_cur_02.value = ((input_for_cur_01.value) * convert_rate).toFixed(2);
    });

}




//envent listers

swap_button.addEventListener('click', () => {
    [currency_01.value, currency_02.value] = [currency_02.value, currency_01.value];
    cal();
})

currency_01.addEventListener('change', cal);
input_for_cur_01.addEventListener('input', cal);
currency_02.addEventListener('change', cal);
input_for_cur_02.addEventListener('input', cal);

cal();