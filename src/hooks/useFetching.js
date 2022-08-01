import { useState } from "react";

export const useFetching = (callback) => {
  const [isLoading, setIsLoading] = useState('false')
  const [error, setError] = useState('')

  // function timeout(ms) {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }
  const fetching = async (...args) => {
    try {
      setIsLoading(true)
      console.log(...args)
      // await timeout(3000)
      await callback(...args)
    } catch (e) {
      setError(e.message)
    } finally {
      setIsLoading(false)
    }
  }
  return [fetching, isLoading, error]
}