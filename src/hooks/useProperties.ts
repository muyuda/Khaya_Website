// hooks/useProperties.ts
import { useState, useEffect, useCallback } from 'react';
import { Property } from '../types';
import * as propertyService from '../services/propertyService';

interface UsePropertiesReturn {
  properties: Property[];
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useProperties = (): UsePropertiesReturn => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await propertyService.getProperties();
      setProperties(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch properties'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  return { properties, loading, error, refetch: fetchProperties };
};
