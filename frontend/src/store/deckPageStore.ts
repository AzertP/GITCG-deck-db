import {create} from "zustand"

interface DeckPageStore {
    currentPage: number
    pageLimit: number
    setCurrentPage: (newPage: number) => void
}

const useDeckPageStore = create<DeckPageStore>((set) => ({
    currentPage: 1,
    pageLimit: 5,

    setCurrentPage: (newPage: number) => set((_state) => {
        return {
            currentPage: newPage
        }
    }),
}))

export default useDeckPageStore