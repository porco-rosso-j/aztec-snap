import type { RequestArguments } from '@metamask/providers';
export type Request = (params: RequestArguments) => Promise<any>;
export declare const request: Request;
export declare const requestSnap: (snapId?: string, version?: string) => Promise<void>;
//# sourceMappingURL=request.d.ts.map