const themeStyles = require('./themes/tailbliss/tailwind.config');
module.exports = {
    ...themeStyles,
    content:  ['./layouts/**/*.html', './content/**/*.md', './themes/tailbliss/layouts/**/*.html', './assets/css/main.css']
}