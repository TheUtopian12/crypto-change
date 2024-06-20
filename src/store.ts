import { create } from "zustand";
import { devtools } from 'zustand/middleware'
import { CryptoCurrency, CryptoPrice, Pair } from "./types";
import { getCryptos, cryptoSearch } from "./services/CryptoService";

type CryptoStore = {
    cryptocurrencies: CryptoCurrency[],
    result: CryptoPrice,
    loading: boolean
    fetchCryptos: () => Promise<void>
    fetchData: (pair: Pair) => Promise<void>
}
export const useCryptoStore = create<CryptoStore>()(devtools((set) => ({
    cryptocurrencies: [],
    loading: false,
    result: {
        IMAGEURL: '',
        PRICE: '',
        HIGHDAY: '',
        LOWDAY: '',
        CHANGE24HOUR: '',
        LASTUPDATE: ''
    },
    fetchCryptos: async () => {
        const cryptocurrencies = await getCryptos()

        set(() => ({ cryptocurrencies }))
    },
    fetchData: async (pair) => {
        set(() => ({
            loading: true
        }))
        const result = await cryptoSearch(pair)
        set(() => ({
            result,
            loading: false
        }))




    }
})))