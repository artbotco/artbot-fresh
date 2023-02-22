import queryString                                         from "query-string";
import {useMemo}                                           from "react";
import {useLocation, useParams} from "react-router-dom";

export function useRouter() {
    const params = useParams();
    const location = useLocation();
    // Return our custom router object
    // Memoize so that a new object is only returned if something changes
    return useMemo(() => {
        return {
            // For convenience add push(), replace(), pathname at top level
            pathname: location.pathname,
            // Merge params and parsed query string into single "query" object
            // so that they can be used interchangeably.
            // Example: /:topic?sort=popular -> { topic: "react", sort: "popular" }
            query: {
                ...queryString.parse(location.search), // Convert string to object
                ...params
            },
            location,
        };
    }, [params, location]);
}