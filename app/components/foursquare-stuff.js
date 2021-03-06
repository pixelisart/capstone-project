import Ember from 'ember';

export default Ember.Component.extend({
    userLat: 'Waiting for button click',
    userLong: 'Waiting for button click',
    userFormattedAddress: 'Waiting for button click',
    pizzaPlaces: [],
    setInitialLocText: function() {
        var self = this;
        self.set('lat', self.userLat);
        self.set('long', self.userLong);
        self.set('address', self.userFormattedAddress);
    },
    getUserLoc: function() {
        var self = this;
        self.userLat = 'Loading...';
        self.userLong = 'Loading...';
        self.userFormattedAddress = 'Loading...';
        self.set('lat', self.userLat);
        self.set('long', self.userLong);
        self.set('address', self.userFormattedAddress);
        /* Handled user allowing location access */
        function successCallback(position) {
            self.userLat = position.coords.latitude;
            self.set('lat', self.userLat);
            self.userLong = position.coords.longitude;
            self.set('long', self.userLong);
            self.getFormattedAddress();
        }
        /* Handle user blocking location access */
        function errorCallback(err) {
            self.userLat = 37.8650555;
            self.set('lat', self.userLat);
            self.userLong = -122.2581727;
            self.set('long', self.userLong);
            self.getFormattedAddress();
            console.log(err);
        }
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
        }
        /* Handle browser not supporting geolocation */
        else {
            self.userLat = 37.8650555;
            self.set('lat', self.userLat);
            self.userLong = -122.2581727;
            self.set('long', self.userLong);
        }
    },
    /* Use the Google Maps API to turn lat,long into a formatted address */
    getFormattedAddress: function() {
        var self = this;
        Ember.$.ajax({
            url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + self.userLat + ',' +  self.userLong + '&key=AIzaSyAekM9XVEMmw0oWbPws8F5T-4WsCNB9Tw0',
            dataType: 'json',
            success: function(response) {
                var myResponse = response;
                /* If coordinates cannot be turned into address, let the user know */
                if (myResponse.results.length < 1) {
                    self.userFormattedAddress = 'Could not find formatted address';
                    self.set('address', self.userFormattedAddress);
                }
                else {
                    self.userFormattedAddress = myResponse.results[0].formatted_address;
                    self.set('address', self.userFormattedAddress);
                }
                /* Call here to ensure formatted address has been obtained first */
                self.initFS();
            },
            error: function(err) {
                console.log(err);
                if (navigator.onLine) {
                    self.userFormattedAddress = 'Error formatting address';
                    self.set('address', self.userFormattedAddress);
                }
                else {
                    self.userFormattedAddress = 'Address lookup unavailable';
                    self.set('address', self.userFormattedAddress);
                    self.initFS();
                }
            }
        });
    },
    initFS: function() {
        var self = this;
        Ember.$.ajax({
            url: 'https://api.foursquare.com/v2/venues/search?client_id=IY4MOF0VN0HHCOSRH121TJYN1P3FTVZRNCX2RU1YNF23GRBH&client_secret=O0GFJPKBRBDYSO4M52SRJBINZLFWVF4DLPNYZ3WH5NOIYVKW&v=20130815&ll=' + self.userLat + ',' + self.userLong + '&query=pizza&limit=5',
            dataType: 'json',
            success: function(response) {
                self.pizzaPlaces = [];
                var foundPlaces = response.response.venues;
                if (foundPlaces.length > 0) {
                    for (var i = 0; i < foundPlaces.length; i++) {
                        self.pizzaPlaces.push({
                            'name': foundPlaces[i].name,
                            'address': foundPlaces[i].location.formattedAddress[0] + ', ' + foundPlaces[i].location.formattedAddress[1],
                            'formattedPhone': foundPlaces[i].contact.formattedPhone,
                            'phone': foundPlaces[i].contact.phone
                        });

                    }
                    self.set('places', self.pizzaPlaces);
                }
                else {
                    self.pizzaPlaces.push({
                        'name': 'Uh oh',
                        'address': "Pizza? Sorry, we couldn't find pizza!",
                        'formattedPhone': "Clicking this won't call anywhere.",
                        'phone': ''
                    });
                    self.set('places', self.pizzaPlaces);
                }

            },
            error: function(err) {
                self.pizzaPlaces = [];
                self.pizzaPlaces.push({
                    'name': 'Uh oh',
                    'address': "Pizza? Sorry, we couldn't find pizza!",
                    'formattedPhone': "Clicking this won't call anywhere.",
                    'phone': ''
                });
                self.set('places', self.pizzaPlaces);
                console.log(err);
            }
        });

    },
    didInsertElement() {
        var self = this;
        self.setInitialLocText();
        Ember.$('#launchLoc').click(function() {
            self.getUserLoc();
        });
    },
    didDestroyElement() {
        Ember.$('#launchLoc').off('click', '#launchLoc');
    }
});