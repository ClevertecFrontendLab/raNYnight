import { Location, Action } from 'history';

type PreviousLocations = {
    location?: Location | null;
    action?: Action | null;
}[];

export const shouldRedirect = (
    prevLocations: PreviousLocations | undefined,
    pathToCompare: string,
) => {
    console.log('prevLocs', prevLocations);

    if (!prevLocations || prevLocations.length === 1) {
        return true;
    }

    const prevPathname = prevLocations[1]?.location?.pathname ?? '';

    const normalizedPrevPathname = prevPathname.endsWith('/')
        ? prevPathname.slice(0, -1)
        : prevPathname;

    console.log('pathToCompare', pathToCompare);
    console.log('Previous path', normalizedPrevPathname);
    return pathToCompare != normalizedPrevPathname;
};
