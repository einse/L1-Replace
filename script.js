var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope) {
  
  $scope.raw2pure = function (string) {
    var pure = '';
    for (var i = 0; i < string.length; i++)
    {
      if ((string[i] == '0') || (string[i] == '1'))
        pure += string[i];
    }
    return pure;
  }
  
  $scope.pure2separated = function (pure) {
    var separated = [];
    var cntr = 0;
    var tmp = '';
    for (var i = 0; i < pure.length; i++)
    {
      if (cntr < 5)
      {
        tmp += pure[i];
      }
      cntr++;
      if (cntr >= 5)
      {
        separated.push(tmp);
        tmp = '';
        cntr = 0;
      }
    }
    if (tmp != '')
    {
      if (tmp.length < 5)
      {
        var len = tmp.length;
        var fat = '';
        fat += tmp;
        while (len < 5)
        {
          fat += '0';
          len++;        
        }
      }
      separated.push(fat);
    }
    return separated;
  }
  
  $scope.separated2friendly = function (separated) {
    var friendly = [];
    var decimal;
    for (var i = 0; i < separated.length; i++)
    {
      decimal = parseInt(separated[i], 2);
      friendly.push(decimal);
    }
    return friendly;
  }
  
  $scope.e = function (msg) {
    var code = [];
    var y;
    var m = 32;
    for (var i = 0; i < msg.length; i++)
    {
      y = (3 * msg[i] + 2) % m;
      code.push(y);
    }
    return code;
  }
  
  $scope.d = function (code) {
    var msg = [];
    var x;
    var m = 32;
    for (var i = 0; i < code.length; i++)
    {
      x = ((code[i] + ((((code[i]%3)+1)%3)*m))-2)/3;
      msg.push(x);
    }
    return msg;
  }
  
  $scope.friendly2separated = function (friendly) {
    var separated = [];
    var tmp;
    var fat = '';
    var len;
    for (var i = 0; i < friendly.length; i++)
    {
      tmp = friendly[i].toString(2);
      len = tmp.length;
      while (len < 5)
      {
        fat += '0';
        len++;
      }
      fat += tmp;
      separated.push(fat);
      fat = '';
    }
    return separated;
  }
  
  $scope.separated2pure = function (separated) {
    var pure = '';
    for (var i = 0; i < separated.length; i++)
    {
      pure += separated[i];
    }
    return pure;
  }
  
  $scope.decode = function (raw) {
    var msg;
    var numbers;
    numbers = $scope.d($scope.separated2friendly($scope.pure2separated($scope.raw2pure(raw))));
    msg = $scope.separated2pure($scope.friendly2separated(numbers));
    return msg;
  }
  
  $scope.copyAndPaste = function () {
    $scope.testInput = $scope.pureOutput;
  }
  
});
