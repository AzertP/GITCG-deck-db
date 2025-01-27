import {create} from "zustand";

interface CardPageStore {
    currentPage: number
    pageLimit: number
    displayCharacter: boolean
    showFilter: boolean
    searchQuery: string
    setCurrentPage: (newPage: number) => void
    setDisplayCharacter: (newBool: boolean) => void
    toggleFilter: () => void
    setSearchQuery: (newQuery: string) => void
}

const useCardPageStore = create<CardPageStore>((set) => ({
    currentPage: 1,
    pageLimit: 60,
    displayCharacter: true,
    showFilter: false,
    searchQuery: '',
    setCurrentPage: (newPage: number) => set((_state) => {
        return {
            currentPage: newPage
        }
    }),
    setDisplayCharacter: (newBool: boolean) => set((_state) => {
        return {
            displayCharacter: newBool
        }
    }),
    toggleFilter: () => set((state) => {
        return {
            showFilter: !state.showFilter
        }
    }),
    setSearchQuery: (newQuery: string) => set((_state) => {
        return {
            searchQuery: newQuery
        }
    })
}));

export default useCardPageStore;