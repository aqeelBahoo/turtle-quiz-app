angular
    .module('turtlefacts')
    .controller('quizCtrl', quizController);

quizController.$inject = ['DataService', 'QuizMetrics'];

function quizController(DataService, QuizMetrics) {
    var vm = this;
    vm.dataService = DataService;
    vm.QuizMetrics = QuizMetrics;
    vm.questionAnswered = questionAnswered;
    vm.setActiveQuestion = setActiveQuestion;
    vm.selectAnswer = selectAnswer;
    vm.finalizeAnswers = finalizeAnswers;
    vm.activeQuestion = 0;
    vm.error = false;
    vm.finalize = false;
    var numQuestionsAnswered = 0;
    var quizLength = DataService.quizQuestions.length;

    function setActiveQuestion(index) {
        if (index === undefined) {
            var breakout = false;
            var quizLength = DataService.quizQuestions.length - 1;

            while (!breakout) {
                vm.activeQuestion = vm.activeQuestion < quizLength ? ++vm.activeQuestion : 0;
                if (vm.activeQuestion === 0) {
                    vm.error = true;
                }
                if (DataService.quizQuestions[vm.activeQuestion].selected === null) {
                    breakout = true;
                }
            }
        }
        else {
            vm.activeQuestion = index;
        }
    };

    function questionAnswered() {
        if (DataService.quizQuestions[vm.activeQuestion].selected !== null) {
            numQuestionsAnswered++;
            if (numQuestionsAnswered >= quizLength) {
                // finalize quiz
                for (var i = 0; i < quizLength; i++) {
                    if (DataService.quizQuestions[i].selected === null) {
                        setActiveQuestion(i);
                        return;
                    }
                }
                vm.error = false;
                vm.finalize = true;
                return;
            }
        }
        vm.setActiveQuestion();
    };
    function selectAnswer(index) {
        DataService.quizQuestions[vm.activeQuestion].selected = index;
    };

    function finalizeAnswers() {
        vm.finalize = false;
        numQuestionsAnswered = 0;
        vm.activeQuestion = 0;
        QuizMetrics.markQuiz();
        QuizMetrics.changeState('quiz', false);
        QuizMetrics.changeState('results', true);
    };
}

