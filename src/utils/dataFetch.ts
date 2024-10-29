interface Params {
  url: string
  options?: RequestInit
  onSuccess?: (data: any, message?: string) => void
  onError?: (message?: string) => void
}

interface JSONResponse {
  success: boolean
  data: unknown
  message?: string
}

export const dataFetch = async ({
  url,
  options,
  onSuccess = () => {},
  onError = () => {}
}: Params) => {
  try {
    const res = await fetch(url, options)
    const { success, data, message } = (await res.json()) as JSONResponse

    if (!success || !res.ok) {
      return onError(message)
    }
    onSuccess(data, message)
  } catch {
    onError()
  }
}
