interface Params {
  url: string
  options?: RequestInit
  onSuccess?: (data: any) => void
  onError?: () => void
}

interface JSONResponse {
  success: boolean
  data: unknown
}

export const dataFetch = async ({
  url,
  options,
  onSuccess = () => {},
  onError = () => {}
}: Params) => {
  try {
    const res = await fetch(url, options)
    const { success, data } = (await res.json()) as JSONResponse

    if (!success || !res.ok) {
      return onError()
    }
    onSuccess(data)
  } catch {
    onError()
  }
}
