export const shouldRedirect = (prevPath: string | undefined, pathToCompare: string) => {
    if (!prevPath) return true;
    const normalizedPrevPathname = prevPath.endsWith('/') ? prevPath.slice(0, -1) : prevPath;
    return pathToCompare != normalizedPrevPathname;
};
