'use client';
import { TextField, Select, MenuItem, Button, FormControl, InputLabel, Container, Typography } from '@mui/material';
import { useLogic } from './useLogic'

const EventForm = ({ isEdit = false }) => {
    const { formik } = useLogic(isEdit);

    return (
        <Container>
            <Typography variant="h4">{isEdit ? 'Edit Event' : 'Create New Event'}</Typography>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    name="title"
                    label="Title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    name="date"
                    label="Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={formik.values.date.toISOString().split('T')[0]}
                    onChange={(e) => formik.setFieldValue('date', new Date(e.target.value))}
                    error={formik.touched.date && Boolean(formik.errors.date)}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    name="location"
                    label="Location"
                    value={formik.values.location}
                    onChange={formik.handleChange}
                    error={formik.touched.location && Boolean(formik.errors.location)}
                    helperText={formik.touched.location && formik.errors.location}
                    fullWidth
                    margin="normal"
                    required
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Category</InputLabel>
                    <Select
                        name="category"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        error={formik.touched.category && Boolean(formik.errors.category)}
                    >
                        <MenuItem value="music">Music</MenuItem>
                        <MenuItem value="art">Art</MenuItem>
                        <MenuItem value="technology">Technology</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    name="description"
                    label="Description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                    fullWidth
                    margin="normal"
                    required
                    multiline
                />
                <Button type="submit" variant="contained" color="primary">
                    {isEdit ? 'Update' : 'Create'} Event
                </Button>
            </form>
        </Container>
    );
};

export default EventForm;
