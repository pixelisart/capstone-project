import Ember from 'ember';

export default Ember.Component.extend({
    submittedEmail: '',
    checkEmail: function(emailElement) {
        if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(emailElement.value)) {
			emailElement.setCustomValidity('Email is not in a valid format. Here is a valid format: example@example.com');
		}
        else {
            emailElement.setCustomValidity('');
        }
    },
    didInsertElement() {
        var self = this;
        var myEmailInputElement = Ember.$('#email-input')[0];
        Ember.$('#submit-button').click(function() {
            self.checkEmail(myEmailInputElement);
            console.log('click');
        });
    }
});
