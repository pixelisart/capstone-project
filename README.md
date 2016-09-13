# Pizza Finder

You can view this app live:
https://rubalcava.github.io/capstone-project/

This is a nice little app to help you find pizza near your location. Please allow location access when the app requests it.

One thing to note: This is a front-end project, so the email sign-up in the 'about' route isn't saving/storing your email. Your GPS coordinates do get sent to the Google Maps and Foursquare APIs to provide pizza lookup services.

To run this app, you can follow the instructions below this section, but here is a quick summary:

* Follow the instructions in "Prerequisites" and "Installation"
* When you get to the "Running / Development" instructions, do the following instead of 'ember serve':
    * ember serve --environment=production
    * The above command will build a production ready version of Pizza Finder with minified files and offline first functionality.

## Current Issues

* When using the app via GitHub pages, going offline and then clicking reload isn't keeping the offline functionality. However, if you go offline and then go back to the address bar and hit enter like you're typing the address in again, the service worker functions as intended. It's a quirk with the Ember add-on broccoli-serviceworker. I'm figuring it out and will update once it's fixed.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

