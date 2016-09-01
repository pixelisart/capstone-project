import Ember from 'ember';

export default Ember.Component.extend({
    userLat: 'loading...',
    userLong: 'loading...',
    userFormattedAddress: 'loading...',
    getUserLoc: function() {
        var self = this;
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
                /* If coordinates cannot be turned into address, default back to Peet's coffee in Berkeley, CA */
                if (myResponse.results.length < 1) {
                    self.userLat = 37.8650555;
                    self.set('lat', self.userLat);
                    self.userLong = -122.2581727;
                    self.set('long', self.userLong);
                    self.userFormattedAddress = '2501 Telegraph Ave, Berkeley, CA 94704, USA';
                    self.set('address', self.userFormattedAddress);
                }
                else {
                    self.userFormattedAddress = myResponse.results[0].formatted_address;
                    self.set('address', self.userFormattedAddress);
                }
                /* Call here to ensure formatted address has been obtained first, since Zillow's API requires it */
                self.initZillowSearch();
            },
            error: function(err) {
                console.log(err);
            }
        });
    },
    initZillowSearch: function() {
        var self = this;

    },
    didInsertElement() {
        this.getUserLoc();
    }
});
