'use strict'

app.controller('MainCtrl', ($scope, RateFactory, LoanFactory) => {

  RateFactory.fetch_rates().then(data => $scope.rates = data);

  $scope.default_loan_form = { amount: '', start_month: '', number_of_months: '', custom_rate: '', federal_rate: '', federal: '', custom: '' };
  $scope.default_loan_schedule = [];
  $scope.default_result = { est_payment: '', subtotal_principal: '', subtotal_interest: ''};


  $scope.reset = () => {
    $scope.loan = angular.copy($scope.default_loan_form);
    $scope.schedule = angular.copy($scope.default_loan_schedule);
    $scope.result = angular.copy($scope.default_result);
    $scope.show_loan_schedule = false;
    $scope.loan_start_month_warning = '';
    $scope.loan_rate_error = '';
    $scope.loan_rate_warning = '';
    if ($scope.form) {
      $scope.form.$setPristine();
      $scope.form.$setUntouched();
    }
  }
  $scope.reset();

  $scope.update = () => {
    //TODO: money value format // const format = (n, currency) => currency + " " + Number(n).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    $scope.validate_loan_rate();
    $scope.calculate_schedule();
  }

  $scope.toggle_show_loan_schedule = () => {
    if ($scope.schedule.length > 0) $scope.show_loan_schedule = !$scope.show_loan_schedule;
  }

  $scope.open_loan_schedule = () => {
    if ($scope.schedule.length > 0 && $scope.show_loan_schedule == true) return true;
    else return false;
  }


  $scope.validate_loan_rate = () => {
    $scope.loan_start_month_warning = '';
    $scope.loan_rate_error = '';
    $scope.loan_rate_warning = '';
    const { custom, federal, start } = $scope.form; // error validation
    const { custom_rate, federal_rate, start_month } = $scope.loan; // form values

    if (start.$touched && !start_month) $scope.loan_start_month_warning = `If you don't choose a starting month, current month will be applied`
    if (custom.$pristine && federal.$pristine) $scope.loan_rate_error = '';
    else {
      if ((!custom_rate || custom_rate <= 0) && !federal_rate) $scope.loan_rate_error = 'Please either fill out the custom rate or select an option';
      if (custom_rate > 0 && federal_rate) $scope.loan_rate_warning = 'If you choose both interests, custom interest will be applied';
    }
  }

  $scope.calculate_schedule = () => {
    const { amount, start_month, number_of_months, custom_rate, federal_rate } = $scope.loan;
    if (+amount > 0 && +number_of_months > 0 && (+custom_rate > 0 || federal_rate > 0) ) {
      $scope.schedule = LoanFactory.calculate_schedule($scope.loan);
      $scope.subtotal_payment = $scope.schedule.map(s => +s.payment).reduce((prev, curr) => prev + curr, 0);
      $scope.subtotal_principal = $scope.schedule.map(s => +s.principal).reduce((prev, curr) => prev + curr, 0);
      $scope.subtotal_interest = $scope.schedule.map(s => +s.interest).reduce((prev, curr) => prev + curr, 0);

      $scope.result.est_payment = $scope.schedule[0].payment;
      $scope.result.subtotal_principal = $scope.subtotal_principal;
      $scope.result.subtotal_interest = $scope.subtotal_interest;

    }

  }

})