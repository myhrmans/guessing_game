import { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";

export function useAccessToken() {
    const { instance, accounts } = useMsal();
    const [accessToken, setAccessToken] = useState<string>('');

    useEffect(() => {
        if (accounts.length > 0) {
            const request = {
                scopes: ["User.Read"],
                account: accounts[0]
            };

            instance.acquireTokenSilent(request)
                .then(response => {
                    setAccessToken(response.accessToken);
                })
                .catch(error => {
                    if (error instanceof InteractionRequiredAuthError) {
                        instance.acquireTokenPopup(request)
                            .then(response => {
                                setAccessToken(response.accessToken);
                            });
                    }
                });
        }
    }, [instance, accounts]);

    return accessToken;
};