export const seperateDateTime = (data) => {
    if (data) {
        const dateTime = data.split("T");
        const date = dateTime[0];
        const time = dateTime[1];
        const newTime = time.split(".")[0];

        return date + " @ " + newTime
    }

    return data;
}