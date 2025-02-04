import { create } from "zustand";

interface ActionStore {
    selectedTag: string
    changeTag: ( newTag: string) => void
}

const useActionStore = create<ActionStore>((set) => ({
    selectedTag: '',

    changeTag: (newTag: string) => set((_state) => {
        return {
            selectedTag: newTag
        }
    })
}));

export default useActionStore;