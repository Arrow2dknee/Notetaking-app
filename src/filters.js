const filters = {
    searchText: '',
    sortBy: 'byDateModified'
};

const getFilters = () => filters;

function setFilters({ searchText, sortBy }) {
    if (typeof searchText === 'string') {
        filters.searchText = searchText;
    }
    if (typeof sortBy === 'string') {
        filters.sortBy = sortBy;
    }
}

export { getFilters, setFilters };