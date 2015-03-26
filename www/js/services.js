angular.module('parisEasy.services')

.filter('fromTo', function() {
   return function(input, from, total, lessThan) {
       from = parseInt(from);
       total = parseInt(total);
       for (var i = from; i < from + total && i < lessThan; i++) {
           input.push(i);
       }
       return input;
   }
})
.filter('htmlToPlaintext', function() {
   return function(text) {
       return String(text).replace(/<[^>]+>/gm, '');
   }
})
.filter('html',function($sce){
   return function(input){
       return $sce.trustAsHtml(input);
   }
});