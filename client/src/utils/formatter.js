
export const generateTagArray = tagString => {
    let tag = [];
    if (tagString.trim() === '' || tagString === null)
        return null;
    const arr = tagString.split(',');
    for (let item of arr){
        tag.push(item.trim());
    }
    return tag;
}