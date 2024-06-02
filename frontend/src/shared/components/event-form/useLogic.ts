import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { createEvent, fetchEventById, updateEvent, EventType } from '@/services/event';
import * as Yup from 'yup';

export const useLogic = (isEdit: boolean) => {
    const router = useRouter();
    const { id } = useParams();
    const [initialValues, setInitialValues] = useState<Omit<EventType, 'id'>>({
        title: '',
        date: new Date(),
        location: '',
        category: '',
        description: '',
    });

    useEffect(() => {
        if (isEdit && id) {
            fetchEventById(id as string).then(event => setInitialValues({
                title: event.title,
                date: new Date(event.date),
                location: event.location,
                category: event.category,
                description: event.description,
            }));
        }
    }, [id, isEdit]);

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        date: Yup.date().required('Date is required'),
        location: Yup.string().required('Location is required'),
        category: Yup.string().required('Category is required'),
        description: Yup.string().required('Description is required'),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            if (isEdit) {
                await updateEvent(id as string, values);
            } else {
                await createEvent(values);
            }
            router.push('/events');
        },
        enableReinitialize: true,
    });

    return { formik }
}