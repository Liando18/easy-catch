export const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    })
        .format(number)
        .replace("IDR", "")
        .trim();
};
