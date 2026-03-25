
import { useMemo } from 'react';

export const useSearchFilter = (data, query, searchFields) => {
  return useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return data;
    
    return data.filter((item) => 
      searchFields.some(field => 
        String(item[field]).toLowerCase().includes(term)
      )
    );
  }, [data, query, searchFields]);
};