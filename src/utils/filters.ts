export function filterData<T>(
  data: T[],
  searchQuery: string,
  filterKey: keyof T,
  searchKeys: (keyof T)[]
): T[] {
  return data.filter((item) => {
    const matchesFilter = !filterKey || String(item[filterKey]).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSearch = searchKeys.some(
      (key) => String(item[key]).toLowerCase().includes(searchQuery.toLowerCase())
    );
    return matchesFilter || matchesSearch;
  });
}

export function sortData<T>(data: T[], key: keyof T, direction: 'asc' | 'desc'): T[] {
  return [...data].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];
    
    if (direction === 'asc') {
      return String(aValue).localeCompare(String(bValue));
    }
    return String(bValue).localeCompare(String(aValue));
  });
}