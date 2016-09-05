import Ember from 'ember';

export default Ember.Component.extend({
    shouldSubmit: false,
    submittedEmail: '',
    checkEmail: function(emailElement) {
        var self = this;
        self.shouldSubmit = false;
        if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(emailElement.value)) {
			emailElement.setCustomValidity('Email is not in a valid format. Here is a valid format: example@example.com');
		}
        else {
            emailElement.setCustomValidity('');
            self.shouldSubmit = true;
        }
    },
    didInsertElement() {
        var self = this;
        var myEmailInputElement = Ember.$('#email-input')[0];
        Ember.$('#submit-button').click(function(e) {
            self.checkEmail(myEmailInputElement);
            if (navigator.onLine && self.shouldSubmit === true) {
                Ember.$('#email-input').value = '';
                alert('Thanks for signing up!');
            }
            else if (!navigator.onLine && self.shouldSubmit === true) {
                e.preventDefault();
                alert("Looks like you're currently offline. Please try again later.");
            }
        });
    }
});
