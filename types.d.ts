export interface Typeface {
	family: string;
	slug: string;
	styles: string[];
	variableAxes: number;
	origin: {
		name: string;
		url: string;
	};
	added_at: string;
}

export type TypefaceTuple = [string, Typeface];
