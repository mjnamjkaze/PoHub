declare module 'jsonwebtoken' {
    export interface SignOptions {
        algorithm?: string;
        expiresIn?: string | number;
        notBefore?: string | number;
        audience?: string | string[];
        subject?: string;
        issuer?: string;
        jwtid?: string;
        mutatePayload?: boolean;
        noTimestamp?: boolean;
        header?: object;
        encoding?: string;
    }

    export function sign(
        payload: string | Buffer | object,
        secretOrPrivateKey: string | Buffer,
        options?: SignOptions
    ): string;

    export function verify(
        token: string,
        secretOrPublicKey: string | Buffer,
        options?: any
    ): any;

    export function decode(token: string, options?: any): any;
}
