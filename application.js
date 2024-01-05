$(document).ready(function () {

    var currentProblem;
    var maxTime = 10;
    var currentScore = 0;
    var highScore = 0;
    var timer;

    var startGame = function() {
        if (!timer) {
          if (maxTime === 0) {
            alert("Time's up! Try again?");
            updateMaxTime(10);
            if (currentScore > highScore) {
              highScore = currentScore;
              $('#hScore').text(currentScore);
              alert("High score!");
            };
            updateScore(-currentScore);
          }
          timer = setInterval(function () {
            updateMaxTime(-1);
            if (maxTime === 0) {
              clearInterval(timer);
              timer = undefined;
            }
          }, 1000);
        }
    }

    var updateMaxTime = function (amount) {
        maxTime += amount;
        $('#time-value').text(maxTime);
    }

    var updateScore = function (amount) {
        currentScore += amount;
        $('#cScore').text(currentScore);
    };

    var getRandomEq = function() {
        var equation = {};
        var numOne = Math.floor((Math.random() * 10) + 1);
        var numTwo = Math.floor((Math.random() * 10) + 1);
        equation.display = numOne + ' + ' + numTwo + ' = ?';
        equation.answer = numOne + numTwo;
        return equation;
    };

    var newProblem = function() {
        currentProblem = getRandomEq();
        $('#equation').text(currentProblem.display);
    };

    var checkAnswer = function(userAnswer, correctAnswer) {
        $('#success').empty();
        if (userAnswer === correctAnswer) {
          $('#success').append('<p>Correct!</p>');
          newProblem();
          $('#playerInputValue').val('');
          updateMaxTime(+1);
          updateScore(+1);
        } else {
          $('#success').append('<p>Wrong!</p>')
        };
    }

    $(document).on('keyup', '#playerInputValue', function(e) {
        if (e.keyCode == 13) {
        checkAnswer(Number($('#playerInputValue').val()), currentProblem.answer);
        };
    });
    
    $('#playerInputValue').on('keyup', function() {
    startGame();
    });
    
    newProblem();
})


