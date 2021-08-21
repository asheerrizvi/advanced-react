import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // Tells Apollo that we will take care of everything.
    read(existing = [], { args, cache }) {
      // First thing it does is asks the read function for items.
      // We can either do one of two things.
      // First thing we can do is return the items
      // because they are already in the cache.
      // The other thing we can do is to return false from here,
      // which will trigger a network request.
      console.log({ existing, args, cache });
      const { skip, first } = args;

      // Read the number of items on the page from the cache.
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // Check if we have existing items.
      const items = existing.slice(skip, skip + first).filter((x) => x);
      // If there are items
      // and there aren't enough items to satisfy how many were requested (perPage)
      // and we are on the last page.
      // Then just return those items.
      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        // We don't have any items, we must go to the network to fetch them
        return false;
      }

      // If there are items, just return them from the cache without going
      // to the network.
      if (items.length) {
        console.log(
          `There are ${items.length} items in the cache, gonna send them to Apollo`
        );
        return items;
      }

      return false; // Fallback to network!
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      // This runs when the Apollo client comes back from the network
      // with our products.
      console.log(`Merging items from the network ${incoming.length}`);
      const merged = existing ? [...existing] : [];
      for (let i = skip; i < skip + incoming.length; i++) {
        merged[i] = incoming[i - skip];
      }

      console.log(merged);
      // Finally we return the merged items from cache.
      return merged;
    },
  };
}
