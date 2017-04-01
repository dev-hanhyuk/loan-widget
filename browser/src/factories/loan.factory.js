'use strict'

app.factory('LoanFactory', ($http, $log) => {

  const calculate_schedule = (loan) => {
    const d = new Date();
    const default_start_month = d.setDate(d.getMonth() + 1);
    const u = new Date(default_start_month)
    if (!loan.start_month) loan.start_month = u;

    let schedule = [];
    let m = +loan.number_of_months;
    let amount = +loan.amount;
    let r = +loan.custom_rate > 0 ? +loan.custom_rate / 100 : +loan.federal_rate;

    const annuity_factor = ( 1 - ( 1 / Math.pow(1 + r / 12, m) ) ) / (r / 12);
    const pmt = amount / annuity_factor;

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let balance = amount;
    let paid_principal = 0;
    let y = 0;
    for(var i=0; i<m; i++) {
      if ( (loan.start_month.getMonth() + i) % 12 == 11 ) y +=1;
      let year = loan.start_month.getFullYear() + y ;
      let month = `${months[(loan.start_month.getMonth() + i+1) % 12 ]}-${year}`;

      if (i == m-1) {
        let interest = (balance * (r / 12)).toFixed(2);
        let principal = (amount - paid_principal).toFixed(2);
        let payment = (Number(interest) + Number(principal)).toFixed(2);
        balance = 0;
        schedule.push({ month, payment, principal, interest, balance })
      } else {
        let payment = pmt.toFixed(2);
        let interest = (balance * (r / 12)).toFixed(2);
        let principal = (payment - balance * (r / 12)).toFixed(2);
        paid_principal += Number(principal);
        balance = (balance - principal).toFixed(2);
        schedule.push({ month, payment, principal, interest, balance })
      }

    }
    return schedule;
  }


  return { calculate_schedule }
})
