export const generateOtp = () => {
    return `${Math.floor(100000 + Math.random() * 900000)}`;
}
export const getCurrentTimeStamps = () => {
    const currentDate = new Date();
    const formatter = new Intl.DateTimeFormat("en-IN", {
        year: 'numeric',
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    }).format(currentDate);
    return formatter.replace(',', '');
}