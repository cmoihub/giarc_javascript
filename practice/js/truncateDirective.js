// (function() {
//     'use strict';

    /**
     * https://github.com/lorenooliveira/ng-text-truncate
     */
    angular.module( 'ngTextTruncate', [] )


    .directive( "ngTextTruncate", [ "$compile", "ValidationServices", "CharBasedTruncation", "WordBasedTruncation",
    	function( $compile, ValidationServices, CharBasedTruncation, WordBasedTruncation ) {
        return {
            restrict: "A",
            scope: {
                text: "=ngTextTruncate",
                charsThreshould: "@ngTtCharsThreshold",
                wordsThreshould: "@ngTtWordsThreshold",
                customMoreLabel: "@ngTtMoreLabel",
                customLessLabel: "@ngTtLessLabel"
            },
            controller: function( $scope, $element, $attrs ) {
                $scope.toggleShow = function() {
                    $scope.open = !$scope.open;
                };

                $scope.useToggling = $attrs.ngTtNoToggling === undefined;
            },
            link: function( $scope, $element, $attrs ) {
                $scope.open = false;

                ValidationServices.failIfWrongThreshouldConfig( $scope.charsThreshould, $scope.wordsThreshould );

                var CHARS_THRESHOLD = parseInt( $scope.charsThreshould );
                var WORDS_THRESHOLD = parseInt( $scope.wordsThreshould );

                $scope.$watch( "text", function() {
                    $element.empty();
                    
                    if( CHARS_THRESHOLD ) {
                            if( $scope.text && CharBasedTruncation.truncationApplies( $scope, CHARS_THRESHOLD ) ) {
                                CharBasedTruncation.applyTruncation( CHARS_THRESHOLD, $scope, $element );

                            } else {
                                $element.append( $scope.text );
                            }

                    } else {

                        if( $scope.text && WordBasedTruncation.truncationApplies( $scope, WORDS_THRESHOLD ) ) {
                            WordBasedTruncation.applyTruncation( WORDS_THRESHOLD, $scope, $element );

                        } else {
                            $element.append( $scope.text );
                        }

                    }
                } );
            }
        };
    }] )



    .factory( "ValidationServices", function() {
        return {
            failIfWrongThreshouldConfig: function( firstThreshould, secondThreshould ) {
                if( (! firstThreshould && ! secondThreshould) || (firstThreshould && secondThreshould) ) {
                    throw "You must specify one, and only one, type of threshold (chars or words)";
                }
            }
        };
    })



    .factory( "CharBasedTruncation", [ "$compile", function( $compile ) {
        return {
            truncationApplies: function( $scope, threshold ) {
                return $scope.text.length > threshold;
            },

            applyTruncation: function( threshold, $scope, $element ) {
                if( $scope.useToggling ) {
                    var el = angular.element(    "<span>" + 
                                                    $scope.text.substr( 0, threshold ) + 
                                                    "<span ng-show='!open'>...</span>" +
                                                    "<span class='btn-link ngTruncateToggleText' " +
                                                        "ng-click='toggleShow()'" +
                                                        "ng-show='!open'>" +
                                                        " " + ($scope.customMoreLabel ? $scope.customMoreLabel : "More") +
                                                    "</span>" +
                                                    "<span ng-show='open'>" + 
                                                        $scope.text.substring( threshold ) + 
                                                        "<span class='btn-link ngTruncateToggleText'" +
                                                              "ng-click='toggleShow()'>" +
                                                            " " + ($scope.customLessLabel ? $scope.customLessLabel : "Less") +
                                                        "</span>" +
                                                    "</span>" +
                                                "</span>" );
                    $compile( el )( $scope );
                    $element.append( el );

                } else {
                    $element.append( $scope.text.substr( 0, threshold ) + "..." );

                }
            }
        };
    }])



    .factory( "WordBasedTruncation", [ "$compile", function( $compile ) {
        return {
            truncationApplies: function( $scope, threshold ) {
                return $scope.text.split( " " ).length > threshold;
            },

            applyTruncation: function( threshold, $scope, $element ) {
                var splitText = $scope.text.split( " " );
                if( $scope.useToggling ) {
                    var el = angular.element(    "<span>" + 
                                                    splitText.slice( 0, threshold ).join( " " ) + " " + 
                                                    "<span ng-show='!open'>...</span>" +
                                                    "<span class='btn-link ngTruncateToggleText' " +
                                                        "ng-click='toggleShow()'" +
                                                        "ng-show='!open'>" +
                                                        " " + ($scope.customMoreLabel ? $scope.customMoreLabel : "More") +
                                                    "</span>" +
                                                    "<span ng-show='open'>" + 
                                                        splitText.slice( threshold, splitText.length ).join( " " ) + 
                                                        "<span class='btn-link ngTruncateToggleText'" +
                                                              "ng-click='toggleShow()'>" +
                                                            " " + ($scope.customLessLabel ? $scope.customLessLabel : "Less") +
                                                        "</span>" +
                                                    "</span>" +
                                                "</span>" );
                    $compile( el )( $scope );
                    $element.append( el );

                } else {
                    $element.append( splitText.slice( 0, threshold ).join( " " ) + "..." );
                }
            }
        };
    }]);
    
// }());
