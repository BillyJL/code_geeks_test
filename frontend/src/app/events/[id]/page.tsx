'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { fetchEventById, fetchSimilarEvents, deleteEvent, EventType } from '@/services/event';

const EventDetailsPage = () => {
    const router = useRouter();
    const { id } = useParams();
    const [event, setEvent] = useState<EventType | null>(null);
    const [similarEvents, setSimilarEvents] = useState<EventType[]>([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (id) {
            const eventId = Array.isArray(id) ? id[0] : id;
            fetchEventById(eventId).then(setEvent);
            fetchSimilarEvents(eventId).then(setSimilarEvents);
        }
    }, [id]);

    if (!id) {
        return <div>Loading...</div>;
    }

    if (!event) {
        return <div>Loading event details...</div>;
    }

    const handleEditClick = () => {
        router.push(`/events/edit/${event.id}`);
    };

    const handleDeleteClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmDelete = async () => {
        await deleteEvent(event.id);
        router.push('/events');
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <Typography variant="h4">{event.title}</Typography>
                    <Typography variant="body1">{`Date: ${new Date(event.date).toLocaleDateString()}`}</Typography>
                    <Typography variant="body1">{`Location: ${event.location}`}</Typography>
                    <Typography variant="body1">{`Category: ${event.category}`}</Typography>
                    <Typography variant="body1">{`Description: ${event.description}`}</Typography>
                    <Button variant="contained" color="primary" onClick={handleEditClick} style={{ marginRight: '10px' }}>
                        Edit
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleDeleteClick}>
                        Delete
                    </Button>
                </CardContent>
            </Card>
            <div>
                <Typography variant="h5">Similar Events</Typography>
                {similarEvents.map(similarEvent => (
                    <Card key={similarEvent.id}>
                        <CardContent>
                            <Typography variant="h6">{similarEvent.title}</Typography>
                            <Typography variant="body2">{new Date(similarEvent.date).toLocaleDateString()}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>{"Delete Event"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this event? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="secondary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default EventDetailsPage;
