export default function showTextBasedOnTime() {
    var today = new Date();
    var currentHour = today.getHours();
    if (currentHour < 12) {
        return "Good Morning";
    } else if (currentHour < 18) {
        return "Good afternoon";
    } else {
        return "Good evening";
    }
}