// import { BookingRule } from '@/lib/server/bookings'
import { useQuery } from '@tanstack/react-query'

export const useCZKExchange = ({ enabled = false }) => {
    const result = useQuery([`exchange`], async () => {
        const res = await fetch(`/api/exchange/`)
        return await res.json();
    }, {
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        retry: 0,
        enabled
    })
    const isLoading = !result.data || result.isFetching

    return {
        isLoading,
        error: result.error,
        data: result.data || null
    }
}
