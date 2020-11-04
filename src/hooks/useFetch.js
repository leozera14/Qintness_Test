import useSWR from 'swr'
import axios from 'axios';

export function useFetch(url) {
  const { data, error, mutate } = useSWR(url, async url => {
    const response = await axios.get(url);

    return response.data;
  }, {
    refreshWhenHidden: true,
    refreshInterval: 2000
  })

  return { data, error, mutate }
}