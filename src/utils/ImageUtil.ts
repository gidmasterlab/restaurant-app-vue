export const loadDynamicAsset = (asset: string) => {
	return new URL(`/src/${asset}`, import.meta.url).href;
};

export const loadDynamicImage = (path: string, image: string) => {
	return new URL(`/src/assets/${path}/${image}.png`, import.meta.url).href;
};

export const loadDynamicSvg = (path: string, svg: string) => {
	return new URL(`/src/assets/${path}/${svg}.svg`, import.meta.url).href;
};
