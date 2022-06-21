module.exports = {
    'facebookAuth' : {
        'clientID'      : '547174393484762',
        'clientSecret'  : '5f545fcd5ef9c7e7fc9af0c6b7d12f1b',
        'callbackURL'   : 'http://localhost:4000/auth/facebook/callback',
        'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email'

    },

    'googleAuth' : {
        'clientID'      : '355245734783-6d39o4gv1g3c0jaqova7hbfuplis3n68.apps.googleusercontent.com',
        'clientSecret'  : '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',
        'callbackURL'   : 'http://localhost:4000/auth/google/callback'
    }
};