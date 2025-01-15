import { create } from "zustand";

interface CardStore {
    // tags: string[]
    selectedTags: {[group: string]: string}
    toggleTag: (group: string, tag: string) => void
    // cards: CharacterCard[]
}

const useCardStore = create<CardStore>((set) => ({
    // tags: allTags,
    selectedTags: {},

    toggleTag: (group: string, tag: string) => set((state) => {
        return {
            selectedTags: {
                ...state.selectedTags,
                [group]: state.selectedTags[group] === tag ? '' : tag
            }
        }
    })
}));

export default useCardStore;