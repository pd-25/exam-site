import { atomWithStorage } from "jotai/utils"

export const menuEditAtom = atomWithStorage<string | null>("menuEdit", null)
