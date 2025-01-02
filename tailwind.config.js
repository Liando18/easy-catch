import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                primary: "Poppins",
                ...defaultTheme.fontFamily.sans,
            },
            colors: {
                hijau1: "#10b981",
                hijau2: "#16a34a",
                hijau3: "#047857",
                hijau4: "#052e16",
                abu1: "#3C3C3C",
            },
        },
    },

    darkMode: "class",

    plugins: [forms, require("daisyui")],
    daisyui: {
        themes: ["light", "dark", "cupcake"],
    },
};
