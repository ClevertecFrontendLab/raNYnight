export const shouldRedirect = (prevPath: string, pathToCompare: string) => {
    const normalizedPrevPathname = prevPath.endsWith('/') ? prevPath.slice(0, -1) : prevPath;
    return pathToCompare != normalizedPrevPathname;
};
