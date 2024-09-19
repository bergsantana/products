export interface SearchProps {
    search: string,
}

export interface SearchEmits {
    (e: 'update:search', payload: string): void
 
}
