import { PASS } from "./config"

const authenticate = (password: string) => {
    return password === PASS
}

export default authenticate