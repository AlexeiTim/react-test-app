
export const defineErrorMessage = (e: any) => {
    if (e!.response?.data?.status_message) return e!.response?.data?.status_message
    else return 'Error request'
}