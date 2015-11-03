var vumigo = require('vumigo_v02');
var fixtures = require('./fixtures');
var AppTester = vumigo.AppTester;


describe("app", function() {
    describe("MicaHardwareUssd", function() {
        var app;
        var tester;

        beforeEach(function() {
            app = new go.app.GoApp();

            tester = new AppTester(app);

            tester
                .setup.config.app({
                    name: 'test_app'
                })
                .setup(function(api) {
                    fixtures().forEach(api.http.fixtures.add);
                });
        });

        describe("when the user starts a session", function() {
            it("should present Mica main menu", function() {
                return tester
                    .start()
                    .check.interaction({
                        state: 'states:main',
                        reply: [
                            'Mica Hardware Store\n\n',
                            '1. Promotions',
                            '2. Check Price',
                            '3. Apply for Finance',
                            '4. Current Competitions',
                            '5. Store Locator',
                            '6. Loyalty Programme',
                            '7. Exit'
                        ].join('\n')
                    })
                    .run();
            });
        });

        describe("when the user asks to see the promotion menu", function() {
            it("should present promotion menu", function() {
                return tester
                    .setup.user.state('states:main')
                    .input('1')
                    .check.interaction({
                        state: 'states:promotion',
                        reply: [
                            'There are currently no promotions\nPlease check again later\n\n',
                            '1. Current Competitions',
                            '2. Back to Main menu',
                            '3. Exit'
                        ].join('\n')
                    })
                    .run();
            });
        });

        describe("when the user asks to see the products menu", function() {
            it("should present products menu", function() {
                return tester
                    .setup.user.state('states:main')
                    .input('2')
                    .check.interaction({
                        state: 'states:products',
                        reply: [
                            'PPC Cement R58.99\nSteel Garage Door R1900\nWheelbarrow R145\n\n',
                            '1. Search',
                            '2. Back to Main menu',
                            '3. Exit'
                        ].join('\n')
                    })
                    .run();
            });
        });

        describe("when the user asks to see the competitions menu", function() {
            it("should present competitions menu", function() {
                return tester
                    .setup.user.state('states:main')
                    .input('4')
                    .check.interaction({
                        state: 'states:competitions',
                        reply: [
                            'Current Mica Competitions\n\nGet Cash Back on your products\nwhen spending more than R1200\nEnquire in-store for details.\n\n',
                            '1. Back to Main menu',
                            '2. Exit'
                        ].join('\n')
                    })
                    .run();
            });
        });

        describe("when the user asks seee the loyalty menu", function() {
            it("should present lotalty's menu and exit", function() {
                return tester
                    .setup.user.state('states:main')
                    .input('6')
                    .check.interaction({
                        state: 'states:dream_card',
                        reply: 'Mica Hardware Loyalty Programme\n\nYou can earn points everytime you\nshop at our stores. Enquire in-store\nfor more details'
                    })
                    .check.reply.ends_session()
                    .run();
            });
        });

        describe("when the user asks to exit", function() {
            it("should say let us show you how and end the session", function() {
                return tester
                    .setup.user.state('states:main')
                    .input('7')
                    .check.interaction({
                        state: 'states:exit',
                        reply: 'Mica Hardware - Let us show you how.\nCreated by Textily (Pty.) Ltd\nThapelo Tsotetsi'
                    })
                    .check.reply.ends_session()
                    .run();
            });
        });
    });
});
