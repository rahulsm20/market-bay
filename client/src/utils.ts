export const formatDate= (dateString:string)=>{
    const date = new Date(dateString)
    const formattedDate =  date.toLocaleString("en-IN", {year: "numeric",month: "long",day: "numeric",minute: "2-digit",hour: "2-digit"})
    return formattedDate
}

export const formatPrice = (price:number|null)=>{
    return price?.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      })
}