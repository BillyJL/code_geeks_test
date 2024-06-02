import "dotenv/config";
import * as yup from "yup";

const configSchema = yup.object().shape({
    API_URL: yup
        .string()
        .required("API_URL is required and should be a valid URL"),
    // GOOGLE_MAP_API_KEY: yup.string().required('GOOGLE_MAP_API_KEY is required')
});

const appConfig = {
    API_URL: process.env.API_URL || "http://localhost:3001/events",
    GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY || "",
};

try {
    configSchema.validateSync(appConfig);
} catch (err) {
    if (err instanceof yup.ValidationError) {
        console.error("Invalid configuration", err.errors);
    } else {
        console.error("Unknown error", err);
    }
    process.exit(1);
}

export default appConfig;
