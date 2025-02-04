import { create } from "zustand";

interface CharacterStore {
    selectedTags: {[group: string]: string}
    toggleTag: (group: string, tag: string) => void
}

const useCharacterStore = create<CharacterStore>((set) => ({
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