import { create } from "zustand";

interface ActionStore {
    // tags: string[]
    selectedTag: string
    changeTag: ( newTag: string) => void
    // cards: CharacterCard[]
}

const useActionStore = create<ActionStore>((set) => ({
    // tags: allTags,
    selectedTag: '',

    changeTag: (newTag: string) => set((_state) => {
        return {
            selectedTag: newTag
        }
    })
}));

export default useActionStore;