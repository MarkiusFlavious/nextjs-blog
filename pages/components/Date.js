import { parseISO, format } from 'date-fns';

export default function Date({ dateString }) {
    if (!dateString) {
        return null; // Or return "Date not available" or an empty string
    }

    try {
        const date = parseISO(dateString);
        return (
            <time dateTime={dateString}>{format(date, 'd LLLL yyyy')}</time>
        );
    } catch (error) {
        console.error("Error parsing date:", error);
        return null; // Handle the error gracefully
    }
}