import { create } from "zustand";

interface CharacterStore {
    // tags: string[]
    selectedTags: {[group: string]: string}
    toggleTag: (group: string, tag: string) => void
    // cards: CharacterCard[]
}

const useCharacterStore = create<CharacterStore>((set) => ({
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

export default useCharacterStore;