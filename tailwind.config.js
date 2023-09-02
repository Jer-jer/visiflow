/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.tsx",
    "./resources/**/*.jsx"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0db284',
        'accent': '#2C4C32',
        'neutral': '#D0D2CC',
        'success': '#0db284',
        'warning': '#ffce0a',
        'error': '#FD4A4A',
        'black': '#0C0D0D',
        'red': '#FD4A4A',
        'yellow': '#ffce0a',
        'orange': '#E88B23'
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        serif: ['Roboto', 'serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      {
        visiFlow: {
          'primary': '#0db284',
          'accent': '#2C4C32',
          'neutral': '#D0D2CC',
          'base-100': '#DFEAEF',
          'success': '#0db284',
          'warning': '#ffce0a',
          'error': '#FD4A4A',
        }
      }
    ], // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },
}

