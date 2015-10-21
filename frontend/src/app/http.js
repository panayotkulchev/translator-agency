angular.module('ta.http', [])

        .service('httpRequest', ['$http', '$q', '$rootScope', '$locale',  function ($http, $q, $rootScope, $locale) {

          var count = 0;

          this.get = function (url, params, data) {
            return this.send('GET', url, data, params);
          };

          this.post = function (url, data) {
            return this.send('POST', url, data);
          };

          this.put = function (url, data) {
            return this.send('PUT', url, data);
          };

          this.del = function (url,params, data) {
            return this.send('DELETE', url, data, params);
          };

          this.send = function (method, url, data, params) {
            var deferred = $q.defer();
            count++;

            $http({method: method, url: url, data: data, params: params, headers: {locale: $locale.id}})
                    .success(function (data) {
                      deferred.resolve(data);
                      count--;

                      if (count === 0) {
                        $rootScope.loadingInProgress = false;
                      }
                    })

                    .error(function (data, status) {
                      emitErrorMessages(data, status);

                      deferred.reject(data);
                      count--;

                      if (count === 0) {
                        $rootScope.loadingInProgress = false;
                      }

                    });

            $rootScope.loadingInProgress = true;

            return deferred.promise;
          };

          function emitErrorMessages(data, status) {
            var eventType = 'WARNING';

            if (status >= 500) {
              eventType = 'DANGER';
            }

            if (!data.errorMessages && !data.validationMessages) {
              var systemErrorMessage = $translate.instant('ERRORS.SYSTEM_ERROR');
              $rootScope.$emit('appMessageEvent', {eventType: eventType, message: systemErrorMessage});
              return;
            }

            for (var i in data.errorMessages) {
              var errorMessage = data.errorMessages[i];

              if (status < 500 || errorMessage.severe === false) {
                $rootScope.$emit('appMessageEvent', {eventType: 'WARNING', message: errorMessage.message});

              } else {
                $rootScope.$emit('appMessageEvent', {eventType: 'DANGER', message: errorMessage.message});
              }
            }

            if (data.validationMessages) {
              $rootScope.$broadcast('constraintViolationEvent', data.validationMessages);
            }

          }

        }]);
