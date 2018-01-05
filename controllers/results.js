angular
    .module('turtlefacts')
    .controller('resultsCtrl', ResultsController);

ResultsController.$inject = ['QuizMetrics', 'DataService'];

function ResultsController(QuizMetrics, DataService) {
    var vm = this;
    vm.quizMetrics = QuizMetrics;
    vm.dataService = DataService;
    vm.getAnswerClass = getAnswerClass;
    vm.setActiveQuestion = setActiveQuestion;
    vm.reset = reset;
    vm.calculatePerc = calculatePerc;
    vm.activeQuestion = 0;

    function calculatePerc() {
        return QuizMetrics.numCorrect / DataService.quizQuestions.length * 100;
    }

    function setActiveQuestion(index) {
        vm.activeQuestion = index;
    }

    function getAnswerClass(index) {
        console.log(index)
        if (index === QuizMetrics.correctAnswers[vm.activeQuestion]) {
            return "bg-success";
        }
        else if (index === DataService.quizQuestions[vm.activeQuestion].selected) {
            return "bg-danger";
        }
    }

    function reset(){
        QuizMetrics.changeState('results', false);
        QuizMetrics.numCorrect = 0;

        for(var i=0; i< DataService.quizQuestions.length; i++ ){
            var data = DataService.quizQuestions[i];
            data.selected = null;
            data.correct = null;
        }
    }

}