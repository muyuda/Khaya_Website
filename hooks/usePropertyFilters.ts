// hooks/usePropertyFilters.ts
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Property } from '../types';

export const usePropertyFilters = (properties: Property[]) => {
  const [searchParams] = useSearchParams();
  const catParam = searchParams.get('cat');
  const qParam = searchParams.get('q');

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCat, setFilterCat] = useState<string>('All');
  const [filterType, setFilterType] = useState<string>('All');
  const [filterLocation, setFilterLocation] = useState<string>('All');
  const [filterDeveloper, setFilterDeveloper] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<number>(10000000000); // Max Price 10B

  // Sync initial state with URL params
  useEffect(() => {
    if (catParam) {
      setFilterCat(catParam);
    }
    if (qParam) {
      setSearchTerm(qParam);
    }
  }, [catParam, qParam]);

  const locations = useMemo(() => Array.from(new Set(properties.map(p => p.location))), [properties]);
  const developers = useMemo(() => {
    // In a real app, you might fetch project details to get developer names
    return ['Maju Jaya Dev']; // Placeholder based on mock data
  }, []);
  const types = ['House', 'Apartment', 'Ruko', 'Villa'];
  const categories = ['Primary', 'New', 'Featured'];

  const filteredProperties = useMemo(() => properties.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = filterCat === 'All' || p.tags.includes(filterCat as any);
    const matchesType = filterType === 'All' || p.propertyType === filterType;
    const matchesLocation = filterLocation === 'All' || p.location === filterLocation;
    const matchesPrice = p.price <= priceRange;
    // Developer filter would need a more complex lookup, this is a simplified example
    const matchesDeveloper = filterDeveloper === 'All' // Simplified
    return matchesSearch && matchesCat && matchesType && matchesLocation && matchesPrice && matchesDeveloper;
  }), [properties, searchTerm, filterCat, filterType, filterLocation, priceRange, filterDeveloper]);

  const clearFilters = () => {
    setSearchTerm('');
    setFilterCat('All');
    setFilterType('All');
    setFilterLocation('All');
    setFilterDeveloper('All');
    setPriceRange(10000000000);
  };

  const hasActiveFilters = filterCat !== 'All' || filterType !== 'All' || filterLocation !== 'All' || filterDeveloper !== 'All' || priceRange < 10000000000 || searchTerm !== '';

  return {
    // Filter values
    searchTerm,
    filterCat,
    filterType,
    filterLocation,
    filterDeveloper,
    priceRange,
    
    // Filter setters
    setSearchTerm,
    setFilterCat,
    setFilterType,
    setFilterLocation,
    setFilterDeveloper,
    setPriceRange,

    // Derived data
    locations,
    developers,
    types,
    categories,
    filteredProperties,

    // Actions
    clearFilters,
    hasActiveFilters,
  };
};
