export const utils = {
    format: (num: number) => {
        const formater = new Intl.NumberFormat('en-US', 
            { 
                style: 'currency', 
                currency: 'USD',
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2, 
            }
        );
    return formater.format(num);
    }
}