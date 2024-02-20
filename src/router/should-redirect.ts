export const shouldRedirect = (prevPath: string, pathToCompare: string) => {
    const normalizedPrevPathname = prevPath.endsWith('/') ? prevPath.slice(0, -1) : prevPath;

    console.log('pathToCompare', pathToCompare);
    console.log('Previous path', normalizedPrevPathname);
    return pathToCompare != normalizedPrevPathname;
};
