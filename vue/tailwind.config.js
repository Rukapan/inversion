module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        show: {
          "0%": { visibility: "hidden", opacity: "0" },
          "15%": { visibility: "hidden", opacity: "0" },
          "100%": { visibility: "visible", opacity: "100" },
        },
        fade: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        rumble: {
          "0%": {
            transform: "translate(0px)",
          },
          "25%": {
            transform: "translate(3px)",
          },
          "50%": {
            transform: "translate(0px)",
          },
          "75%": {
            transform: "translate(-3px)",
          },
          "100%": {
            transform: "translate(0px)",
          },
        },
        "slide-top": {
          "0%": {
            transform: "translateY(100px)",
          },
          to: {
            transform: "translateY(0)",
          },
        },
        "fade-in-bottom": {
          "0%": {
            transform: "translateY(50px)",
            opacity: "0",
          },
          to: {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        "fade-in-left": {
          "0%": {
            transform: "translateX(-100px)",
            opacity: "0",
          },
          to: {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        "fade-in-top": {
          "0%": {
            transform: "translateY(-50px)",
            opacity: "0",
          },
          to: {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        "fade-in-fwd": {
          "0%": {
            transform: "translateZ(-80px)",
            opacity: "0",
          },
          to: {
            transform: "translateZ(0)",
            opacity: "1",
          },
        },
      },
      animation: {
        show: "show 0.3s ease forwards",
        fadeIn: "fade 0.1s forwards",
        rumble: "rumble 0.2s ",
        "slide-top":
          "slide-top 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "fade-in-bottom":
          "fade-in-bottom 0.8s cubic-bezier(0.390, 0.575, 0.565, 1.000)   both",
        "fade-in-left":
          "fade-in-left 0.8s cubic-bezier(0.390, 0.575, 0.565, 1.000)   both",
        "fade-in-top":
          "fade-in-top 0.3s cubic-bezier(0.390, 0.575, 0.565, 1.000)   both",
        "fade-in-fwd":
          "fade-in-fwd 0.3s  cubic-bezier(0.390, 0.575, 0.565, 1.000)   both",
      },
    },
  },
  variants: {
    extend: {
      animation: ["hover", "group-hover"],
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#C20024",
          secondary: "#0047c2",
          "base-100": "#E6E6E6",
          info: "#E6E6E6",
          success: "#51E1A7",
          error: "#F81212",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
