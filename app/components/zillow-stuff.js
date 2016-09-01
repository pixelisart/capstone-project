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
        function successCallback(position) {
            self.userLat = position.coords.latitude;
            self.set('lat', self.userLat);
            self.userLong = position.coords.longitude;
            self.set('long', self.userLong);
            self.getFormattedAddress();
            self.initZillowSearch();
        }
        function errorCallback(err) {
            self.userLat = 33.8716;
            self.set('lat', self.userLat);
            self.userLong = -122.2727;
            self.set('long', self.userLong);
        }
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
        }
        else {
            self.userLat = 33.8716;
            self.set('lat', self.userLat);
            self.userLong = -122.2727;
            self.set('long', self.userLong);
        }
    },
    getFormattedAddress: function() {

    },
    initZillowSearch: function() {
        var self = this;
    },
    didInsertElement() {
        this.getUserLoc();
    }
});
