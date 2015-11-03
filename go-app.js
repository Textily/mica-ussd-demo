// WARNING: This is a generated file.
//          If you edit it you will be sad.
//          Edit src/app.js instead.

var go = {};
go;

go.app = function() {
    var vumigo = require('vumigo_v02');
    var App = vumigo.App;
    var Choice = vumigo.states.Choice;
    var ChoiceState = vumigo.states.ChoiceState;
    var EndState = vumigo.states.EndState;
    var FreeText = vumigo.states.FreeText;

    var GoApp = App.extend(function(self) {
        App.call(self, 'states:main');

        self.states.add('states:main', function(name) {
            return new ChoiceState(name, {
                question: 'Mica Hardware Store\n\n',

                choices: [
                    new Choice('states:promotion', 'Promotions'),
                    new Choice('states:products','Check Price'),
                    new Choice('states:apply_for_finance', 'Apply for Finance'),
                    new Choice('states:competitions', 'Current Competitions'),
                    new Choice('states:store','Store Locator'),
                    new Choice('states:dream_card', 'Loyalty Programme'),
                    new Choice('states:exit', 'Exit')],

                next: function(choice) {
                    return choice.value;
                }
            });
        });

        self.states.add('states:promotion', function(name) {
            return new ChoiceState(name, {
                question: 'There are currently no promotions\nPlease check again later\n\n',

                choices: [
                    new Choice('states:competitions', 'Current Competitions'),
                    new Choice('state:main', "Back to Main menu"),
                    new Choice('states:exit', 'Exit')],

                next: function(choice) {
                    return choice.value;
                }
            });
        });

        self.states.add('states:products', function(name) {
            return new ChoiceState(name, {
                question: 'PPC Cement R58.99\nSteel Garage Door R1900\nWheelbarrow R145\n\n',

                choices: [
                    new Choice('states:search', 'Search'),
                    new Choice('state:main', "Back to Main menu"),
                    new Choice('states:exit', 'Exit')],

                next: function(choice) {
                    return choice.value;
                }
            });
        });

        self.states.add('states:competitions', function(name) {
            return new ChoiceState(name, {
                question: 'Current Mica Competitions\n\nGet Cash Back on your products\nwhen spending more than R1200\nEnquire in-store for details.\n\n',

                choices: [
                    new Choice('state:main', "Back to Main menu"),
                    new Choice('states:exit', 'Exit')],

                next: function(choice) {
                    return choice.value;
                }
            });
        });

        self.states.add('states:apply_for_finance', function(name){
            return new FreeText(name,{
                question: 'Enter your name, a consultant will get back to you shortly: ',
                next: function(content){

                    self.contact.extra.join = content;

                    return self.im.contacts.save(self.contact).then(function(){
                        return "states:exit";
                    });
                }
            });
        });


        self.states.add('states:join', function(name){
            return new FreeText(name,{
                question: 'Enter your name, a consultant will call you back: ',
                next: function(content){

                    self.contact.extra.join = content;

                    return self.im.contacts.save(self.contact).then(function(){
                        return "states:exit";
                    });
                }
            });
        });

        self.states.add('states:dream_card', function(name) {
            return new EndState(name, {
                text: 'Mica Hardware Loyalty Programme\n\nYou can earn points everytime you\nshop at our stores. Enquire in-store\nfor more details',
                next: 'states:main'
            });
        });        

        self.states.add('states:exit', function(name) {
            return new EndState(name, {
                text: 'Mica Hardware - Let us show you how.\nCreated by Textily (Pty.) Ltd\nThapelo Tsotetsi',
                next: 'states:main'
            });
        });
    });

    return {
        GoApp: GoApp
    };
}();

go.init = function() {
    var vumigo = require('vumigo_v02');
    var InteractionMachine = vumigo.InteractionMachine;
    var GoApp = go.app.GoApp;


    return {
        im: new InteractionMachine(api, new GoApp())
    };
}();
