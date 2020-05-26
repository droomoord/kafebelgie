let config;

if (process.env.NODE_ENV === "production") {
  config = {
    prefix: "https://kriskrascreations.org/wp-json/wp/v2",
  };
} else {
  config = {
    prefix: "/wp-json/wp/v2",
  };
}

export default config;
