import { InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                availableRooms: {
                    // Custom merge function to handle the merging of cached data
                    merge(existing = [], incoming) {
                        return incoming;
                    },
                },
            },
        },
    },
});

export default cache;
