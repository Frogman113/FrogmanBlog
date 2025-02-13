import rss from "@astrojs/rss";
import { GLOBAL } from "@consts";
import {
  getFilteredCollectionEntries,
  resolvePath,
  sortByLastUpdateDate,
} from "@lib/utils";

export async function GET(context) {
  const blog = await getFilteredCollectionEntries();

  const items = blog.sort(sortByLastUpdateDate);

  return rss({
    title: GLOBAL.title,
    description: GLOBAL.description,
    site: context.site,
    items: items.map((item) => ({
      title: item.data.title,
      description: item.data.description,
      pubDate: item.data.date,
      link: resolvePath(`/blog/${item.slug}/`),
    })),
  });
}
