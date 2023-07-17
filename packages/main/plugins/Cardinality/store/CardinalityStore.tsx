import {create} from 'zustand'

type CardinalityState = {
    total:number;
    setTotal: (amount:number) => void;
   
}

const useCardinalityStore = create<CardinalityState>((set) => ({
    total: 0,
    setTotal: (amount:number) => set(() => ({total: amount})),
   
}))

export default useCardinalityStore