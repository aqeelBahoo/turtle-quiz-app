angular
    .module('turtlefacts')
    .controller('listCtrl', ListController);

ListController.$inject = ['DataService', 'QuizMetrics'];

function ListController(DataService, QuizMetrics) {
    var vm = this;
    vm.QuizMetrics = QuizMetrics;
    vm.data = DataService.turtlesData;
    vm.activeTurtle = {};
    vm.activeQuiz = activeQuiz;
    vm.changeActiveTurtle = changeActiveTurtle;

    function changeActiveTurtle(index) {
        vm.activeTurtle = index;
    };

    function activeQuiz() {
        QuizMetrics.changeState('quiz', true);
    }
}