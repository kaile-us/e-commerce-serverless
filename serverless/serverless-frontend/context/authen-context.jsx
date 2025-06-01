"use client";

import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
    authority: process.env.NEXT_PUBLIC_COGNITO_AUTHORITY,
    client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
    redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URL,
    response_type: "code",
    scope: "email openid phone https://u7eiihabee.execute-api.us-east-1.amazonaws.com/prod/read https://u7eiihabee.execute-api.us-east-1.amazonaws.com/prod/write",
};

export default function ClientOnlyAuthProvider({ children }) {
    return <AuthProvider {...cognitoAuthConfig}>{children}</AuthProvider>;
}
