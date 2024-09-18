export interface SearchProps {
    search: string,
    page: number
}

export interface SearchEmits {
    (e: 'update:search', payload: string): void
 
}
