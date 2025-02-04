import {create} from "zustand"

interface cardElementStore {
    loaded: boolean,
    setLoaded: (value: boolean) => void
}

const useCardElementStore = create<cardElementStore>((set) => ({
    loaded: false,

    setLoaded: (value: boolean) => set(_state => {
        return {
            loaded: value
        }
    })
}))

export default useCardElementStore