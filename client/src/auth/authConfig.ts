export const msalConfig = {
    auth: {
        clientId: 'b51f58b5-d0f2-4880-be37-81ae3c5679b6', //client-id from Azure AD
        redirectUri: 'http://localhost:3000',
        authority: 'https://login.microsoftonline.com/bacb58b4-63bc-4cc6-846e-88bddc0afaa0', //tenant-id from Azure AD
    },
    cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: false,
    },
    scopes: ['user.read'],
};
