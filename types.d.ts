interface Typeface {
	family: string;
	slug: string;
	variants: string[];
	url: string;
	added_at?: number;
}

type TypefaceTuple = [string, Typeface];
