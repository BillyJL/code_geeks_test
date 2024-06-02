import { fetchEvents, EventType } from "@/services/event";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const useLogic = () => {
    const [events, setEvents] = useState<EventType[]>([]);
    const [sort, setSort] = useState<string>("date");
    const [categoryFilter, setCategoryFilter] = useState<string>("");
    const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
        start: "",
        end: "",
    });
    const router = useRouter();

    useEffect(() => {
        fetchEvents().then((events) => {
            let filteredEvents: EventType[] = events;

            if (categoryFilter) {
                filteredEvents = filteredEvents.filter((event: EventType) =>
                    event.category
                        .toLowerCase()
                        .includes(categoryFilter.toLowerCase())
                );
            }

            if (dateRange.start && dateRange.end) {
                const startDate = new Date(dateRange.start).getTime();
                const endDate = new Date(dateRange.end).getTime();
                filteredEvents = filteredEvents.filter((event: EventType) => {
                    const eventDate = new Date(event.date).getTime();
                    return eventDate >= startDate && eventDate <= endDate;
                });
            }

            if (sort === "date") {
                filteredEvents.sort(
                    (a: EventType, b: EventType) =>
                        new Date(a.date).getTime() - new Date(b.date).getTime()
                );
            } else if (sort === "category") {
                filteredEvents.sort((a: EventType, b: EventType) =>
                    a.category.localeCompare(b.category)
                );
            }

            setEvents(filteredEvents);
        });
    }, [sort, categoryFilter, dateRange]);

    const handleEventClick = (id: string) => {
        router.push(`/events/${id}`);
    };

    const handleCreateEvent = () => {
        router.push("/events/new");
    };

    const handleResetDateFilter = () => {
        setDateRange({ start: "", end: "" });
    };

    return {
        handleCreateEvent,
        sort,
        setSort,
        categoryFilter,
        setCategoryFilter,
        dateRange,
        setDateRange,
        handleResetDateFilter,
        handleEventClick,
        events
    };
};
