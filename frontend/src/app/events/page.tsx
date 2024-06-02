"use client";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Select,
    MenuItem,
    TextField,
    Button,
    Container,
} from "@mui/material";
import { useLogic } from "./useLogic";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("@/shared/components/map-view"), { ssr: false });

const EventListPage = () => {
    const {
        handleCreateEvent,
        setSort,
        sort,
        categoryFilter,
        setCategoryFilter,
        dateRange,
        setDateRange,
        events,
        handleResetDateFilter,
        handleEventClick,
    } = useLogic();

    return (
        <Container>
            <Button
                variant="contained"
                color="primary"
                onClick={handleCreateEvent}
                style={{ marginBottom: "20px" }}
            >
                Create New Event
            </Button>
            <div style={{ marginBottom: "20px" }}>
                <Select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as string)}
                    style={{ marginRight: "10px" }}
                >
                    <MenuItem value="date">Date</MenuItem>
                    <MenuItem value="category">Category</MenuItem>
                </Select>
                <Select
                    value={categoryFilter}
                    onChange={(e) =>
                        setCategoryFilter(e.target.value as string)
                    }
                    displayEmpty
                    style={{ marginRight: "10px" }}
                >
                    <MenuItem value="">All Categories</MenuItem>
                    <MenuItem value="music">Music</MenuItem>
                    <MenuItem value="art">Art</MenuItem>
                    <MenuItem value="technology">Technology</MenuItem>
                </Select>
                <TextField
                    label="Start Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={dateRange.start}
                    onChange={(e) =>
                        setDateRange({ ...dateRange, start: e.target.value })
                    }
                    style={{ marginRight: "10px" }}
                />
                <TextField
                    label="End Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={dateRange.end}
                    onChange={(e) =>
                        setDateRange({ ...dateRange, end: e.target.value })
                    }
                />
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleResetDateFilter}
                    style={{ marginLeft: "10px" }}
                >
                    Reset Date Filter
                </Button>
            </div>
            <Grid container spacing={2}>
                {events.map((event) => (
                    <Grid item key={event.id} xs={12} sm={6} md={4}>
                        <Card
                            onClick={() => handleEventClick(event.id)}
                            style={{ cursor: "pointer" }}
                        >
                            <CardContent>
                                <Typography variant="h5">
                                    {event.title}
                                </Typography>
                                <Typography variant="body2">{`Date: ${new Date(
                                    event.date
                                ).toLocaleDateString()}`}</Typography>
                                <Typography variant="body2">{`Location: ${event.location}`}</Typography>
                                <Typography variant="body2">{`Description: ${event.description}`}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <div style={{ marginBottom: "20px" }}></div>
            {/* <MapView events={events} /> */}
        </Container>
    );
};

export default EventListPage;
