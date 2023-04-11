export default function formatDisplayDate(date, format) {
    const dateTime = `${date}T00:00:00`;
    const dateObject = new Date(dateTime);

    if (format === "short") {
        const gotDate = dateObject.getDate();
        const gotDay = new Intl.DateTimeFormat("en-US", {
        weekday: "short",
    }).format(dateObject);
        const gotMonth = new Intl.DateTimeFormat("en-US", {
            month: "short",
        }).format(dateObject);

        return `${gotMonth} ${gotDate} (${gotDay}) `;
    }
    
    else if (format === "long") {
        return dateObject.toLocaleDateString("en-us", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
    });
    } else {
        return dateObject.toDateString();
    }
}