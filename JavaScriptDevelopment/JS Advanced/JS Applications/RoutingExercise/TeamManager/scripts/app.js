// TODO
import * as user from './user.js';
import * as teams from './teams.js';

const templatesUrl = './templates';

function extend(context, templates) {
    const partials = {
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs'
    };

    context.loggedIn = localStorage.getItem('userId') !== null;
    context.username = localStorage.getItem('username');
    context.hasNoTeam = localStorage.getItem('teamId') === 'null';

    if (Array.isArray(templates)) {
        templates.forEach(template => {
            const templateName = template.split('/')
                .pop();
            partials[templateName] = `${templatesUrl}/${template}.hbs`;
        });
    }

    return context.loadPartials(partials);
}

const app = new Sammy('#main', function () {
    this.use('Handlebars', 'hbs');

    this.get('#/home', function (context) {
        extend(context)
            .then(function () {
                this.partial('./templates/home/home.hbs');
            });
    });

    this.get('#/about', function (context) {
        extend(context)
            .then(function () {
                this.partial('./templates/about/about.hbs');
            });
    });

    this.get('#/login', function (context) {
        extend(context, ['login/loginForm'])
            .then(function () {
                this.partial('./templates/login/loginPage.hbs');
            });
    });

    this.get('#/register', function (context) {
        extend(context, ['register/registerForm'])
            .then(function () {
                this.partial('./templates/register/registerPage.hbs');
            });
    });

    this.post('#/login', function (context) {
        extend(context)
            .then(function () {
                const data = { ...context.params };
                user.login(data.username, data.password)
                    .then(function (user) {
                        if (user.message) {
                            alert(user.message);
                            return;
                        }
                        localStorage.setItem('userId', user.objectId);
                        localStorage.setItem('userToken', user['user-token']);
                        localStorage.setItem('username', user.username);
                        localStorage.setItem('teamId', user.teamId || null);
                        context.redirect('#/home');
                    });
            });
    });

    this.post('#/register', function (context) {
        extend(context)
            .then(function () {
                const data = { ...context.params };

                user.register(data.username, data.password)
                    .then(() => {
                        context.redirect('#/login');
                    });
            });
    });

    this.get('#/logout', function (context) {
        extend(context)
            .then(function () {
                user.logout(localStorage.getItem('userToken'))
                    .then(r => {
                        localStorage.clear();
                        context.redirect('#/home');
                    });
            });
    });

    this.get('#/catalog', function (context) {
        extend(context, ['catalog/team'])
            .then(function () {
                teams.getAll()
                    .then((data) => {
                        context.teams = data;
                        this.partial('./templates/catalog/teamCatalog.hbs');
                    });
            });
    });

    this.get('#/create', function (context) {
        extend(context, ['create/createForm'])
            .then(function () {
                this.partial('./templates/create/createPage.hbs');
            });
    });

    this.post('#/create', function (context) {
        extend(context)
            .then(function () {
                const data = { ...context.params };

                console.log(data);
            });
    });
});


(function () {
    app.run('#/home');
})();