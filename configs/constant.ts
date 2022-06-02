export const SORT_SELECTION = [
    {
        text: "Best Match",
        type: "relevance",
        order: "desc",
    },
    {
        text: "Latest Upload",
        type: "latestUploadedChapter",
        order: "desc",
    },
    {
        text: "Oldest Upload",
        type: "latestUploadedChapter",
        order: "asc",
    },
    {
        text: "Title Ascending",
        type: "title",
        order: "asc",
    },
    {
        text: "Title Descending",
        type: "title",
        order: "desc",
    },
    {
        text: "Recently Added",
        type: "createdAt",
        order: "desc",
    },
    {
        text: "Oldest Added",
        type: "createdAt",
        order: "asc",
    },
    {
        text: "Most Follows",
        type: "followedCount",
        order: "desc",
    },
    {
        text: "Fewest Follows",
        type: "followedCount",
        order: "asc",
    },
    {
        text: "Year Ascending",
        type: "year",
        order: "asc",
    },
    {
        text: "Year Descending",
        type: "year",
        order: "desc",
    },
];