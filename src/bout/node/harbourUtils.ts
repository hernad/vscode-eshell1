// import { ILogService } from 'vs/platform/log/common/log';

export type Maybe<T> = T | null | undefined;

export interface IOutputChannel {
	appendLine(msg: string): void;
}


export enum HarbourErrorCode {
	unknownEncoding = 1,
	harbourParseError,
	other
}


export class HarbourError extends Error {
	constructor(message: string, readonly code?: HarbourErrorCode) {
		super(message);
	}
}

export function serializeHarbourError(searchError: HarbourError): Error {
	const details = { message: searchError.message, code: searchError.code };
	return new Error(JSON.stringify(details));
}
