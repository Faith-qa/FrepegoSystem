import { Calendar, useDateRange } from "@marceloterreiro/flash-calendar";

export const CalendarUi:React.FC = () => {
    const {
        calendarActiveDateRanges,
        onCalendarDayPress,
        // Also available for your convenience:
        // dateRange, // { startId?: string, endId?: string }
        // isDateRangeValid, // boolean
        // onClearDateRange, // () => void
    } = useDateRange();
    return (
        <Calendar.List
            calendarActiveDateRanges={calendarActiveDateRanges}
            onCalendarDayPress={onCalendarDayPress}
        />
    );
};

export default CalendarUi;